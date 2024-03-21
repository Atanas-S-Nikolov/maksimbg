import styles from "@/styles/components/utils/Heading.module.css";

export default function Heading({ children, className }) {
  return (
    <h1 className={`${styles.heading} ${className}`}>{children}</h1>
  )
}
