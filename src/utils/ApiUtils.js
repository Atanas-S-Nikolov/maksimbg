import Router from "next/router";
import { SESSION_EXPIRED_ERROR_MESSAGE } from "@/constants/ErrorMessages";
import store from "@/lib/store/globalStore";
import { logoutReducer } from "@/lib/store/slices/authenticationSlice";

export async function handleUnauthorized(error) {
  const { status, data } = error.response;
  if (status === 401) {
    const { message } = data;
    if (message === SESSION_EXPIRED_ERROR_MESSAGE) {
      alert("Сесията ви изтече!");
      store.dispatch(logoutReducer());
      Router.push("/admin/login");
    }
  }
}
