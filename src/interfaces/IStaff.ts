interface IStaff {
  personalInformation: IPersonalInformation;
  professionalInformation: IProfessionalInformation;
  status: boolean;
  id?: string;
}

interface IPersonalInformation {
  name: string;
  cpf: number | undefined;
  rg: number | undefined;
  birthDate: string | undefined;
  email: string;
  phone: number | undefined;
  address: IAddress;
}

interface IProfessionalInformation {
  crm: number | undefined;
  cfm: number | undefined;
  specialty: string;
  hourConsultationPrice: number | undefined;
  serviceArea: number | undefined;
  appointmentType: string;
  photos: string[];
}

interface IAddress {
  street: string;
  number: number | undefined;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: number | undefined;
}

export type { IStaff, IPersonalInformation, IProfessionalInformation, IAddress };
