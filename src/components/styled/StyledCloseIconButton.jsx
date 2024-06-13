import { styled } from '@mui/system';

import IconButton from "@mui/material/IconButton";

import CancelIcon from '@mui/icons-material/Cancel';

export default function StyledCloseIconButton(props) {
  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    right: 0,
    color: theme.palette.primary.dark,
  }));

  return (
    <StyledIconButton {...props}>
      <CancelIcon />
    </StyledIconButton>
  );
}
