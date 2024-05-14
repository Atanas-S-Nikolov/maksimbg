import styles from "@/styles/components/blog/Post.module.css";

import Typography from "@mui/material/Typography";

import Image from "next/image";

import PostActions from "../utils/PostActions";

import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "@/constants/DateConstants";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

export default function Post({ post }) {
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const { title, image, content, createdOn, updatedOn } = post;
  const laptopS = useMediaQuery("(max-width: 800px)", {
    defaultMatches: false,
  });
  const mobileL = useMediaQuery("(max-width: 450px)", {
    defaultMatches: false,
  });
  const laptopTitleVariant = laptopS ? "h4" : "h3";
  const titleVariant = mobileL ? "h5" : laptopTitleVariant;
  const textFontSize = laptopS ? ".9rem" : "1rem";
  const dateMarginTop = laptopS ? "1em" : "2em";
  const laptopImageWidth = laptopS ? 400 : 600;
  const laptopImageHeight = laptopS ? 600 : 800;
  const imageWidth = mobileL ? 250 : laptopImageWidth;
  const imageHeight = mobileL ? 450 : laptopImageHeight;

  const DateTypography = (props) => (
    <Typography
      fontSize={textFontSize}
      marginTop={dateMarginTop}
      fontStyle="italic"
      color="text.secondary"
      {...props}
    />
  );

  return (
    <>
      {isLoggedIn ? <PostActions post={post} /> : null}
      <Typography variant={titleVariant} color="secondary">
        {title}
      </Typography>
      <DateTypography>
        {dayjs(createdOn).format(DEFAULT_DATE_FORMAT)}, Максим Аспарухов
      </DateTypography>
      {updatedOn ? (
        <DateTypography>
          Обновен на&nbsp;
          {dayjs(updatedOn).format(DEFAULT_DATE_FORMAT)}
        </DateTypography>
      ) : null}
      <Image
        className={styles.image}
        src={image.url}
        alt={title}
        width={imageWidth}
        height={imageHeight}
        priority
      />
      <Typography
        color="text.secondary"
        lineHeight="1.75rem"
        fontSize={textFontSize}
        paragraph
      >
        {content}
      </Typography>
    </>
  );
}
