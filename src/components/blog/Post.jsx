import styles from "@/styles/components/blog/Post.module.css";

import Typography from "@mui/material/Typography";

import Image from "next/image";

import PostActions from "../utils/PostActions";

import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "@/constants/DateConstants";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { getPost } from "@/services/BlogPostService";
import { useState } from "react";

export default function Post({ post }) {
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const [postState, setPostState] = useState(post);
  const { title, images, content, createdOn, updatedOn, url } = postState;
  const sortedImages = images.sort((image) => image.isMain);
  const laptopS = useMediaQuery("(max-width: 800px)", {
    defaultMatches: false,
  });
  const mobileL = useMediaQuery("(max-width: 450px)", {
    defaultMatches: false,
  });
  const laptopTitleVariant = laptopS ? "h4" : "h3";
  const titleVariant = mobileL ? "h5" : laptopTitleVariant;
  const textFontSize = laptopS ? ".9rem" : "1rem";
  const laptopImageHeight = laptopS ? 600 : 800;
  const imageHeight = mobileL ? 550 : laptopImageHeight;

  const DateTypography = (props) => (
    <Typography
      color="text.secondary"
      fontStyle="italic"
      fontSize={textFontSize}
      {...props}
    />
  );

  async function handlePostUpdate() {
    setPostState(await getPost(url));
  }

  return (
    <>
      {isLoggedIn ? <PostActions post={postState} onPostUpdate={handlePostUpdate}/> : null}
      <Typography variant={titleVariant} color="secondary" marginBottom="1em">
        {title}
      </Typography>
      <DateTypography>
        {dayjs(createdOn).format(DEFAULT_DATE_FORMAT)}, Максим Аспарухов
      </DateTypography>
      {updatedOn ? (
        <DateTypography>
          Обновено на&nbsp;
          {dayjs(updatedOn).format(DEFAULT_DATE_FORMAT)}
        </DateTypography>
      ) : null}
      <Carousel className={styles.carousel} animation="slide" autoPlay={false}>
        {sortedImages.map((image, index) => (
          <Image
            key={index}
            className={styles.image}
            src={image.url}
            alt={title}
            width={600}
            height={imageHeight}
            priority
          />
        ))}
      </Carousel>
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
