import styled from "@emotion/styled";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  color: "#fff",
  zIndex: theme.zIndex.drawer + 1,
}));

export default function StyledBackdropLoader({ open = false }) {
  return (
    <StyledBackdrop open={open}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
}
