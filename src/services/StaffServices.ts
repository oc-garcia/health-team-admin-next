import { db } from "@/firebase/firebase";
import { IStaff } from "@/interfaces/IStaff";
import axios from "axios";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";

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
  async updateStaffStatus(id: string, status: boolean) {
    try {
      await axios.patch(`/api/staff/${id}`, { status });
    } catch (error) {
      console.error(error);
    }
  },
};
