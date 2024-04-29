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
  DialogContent,
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

  const [open, setOpen] = React.useState(false);

  const [selectedStaff, setSelectedStaff] = React.useState<IStaff | undefined>(undefined);
  const handleOpen = (value: IStaff) => {
    setOpen(true);
    setSelectedStaff(value);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStaff(undefined);
  };
  const theme = useTheme();

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
                    <Button onClick={() => handleOpen(staffMember)} size="small" variant="outlined" color="info">
                      <EditIcon />
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      <DeleteIcon />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={<Switch checked={staffMember.status} />}
                    label={staffMember.status ? "Active" : "Inactive"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={open}>
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
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <StaffForm editInitialValues={selectedStaff} />
        </DialogContent>
      </Dialog>
    </TableContainer>
  );
}
