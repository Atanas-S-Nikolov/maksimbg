import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton"
import Tooltip from '@mui/material/Tooltip';

const StyledBottomIconButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  float: "right",
  bottom: "3%",
  right: "1%",
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary.dark,
  }
}));

export default function BottomIconButtonWithTooltip(props) {
  const {tooltipProps, ...iconButtonProps} = props;

  return (
    <Tooltip {...tooltipProps}>
      <StyledBottomIconButton color='primary' {...iconButtonProps}>
        {props.children}
      </StyledBottomIconButton>
    </Tooltip>
  );
}