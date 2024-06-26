import styled from "@emotion/styled";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import SubHeading from "../utils/SubHeading";
import RatingsList from "./RatingsList";
import RatingForm from "./RatingForm";
import { INFO_SEVERITY } from "@/constants/SeverityConstants";
import { useEffect, useState } from "react";
import { getApprovedRatings } from "@/services/RatingService";
import StyledLink from "../styled/StyledLink";

const StyledSection = styled("section")({
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  margin: "1em 0",
  maxWidth: "692px",
  overflow: "hidden",
  "@media (max-width: 900px)": {
    width: "fit-content",
  },
});

const StyledSubHeading = styled(SubHeading)({
  "@media (max-width: 550px)": {
    fontSize: "small",
  },
});

const StyledAlert = styled(Alert)(({ theme }) => ({
  width: "fit-content",
  color: theme.palette.secondary.main,
  "@media (max-width: 425px)": {
    display: "inherit",
    placeItems: "center",
  },
}));

export default function RatingsSection() {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRatings() {
      const fetchedRatings = await getApprovedRatings();
      setRatings(fetchedRatings.docs);
      setIsLoading(false);
    }
    fetchRatings();
  }, []);

  const hasRatings = ratings.length > 0;

  function renderRatings() {
    if (isLoading) {
      return <CircularProgress color="secondary" />;
    }

    if (hasRatings) {
      return <RatingsList ratings={ratings} />;
    }

    return (
      <StyledAlert severity={INFO_SEVERITY} color="secondary">
        <AlertTitle>
          <Typography fontWeight="bold">Все още няма отзиви!</Typography>
        </AlertTitle>
        Бъди първият, който ще даде своя отзив.
      </StyledAlert>
    );
  }

  return (
    <>
      <StyledSubHeading>
        Вижте отзиви от бивши кандидат - студенти минали през моите уроци.
      </StyledSubHeading>
      <StyledSection>{renderRatings()}</StyledSection>
      {hasRatings ? (
        <StyledLink href="/ratings?page=1">Вижте всички отзиви</StyledLink>
      ) : null}
      <RatingForm />
    </>
  );
}
