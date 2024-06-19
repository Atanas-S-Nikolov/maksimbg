import { Schema, model, models } from "mongoose";

const RatingSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  grade: {
    type: Number,
    required: [true, "Grade is required"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
  },
});

const Rating = models.RatingSchema || model("Rating", RatingSchema);

export default Rating;
