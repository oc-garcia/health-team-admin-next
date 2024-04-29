import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SearchInput from "./SearchInput/SearchInput";
import { useState } from "react";
import StaffForm from "./StaffForm/StaffForm";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ActionsBar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        padding: "10px 20px",
        display: "flex",
        alignItems: "center ",
        justifyContent: "space-between",
        gap: "1rem",
      }}>
      <Button variant="contained" onClick={handleOpen}>
        Add Staff
      </Button>
      <SearchInput />

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
            <p>Add New Staff</p>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <StaffForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
