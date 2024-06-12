import { styled } from '@mui/system';

import Radio from "@mui/material/Radio";

export default function StyledRadio(props) {
  const StyledRadioButton = styled(Radio)(({ theme }) => ({
    color: "rgba(255, 255, 255, .5)",
    "&.MuiChecked": {
      color: theme.palette.primary.main
    }
  }));

  return (
    <StyledRadioButton {...props} />
  )
}
