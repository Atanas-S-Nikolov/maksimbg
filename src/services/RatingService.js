import { RATINGS_URL } from "@/constants/URLConstants";
import { backendRequest } from "@/lib/backend";
import { createQueryString } from "@/utils/URLUtils";
import UnauthorizedHandler from "@/utils/UnauthorizedHandler";
import store from "@/lib/store/globalStore";

export async function createRating(rating) {
  const response = await backendRequest.post(
    RATINGS_URL,
    JSON.stringify(rating)
  );
  return response;
}

export async function getRatings(page, limit) {
  const pageQueryString = createQueryString("page", page);
  const pageLimitQueryString = createQueryString(
    "limit",
    limit,
    pageQueryString
  );
  const queryString = store.getState().authentication.isLoggedIn
    ? pageLimitQueryString
    : createQueryString("approved", true, pageLimitQueryString);
  const response = await backendRequest.get(`${RATINGS_URL}?${queryString}`);
  return response.data;
}

export async function getApprovedRatings() {
  const queryString = createQueryString("approved", true);
  const response = await backendRequest.get(`${RATINGS_URL}?${queryString}`);
  return response.data;
}

export function approveRating(url, rating) {
  rating.isApproved = true;
  return new UnauthorizedHandler(async () => {
    const response = await backendRequest.put(
      `${RATINGS_URL}/${url}`,
      JSON.stringify(rating)
    );
    return response.data;
  });
}

export function deleteRating(url) {
  return new UnauthorizedHandler(async () => {
    const response = await backendRequest.delete(`${RATINGS_URL}/${url}`);
    return response.data;
  });
}
