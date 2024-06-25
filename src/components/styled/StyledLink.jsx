import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const StyledTypography = styled(Typography)({
  textDecoration: "underline",
});

export default function StyledLink({
  children,
  typographyProps,
  ...linkProps
}) {
  return (
    <Link {...linkProps}>
      <StyledTypography {...typographyProps}>{children}</StyledTypography>
    </Link>
  );
}
