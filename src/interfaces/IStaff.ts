interface IStaff {
  personalInformation: IPersonalInformation;
  professionalInformation: IProfessionalInformation;
  status: boolean;
}

interface IPersonalInformation {
  name: string;
  cpf: number;
  rg: number;
  birthDate: Date;
  email: string;
  phone: number;
  address: IAddress;
}

interface IProfessionalInformation {
  crm: number;
  cfm: number;
  specialty: string;
  hourConsultationPrice: number;
  serviceArea: string;
  appointmentType: string;
  photos: string[];
}

interface IAddress {
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: number;
}

export type { IStaff, IPersonalInformation, IProfessionalInformation, IAddress };

const staffData: IStaff[] = [
  {
    personalInformation: {
      name: "Alice Brown",
      cpf: 12345678901,
      rg: 12345678,
      birthDate: new Date(1975, 6, 15),
      email: "alice.brown@hospital.com",
      phone: 2198765432,
      address: {
        street: "Avenida Paulista",
        number: 1000,
        neighborhood: "Jardins",
        city: "São Paulo",
        state: "SP",
        zipCode: 9876543,
      },
    },
    professionalInformation: {
      crm: 654321,
      cfm: 987654,
      specialty: "Dermatologia",
      hourConsultationPrice: 350.0,
      serviceArea: "São Paulo",
      appointmentType: "presencial,online",
      photos: ["https://example.com/staff/alice_brown_1.jpg", "https://example.com/staff/alice_brown_2.jpg"],
    },
    status: true,
  },
  {
    personalInformation: {
      name: "Michael Jones",
      cpf: 98765432100,
      rg: 98765432,
      birthDate: new Date(1982, 10, 23),
      email: "michael.jones@clinic.com",
      phone: 4199876543,
      address: {
        street: "Rua das Flores",
        number: 200,
        neighborhood: "Centro",
        city: "Curitiba",
        state: "PR",
        zipCode: 87654321,
      },
    },
    professionalInformation: {
      crm: 123456,
      cfm: 789012,
      specialty: "Cardiologia",
      hourConsultationPrice: 200.0,
      serviceArea: "Curitiba",
      appointmentType: "presencial",
      photos: ["https://example.com/staff/michael_jones_1.jpg"],
    },
    status: true,
  },
  {
    personalInformation: {
      name: "Maria Garcia",
      cpf: 32,
      rg: 98765,
      birthDate: new Date(1968, 2, 5),
      email: "maria.garcia@hospital.com",
      phone: 8596321574,
      address: {
        street: "Avenida Beira Mar",
        number: 350,
        neighborhood: "Praia de Iracema",
        city: "Fortaleza",
        state: "CE",
        zipCode: 54321009,
      },
    },
    professionalInformation: {
      crm: 741235,
      cfm: 569874,
      specialty: "Otorrinolaringologia",
      hourConsultationPrice: 250.0,
      serviceArea: "Fortaleza",
      appointmentType: "online",
      photos: ["https://example.com/staff/michael_jones_1.jpg"],
    },
    status: true,
  },
];
