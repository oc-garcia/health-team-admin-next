import React from "react";
import { render, screen } from "@testing-library/react";
import StaffOverview from "@/components/StaffOverview";
import { IStaff } from "@/interfaces/IStaff";

const mockStaff: IStaff = {
  personalInformation: {
    name: "John Doe",
    cpf: 37030808843,
    rg: 309846560,
    birthDate: "1990-01-01",
    email: "john.doe@example.com",
    phone: 11977636323,
    address: {
      street: "123 Main St",
      number: 426,
      neighborhood: "Downtown",
      city: "City",
      state: "State",
      zipCode: 4531000,
    },
  },
  professionalInformation: {
    photos: ["http://example.com/photo.jpg"],
    crm: 123456,
    cfm: 123456,
    specialty: "Specialty",
    hourConsultationPrice: 100,
    serviceArea: 1,
    appointmentType: "Appointment Type",
  },
  status: true,
};

describe("StaffOverview", () => {
  it("renders without crashing", () => {
    render(<StaffOverview selectedStaff={mockStaff} handleDeletePhoto={() => {}} />);
    expect(screen.getByText("Personal Information")).toBeInTheDocument();
  });

  it("displays the correct personal information", () => {
    render(<StaffOverview selectedStaff={mockStaff} handleDeletePhoto={() => {}} />);
    expect(screen.getByText(`Name: ${mockStaff.personalInformation.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${mockStaff.personalInformation.email}`)).toBeInTheDocument();
    // Add more assertions for the rest of the personal information
  });

  it("displays the correct professional information", () => {
    render(<StaffOverview selectedStaff={mockStaff} handleDeletePhoto={() => {}} />);
    expect(screen.getByText(`Specialty: ${mockStaff.professionalInformation.specialty}`)).toBeInTheDocument();
    expect(screen.getByText(`CRM: ${mockStaff.professionalInformation.crm}`)).toBeInTheDocument();
    // Add more assertions for the rest of the professional information
  });

  it("displays the correct status", () => {
    render(<StaffOverview selectedStaff={mockStaff} handleDeletePhoto={() => {}} />);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
