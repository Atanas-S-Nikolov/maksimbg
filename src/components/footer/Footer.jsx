import styles from "@/styles/components/footer/Footer.module.css";

import Typography from "@mui/material/Typography";

import Icon from "@mui/material/Icon";

import { SITE_NAME } from "@/constants/global";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";

const EMAIL = "Имейл";
const PHONE = "Телефон за връзка";

const contacts = [
  {
    icon: "phone_android",
    text: PHONE,
    value: "+359 87 965 5846",
  },
  { icon: "mail", text: EMAIL, value: "maksim_asparuhov@abv.bg" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const mobileS = useMediaQuery("(max-width: 321px)", {
    defaultMatches: false,
  });
  const tablet = useMediaQuery("(max-width: 750px)", {
    defaultMatches: false,
  });
  const iconFontSize = mobileS ? "medium" : "large";
  const copyrightTextFontSize = tablet ? "small" : "medium";

  return (
    <footer className={styles.footer}>
      <section className={styles.contacts}>
        {contacts.map((contact, index) => {
          const { icon, text, value } = contact;
          const linkPrefix = text === EMAIL ? "mailto:" : "tel:";
          return (
            <span key={index}>
              <Icon className={styles.icon} fontSize={iconFontSize}>{icon}</Icon>
              <Typography>{text}</Typography>
              <Link href={linkPrefix + value} data-rel="external">
                {value}
              </Link>
            </span>
          );
        })}
      </section>
      <Typography fontSize={copyrightTextFontSize}>
        &copy; {currentYear} {SITE_NAME}. Всички права запазени.
      </Typography>
    </footer>
  );
}
