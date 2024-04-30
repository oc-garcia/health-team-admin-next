import React from "react";
import { Card, CardContent, Typography, Avatar, CardHeader } from "@mui/material";
import { IStaff } from "@/interfaces/IStaff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface StaffCardProps {
  staff: IStaff;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  const { personalInformation, professionalInformation, status } = staff;
  const avatarImage = professionalInformation.photos.length > 0 ? professionalInformation.photos[0] : "";

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <Avatar alt={personalInformation.name} src={avatarImage} />
          <span>{status ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</span>
        </div>
        <Typography sx={{ marginTop: "1rem" }} variant="h6">
          Personal Information
        </Typography>
        <Typography>Name: {personalInformation.name}</Typography>
        <Typography>CPF: {personalInformation.cpf}</Typography>
        <Typography>RG: {personalInformation.rg}</Typography>
        <Typography>Birth Date: {personalInformation.birthDate}</Typography>
        <Typography>Email: {personalInformation.email}</Typography>
        <Typography>Phone: {personalInformation.phone}</Typography>
        <Typography sx={{ marginTop: "1rem" }} variant="h6">
          Address
        </Typography>
        <Typography>Street: {personalInformation.address.street}</Typography>
        <Typography>Number: {personalInformation.address.number}</Typography>
        <Typography>Neighborhood: {personalInformation.address.neighborhood}</Typography>
        <Typography>City: {personalInformation.address.city}</Typography>
        <Typography>State: {personalInformation.address.state}</Typography>
        <Typography>Zip Code: {personalInformation.address.zipCode}</Typography>
        <Typography sx={{ marginTop: "1rem" }} variant="h6">
          Professional Information
        </Typography>
        <Typography>CRM: {professionalInformation.crm}</Typography>
        <Typography>CFM: {professionalInformation.cfm}</Typography>
        <Typography>Specialty: {professionalInformation.specialty}</Typography>
        <Typography>Hour Consultation Price: {professionalInformation.hourConsultationPrice}</Typography>
        <Typography>Service Area: {professionalInformation.serviceArea}</Typography>
        <Typography>Appointment Type: {professionalInformation.appointmentType}</Typography>
      </CardContent>
    </Card>
  );
};

export default StaffCard;
