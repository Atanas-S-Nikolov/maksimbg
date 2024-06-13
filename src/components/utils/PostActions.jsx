import { styled, useMediaQuery } from "@mui/material";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import PostFormDialog from "../blog/PostFormDialog";
import { EDIT_ACTION } from "@/constants/ActionConstants";
import { deletePost } from "@/services/BlogPostService";
import { useRouter } from "next/router";

const StyledSpeedDial = styled(SpeedDial)({
  position: "absolute",
  right: "1rem",
  top: "8rem",
});

const StyledBackdrop = styled(Backdrop)({
  zIndex: 2,
});

export default function PostActions({ post, onPostUpdate }) {
  const [open, setOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const sm = useMediaQuery("(max-width: 770px)", {
    defaultMatches: false,
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

  function handleDeleteDialogClose() {
    setDeleteDialogOpen(false);
  }

  function handleClick(event, actionClick) {
    event.preventDefault();
    actionClick();
    handleClose();
  }

  function handleEditClick() {
    setUpdateDialogOpen(true);
  }

  function handleDeleteClick() {
    setDeleteDialogOpen(true);
  }

  async function handleDeletePost(event) {
    event.preventDefault();
    setDeleteDialogOpen(true);
    const response = await deletePost(post).execute();
    if (response?.acknowledged) {
      router.push("/blog");
    }
  }

  const actions = [
    { icon: <EditIcon />, text: "Промени", onClick: handleEditClick },
    {
      icon: <DeleteIcon />,
      text: "Изтрий",
      color: "error",
      onClick: handleDeleteClick,
    },
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
          onPostUpdate={onPostUpdate}
          onClose={handleUpdateDialogClose}
        />
      ) : null}
      {deleteDialogOpen ? (
        <Dialog open={deleteDialogOpen}>
          <DialogContent>
            <DialogContentText>
              Наистина ли искате да изтриете поста?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose}>
                Не, запази поста
              </Button>
              <Button onClick={handleDeletePost} color="error">
                Да, изтрий поста
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
