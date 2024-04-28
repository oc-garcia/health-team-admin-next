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
import { Alert, Button, FormControlLabel, Switch } from "@mui/material";
import { IStaff } from "@/interfaces/IStaff";
import { StaffServices } from "@/services/StaffServices";
import InfoIcon from "@mui/icons-material/Info";
import { useMutation } from "react-query";
import { useTheme } from "@mui/material/styles";

export default function StaffViewer() {
  const [staff, setStaff] = React.useState<IStaff[]>([]);

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
            {staff.map((staffMember, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {staffMember.personalInformation.name}
                </TableCell>
                <TableCell>{staffMember.professionalInformation.specialty}</TableCell>
                <TableCell>{staffMember.professionalInformation.serviceArea}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center ">
                    <Button size="small" variant="outlined" color="info" startIcon={<EditIcon />}>
                      Edit
                    </Button>
                    <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch checked={staffMember.status} onChange={() => handleStatusChange(staffMember.id)} />
                    }
                    label={staffMember.status ? "Active" : "Inactive"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
