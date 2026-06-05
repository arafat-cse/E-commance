import styles from "./StatusBadge.module.css";

export default function StatusBadge({ label }: { label: string }) {
  const tone = label.toLowerCase().replace(/\s+/g, "-");

  return <span className={`${styles.badge} ${styles[tone] ?? ""}`}>{label}</span>;
}
