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
  Switch,
} from "@mui/material";
import { IStaff } from "@/interfaces/IStaff";
import { StaffServices } from "@/services/StaffServices";
import InfoIcon from "@mui/icons-material/Info";
import { useTheme } from "@mui/material/styles";
import StaffForm from "./ActionsBar/StaffForm/StaffForm";
import CloseIcon from "@mui/icons-material/Close";

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
              <TableCell>Service Area</TableCell>
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
                    <Button onClick={() => handleOpenForm(staffMember)} size="small" variant="outlined" color="info">
                      <EditIcon />
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      <DeleteIcon onClick={() => handleOpenDelete(staffMember)} />
                    </Button>
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
    </TableContainer>
  );
}
