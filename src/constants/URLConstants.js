export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const ADMIN_URL = "/api/admin";
export const REGISTER_URL = ADMIN_URL + "/register";
export const LOGIN_URL = ADMIN_URL + "/login";
export const LOGOUT_URL = ADMIN_URL + "/logout";
export const MATERIALS_URL = "/api/materials";
export const BLOG_POST_URL = "/api/post";
export const RATINGS_URL = "/api/ratings";
export const NOT_FOUND_PAGE_URL = "/not-found";

export const PROTECTED_URLS = [
  LOGOUT_URL
];

export const STORAGE_BLOG_IMAGES_DIRECTORY = "blog/images/";
