import styles from "@/styles/components/utils/AccentText.module.css";

export default function AccentText({ children, className }) {
  return (
    <span className={`${styles.accent_text} ${className}`}>{children}</span>
  )
}
