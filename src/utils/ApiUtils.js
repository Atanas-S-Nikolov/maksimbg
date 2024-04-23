import Router from "next/router";
import { INTERNAL_SERVER_ERROR_MESSAGE, SESSION_EXPIRED_ERROR_MESSAGE } from "@/constants/ErrorMessages";
import store from "@/lib/store/globalStore";
import { logoutReducer } from "@/lib/store/slices/authenticationSlice";

export async function executeAuthenticatedRequest(promiseCallback) {
  try {
    return await promiseCallback();
  } catch(error) {
    const { status, data } = error.response;
    if (status === 401 || status === 500) {
      const { message } = data;
      // TODO: Handle 500 response better
      if (message === SESSION_EXPIRED_ERROR_MESSAGE || message === INTERNAL_SERVER_ERROR_MESSAGE) {
        alert("Сесията ви изтече!");
        store.dispatch(logoutReducer());
        Router.push("/admin/login");
      }
      return;
    }
    throw error;
  }
}
