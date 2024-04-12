import { GET } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import University from "@/models/University";

export default async function handler(req, res) {
  const { method, query } = req;
  const { name } = query;
  if (method === GET) {
    res.status(200).json(await executeDbCall(() => University.find({ universityName: name })));    
  }
}
