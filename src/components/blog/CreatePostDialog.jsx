import styles from "@/styles/components/blog/CreatePostDialog.module.css";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CloseIcon from "@mui/icons-material/Close";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

export default function CreatePostDialog(props) {
  const { onClose } = props;
  return (
    <Dialog fullScreen {...props}>
      <AppBar className={styles.app_bar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography className={styles.title} variant="h6" component="div">
            Създаване на блог пост
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            Запази
          </Button>
        </Toolbar>
      </AppBar>
      <div className={styles.wrapper}>
        <TextField label="Заглавие" placeholder="Въведи заглавие" required />
        <TextField
          label="Описание"
          placeholder="Въведи описание"
          multiline
          rows={2}
          required
          helperText="Описание на поста с кратко изречение"
        />
        <TextField
          label="Съдържание"
          placeholder="Въведи съдържание"
          multiline
          rows={5}
          required
        />
      </div>
      <Button
        className={styles.image_upload_button}
        startIcon={<InsertPhotoIcon />}
        variant="contained"
      >
        Качи снимка
      </Button>
    </Dialog>
  );
}
