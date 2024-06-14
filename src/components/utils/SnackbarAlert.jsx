import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SUCCESS_SEVERITY } from "@/constants/SeverityConstants";

export default function SnackbarAlert(props) {
  const {
    alertAction,
    alertVariant = "filled",
    severity = SUCCESS_SEVERITY,
    message,
    ...snackbarProps
  } = props;
  const { onClose } = snackbarProps;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      {...snackbarProps}
    >
      <Alert
        variant={alertVariant}
        severity={severity}
        onClose={onClose}
        action={alertAction}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
