import styles from "@/styles/components/blog/Post.module.css";

import Typography from "@mui/material/Typography";

import Image from "next/image";

import PostActions from "../utils/PostActions";

import { useMediaQuery } from "@react-hookz/web";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "@/constants/DateConstants";
import { useSelector } from "react-redux";

export default function Post({ post }) {
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const { title, image, content, createdOn, updatedOn } = post;
  const mobile = useMediaQuery("(max-width: 550px)", {
    initializeWithValue: false,
  });
  const titleVariant = mobile ? "h4" : "h3";
  const textFontSize = mobile ? ".9rem" : "1rem";
  const dateMarginTop = mobile ? "1em" : "2em";
  const imageWidth = mobile ? 400 : 600;
  const imageHeight = mobile ? 600 : 800;

  return (
    <>
      {isLoggedIn ? <PostActions post={post} /> : null}
      <Typography variant={titleVariant} color="secondary">
        {title}
      </Typography>
      <Typography fontSize={textFontSize} marginTop={dateMarginTop}>
        {dayjs(createdOn).format(DEFAULT_DATE_FORMAT)}, Максим Аспарухов
      </Typography>
      {updatedOn ? (
        <Typography fontSize={textFontSize} marginTop={dateMarginTop}>
          Обновен на&nbsp;
          {dayjs(updatedOn).format(DEFAULT_DATE_FORMAT)}
        </Typography>
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
