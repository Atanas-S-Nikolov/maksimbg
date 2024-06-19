import Box from "@mui/material/Box";

import RatingCard from "./RatingCard";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";

const ANIMATED_BOX_GAP = "1rem";
const MEDIA_QUERY = "(max-width: 900px)";

const StyledBox = styled(Box)({
  backgroundColor: "rgb(250,250,250)",
  padding: "1rem",
  borderRadius: "20px",
});

export default function RatingsList({ ratings }) {
  const isMobile = useMediaQuery(MEDIA_QUERY, {
    defaultMatches: false,
  });
  const animationReduced = useMediaQuery("(prefers-reduced-motion: reduce)", {
    defaultMatches: false,
  });
  const hasAriaHiddenRatings =
    ratings.length > 2 && !isMobile && !animationReduced;

  const AnimatedBox = styled(Box)({
    display: "flex",
    gap: ANIMATED_BOX_GAP,
    animation: hasAriaHiddenRatings ? "slide 10s linear infinite" : "none",
    "&:hover": {
      animationPlayState: "paused",
      cursor: "pointer",
    },
    "@keyframes slide": {
      to: {
        transform: `translate(calc(-100% - ${ANIMATED_BOX_GAP}))`,
      },
    },
    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  });

  return (
    <StyledBox>
      <AnimatedBox>
        {ratings.map((rating, index) => (
          <RatingCard key={index} rating={rating} />
        ))}
        {hasAriaHiddenRatings
          ? ratings.map((rating, index) => (
              <RatingCard key={index} rating={rating} aria-hidden={true} />
            ))
          : null}
      </AnimatedBox>
    </StyledBox>
  );
}
