import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import db from "@/db/mockdata.json";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, FormControlLabel, Switch } from "@mui/material";

export default function StaffViewer() {
  const [staff, setStaff] = React.useState(db.data);

  const handleStatusChange = (id: number) => {
    const newStaff = staff.map((staffMember) =>
      staffMember.id === id ? { ...staffMember, status: !staffMember.status } : staffMember
    );
    setStaff(newStaff);
  };

  return (
    <TableContainer component={Paper}>
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
            <TableRow key={staffMember.personalInformation.name}>
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
                  control={<Switch checked={staffMember.status} onChange={() => handleStatusChange(staffMember.id)} />}
                  label={staffMember.status ? "Active" : "Inactive"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
