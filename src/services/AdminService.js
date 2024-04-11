import { LOGIN_URL, LOGOUT_URL, REGISTER_URL } from "@/constants/URLConstants";
import { backendRequest } from "@/lib/backend";
import { executeAuthenticatedRequest } from "@/utils/ApiUtils";

export async function register(admin) {
  const response = await axios.post(REGISTER_URL, JSON.stringify(admin));
  return await response.data;
}

export async function login(admin) {
  const response = await backendRequest.post(LOGIN_URL, JSON.stringify(admin));
  return response.data;
}

export async function logout() {
  const response = await executeAuthenticatedRequest(() => backendRequest.post(LOGOUT_URL, JSON.stringify({})));
  return response?.data;
}
