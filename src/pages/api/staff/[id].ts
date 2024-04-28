import { NextApiRequest, NextApiResponse } from "next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { status } = req.body;

    try {
      const staffRef = doc(db, "staff", id as string);
      await updateDoc(staffRef, { status });

      res.status(200).json({ message: "Staff status updated successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
