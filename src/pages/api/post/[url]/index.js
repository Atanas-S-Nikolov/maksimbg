import { GET, PUT, DELETE } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import Post from "@/models/Post";

export default async function handler(req, res) {
  const { method, body, query } = req;
  const { url } = query;
  const filterQuery = { url: url };
  switch (method) {
    case GET:
      res
        .status(200)
        .json(await executeDbCall(() => Post.findOne(filterQuery)));
      break;
    case PUT:
      const existingPost = await executeDbCall(() => Post.findOne(filterQuery));
      if (!existingPost) {
        res.status(404).json({ message: "Post is not found" });
      }
      res
        .status(200)
        .json(
          await executeDbCall(() => Post.findOneAndUpdate(filterQuery, body))
        );
      break;
    case DELETE:
      res
        .status(200)
        .json(await executeDbCall(() => Post.deleteOne(filterQuery)));
      break;
  }
}
