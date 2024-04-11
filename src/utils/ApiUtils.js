import Router from "next/router";
import { INTERNAL_SERVER_ERROR_MESSAGE, SESSION_EXPIRED_ERROR_MESSAGE } from "@/constants/ErrorMessages";

export async function executeAuthenticatedRequest(promiseCallback) {
  try {
    return await promiseCallback();
  } catch(error) {
    const { status, data } = error.response;
    if (status === 401 || status === 500) {
      const { message } = data;
      if (message === SESSION_EXPIRED_ERROR_MESSAGE || message === INTERNAL_SERVER_ERROR_MESSAGE) {
        alert("Сисията ви изтече!");
        Router.push("/admin/login");
      }
    }
  }
}
