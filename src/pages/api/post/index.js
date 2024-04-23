import { GET, POST } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import Post from "@/models/Post";

export default async function handler(req, res) {
  const { method, body } = req;
  switch(method) {
    case POST:
      const existingPost = await executeDbCall(() => Post.findOne({ title: body.title }));
      console.log(existingPost)
      if (existingPost) {
        res.status(409).json({ message: "Поста вече съществува" });
      }
      res.status(201).json(await executeDbCall(() => Post.create(body)));
      break;
    case GET:
      res.status(200).json(await executeDbCall(() => Post.find({})));
      break;
  }
}
