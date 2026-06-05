import AdminShell from "@/components/AdminShell";
import styles from "../shared.module.css";

const settings = [
  ["API Base URL", "http://localhost:8000/api"],
  ["Admin Route", "http://localhost:3001/admin"],
  ["Public Website", "http://localhost:3000"],
  ["Order Statuses", "pending, confirmed, shipped, delivered, cancelled"],
  ["Payment Methods", "Cash on Delivery, Paid"],
];

export default function SettingsPage() {
  return (
    <AdminShell title="Settings" subtitle="Keep operational URLs, statuses, and store defaults in one place.">
      <section className={styles.settingsGrid}>
        {settings.map(([label, value]) => (
          <article key={label} className={styles.settingCard}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
