import styles from "@/styles/components/utils/AuthForm.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { validateEmail } from "@/validation/EmailValidator";
import { validatePassword } from "@/validation/PasswordValidator";
import SnackbarAlert from "./SnackbarAlert";
import { ERROR_SEVERITY, SUCCESS_SEVERITY } from "@/constants/SeverityConstants";

export default function AuthForm({ action }) {
  const { label, onClick } = action;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState(SUCCESS_SEVERITY);
  const router = useRouter();

  useEffect(() => {
    const hasNoErrors = !emailError && !passwordError;
    const hasInput = email && password;
    if (hasInput && hasNoErrors) {
      setButtonDisabled(false)
    }
  }, [emailError, passwordError, email, password])

  function handleSnackbarOpen() {
    setSnackbarOpen(true);
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleClickShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  function handleEmailChange(event) {
    const { value } = event.target;
    const message = validateEmail(value);
    if (message) {
      setEmailError(message);
      setButtonDisabled(true);
      return;
    }
    setEmail(value);
    setEmailError(undefined);
  }

  function handlePasswordChange(event) {
    const { value } = event.target;
    const message = validatePassword(value);
    if (message) {
      setPasswordError(message);
      setButtonDisabled(true);
      return;
    }
    setPasswordError(undefined);
    setPassword(value);
  }

  async function handleAction() {
    const { status, message } = await onClick(email, password);
    if (status === 200 || status === 201) {
      router.push("/");
      return;
    }
    setSnackbarMessage(message);
    setSnackbarSeverity(status > 201 ? ERROR_SEVERITY : SUCCESS_SEVERITY);
    handleSnackbarOpen();
  }

  return (
    <>
      <Typography
        className={styles.heading}
        variant="h4"
        color="text.secondary"
      >
        {label} в maksim.bg
      </Typography>
      <section className={styles.auth_form}>
        <TextField
          label="Имейл"
          placeholder="Въведи имейл"
          required
          error={!!emailError}
          helperText={emailError || ""}
          onChange={handleEmailChange}
        />
        <TextField
          label="Парола"
          placeholder="Въведи парола"
          type={showPassword ? "text" : "password"}
          required
          error={!!passwordError}
          helperText={passwordError || ""}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <Button
          className={styles.action_btn}
          variant="contained"
          size="large"
          disabled={buttonDisabled}
          onClick={handleAction}
        >
          {label}
        </Button>
      </section>
      <SnackbarAlert
        open={snackbarOpen}
        autoHideDuration={5000}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </>
  );
}
