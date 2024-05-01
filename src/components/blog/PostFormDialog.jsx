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
import { createPost, updatePost } from "@/services/BlogPostService";
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
import { CREATE_ACTION, EDIT_ACTION } from "@/constants/ActionConstants";
import { useRouter } from "next/router";

const DESCRIPTION_HELPER_TEXT = "Описание на поста с кратко изречение";
const DEFAULT_ERROR_OBJECT = { error: false, message: " " };
const DEFAULT_ERRORS = {
  title: DEFAULT_ERROR_OBJECT,
  description: DEFAULT_ERROR_OBJECT,
  content: DEFAULT_ERROR_OBJECT,
  image: DEFAULT_ERROR_OBJECT,
  creation: DEFAULT_ERROR_OBJECT,
};
const DEFAULT_POST = {
  title: "",
  description: "",
  content: "",
  image: {},
};

export default function PostFormDialog(props) {
  const { action = CREATE_ACTION, post = DEFAULT_POST, ...dialogProps } = props;
  const [imageSrc, setImageSrc] = useState(post.image.url);
  const [imageFile, setImageFile] = useState();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const [postUrl, setPostUrl] = useState();
  const [loading, setLoading] = useState(false);
  const dialogTitleVerb =
    action === CREATE_ACTION ? "Създаване" : "Редактиране";
  const router = useRouter();

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
    setTitle(value);
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
  }

  function handleDescriptionChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setDescription(value);
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
  }

  function handleContentChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setContent(value);
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
    setErrors({ ...errors, creation: DEFAULT_ERROR_OBJECT });
  }

  function handleUploadError(message) {
    setLoading(false);
    setErrors({ ...errors, creation: { error: true, message } });
  }

  function handleUploadFinished() {
    const createdOn = dayjs().format(DEFAULT_DATE_FORMAT);
    const directory = STORAGE_BLOG_IMAGES_DIRECTORY + postUrl;
    const fileDirectory = `${directory}/${imageFile.name}`;
    getFilesByDirectory(directory).then(async (files) => {
      try {
        const response = await createPost({
          title,
          description,
          content,
          createdOn,
          image: files[0],
          url: postUrl,
        });
        if (!response) {
          await deleteFile(fileDirectory);
        }
      } catch (error) {
        const { status, data } = error.response;
        if (status === 409) {
          handleUploadError(data.message);
        }
        await deleteFile(fileDirectory);
      }
    });
    setLoading(false);
    setErrors(DEFAULT_ERRORS);
  }

  async function handleSave(event) {
    event.preventDefault();
    const directory = STORAGE_BLOG_IMAGES_DIRECTORY + postUrl;

    setLoading(true);

    if (action === CREATE_ACTION) {
      uploadFiles(
        [imageFile],
        directory,
        handleUploadFinished,
        handleUploadError
      );
    } else if (action === EDIT_ACTION) {
      await updatePost(post.url, {
        ...post,
        title,
        description,
        content,
      });
      setLoading(false);
      setErrors(DEFAULT_ERRORS);
      dialogProps.onClose();
      router.reload();
    }
  }

  return (
    <Dialog fullScreen {...dialogProps}>
      <AppBar className={styles.app_bar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={dialogProps.onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography className={styles.title} variant="h6" component="div">
            {dialogTitleVerb} на блог пост
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
          id="title"
          label="Заглавие"
          placeholder="Въведи заглавие"
          required
          value={title}
          onChange={handleTitleChange}
          error={errors.title?.error}
          helperText={errors.title?.message}
        />
        <TextField
          id="description"
          label="Описание"
          placeholder="Въведи описание"
          multiline
          rows={2}
          required
          value={description}
          onChange={handleDescriptionChange}
          error={errors.description.error}
          helperText={
            errors.description.error
              ? errors.description.message
              : DESCRIPTION_HELPER_TEXT
          }
        />
        <TextField
          id="content"
          label="Съдържание"
          placeholder="Въведи съдържание"
          multiline
          rows={5}
          required
          value={content}
          onChange={handleContentChange}
          error={errors.content?.error}
          helperText={errors.content?.message}
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
