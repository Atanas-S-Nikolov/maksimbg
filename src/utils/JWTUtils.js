import { SignJWT, jwtVerify } from "jose";

const algotithm = process.env.JWT_ALGORITHM;
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export function encodeJWT(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: algotithm })
    .setIssuedAt()
    .setExpirationTime("5 min from now")
    .sign(secret);
}

export async function decodeJWT(token) {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: [algotithm],
  });
  return payload;
}
