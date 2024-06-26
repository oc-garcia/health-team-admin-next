import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import StaffForm from "./StaffForm";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useActionBarContext } from "@/context/actionBarContext";

export default function ActionsBar() {
  const [open, setOpen] = useState(false);

  const { isTableView, handleSetIsTableView } = useActionBarContext();

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
      <div className="flex gap-2">
        <Button variant="contained" onClick={handleOpen}>
          Add Staff
        </Button>

      </div>

      <IconButton onClick={() => handleSetIsTableView(!isTableView)}>
        {isTableView ? <ViewListIcon /> : <ViewModuleIcon />}
      </IconButton>

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
