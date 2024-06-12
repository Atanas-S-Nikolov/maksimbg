import styles from "@/styles/components/materials/MaterialsSection.module.css";

import SubHeading from "../utils/SubHeading";
import FileUploader from "../utils/FileUploader";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  IMAGE_FILE_EXTENSIONS,
  PDF_FILE_EXTENSION,
  WORD_AND_TXT_FILE_EXTENSIONS,
} from "@/constants/FileConstants";
import { deleteFile, getFilesByDirectory } from "@/services/FileUploadService";
import {
  getUniversityByName,
  updateUniversityMaterials,
} from "@/services/MaterialsService";
import UnauthorizedHandler from "@/utils/UnauthorizedHandler";

export default function MaterialsSection({ university }) {
  const { universityName, materials, directory } = university;
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteFileName, setDeleteFileName] = useState("");
  const router = useRouter();

  function handleDialogClose() {
    setDialogOpen(false);
  }

  function handleDialogOpen(event, fileName) {
    event.preventDefault();
    setDeleteFileName(fileName);
    setDialogOpen(true);
  }

  async function handleDelete(event) {
    // TODO: Replace router.reload() with state update
    event.preventDefault();
    const files = await getFilesByDirectory(directory, deleteFileName);
    await new UnauthorizedHandler(async () => {
      const response = await updateUniversityMaterials({
        universityName,
        directory,
        materials: files,
      });
      if (response) {
        await deleteFile(`${directory}/${deleteFileName}`);
        router.reload();
      }
    }).execute();
  }

  return (
    <>
      <SubHeading>{universityName}</SubHeading>
      <section className={styles.files_section}>
        {materials?.map((material) => {
          const { fileName, url } = material;
          const fileExtension = fileName.substring(
            fileName.lastIndexOf(".") + 1
          );

          let FileIcon = InsertDriveFileIcon;

          if (PDF_FILE_EXTENSION === fileExtension) {
            FileIcon = PictureAsPdfIcon;
          } else if (WORD_AND_TXT_FILE_EXTENSIONS.includes(fileExtension)) {
            FileIcon = DescriptionIcon;
          } else if (IMAGE_FILE_EXTENSIONS.includes(fileExtension)) {
            FileIcon = ImageIcon;
          }

          return (
            <Paper key={fileName} className={styles.file}>
              <FileIcon />
              <Link
                id={styles.file_name}
                href={url}
                target="_blank"
                title={fileName}
                alt={url}
              >
                {fileName}
              </Link>
              {isLoggedIn ? (
                <IconButton
                  onClick={(event) => handleDialogOpen(event, fileName)}
                  title="Изтрий файл"
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </Paper>
          );
        })}
      </section>
      {isLoggedIn ? <FileUploader university={university} /> : null}
      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogContentText>
            Наистина ли искате да изтриете файла?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleDialogClose}>Не, запази файла</Button>
            <Button onClick={handleDelete} color="error">
              Да, изтрий файла
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
