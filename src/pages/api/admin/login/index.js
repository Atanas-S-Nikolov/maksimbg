import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants/AuthConstants";
import { POST } from "@/constants/RequestMethodConstants";
import { executeDbCall } from "@/lib/database";
import Admin from "@/models/Admin";
import { encodeJWT } from "@/utils/JWTUtils";
import { serialize } from "cookie";

const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === POST) {
    const admin = await executeDbCall(() => Admin.findOne({ email: body.email }));
    if (admin) {
      const { email, password } = admin;
      const passwordMatch = bcrypt.compareSync(body.password, password);
      if (passwordMatch) {
        const jwt = await encodeJWT({ email });
        const authTokenCookie = serialize(ACCESS_TOKEN_COOKIE_NAME, jwt, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
        });
        res.setHeader("Set-Cookie", authTokenCookie);
        res.status(200).json({ status: 200, message: "Login successful" });
        return;
      } 
    }
    res.status(400).json({ status: 400, message: "Invalid credentials" });
  }
}
