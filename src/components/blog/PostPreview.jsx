import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Link from "next/link";

import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "@/constants/DateConstants";

const DEFAULT_ELEVATION = 3;

export default function PostPreview({ post }) {
  const { title, images, description, createdOn, updatedOn, url } = post;
  const mainImage = images.find((image) => image.isMain);
  const date = dayjs(updatedOn ? updatedOn : createdOn).format(
    DEFAULT_DATE_FORMAT
  );
  const [elevation, setElevation] = useState(DEFAULT_ELEVATION);
  const mobileL = useMediaQuery("(max-width: 426px)", {
    defaultMatches: false,
  });
  const imageHeight = mobileL ? 500 : 600;
  const titleFontSize = mobileL ? 20 : 24;
  const descriptionFontSize = mobileL ? ".9rem" : "1rem";
  const dateFontSize = mobileL ? "small" : 14;

  function handleMouseEnter() {
    setElevation(10);
  }

  function handleMouseLeave() {
    setElevation(DEFAULT_ELEVATION);
  }

  return (
    <Link href={`/blog/post/${url}`}>
      <Card
        elevation={elevation}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          component="img"
          image={mainImage?.url || ""}
          height={imageHeight}
          alt={title}
        />
        <CardContent>
          <Typography variant="h6" fontSize={titleFontSize}>
            {title}
          </Typography>
          <Typography
            fontSize={descriptionFontSize}
            color="text.secondary"
            paragraph
          >
            {description}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontSize={dateFontSize}
          >
            {date}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
