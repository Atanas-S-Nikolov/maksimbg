import { GET, POST } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import Post from "@/models/Post";

export default async function handler(req, res) {
  const { method, body, query } = req;
  const { url } = query;
  const filterQuery = { url: url };
  switch (method) {
    case POST:
      const existingPost = await executeDbCall(() => Post.findOne(filterQuery));
      if (existingPost) {
        res.status(404).json({ message: "Post already exists" });
      }
      res.status(201).json(await executeDbCall(() => Post.create(body)));
      break;
    case GET:
      res
        .status(200)
        .json(await executeDbCall(() => Post.findOne(filterQuery)));
      break;
    case PUT:
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
