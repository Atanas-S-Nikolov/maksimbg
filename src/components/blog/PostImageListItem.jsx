import Image from "next/image";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import StyledCloseIconButton from "../styled/StyledCloseIconButton";
import StyledRadio from "../styled/StyledRadio";

export default function PostImageListItem(props) {
  const {
    index,
    selectedValue,
    radioChange,
    onClick,
    ...imageProps
  } = props;

  return (
    <ImageListItem>
      <StyledCloseIconButton onClick={onClick} title="Изтрий снимката" />
      <Image alt="Снимка на поста" width={200} height={200} {...imageProps} />
      <ImageListItemBar
        title="Избери основна снимка"
        position="bottom"
        actionIcon={
          <StyledRadio
            value={index}
            checked={selectedValue === index}
            onChange={radioChange}
          />
        }
      />
    </ImageListItem>
  );
}
