import styles from "@/styles/components/utils/FileUploader.module.css";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorIcon from "@mui/icons-material/Error";

import { useState } from "react";

import Router from "next/router";

import {
  deleteFile,
  getFilesByDirectory,
  uploadFiles,
} from "@/services/FileUploadService";
import { updateUniversityMaterials } from "@/services/MaterialsService";
import { DEFAULT_FILE_UPLOAD_ERROR_MESSAGE } from "@/constants/ErrorMessages";

export default function FileUploader({ university }) {
  const { universityName, directory } = university;
  const [uploadStarted, setUploadStarted] = useState(false);
  const [uploadFinished, setUploadFinished] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(DEFAULT_FILE_UPLOAD_ERROR_MESSAGE);
  const [progress, setProgress] = useState(0);

  async function rollbackFile(fileName) {
    await deleteFile(`${directory}/${fileName}`);
    setErrorMessage(DEFAULT_FILE_UPLOAD_ERROR_MESSAGE);
    setError(true);
  }

  function handleUploadFinished() {
    setError(false);
    setUploadFinished(true);
    getFilesByDirectory(directory).then(async (files) => {
      const { fileName } = files[0];
      try {
        const response = await updateUniversityMaterials({
          universityName,
          directory,
          materials: files,
        });
        if (!response) {
          await rollbackFile(fileName);
          return;
        }
        Router.reload();
      } catch(error) {
        await rollbackFile(fileName);
      }
    });
  }

  function handleUploadError(message) {
    setUploadFinished(true);
    setErrorMessage(message);
    setError(true);
  }

  function handleChange(event) {
    event.preventDefault();
    const files = event.target.files;
    setUploadStarted(true);
    if (files) {
      uploadFiles(
        files,
        directory,
        handleUploadFinished,
        handleUploadError,
        setProgress
      );
    }
  }

  function renderUploadFinalStatus() {
    return (
      <>
        {error ? (
          <>
            <ErrorIcon color="error" />
            <Typography>{errorMessage}</Typography>
          </>
        ) : (
          <>
            <CloudDoneIcon color="primary" />
            <Typography>Готово</Typography>
          </>
        )}
      </>
    );
  }

  function renderUploadStatus() {
    return (
      <>
        {uploadFinished ? (
          renderUploadFinalStatus()
        ) : (
          <Box className={styles.progress_wrapper}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography>{progress} %</Typography>
          </Box>
        )}
      </>
    );
  }

  return (
    <>
      {!uploadStarted ? (
        <Button
          id={styles.upload_file_button}
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Качи файл
          <input
            className={styles.file_input}
            type="file"
            onChange={handleChange}
          />
        </Button>
      ) : (
        renderUploadStatus()
      )}
    </>
  );
}
