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
  Grid,
  IconButton,
  Slide,
  Switch,
  TablePagination,
  Typography,
} from "@mui/material";
import { IStaff } from "@/interfaces/IStaff";
import { StaffServices } from "@/services/StaffServices";
import InfoIcon from "@mui/icons-material/Info";
import StaffForm from "./StaffForm";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { storage } from "@/firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StaffOverview from "./StaffOverview";
import { useActionBarContext } from "@/context/actionBarContext";
import StaffCard from "./StaffCard";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StaffViewer() {
  const { isTableView } = useActionBarContext();

  const [staff, setStaff] = React.useState<IStaff[]>([]);

  const [updatingStaffId, setUpdatingStaffId] = React.useState<string | null>(null);

  const [openForm, setOpenForm] = React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);

  const [selectedStaff, setSelectedStaff] = React.useState<IStaff | undefined>(undefined);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    StaffServices.getStaff(setStaff);
  }, []);

  const handleDeletePhoto = async (staff: IStaff, index: number) => {
    const photos = [...staff.professionalInformation.photos];
    const photoUrl = photos[index];
    photos.splice(index, 1);
    staff.professionalInformation.photos = photos;
    StaffServices.updateStaff(staff);
    const photoRef = ref(storage, photoUrl);
    await deleteObject(photoRef);
  };

  return (
    <>
      {staff.length === 0 ? (
        <Alert variant="filled" icon={<InfoIcon fontSize="inherit" />} severity="info">
          No staff registered yet.
        </Alert>
      ) : (
        <>
          {isTableView ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Specialty</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Service Area Radius (km)</TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((staffMember) => (
                    <TableRow key={staffMember.id}>
                      <TableCell component="th" scope="row">
                        {staffMember.personalInformation.name}
                      </TableCell>
                      <TableCell>{staffMember.professionalInformation.specialty}</TableCell>
                      <TableCell>
                        {staffMember.personalInformation.address.city},{" "}
                        {staffMember.personalInformation.address.neighborhood}
                      </TableCell>
                      <TableCell>{staffMember.professionalInformation.serviceArea}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center ">
                          <IconButton onClick={() => handleClickOpenCard(staffMember)} size="small" color="secondary">
                            <SearchIcon />
                          </IconButton>
                          <IconButton onClick={() => handleOpenForm(staffMember)} size="small" color="info">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleOpenDelete(staffMember)} size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={staffMember.status}
                              onChange={async () => {
                                if (typeof staffMember.id === "undefined") {
                                  return;
                                }
                                setUpdatingStaffId(staffMember.id);
                                staffMember.status = !staffMember.status;
                                await StaffServices.updateStaff(staffMember);
                                setUpdatingStaffId(null);
                              }}
                              disabled={updatingStaffId === staffMember.id}
                            />
                          }
                          label={
                            staffMember.status ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 15, 25]}
                component="span"
                count={staff.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />

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
                <DialogTitle id="alert-dialog-title">{"Confirm deletion"}</DialogTitle>
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
                  <div id="alert-dialog-slide-description">
                    {selectedStaff && (
                      <StaffOverview selectedStaff={selectedStaff} handleDeletePhoto={handleDeletePhoto} />
                    )}
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCard}>close</Button>
                </DialogActions>
              </Dialog>
            </TableContainer>
          ) : (
            <Grid container spacing={2}>
              {staff.map((staffMember) => (
                <Grid item xs={12} sm={6} md={3} key={staffMember.id}>
                  <StaffCard staff={staffMember} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </>
  );
}
