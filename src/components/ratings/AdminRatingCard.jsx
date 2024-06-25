import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";

import { MALE } from "@/constants/GenderConstants";
import manAvatar from "@/assets/ratings/man-avatar.jpg";
import womanAvatar from "@/assets/ratings/woman-avatar.jpg";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { approveRating, deleteRating } from "@/services/RatingService";
import { useState } from "react";

const StyledCardMedia = styled(CardMedia)({
  maxWidth: "150px",
  margin: "0 auto",
});

const StyledCardContent = styled(CardContent)({
  display: "grid",
  placeItems: "center",
  textAlign: "center",
});

const StyledChip = styled(Chip)(({ theme }) => ({
  marginTop: "1em",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

const StyledCardActions = styled(CardActions)({
  justifyContent: "space-around",
  "@media (max-width: 375px)": {
    flexDirection: "column",
    "& .delete_button": {
      margin: "1.25em 0 0 0",
    },
  },
});

export default function AdminRatingCard(props) {
  const { rating, ratingsCount = 1, onRatingsUpdate, ...cardProps } = props;
  const { name, gender, text, grade, url, isApproved } = rating;
  const imageSrc = gender === MALE ? manAvatar.src : womanAvatar.src;
  const isMobile = useMediaQuery("(max-width: 320px)", {
    defaultMatches: false,
  });
  const ratingSize = isMobile ? "small" : "medium";
  const paragraphMarginBottom = isMobile ? ".5em" : "1em";
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const [dialogOpen, setDialogOpen] = useState(false);

  const StyledCard = styled(Card)({
    width: ratingsCount > 1 ? "calc(33% - 1rem)" : "auto",
    "@media (max-width: 1200px)": {
      width: "auto",
      maxWidth: "400px",
    },
  });

  function handleDialogClose(event) {
    event.preventDefault();
    setDialogOpen(false);
  }

  function handleDeleteButtonClick(event) {
    event.preventDefault();
    setDialogOpen(true);
  }

  async function handleApproveButtonClick(event) {
    event.preventDefault();
    const ratingObj = {
      name,
      gender,
      text,
      grade,
      url,
      isApproved,
    };
    await approveRating(url, ratingObj)
      .withFinallyHandler(() => onRatingsUpdate())
      .execute();
  }

  async function handleDelete(event) {
    event.preventDefault();
    await deleteRating(url)
      .withFinallyHandler(async () => {
        await onRatingsUpdate();
        handleDialogClose(event);
      })
      .execute();
  }

  return (
    <StyledCard {...cardProps}>
      <StyledCardMedia component="img" image={imageSrc} alt={"Avatar"} />
      <StyledCardContent>
        <Typography
          variant="h6"
          color="secondary"
          marginBottom="1em"
          lineHeight="1.125em"
          fontWeight="bold"
        >
          {name}
        </Typography>
        <Typography marginBottom={paragraphMarginBottom} paragraph>
          {text}
        </Typography>
        <Rating value={grade} size={ratingSize} readOnly />
        {isLoggedIn && isApproved ? <StyledChip label="Одобрен" /> : null}
      </StyledCardContent>
      {isLoggedIn ? (
        <StyledCardActions>
          <Button
            variant="outlined"
            color="secondary"
            disabled={isApproved}
            startIcon={<TaskAltIcon />}
            onClick={handleApproveButtonClick}
          >
            Одобри
          </Button>
          <Button
            className="delete_button"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteButtonClick}
          >
            Изтрий
          </Button>
        </StyledCardActions>
      ) : null}
      <Dialog open={dialogOpen}>
        <DialogTitle>Изтриване на отзив</DialogTitle>
        <DialogContent>
          <Typography>Сигурни ли сте, че искате да изтриете отзива?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Не, запази отзива</Button>
          <Button color="error" onClick={handleDelete}>
            Да, изтрий отзива
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
}
