import styles from "@/styles/components/utils/SubHeading.module.css";

export default function SubHeading({ children, className }) {
  return (
    <h4 className={`${styles.sub_heading} ${className}`}>{children}</h4>
  )
}
