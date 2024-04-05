import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SUCCESS_SEVERITY } from "@/constants/SeverityConstants";

export default function SnackbarAlert(props) {
  const { severity = SUCCESS_SEVERITY, message, ...snackbarProps } = props;
  const { onClose } = snackbarProps;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      {...snackbarProps}
    >
      <Alert variant="filled" severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
