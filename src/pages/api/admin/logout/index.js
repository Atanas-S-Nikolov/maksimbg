import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants/AuthConstants";
import { POST } from "@/constants/RequestMethodConstants";
import { serialize } from "cookie";

export default async function handler(req, res) {
  const { method } = req;
  if (method === POST) {
    const authTokenCookie = serialize(ACCESS_TOKEN_COOKIE_NAME, "", { httpOnly: true, path: "/" });
    res.setHeader("Set-Cookie", authTokenCookie);
    res.status(200).json({ status: 200, message: "Logout successful" });
  }
}
