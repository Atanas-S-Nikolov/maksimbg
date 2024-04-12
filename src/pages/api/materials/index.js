import { GET, PUT } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import University from "@/models/University";

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case GET:
      res.status(200).json(await executeDbCall(() => University.find({})));
      break;
    case PUT:
      const response = await executeDbCall(() =>
        University.findOneAndUpdate(
          { universityName: body.universityName },
          body
        )
      );
      res.status(200).json(response);
      break;
  }
}
