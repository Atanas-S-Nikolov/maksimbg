import styles from "@/styles/components/blog/CreatePostDialog.module.css";

import Image from "next/image";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CloseIcon from "@mui/icons-material/Close";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import { useEffect, useState } from "react";
import { isBlank } from "underscore.string";
import {
  POST_CONTENT_ERROR_MESSAGE,
  POST_DESCRIPTION_ERROR_MESSAGE,
  POST_TITLE_ERROR_MESSAGE,
} from "@/constants/ErrorMessages";
import { createPost } from "@/services/BlogPostService";
import {
  deleteFile,
  getFilesByDirectory,
  uploadFiles,
} from "@/services/FileUploadService";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "@/constants/DateConstants";
import { STORAGE_BLOG_IMAGES_DIRECTORY } from "@/constants/URLConstants";
import StyledBackdropLoader from "../styled/StyledBackdropLoader";
import SnackbarAlert from "../utils/SnackbarAlert";

const DESCRIPTION_HELPER_TEXT = "Описание на поста с кратко изречение";
const DEFAULT_ERROR_OBJECT = { error: false, message: " " };
const DEFAULT_ERRORS = {
  title: DEFAULT_ERROR_OBJECT,
  description: DEFAULT_ERROR_OBJECT,
  content: DEFAULT_ERROR_OBJECT,
  image: DEFAULT_ERROR_OBJECT,
  creation: DEFAULT_ERROR_OBJECT,
};

export default function CreatePostDialog(props) {
  const { onClose } = props;
  const [imageSrc, setImageSrc] = useState();
  const [imageFile, setImageFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const [postUrl, setPostUrl] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPostUrl(crypto.randomUUID());
  }, []);

  useEffect(() => {
    const hasInput = title && description && content && imageSrc;
    let hasNoErrors = true;

    for (const value of Object.values(errors)) {
      if (value.error) {
        hasNoErrors = false;
        break;
      }
    }

    if (hasInput && hasNoErrors) {
      setSaveBtnDisabled(false);
      return;
    }
    setSaveBtnDisabled(true);
  }, [title, description, content, imageSrc, errors]);

  function handleTitleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    if (isBlank(value)) {
      setErrors({
        ...errors,
        title: { error: true, message: POST_TITLE_ERROR_MESSAGE },
      });
      return;
    }
    setErrors({
      ...errors,
      title: DEFAULT_ERROR_OBJECT,
    });
    setTitle(value);
  }

  function handleDescriptionChange(event) {
    event.preventDefault();
    const { value } = event.target;
    if (isBlank(value)) {
      setErrors({
        ...errors,
        description: { error: true, message: POST_DESCRIPTION_ERROR_MESSAGE },
      });
      return;
    }
    setErrors({
      ...errors,
      description: DEFAULT_ERROR_OBJECT,
    });
    setDescription(value);
  }

  function handleContentChange(event) {
    event.preventDefault();
    const { value } = event.target;
    if (isBlank(value)) {
      setErrors({
        ...errors,
        content: { error: true, message: POST_CONTENT_ERROR_MESSAGE },
      });
      return;
    }
    setErrors({
      ...errors,
      content: DEFAULT_ERROR_OBJECT,
    });
    setContent(value);
  }

  function handleImageUploadChange(event) {
    event.preventDefault();
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        setImageSrc(URL.createObjectURL(file));
        setImageFile(file);
      }
    }
  }

  function resetCreationError() {
    setErrors({...errors, creation: DEFAULT_ERROR_OBJECT });
  }

  function handleUploadError(message) {
    setLoading(false);
    setErrors({...errors,  creation: { error: true, message }});
  }

  function handleUploadFinished() {
    const createdOn = dayjs().format(DEFAULT_DATE_FORMAT);
    const directory = STORAGE_BLOG_IMAGES_DIRECTORY + postUrl;
    getFilesByDirectory(directory).then(async (files) => {
      try {
        await createPost({
          title,
          description,
          content,
          createdOn,
          image: files[0],
          url: postUrl,
        });
      } catch (error) {
        const { status, data } = error.response;
        if (status === 409) {
          handleUploadError(data.message);
        }
        await deleteFile(`${directory}/${imageFile.name}`);
      }
    });
    setLoading(false);
    setErrors(DEFAULT_ERRORS);
  }

  async function handleSave(event) {
    event.preventDefault();
    const directory = STORAGE_BLOG_IMAGES_DIRECTORY + postUrl;

    setLoading(true);

    uploadFiles(
      [imageFile],
      directory,
      handleUploadFinished,
      handleUploadError
    );
  }

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
          <Button
            autoFocus
            color="inherit"
            disabled={saveBtnDisabled}
            onClick={handleSave}
          >
            Запази
          </Button>
        </Toolbar>
      </AppBar>
      <div className={styles.wrapper}>
        <TextField
          label="Заглавие"
          placeholder="Въведи заглавие"
          required
          error={errors.title?.error}
          helperText={errors.title?.message}
          onChange={handleTitleChange}
        />
        <TextField
          label="Описание"
          placeholder="Въведи описание"
          multiline
          rows={2}
          required
          error={errors.description.error}
          helperText={
            errors.description.error
              ? errors.description.message
              : DESCRIPTION_HELPER_TEXT
          }
          onChange={handleDescriptionChange}
        />
        <TextField
          label="Съдържание"
          placeholder="Въведи съдържание"
          multiline
          rows={5}
          required
          error={errors.content?.error}
          helperText={errors.content?.message}
          onChange={handleContentChange}
        />
      </div>
      <section className={styles.image_upload_section}>
        {imageSrc ? (
          <Image
            className={styles.post_image}
            src={imageSrc}
            alt="Снимка на поста"
            width={200}
            height={200}
          />
        ) : (
          <Button
            className={styles.image_upload_button}
            startIcon={<InsertPhotoIcon />}
            variant="contained"
            component="label"
          >
            Качи снимка
            <input
              className={styles.file_input}
              type="file"
              accept="image/*"
              onChange={handleImageUploadChange}
            />
          </Button>
        )}
      </section>
      <StyledBackdropLoader open={loading} />
      <SnackbarAlert
        open={errors.creation.error}
        severity="error"
        message={errors.creation.message}
        onClose={resetCreationError}
      />
    </Dialog>
  );
}
