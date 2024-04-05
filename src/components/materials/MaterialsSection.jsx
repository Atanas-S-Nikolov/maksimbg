import styles from "@/styles/components/materials/MaterialsSection.module.css";

import SubHeading from "../utils/SubHeading";

import Paper from "@mui/material/Paper";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";

import {
  IMAGE_FILE_EXTENSIONS,
  PDF_FILE_EXTENSION,
  WORD_AND_TXT_FILE_EXTENSIONS,
} from "@/constants/FileConstants";
import FileUploader from "../utils/FileUploader";
import Link from "next/link";

export default function MaterialsSection({ university }) {
  const { universityName, materials } = university;

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
            <Paper key={fileName} className={styles.file} title={fileName}>
              <FileIcon />
              <Link
                id={styles.file_name}
                href={url}
                alt={url}
              >
                {fileName}
              </Link>
            </Paper>
          );
        })}
      </section>
      <FileUploader university={university} />
    </>
  );
}
