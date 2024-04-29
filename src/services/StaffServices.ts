import { db } from "@/firebase/firebase";
import { IStaff } from "@/interfaces/IStaff";
import axios from "axios";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";

export const StaffServices = {
  async createStaff(staff: IStaff) {
    try {
      const response = await axios.post("/api/staff", staff);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getStaff(setStaff: React.Dispatch<React.SetStateAction<IStaff[]>>) {
    const staffRef = collection(db, "staff");

    onSnapshot(staffRef, (snapshot) => {
      const staffData: IStaff[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        staffData.push({ id: doc.id, ...data } as IStaff);
      });
      setStaff(staffData);
    });
  },
  async checkCpf(cpf: number) {
    const q = query(collection(db, "staff"), where("personalInformation.cpf", "==", cpf));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { exists: true };
    } else {
      return { exists: false };
    }
  },
  async updateStaff(staff: IStaff) {
    try {
      const response = await axios.patch(`/api/staff/${staff.id}`, staff);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async deleteStaff(id: string) {
    try {
      const response = await axios.delete(`/api/staff/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
