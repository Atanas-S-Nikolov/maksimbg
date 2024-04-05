import { AUTHORIZATION_HEADER, BEARER } from "@/constants/AuthConstants";
import { PROTECTED_URLS } from "@/constants/URLConstants";

export default async function handler(req, res) {
  const { headers, nextUrl } = req;
  const authorizationHeader = headers.get(AUTHORIZATION_HEADER);
  if (PROTECTED_URLS.includes(nextUrl.pathname) && authorizationHeader.startsWith(BEARER)) {
    const accessToken = authorizationHeader.substring(BEARER.length);
    try {
      await decodeJWT(accessToken);
      res.status(200).json({ expired: false });
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_JWT_EXPIRED") {
        res.status(401).json({ expired: true, message: "Session is expired" });
        return;
      }
      console.log("Failed to verify JWT", error);
      res.status(500).json({ message: "Internal server errror" });
    }
  }
}
