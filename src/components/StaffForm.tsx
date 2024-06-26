import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import { StaffServices } from "@/services/StaffServices";
import { IStaff } from "@/interfaces/IStaff";
import { AddressServices } from "@/services/AddressServices";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const medicalSpecialties = [
  "Allergy and Immunology",
  "Anesthesiology",
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Endocrinology",
  "Family Medicine",
  "Gastroenterology",
  "Genetics",
  "Geriatrics",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Medical Oncology",
  "Nephrology",
  "Neurology",
  "Neurosurgery",
  "Obstetrics and Gynecology",
  "Ophthalmology",
  "Pathology",
  "Pediatrics",
  "Physical Medicine and Rehabilitation",
  "Plastic Surgery",
  "Preventive Medicine",
  "Psychiatry",
  "Radiation Oncology",
  "Pulmonary Disease",
  "Rheumatology",
  "Urology",
];

const validationSchema = Yup.object().shape({
  personalInformation: Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    cpf: Yup.number()
      .test("cpf", "CPF must be 11 digits", (value) => String(value).length === 11)
      .required("Required"),
    rg: Yup.number()
      .test("rg", "RG must be 9 digits", (value) => String(value).length === 9)
      .required("Required"),
    birthDate: Yup.date().max(new Date(), "Birth date cannot be in the future").required("Required"),
    email: Yup.string()
      .email("Invalid email")
      .test("email", "Email is required when phone is not provided", function (value) {
        const { phone } = this.parent;
        return (phone && phone.length > 0) || (value && value.length > 0);
      }),
    phone: Yup.string()
      .min(10, "Phone number is too short")
      .test("phone", "Phone is required when email is not provided", function (value) {
        const { email } = this.parent;
        return (email && email.length > 0) || (value && value.length > 0);
      }),
    address: Yup.object().shape({
      street: Yup.string().required("Required"),
      number: Yup.number().required("Required"),
      neighborhood: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zipCode: Yup.string()
        .matches(/^[0-9]{8}$/, "Zip Code must be 8 digits")
        .required("Required"),
    }),
  }),
  professionalInformation: Yup.object().shape({
    crm: Yup.number().required("Required"),
    cfm: Yup.number().required("Required"),
    specialty: Yup.string().required("Required"),
    hourConsultationPrice: Yup.number().min(0, "Hour consultation price cannot be negative").required("Required"),
    serviceArea: Yup.number().min(0, "Service area cannot be negative").required("Required").max(100, "Service area cannot be greater than 100"),
    appointmentType: Yup.string().required("Required"),
    photos: Yup.array().of(Yup.string().required("Required")),
  }),
  status: Yup.boolean().required("Required"),
});

const newStaffInicialValues = {
  personalInformation: {
    name: "",
    cpf: undefined,
    rg: undefined,
    birthDate: undefined,
    email: "",
    phone: undefined,
    address: {
      street: "",
      number: undefined,
      neighborhood: "",
      city: "",
      state: "",
      zipCode: undefined,
    },
  },
  professionalInformation: {
    crm: undefined,
    cfm: undefined,
    specialty: "",
    hourConsultationPrice: undefined,
    serviceArea: undefined,
    appointmentType: "",
    photos: [],
  },
  status: true,
};

interface StaffFormProps {
  editInitialValues?: IStaff;
  handleClose: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ editInitialValues, handleClose }) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [photoArray, setPhotoArray] = useState<string[]>(editInitialValues?.professionalInformation.photos || []);

  const [openCpfSnackbar, setOpenCpfSnackbar] = useState(false);

  const [openPhotoSnackBar, setOpenPhotoSnackbar] = useState(false);

  const theme = useTheme();

  const getInitialValues = () => editInitialValues || newStaffInicialValues;

  const cpfRef = useRef<HTMLInputElement>(null);

  const photoUploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openCpfSnackbar) {
      cpfRef.current?.focus();
    }
  }, [openCpfSnackbar]);

  useEffect(() => {
    if (openPhotoSnackBar) {
      photoUploadRef.current?.focus();
    }
  }, [openPhotoSnackBar]);

  const formik = useFormik<IStaff>({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.professionalInformation.photos = [...photoArray];
      if (editInitialValues) {
        if (values.professionalInformation.photos.length === 0) {
          setOpenPhotoSnackbar(true);
          return;
        }
        StaffServices.updateStaff(values);
      } else {
        if (values.personalInformation.cpf) {
          const cpfExists = await StaffServices.checkCpf(values.personalInformation.cpf);
          if (cpfExists.exists) {
            setOpenCpfSnackbar(true);
            return;
          }
        }
        if (values.professionalInformation.photos.length === 0) {
          setOpenPhotoSnackbar(true);
          return;
        }
        StaffServices.createStaff(values);
      }
      handleClose();
    },
  });

  const handleZipCodeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value;
    formik.handleChange(event);
    if (/^\d{8}$/.test(zipCode)) {
      const address = await AddressServices.getAddress(zipCode);
      if (address) {
        formik.setFieldValue("personalInformation.address.street", address.logradouro);
        formik.setFieldValue("personalInformation.address.neighborhood", address.bairro);
        formik.setFieldValue("personalInformation.address.city", address.localidade);
        formik.setFieldValue("personalInformation.address.state", address.uf);
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const urls = [];
      const uniqueId = uuidv4();
      const storageRef = ref(storage, "photos/" + uniqueId + "_" + file.name);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
      setPhotoArray([...photoArray, ...urls]);
      setUploadSuccess(true);
    }
  };

  const handleCloseCpfSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCpfSnackbar(false);
  };

  const handleClosePhotoSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPhotoSnackbar(false);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div ref={photoUploadRef} tabIndex={-1} />

      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            color={uploadSuccess ? "success" : "warning"}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}>
            Upload photo
            <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.name"
            name="personalInformation.name"
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.personalInformation.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.personalInformation?.name && Boolean(formik.errors.personalInformation?.name)}
            helperText={formik.touched.personalInformation?.name && formik.errors.personalInformation?.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.cpf"
            name="personalInformation.cpf"
            label="CPF"
            inputRef={cpfRef}
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.personalInformation.cpf}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.personalInformation?.cpf && Boolean(formik.errors.personalInformation?.cpf)}
            helperText={formik.touched.personalInformation?.cpf && formik.errors.personalInformation?.cpf}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.rg"
            name="personalInformation.rg"
            label="RG"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.personalInformation.rg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.personalInformation?.rg && Boolean(formik.errors.personalInformation?.rg)}
            helperText={formik.touched.personalInformation?.rg && formik.errors.personalInformation?.rg}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.birthDate"
            name="personalInformation.birthDate"
            label="Birth Date"
            type="date"
            className={theme.palette.mode === "light" ? "" : "dark-theme"}
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.personalInformation.birthDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInformation?.birthDate && Boolean(formik.errors.personalInformation?.birthDate)
            }
            helperText={formik.touched.personalInformation?.birthDate && formik.errors.personalInformation?.birthDate}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.email"
            name="personalInformation.email"
            label="Email"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.personalInformation.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.personalInformation?.email && Boolean(formik.errors.personalInformation?.email)}
            helperText={formik.touched.personalInformation?.email && formik.errors.personalInformation?.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.phone"
            name="personalInformation.phone"
            label="Phone"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.personalInformation.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.personalInformation?.phone && Boolean(formik.errors.personalInformation?.phone)}
            helperText={formik.touched.personalInformation?.phone && formik.errors.personalInformation?.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.address.zipCode"
            name="personalInformation.address.zipCode"
            label="Zip Code"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.personalInformation.address.zipCode}
            onChange={handleZipCodeChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInformation?.address?.zipCode &&
              Boolean(formik.errors.personalInformation?.address?.zipCode)
            }
            helperText={
              formik.touched.personalInformation?.address?.zipCode &&
              formik.errors.personalInformation?.address?.zipCode
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="personalInformation.address.street"
                name="personalInformation.address.street"
                label="Street"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.personalInformation.address.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalInformation?.address?.street &&
                  Boolean(formik.errors.personalInformation?.address?.street)
                }
                helperText={
                  formik.touched.personalInformation?.address?.street &&
                  formik.errors.personalInformation?.address?.street
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="personalInformation.address.neighborhood"
                name="personalInformation.address.neighborhood"
                label="Neighborhood"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.personalInformation.address.neighborhood}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalInformation?.address?.neighborhood &&
                  Boolean(formik.errors.personalInformation?.address?.neighborhood)
                }
                helperText={
                  formik.touched.personalInformation?.address?.neighborhood &&
                  formik.errors.personalInformation?.address?.neighborhood
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="personalInformation.address.city"
                name="personalInformation.address.city"
                label="City"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.personalInformation.address.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalInformation?.address?.city &&
                  Boolean(formik.errors.personalInformation?.address?.city)
                }
                helperText={
                  formik.touched.personalInformation?.address?.city && formik.errors.personalInformation?.address?.city
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="personalInformation.address.state"
                name="personalInformation.address.state"
                label="State"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.personalInformation.address.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalInformation?.address?.state &&
                  Boolean(formik.errors.personalInformation?.address?.state)
                }
                helperText={
                  formik.touched.personalInformation?.address?.state &&
                  formik.errors.personalInformation?.address?.state
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.address.number"
            name="personalInformation.address.number"
            label="Number"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.personalInformation.address.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInformation?.address?.number &&
              Boolean(formik.errors.personalInformation?.address?.number)
            }
            helperText={
              formik.touched.personalInformation?.address?.number && formik.errors.personalInformation?.address?.number
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="professionalInformation.crm"
            name="professionalInformation.crm"
            label="CRM"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.professionalInformation.crm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.professionalInformation?.crm && Boolean(formik.errors.professionalInformation?.crm)}
            helperText={formik.touched.professionalInformation?.crm && formik.errors.professionalInformation?.crm}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="professionalInformation.cfm"
            name="professionalInformation.cfm"
            label="CFM"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.professionalInformation.cfm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.professionalInformation?.cfm && Boolean(formik.errors.professionalInformation?.cfm)}
            helperText={formik.touched.professionalInformation?.cfm && formik.errors.professionalInformation?.cfm}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="professionalInformation.appointmentType">Specialty</InputLabel>
            <Select
              labelId="professionalInformation.appointmentType"
              id="professionalInformation.specialty"
              name="professionalInformation.specialty"
              label="Specialty"
              value={formik.values.professionalInformation.specialty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.professionalInformation?.specialty &&
                Boolean(formik.errors.professionalInformation?.specialty)
              }>
              {medicalSpecialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.professionalInformation?.specialty && formik.errors.professionalInformation?.specialty}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="professionalInformation.hourConsultationPrice"
            name="professionalInformation.hourConsultationPrice"
            label="Hour Consultation Price"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.professionalInformation.hourConsultationPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.professionalInformation?.hourConsultationPrice &&
              Boolean(formik.errors.professionalInformation?.hourConsultationPrice)
            }
            helperText={
              formik.touched.professionalInformation?.hourConsultationPrice &&
              formik.errors.professionalInformation?.hourConsultationPrice
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="professionalInformation.serviceArea"
            name="professionalInformation.serviceArea"
            label="Service Area Radius (km)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.professionalInformation.serviceArea}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.professionalInformation?.serviceArea &&
              Boolean(formik.errors.professionalInformation?.serviceArea)
            }
            helperText={
              formik.touched.professionalInformation?.serviceArea && formik.errors.professionalInformation?.serviceArea
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="professionalInformation.appointmentType">Appointment Type</InputLabel>
            <Select
              labelId="professionalInformation.appointmentType"
              id="professionalInformation.appointmentType"
              name="professionalInformation.appointmentType"
              label="Appointment Type"
              value={formik.values.professionalInformation.appointmentType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.professionalInformation?.appointmentType &&
                Boolean(formik.errors.professionalInformation?.appointmentType)
              }>
              <MenuItem value={"In person"}>In person</MenuItem>
              <MenuItem value={"Telemedicine"}>Telemedicine</MenuItem>
            </Select>
            <FormHelperText>
              {formik.touched.professionalInformation?.appointmentType &&
                formik.errors.professionalInformation?.appointmentType}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={openCpfSnackbar} autoHideDuration={6000}>
        <Alert onClose={handleCloseCpfSnackbar} severity="error">
          CPF already exists
        </Alert>
      </Snackbar>
      <Snackbar open={openPhotoSnackBar} autoHideDuration={6000}>
        <Alert onClose={handleClosePhotoSnackbar} severity="error">
          At least one photo is required
        </Alert>
      </Snackbar>
    </form>
  );
};

export default StaffForm;
