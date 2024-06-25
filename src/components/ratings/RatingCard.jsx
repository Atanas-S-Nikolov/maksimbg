import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import { MALE } from "@/constants/GenderConstants";
import manAvatar from "@/assets/ratings/man-avatar.jpg";
import womanAvatar from "@/assets/ratings/woman-avatar.jpg";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";

const StyledCard = styled(Card)({
  flex: 1,
  minWidth: "210px",
  "@media (max-width: 290px)": {
    minWidth: "auto",
  },
});

const StyledCardMedia = styled(CardMedia)({
  maxWidth: "150px",
  margin: "0 auto",
});

const StyledCardContent = styled(CardContent)({
  textAlign: "center",
});

export default function RatingCard(props) {
  const { rating, ...cardProps } = props;
  const { name, gender, text, grade } = rating;
  const imageSrc = gender === MALE ? manAvatar.src : womanAvatar.src;
  const isMobile = useMediaQuery("(max-width: 320px)", {
    defaultMatches: false,
  });
  const ratingSize = isMobile ? "small" : "medium";
  const paragraphMarginBottom = isMobile ? ".5em" : "1em";

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
      </StyledCardContent>
    </StyledCard>
  );
}
