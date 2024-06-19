import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import { MALE } from "@/constants/GenderConstants";
import manAvatar from "@/assets/ratings/man-avatar.jpg";
import womanAvatar from "@/assets/ratings/woman-avatar.jpg";
import styled from "@emotion/styled";

const StyledCard = styled(Card)({
  flex: 1,
  minWidth: "210px",
});

const StyledCardMedia = styled(CardMedia)({
  width: "150px",
  margin: "0 auto",
});

export default function RatingCard(props) {
  const { rating, ...cardProps } = props;
  const { name, gender, text, grade } = rating;
  const imageSrc = gender === MALE ? manAvatar.src : womanAvatar.src;

  return (
    <StyledCard {...cardProps}>
      <StyledCardMedia component="img" image={imageSrc} alt={"Avatar"} />
      <CardContent>
        <Typography
          variant="h6"
          color="secondary"
          marginBottom="1em"
          lineHeight="1.125em"
        >
          {name}
        </Typography>
        <Typography paragraph>{text}</Typography>
        <Rating value={grade} readOnly />
      </CardContent>
    </StyledCard>
  );
}
