import styles from "@/styles/components/materials/MaterialsSection.module.css";

import SubHeading from "../utils/SubHeading";

import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from '@mui/icons-material/Delete';

import { useSelector } from "react-redux";

import {
  IMAGE_FILE_EXTENSIONS,
  PDF_FILE_EXTENSION,
  WORD_AND_TXT_FILE_EXTENSIONS,
} from "@/constants/FileConstants";
import FileUploader from "../utils/FileUploader";
import Link from "next/link";
import { deleteFile, getFilesByDirectory } from "@/services/FileUploadService";
import { updateUniversityMaterials } from "@/services/MaterialsService";

export default function MaterialsSection({ university }) {
  const { universityName, materials, directory } = university;
  const { isLoggedIn } = useSelector(state => state.authentication);

  async function handleDelete(event, fileName) {
    event.preventDefault();
    try {
      await deleteFile(`${directory}/${fileName}`);
      const files = await getFilesByDirectory(directory);
      await updateUniversityMaterials({
        universityName,
        directory,
        materials: files,
      })
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <SubHeading>{universityName}</SubHeading>
      <section className={styles.files_section}>
        {materials?.map((material) => {
          const { fileName, url } = material;
          const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);

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
                <IconButton onClick={(event) => handleDelete(event, fileName)} title="Изтрий файл">
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </Paper>
          );
        })}
      </section>
      {isLoggedIn ? <FileUploader university={university} /> : null}
    </>
  );
}
