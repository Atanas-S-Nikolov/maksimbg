import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import SendIcon from "@mui/icons-material/Send";

import { FEMALE, MALE, inputValues } from "@/constants/GenderConstants";
import { useState } from "react";
import { blue, pink } from "@mui/material/colors";
import { styled } from "@mui/material";
import { isBlank } from "underscore.string";
import {
  GENDER_ERROR_MESSAGE,
  GRADE_ERROR_MESSAGE,
  NAME_ERROR_MESSAGE,
} from "@/constants/ErrorMessages";
import { createRating } from "@/services/RatingService";
import SnackbarAlert from "../utils/SnackbarAlert";

const DEFAULT_ERROR_OBJECT = { error: false, message: " " };
const DEFAULT_ERRORS = {
  name: DEFAULT_ERROR_OBJECT,
  text: DEFAULT_ERROR_OBJECT,
  gender: DEFAULT_ERROR_OBJECT,
  grade: DEFAULT_ERROR_OBJECT,
};
const DEFAULT_RATING = { name: "", text: "", gender: "", grade: 0 };

const errorMessages = {
  name: NAME_ERROR_MESSAGE,
  gender: GENDER_ERROR_MESSAGE,
  text: GRADE_ERROR_MESSAGE,
  grade: GRADE_ERROR_MESSAGE,
};

const selectItems = [
  {
    value: MALE,
    text: inputValues.get(MALE),
    icon: <MaleIcon sx={{ color: blue[500] }} />,
  },
  {
    value: FEMALE,
    text: inputValues.get(FEMALE),
    icon: <FemaleIcon sx={{ color: pink[500] }} />,
  },
];

const StyledSection = styled("section")({
  display: "grid",
  marginTop: "2rem",
  textAlign: "center",
});

const StyledFormControl = styled(FormControl)({
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  transform: "translateY(-1rem)",
});

const StyledInputLabel = styled(InputLabel)({
  right: 0,
});

const StyledButton = styled(Button)({
  width: "fit-content",
  margin: "0 auto",
});

const StyledSelect = styled(Select)({
  textAlign: "left",
});

const HiddenInput = styled(Input)({
  visibility: "hidden",
});

export default function RatingForm() {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  function handleNameChange(event) {
    event.preventDefault();
    const value = event.target.value;
    setRating({ ...rating, name: value });
  }

  function handleTextChange(event) {
    event.preventDefault();
    const value = event.target.value;
    setRating({ ...rating, text: value });
  }

  function handleGenderChange(event) {
    event.preventDefault();
    const value = event.target.value;
    setRating({ ...rating, gender: value });
  }

  function handleGradeChange(event, value) {
    event.preventDefault();
    setRating({ ...rating, grade: value });
  }

  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  function validateInput() {
    const errorsObject = {};
    let hasInputError = false;
    Object.keys(rating).forEach((property) => {
      const value = rating[property];
      const hasError = property === "grade" ? value < 1 : isBlank(value);
      let errObj = DEFAULT_ERROR_OBJECT;

      if (hasError) {
        errObj = { error: true, message: errorMessages[property] };
        hasInputError = true;
      }

      errorsObject[property] = errObj;
    });
    setErrors(errorsObject);
    return hasInputError;
  }

  async function handleClick(event) {
    event.preventDefault();
    if (!validateInput()) {
      const response = await createRating(rating);
      if (response.status === 201) {
        setIsSnackbarOpen(true);
        setRating(DEFAULT_RATING);
      }
    }
  }

  return (
    <StyledSection>
      <Typography variant="h5" color="secondary" marginBottom="1rem">
        Напишете отзив
      </Typography>
      <TextField
        id="name"
        label="Вашето име"
        value={rating.name}
        onChange={handleNameChange}
        error={errors.name.error}
        helperText={errors.name.message}
        required
      />
      <FormControl error={errors.gender.error} required>
        <InputLabel id="gender">Вашият пол</InputLabel>
        <StyledSelect
          id="gender"
          label="Вашият пол"
          value={rating.gender}
          renderValue={(value) => inputValues.get(value)}
          onChange={handleGenderChange}
        >
          {selectItems.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          ))}
        </StyledSelect>
        <FormHelperText>{errors.gender.message}</FormHelperText>
      </FormControl>
      <TextField
        id="text"
        label="Обобщение на оценката"
        value={rating.text}
        onChange={handleTextChange}
        error={errors.text.error}
        helperText={errors.text.message}
        required
        multiline
      />
      <StyledFormControl error={errors.grade.error} required>
        <StyledInputLabel id="grade">Вашата оценка:</StyledInputLabel>
        <HiddenInput name="grade" hidden />
        <Rating
          name="grade"
          value={rating.grade}
          onChange={handleGradeChange}
        />
        <FormHelperText>{errors.grade.message}</FormHelperText>
      </StyledFormControl>
      <StyledButton
        variant="contained"
        color="secondary"
        endIcon={<SendIcon />}
        onClick={handleClick}
      >
        Изпрати
      </StyledButton>
      <SnackbarAlert
        open={isSnackbarOpen}
        autoHideDuration={5000}
        message="Отзивът ви е изпратен!"
        onClose={handleSnackbarClose}
      />
    </StyledSection>
  );
}
