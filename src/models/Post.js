import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    unique: [true, "Post already exists"],
    required: [true, "Post title is required"],
  },
  images: {
    type: [],
    required: [true, "Post images are required"],
  },
  description: {
    type: String,
    required: [true, "Post description is required"],
  },
  content: {
    type: String,
    required: [true, "Post content is required"],
  },
  createdOn: {
    type: Date,
    required: [true, "Post createdOn date is required"],
  },
  updatedOn: {
    type: Date,
  },
  url: {
    type: String,
    unique: [true, "Post url param should be unique"],
    required: [true, "Post url param is required"],
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
