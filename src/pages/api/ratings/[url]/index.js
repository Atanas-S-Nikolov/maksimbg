import { DELETE, PUT } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import Rating from "@/models/Rating";

export default async function handler(req, res) {
  const { method, body, query } = req;
  const filterQuery = { url: query.url };

  switch (method) {
    case PUT:
      res
        .status(200)
        .json(
          await executeDbCall(() => Rating.findOneAndUpdate(filterQuery, body))
        );
      break;
    case DELETE:
      res
        .status(200)
        .json(await executeDbCall(() => Rating.deleteOne(filterQuery)));
      break;
  }
}
