import { GET } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import Post from "@/models/Post";

export default async function handler(req, res) {
  const { method } = req;
  if (method === GET) {
    res.status(200).json(await executeDbCall(() => Post.find({})));
  }
}
