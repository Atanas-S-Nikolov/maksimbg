import { DELETE, GET, POST, PUT } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import University from "@/models/University";

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case POST:
      break;
    case GET:
      res.status(200).json(await executeDbCall(() => University.find({}), res));
      break;
    case PUT:
      const response = await executeDbCall(
        () =>
          University.findOneAndUpdate(
            { universityName: body.universityName },
            body
          ),
        res
      );
      res.status(200).json(response);
    case DELETE:
      break;
  }
}
