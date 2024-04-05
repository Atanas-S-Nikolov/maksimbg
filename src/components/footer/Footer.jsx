import styles from "@/styles/components/footer/Footer.module.css";

import Typography from "@mui/material/Typography";

import { SITE_NAME } from "@/constants/global";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Typography color="text.secondary">&copy; {currentYear} {SITE_NAME}. Всички права запазени.</Typography>
    </footer>
  )
}
