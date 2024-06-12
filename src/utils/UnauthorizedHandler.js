import Router from "next/router";
import store from "@/lib/store/globalStore";
import { logoutReducer } from "@/lib/store/slices/authenticationSlice";
import { SESSION_EXPIRED_ERROR_MESSAGE } from "@/constants/ErrorMessages";

export default class UnauthorizedHandler {
  constructor(requestHandler) {
    this.requestHandler = requestHandler;
    this.errorHandler = () => {};
    this.finallyHandler = () => {};
  }

  withErrorHandler(errorHandler) {
    this.errorHandler = errorHandler;
    return this;
  }

  withFinallyHandler(finallyHandler) {
    this.finallyHandler = finallyHandler;
    return this;
  }

  async execute() {
    try {
      return await this.requestHandler();
    } catch (error) {
      await Promise.resolve(this.errorHandler());
      handleUnauthorized(error);
    } finally {
      await Promise.resolve(this.finallyHandler());
    }
  }
}

async function handleUnauthorized(error) {
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
