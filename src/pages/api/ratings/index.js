import { GET, POST } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import Rating from "@/models/Rating";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case POST:
      res.status(201).json(await executeDbCall(() => Rating.create(body)));
      break;
    case GET:
      res.status(200).json(await executeDbCall(() => Rating.find({})));
      break;
  }
}
