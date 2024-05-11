import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function QuestionTypography(props) {
  const mobile = useMediaQuery("(max-width: 500px)", { defaultMatches: false });
  const fontSize = mobile ? "small" : "medium";
  return (
    <Typography fontSize={fontSize} {...props}>
      {props.children}
    </Typography>
  );
}
