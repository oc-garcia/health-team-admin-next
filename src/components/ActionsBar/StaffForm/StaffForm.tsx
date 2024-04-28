import { Formik, Field, Form, useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  personalInformation: Yup.object().shape({
    name: Yup.string().required("Required"),
    cpf: Yup.number().required("Required"),
    rg: Yup.number().required("Required"),
    birthDate: Yup.date().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.number().required("Required"),
    address: Yup.object().shape({
      street: Yup.string().required("Required"),
      number: Yup.number().required("Required"),
      neighborhood: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zipCode: Yup.number().required("Required"),
    }),
  }),
  professionalInformation: Yup.object().shape({
    crm: Yup.number().required("Required"),
    cfm: Yup.number().required("Required"),
    specialty: Yup.string().required("Required"),
    hourConsultationPrice: Yup.number().required("Required"),
    serviceArea: Yup.string().required("Required"),
    appointmentType: Yup.string().required("Required"),
    photos: Yup.array().of(Yup.string().required("Required")),
  }),
  status: Yup.boolean().required("Required"),
});

const newStaffInicialValues = {
  personalInformation: {
    name: "",
    cpf: "",
    rg: "",
    birthDate: "",
    email: "",
    phone: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  professionalInformation: {
    crm: "",
    cfm: "",
    specialty: "",
    hourConsultationPrice: "",
    serviceArea: "",
    appointmentType: "",
    photos: [],
  },
  status: false,
};

const StaffForm = () => {
  const formik = useFormik({
    initialValues: newStaffInicialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submitting form with values:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            id="personalInformation.name"
            name="personalInformation.name"
            label="Name"
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
            id="personalInformation.address.street"
            name="personalInformation.address.street"
            label="Street"
            value={formik.values.personalInformation.address.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInformation?.address?.street &&
              Boolean(formik.errors.personalInformation?.address?.street)
            }
            helperText={
              formik.touched.personalInformation?.address?.street && formik.errors.personalInformation?.address?.street
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.address.number"
            name="personalInformation.address.number"
            label="Number"
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
            id="personalInformation.address.neighborhood"
            name="personalInformation.address.neighborhood"
            label="Neighborhood"
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.address.city"
            name="personalInformation.address.city"
            label="City"
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.address.state"
            name="personalInformation.address.state"
            label="State"
            value={formik.values.personalInformation.address.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInformation?.address?.state &&
              Boolean(formik.errors.personalInformation?.address?.state)
            }
            helperText={
              formik.touched.personalInformation?.address?.state && formik.errors.personalInformation?.address?.state
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="personalInformation.address.zipCode"
            name="personalInformation.address.zipCode"
            label="Zip Code"
            value={formik.values.personalInformation.address.zipCode}
            onChange={formik.handleChange}
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
          <TextField
            fullWidth
            id="professionalInformation.crm"
            name="professionalInformation.crm"
            label="CRM"
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
            value={formik.values.professionalInformation.cfm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.professionalInformation?.cfm && Boolean(formik.errors.professionalInformation?.cfm)}
            helperText={formik.touched.professionalInformation?.cfm && formik.errors.professionalInformation?.cfm}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="professionalInformation.specialty"
            name="professionalInformation.specialty"
            label="Specialty"
            value={formik.values.professionalInformation.specialty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.professionalInformation?.specialty &&
              Boolean(formik.errors.professionalInformation?.specialty)
            }
            helperText={
              formik.touched.professionalInformation?.specialty && formik.errors.professionalInformation?.specialty
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="professionalInformation.hourConsultationPrice"
            name="professionalInformation.hourConsultationPrice"
            label="Hour Consultation Price"
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
            label="Service Area"
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
          <TextField
            fullWidth
            id="professionalInformation.appointmentType"
            name="professionalInformation.appointmentType"
            label="Appointment Type"
            value={formik.values.professionalInformation.appointmentType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.professionalInformation?.appointmentType &&
              Boolean(formik.errors.professionalInformation?.appointmentType)
            }
            helperText={
              formik.touched.professionalInformation?.appointmentType &&
              formik.errors.professionalInformation?.appointmentType
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StaffForm;
