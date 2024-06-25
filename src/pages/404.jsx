import styles from "@/styles/pages/NotFound.module.css";

import Image from "next/image";
import Typography from "@mui/material/Typography";

import notFoundImage1 from "@/assets/not-found-1.svg";
import notFoundImage2 from "@/assets/not-found-2.svg";

export default function NotFound404() {
  return (
    <section className={styles.wrapper_section}>
      <section className={styles.images_section}>
        <Image src={notFoundImage1} alt="Not found image" priority/>
        <Image src={notFoundImage2} alt="Not found image" priority/>
      </section>
      <Typography variant="h4" color="error">
        404
      </Typography>
      <Typography variant="h5" color="secondary" fontStyle="italic">
        Страницата не е намерена
      </Typography>
    </section>
  );
}
