import styled from "@emotion/styled";
import SubHeading from "../utils/SubHeading";
import RatingsList from "./RatingsList";

const StyledSection = styled("section")({
  textAlign: "center",
  marginTop: "1em",
  maxWidth: "692px",
  overflow: "hidden",
  "@media (max-width: 900px)": {
    width: "fit-content",
  },
});

export default function RatingsSection({ ratings }) {
  const hasRatings = ratings && ratings.length > 0;
  return (
    <>
      {hasRatings ? (
        <StyledSection>
          <SubHeading>
            Вижте отзиви от бивши кандидат - студенти минали през моите уроци.
          </SubHeading>
          <RatingsList ratings={ratings} />
        </StyledSection>
      ) : null}
    </>
  );
}
