import {
  AUTH_STATUS_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
} from "@/constants/URLConstants";
import { backendRequest } from "@/lib/backend";

export async function register(admin) {
  const response = await axios.post(REGISTER_URL, JSON.stringify(admin));
  return await response.data;
}

export async function login(admin) {
  const response = await backendRequest.post(LOGIN_URL, JSON.stringify(admin));
  return await response.data;
}

export async function logout() {
  const response = await backendRequest.post(LOGOUT_URL, JSON.stringify({}));
  return await response.data;
}

export async function getAuthStatus() {
  const response = await backendRequest.get(AUTH_STATUS_URL);
  return await response.data;
}
