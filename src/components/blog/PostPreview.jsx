import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Link from "next/link";

import { useState } from "react";
import { useMediaQuery } from "@react-hookz/web";

const DEFAULT_ELEVATION = 3;

export default function PostPreview({ post }) {
  const { title, image, description, date } = post;
  const [elevation, setElevation] = useState(DEFAULT_ELEVATION);
  const mobile = useMediaQuery("(max-width: 425px)", {
    initializeWithValue: false,
  });
  const titleVariant = mobile ? "h4" : "h3";
  const descriptionFontSize = mobile ? ".9rem" : "1rem";

  function handleMouseEnter() {
    setElevation(10);
  }

  function handleMouseLeave() {
    setElevation(DEFAULT_ELEVATION);
  }

  return (
    <Link href={`/blog/post/${title}`}>
      <Card
        elevation={elevation}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia component="img" image={image.src} height={600} alt={title} />
        <CardContent>
          <Typography variant={titleVariant}>{title}</Typography>
          <Typography fontSize={descriptionFontSize} paragraph>
            {description}
          </Typography>
          <Typography color="text.secondary">{date}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
