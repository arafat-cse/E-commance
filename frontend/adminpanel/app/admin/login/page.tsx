import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div>
          <p className={styles.eyebrow}>Admin Access</p>
          <h1>Sign in to Ghorer Bazar</h1>
          <p className={styles.copy}>Manage products, orders, customers, and storefront updates from one controlled workspace.</p>
        </div>

        <LoginForm />
      </section>

      <aside className={styles.side}>
        <div className={styles.notice}>
          <span>Secure Admin Workspace</span>
          <strong>Authorized access only</strong>
          <p>Operational data appears after a valid admin session is created.</p>
        </div>
        <div className={styles.notice}>
          <span>Protected Routes</span>
          <strong>/admin/*</strong>
          <p>Dashboard, products, orders, and customer pages are blocked before login.</p>
        </div>
        <div className={styles.notice}>
          <span>Backend Ready</span>
          <strong>/api/admin</strong>
          <p>Next step is replacing demo login with Laravel JWT authentication.</p>
        </div>
      </aside>
    </main>
  );
}
