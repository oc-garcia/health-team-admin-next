interface IStaff {
  personalInformation: IPersonalInformation;
  professionalInformation: IProfessionalInformation;
  status: boolean;
  id: string;
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
