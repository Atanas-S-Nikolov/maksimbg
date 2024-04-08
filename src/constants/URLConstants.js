export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const MATERIALS_URL = "/api/materials";
export const ADMIN_URL = "/api/admin";
export const REGISTER_URL = ADMIN_URL + "/register";
export const LOGIN_URL = ADMIN_URL + "/login";
export const LOGOUT_URL = ADMIN_URL + "/logout";

export const PROTECTED_URLS = [
  LOGOUT_URL
];
