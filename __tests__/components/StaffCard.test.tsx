import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StaffCard from "@/components/StaffCard";
import { IStaff } from "@/interfaces/IStaff";

test("renders StaffCard and checks content", () => {
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

  render(<StaffCard staff={mockStaff} />);

  const nameElement = screen.getByText(/John Doe/i);
  expect(nameElement).toBeInTheDocument();
});
