import { Schema, model, models } from "mongoose";

const UniveritySchema = new Schema({
  universityName: {
    type: String,
    unique: [true, "University already exists"],
    required: [true, "University name is required"],
  },
  directory: {
    type: String,
    unique: [true, "University with this directory already exists"],
    required: [true, "University directory is required"],
  },
  materials: {
    type: Array,
  }
});

const University = models.University || model("University", UniveritySchema);

export default University;
