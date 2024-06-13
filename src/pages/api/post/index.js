import { GET, POST } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import Post from "@/models/Post";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case POST:
      const existingPost = await executeDbCall(() =>
        Post.findOne({ title: body.title })
      );
      if (existingPost) {
        res.status(409).json({ message: "Поста вече съществува" });
      }
      body.createdOn = dayjs();
      res.status(201).json(await executeDbCall(() => Post.create(body)));
      break;
    case GET:
      const posts = await executeDbCall(() =>
        Post.find({})
          .sort({
            updatedOn: "desc",
            createdOn: "desc",
          })
          .exec()
      );
      res.status(200).json(posts);
      break;
  }
}
