import React from "react";
import { Typography, IconButton, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { IStaff } from "@/interfaces/IStaff";

interface StaffOverviewProps {
  selectedStaff: IStaff;
  handleDeletePhoto: (staff: IStaff, index: number) => void;
}

const StaffOverview: React.FC<StaffOverviewProps> = ({ selectedStaff, handleDeletePhoto }) => {
  return (
    <div>
      <Typography variant="h6">Personal Information</Typography>
      <Typography>Name: {selectedStaff.personalInformation.name}</Typography>
      <Typography>Email: {selectedStaff.personalInformation.email}</Typography>
      <Typography>CPF: {selectedStaff.personalInformation.cpf}</Typography>
      <Typography>RG: {selectedStaff.personalInformation.rg}</Typography>
      <Typography>Birth Date: {selectedStaff.personalInformation.birthDate}</Typography>
      <Typography>Phone: {selectedStaff.personalInformation.phone}</Typography>
      <Typography>
        Address: {selectedStaff.personalInformation.address.street}, {selectedStaff.personalInformation.address.number},{" "}
        {selectedStaff.personalInformation.address.city}, {selectedStaff.personalInformation.address.state},{" "}
        {selectedStaff.personalInformation.address.zipCode}
      </Typography>
      <Typography sx={{ marginTop: "1rem" }} variant="h6">
        Professional Information
      </Typography>
      <Typography>Specialty: {selectedStaff.professionalInformation.specialty}</Typography>
      <Typography>CRM: {selectedStaff.professionalInformation.crm}</Typography>
      <Typography>CFM: {selectedStaff.professionalInformation.cfm}</Typography>
      <Typography>Service Area Radius (km): {selectedStaff.professionalInformation.serviceArea}</Typography>
      <Typography>Appointment Type: {selectedStaff.professionalInformation.appointmentType}</Typography>
      <Typography>Hour Consultation Price: {selectedStaff.professionalInformation.hourConsultationPrice}</Typography>
      <Typography sx={{ marginTop: "1rem" }} variant="h6">
        Status {selectedStaff.status ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
      </Typography>
      <Typography sx={{ marginTop: "1rem" }} variant="h6">
        Photos
      </Typography>
      <div className="flex items-center gap-2">
        {selectedStaff.professionalInformation.photos.length > 0 ? (
          selectedStaff.professionalInformation.photos.map((photo, index) => (
            <div key={index} style={{ position: "relative", display: "inline-block" }}>
              <img src={photo} alt="Staff" style={{ width: "100px", height: "100px" }} />
              <IconButton
                size="small"
                color="error"
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => handleDeletePhoto(selectedStaff, index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))
        ) : (
          <Typography>No photos registered</Typography>
        )}
      </div>
    </div>
  );
};

export default StaffOverview;
