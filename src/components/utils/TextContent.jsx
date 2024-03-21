import styles from "@/styles/components/utils/TextContent.module.css";

export default function TextContent({ children, className }) {
  return (
    <p className={`${styles.text_content} ${className}`}>{children}</p>
  )
}
