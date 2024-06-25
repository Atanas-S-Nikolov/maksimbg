import { GET, POST } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import Rating from "@/models/Rating";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case POST:
      res
        .status(201)
        .json(
          await executeDbCall(() =>
            Rating.create({
              ...body,
              isApproved: false,
              url: crypto.randomUUID(),
            })
          )
        );
      break;
    case GET:
      const { approved, page = 1, limit = 6 } = req.query;
      const parameters = approved ? { isApproved: approved } : {};
      const query = Rating.find(parameters);
      const ratings = await executeDbCall(() =>
        Rating.paginate(query, {
          page,
          limit,
        })
      );
      res.status(200).json(ratings);
      break;
  }
}
