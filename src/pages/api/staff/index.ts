import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const staffData = req.body;

    try {
      const staffRef = collection(db, "staff");
      const docRef = await addDoc(staffRef, staffData);

      res.status(200).json({ message: "Staff member created successfully", id: docRef.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
