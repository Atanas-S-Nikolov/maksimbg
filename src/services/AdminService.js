import { LOGIN_URL, LOGOUT_URL, REGISTER_URL } from "@/constants/URLConstants";
import { backendRequest } from "@/lib/backend";

export async function register(admin) {
  const response = await backendRequest.post(
    REGISTER_URL,
    JSON.stringify(admin)
  );
  return response.data;
}

export async function login(admin) {
  const response = await backendRequest.post(LOGIN_URL, JSON.stringify(admin));
  return response.data;
}

export async function logout() {
  const response = await backendRequest.post(LOGOUT_URL, JSON.stringify({}));
  return response.data;
}
