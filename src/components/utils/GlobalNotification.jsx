import { useDispatch, useSelector } from "react-redux";

import SnackbarAlert from "./SnackbarAlert";

import Button from "@mui/material/Button";
import { logoutReducer } from "@/lib/store/slices/authenticationSlice";
import { useRouter } from "next/router";
import { hideNotification } from "@/lib/store/slices/notificationSlice";
import { ERROR_SEVERITY } from "@/constants/SeverityConstants";

export default function GlobalNotification() {
  const { message, isVisible } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleClick(event) {
    event.preventDefault();
    dispatch(logoutReducer());
    dispatch(hideNotification());
    router.push("/admin/login");
  }

  return (
    <SnackbarAlert
      open={isVisible}
      message={message}
      severity={ERROR_SEVERITY}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      alertAction={
        <Button color="inherit" size="small" onClick={handleClick}>
          OK
        </Button>
      }
      sx={{ mt: "6em" }}
    />
  );
}
