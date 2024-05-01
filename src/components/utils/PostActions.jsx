import { styled } from "@mui/material";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useMediaQuery } from "@react-hookz/web";
import PostFormDialog from "../blog/PostFormDialog";
import { EDIT_ACTION } from "@/constants/ActionConstants";

const StyledSpeedDial = styled(SpeedDial)({
  position: "absolute",
  right: "1rem",
  top: "8rem",
});

const StyledBackdrop = styled(Backdrop)({
  zIndex: 2,
});

export default function PostActions({ post }) {
  const [open, setOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const sm = useMediaQuery("(max-width: 770px)", {
    initializeWithValue: false,
  });
  const size = sm ? "small" : "medium";

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleUpdateDialogClose() {
    setUpdateDialogOpen(false);
  }

  function handleClick(event, actionClick) {
    event.preventDefault();
    actionClick();
    handleClose();
  }

  function handleEditClick() {
    setUpdateDialogOpen(true);
  }

  const actions = [
    { icon: <EditIcon />, text: "Промени", onClick: handleEditClick },
    { icon: <DeleteIcon />, text: "Изтрий", color: "error", onClick: () => {} },
  ];

  return (
    <>
      <StyledSpeedDial
        ariaLabel="Post actions SpeedDial"
        icon={<MoreVertIcon />}
        direction="down"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        FabProps={{
          size,
        }}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={index}
            icon={action.icon}
            tooltipTitle={action.text}
            color="error"
            tooltipOpen={sm}
            onClick={(event) => handleClick(event, action.onClick)}
          />
        ))}
      </StyledSpeedDial>
      <StyledBackdrop open={open && sm} />
      {updateDialogOpen ? (
        <PostFormDialog
          open={updateDialogOpen}
          action={EDIT_ACTION}
          post={post}
          onClose={handleUpdateDialogClose}
        />
      ) : null}
    </>
  );
}
