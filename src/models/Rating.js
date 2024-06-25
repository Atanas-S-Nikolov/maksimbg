import { Schema, model, models } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
  isApproved: {
    type: Boolean,
    required: [true, "Approved is required"],
  },
  url: {
    type: String,
    required: [true, "Status is required"],
    unique: [true, "Rating url should be unique"],
  },
});

RatingSchema.plugin(mongoosePaginate);
const Rating = models.Rating || model("Rating", RatingSchema);

export default Rating;
