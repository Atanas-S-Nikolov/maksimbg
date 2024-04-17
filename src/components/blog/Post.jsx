import styles from "@/styles/components/blog/Post.module.css";

import Typography from "@mui/material/Typography";

import Image from "next/image";

import { useMediaQuery } from "@react-hookz/web";

export default function Post({ post }) {
  const { title, image, content, date } = post;
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
      <Typography variant={titleVariant} color="secondary">
        {title}
      </Typography>
      <Typography
        fontSize={textFontSize}
        marginTop={dateMarginTop}
      >
        {date}
      </Typography>
      <Image
        className={styles.image}
        src={image.src}
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
