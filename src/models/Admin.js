import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
  email: {
    type: String,
    unique: [true, "User already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;
