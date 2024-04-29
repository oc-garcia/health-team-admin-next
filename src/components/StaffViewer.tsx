import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Slide,
  Switch,
  Typography,
} from "@mui/material";
import { IStaff } from "@/interfaces/IStaff";
import { StaffServices } from "@/services/StaffServices";
import InfoIcon from "@mui/icons-material/Info";
import StaffForm from "./StaffForm";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StaffViewer() {
  const [staff, setStaff] = React.useState<IStaff[]>([]);

  const [openForm, setOpenForm] = React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);

  const [selectedStaff, setSelectedStaff] = React.useState<IStaff | undefined>(undefined);
  const handleOpenForm = (value: IStaff) => {
    setOpenForm(true);
    setSelectedStaff(value);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedStaff(undefined);
  };

  const handleOpenDelete = (value: IStaff) => {
    setOpenDelete(true);
    setSelectedStaff(value);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setTimeout(() => setSelectedStaff(undefined), 500);
  };

  const [openCard, setOpenCard] = React.useState(false);

  const handleClickOpenCard = (value: IStaff) => {
    setOpenCard(true);
    setSelectedStaff(value);
  };

  const handleCloseCard = () => {
    setOpenCard(false);
    setTimeout(() => setSelectedStaff(undefined), 500);
  };

  React.useEffect(() => {
    StaffServices.getStaff(setStaff);
  }, []);

  return (
    <TableContainer component={Paper}>
      {staff.length === 0 ? (
        <Alert variant="filled" icon={<InfoIcon fontSize="inherit" />} severity="info">
          No staff registered yet.
        </Alert>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Service Area Radius (km)</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell component="th" scope="row">
                  {staffMember.personalInformation.name}
                </TableCell>
                <TableCell>{staffMember.professionalInformation.specialty}</TableCell>
                <TableCell>{staffMember.professionalInformation.serviceArea}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center ">
                    <IconButton onClick={() => handleClickOpenCard(staffMember)} size="small" color="secondary">
                      <SearchIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenForm(staffMember)} size="small" color="info">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon onClick={() => handleOpenDelete(staffMember)} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={staffMember.status}
                        onChange={() => {
                          staffMember.status = !staffMember.status;
                          StaffServices.updateStaff(staffMember);
                        }}
                      />
                    }
                    label={staffMember.status ? "Active" : "Inactive"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={openForm}>
        <DialogTitle>
          <Box
            sx={{
              padding: "0px 10px",
              display: "flex",
              alignItems: "center ",
              justifyContent: "space-between",
              gap: "1rem",
            }}>
            <p>Edit Staff</p>
            <IconButton aria-label="close" onClick={handleCloseForm}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <StaffForm editInitialValues={selectedStaff} handleClose={handleCloseForm} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete {selectedStaff?.personalInformation.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              if (selectedStaff && selectedStaff.id) {
                StaffServices.deleteStaff(selectedStaff.id);
                handleCloseDelete();
              }
            }}
            autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCard}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCard}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Staff Overview"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {selectedStaff && (
              <div>
                <Typography variant="h6">Personal Information</Typography>
                <Typography>Name: {selectedStaff.personalInformation.name}</Typography>
                <Typography>Email: {selectedStaff.personalInformation.email}</Typography>
                <Typography>CPF: {selectedStaff.personalInformation.cpf}</Typography>
                <Typography>RG: {selectedStaff.personalInformation.rg}</Typography>
                <Typography>Birth Date: {selectedStaff.personalInformation.birthDate}</Typography>
                <Typography>Phone: {selectedStaff.personalInformation.phone}</Typography>
                <Typography>
                  Address: {selectedStaff.personalInformation.address.street},{" "}
                  {selectedStaff.personalInformation.address.number}, {selectedStaff.personalInformation.address.city},{" "}
                  {selectedStaff.personalInformation.address.state}, {selectedStaff.personalInformation.address.zipCode}
                </Typography>
                <Typography sx={{ marginTop: "1rem" }} variant="h6">
                  Professional Information
                </Typography>
                <Typography>Specialty: {selectedStaff.professionalInformation.specialty}</Typography>
                <Typography>CRM: {selectedStaff.professionalInformation.crm}</Typography>
                <Typography>CFM: {selectedStaff.professionalInformation.cfm}</Typography>
                <Typography>Service Area Radius (km): {selectedStaff.professionalInformation.serviceArea}</Typography>
                <Typography>Appointment Type: {selectedStaff.professionalInformation.appointmentType}</Typography>
                <Typography>
                  Hour Consultation Price: {selectedStaff.professionalInformation.hourConsultationPrice}
                </Typography>
                <Typography sx={{ marginTop: "1rem" }} variant="h6">
                  Status
                </Typography>
                <Typography>{selectedStaff.status ? "Active" : "Inactive"}</Typography>
                <Typography sx={{ marginTop: "1rem" }} variant="h6">
                  Photos
                </Typography>
                {selectedStaff.professionalInformation.photos.map((photo, index) => (
                  <img key={index} src={photo} alt="Staff" style={{ width: "100px", height: "100px" }} />
                ))}
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCard}>close</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
