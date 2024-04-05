export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const MATERIALS_URL = "/api/materials";
export const ADMIN_URL = "/api/admin";
export const REGISTER_URL = ADMIN_URL + "/register";
export const LOGIN_URL = ADMIN_URL + "/login";
export const LOGOUT_URL = ADMIN_URL + "/logout";
export const AUTH_STATUS_URL = ADMIN_URL + "/auth/status";

export const PROTECTED_URLS = [
  AUTH_STATUS_URL,
  LOGOUT_URL
];
