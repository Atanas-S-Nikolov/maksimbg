import styles from "@/styles/components/blog/PostFormDialog.module.css";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import CircularProgress from "@mui/material/CircularProgress";

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
  getBytesByDirectory,
  getFilesByDirectory,
  uploadFileBytes,
  uploadFiles,
} from "@/services/FileUploadService";
import { STORAGE_BLOG_IMAGES_DIRECTORY } from "@/constants/URLConstants";
import StyledBackdropLoader from "../styled/StyledBackdropLoader";
import SnackbarAlert from "../utils/SnackbarAlert";
import { CREATE_ACTION, EDIT_ACTION } from "@/constants/ActionConstants";
import PostImageListItem from "./PostImageListItem";
import { useMediaQuery } from "@mui/material";

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
  const {
    action = CREATE_ACTION,
    post = DEFAULT_POST,
    onClose,
    onPostUpdate,
    ...dialogProps
  } = props;
  const isCreateAction = action === CREATE_ACTION;
  const isEditAction = action === EDIT_ACTION;
  const postMainImageIndex = post.images?.findIndex((image) => image.isMain);
  const [mainImageIndex, setMainImageIndex] = useState(
    isCreateAction ? 0 : postMainImageIndex
  );
  const [images, setImages] = useState(post.images || []);
  const [existingImages, setExistingImages] = useState([]);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const [postUrl, setPostUrl] = useState(post.url);
  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const dialogTitleVerb = isCreateAction ? "Създаване" : "Редактиране";
  const hasImages = images.length > 0;
  const mobile = useMediaQuery("(max-width: 1000px)", {
    defaultMatches: false,
  });
  const imageListCols = mobile ? 1 : 3;

  useEffect(() => {
    if (isCreateAction) {
      setPostUrl(crypto.randomUUID());
    }
  }, [isCreateAction]);

  useEffect(() => {
    async function setExistingPostImages() {
      const directory = STORAGE_BLOG_IMAGES_DIRECTORY + postUrl;
      setExistingImages(await getBytesByDirectory(directory));
    }

    if (isEditAction) {
      setExistingPostImages();
    }
  }, [isEditAction, postUrl]);

  useEffect(() => {
    const hasInput = title && description && content && hasImages;
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
  }, [title, description, content, hasImages, errors]);

  async function rollbackImages() {
    const promises = images.map((image) => {
      const directory = STORAGE_BLOG_IMAGES_DIRECTORY + postUrl;
      return deleteFile(`${directory}/${image.fileName}`);
    });
    await Promise.all(promises);
  }

  async function handleDialogCloseWithCleanup(event) {
    await rollbackImages();
    onClose(event);
  }

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
    const acceptedFiles = event.target.files;
    const directory = STORAGE_BLOG_IMAGES_DIRECTORY + postUrl;

    if (acceptedFiles) {
      setImageUploadLoading(true);
      uploadFiles(
        acceptedFiles,
        directory,
        handleUploadFinished,
        handleUploadError
      );
      event.target.value = "";
    }
  }

  function handleMainImageChange(event) {
    const index = Number(event.target.value);
    setMainImageIndex(index);
  }

  function handleImageDelete(event, index) {
    event.preventDefault();
    const directory = STORAGE_BLOG_IMAGES_DIRECTORY + postUrl;

    const imagesCopy = [...images];
    const imageName = images[index].fileName;
    deleteFile(`${directory}/${imageName}`).then(() => {
      imagesCopy.splice(index, 1);
      setImages(imagesCopy);
    });
  }

  function resetCreationError() {
    setErrors({ ...errors, creation: DEFAULT_ERROR_OBJECT });
  }

  function handleUploadError(message) {
    setLoading(false);
    setImageUploadLoading(false);
    setErrors({ ...errors, creation: { error: true, message } });
  }

  function handleUploadFinished() {
    const directory = STORAGE_BLOG_IMAGES_DIRECTORY + postUrl;
    getFilesByDirectory(directory).then((files) => {
      setImages(files);
      setImageUploadLoading(false);
    });
  }

  function executeSaveRequest(postImages) {
    if (isCreateAction) {
      return createPost({
        title,
        description,
        content,
        images: postImages,
        url: postUrl,
      });
    } else if (isEditAction) {
      return updatePost(post.url, {
        ...post,
        title,
        description,
        content,
        images: postImages,
      });
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    setLoading(true);
    const postImages = images.map((image, index) => {
      const isMain = mainImageIndex === index;
      return { ...image, isMain };
    });

    await executeSaveRequest(postImages)
      .withErrorHandler(async () => {
        await rollbackImages();
        if (isEditAction) {
          await uploadFileBytes(existingImages);
        }
      })
      .withFinallyHandler(async () => {
        await onPostUpdate();
        setLoading(false);
        setErrors(DEFAULT_ERRORS);
      })
      .execute();

    onClose(event);
  }

  return (
    <Dialog fullScreen onClose={handleDialogCloseWithCleanup} {...dialogProps}>
      <AppBar className={styles.app_bar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDialogCloseWithCleanup}
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
        {imageUploadLoading ? <CircularProgress sx={{ mb: 2 }} /> : null}
        {hasImages ? (
          <ImageList cols={imageListCols} gap={8}>
            {images.map((image, index) => (
              <PostImageListItem
                key={image.url}
                className={styles.post_image}
                src={image.url}
                onClick={(event) => handleImageDelete(event, index)}
                index={index}
                selectedValue={mainImageIndex}
                radioChange={handleMainImageChange}
              />
            ))}
          </ImageList>
        ) : null}
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
            multiple
          />
        </Button>
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
