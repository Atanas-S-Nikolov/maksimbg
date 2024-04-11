import { SignJWT, jwtVerify } from "jose";

const algorithm = process.env.JWT_ALGORITHM;
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export function encodeJWT(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime("5 sec from now")
    .sign(secret);
}

export async function decodeJWT(token) {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: [algorithm],
  });
  return payload;
}
