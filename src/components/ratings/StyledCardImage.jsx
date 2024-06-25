import { styled } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { memo } from "react";

const CustomCardMedia = styled(CardMedia)({
    maxWidth: "150px",
    margin: "0 auto",
  });
  

const StyledCardMedia = memo(function StyledCardMedia(props) {
    return (
        <CustomCardMedia {...props}/>
    )
});

export default StyledCardMedia
