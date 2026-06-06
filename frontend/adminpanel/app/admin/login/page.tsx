import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.brandPanel} aria-label="Ghorer Bazar admin">
        <div className={styles.brandTop}>
          <span className={styles.brandMark} />
          <strong>Ghorer Bazar</strong>
        </div>

        <div className={styles.brandCopy}>
          <p className={styles.eyebrow}>Admin Workspace</p>
          <h1>Control the store without exposing the store.</h1>
          <p>
            Products, orders, customers, and reports stay hidden until an authorized admin session is verified.
          </p>
        </div>

        <div className={styles.securityStrip}>
          <span>JWT protected</span>
          <span>Role checked</span>
          <span>Private routes</span>
        </div>
      </section>

      <section className={styles.loginPanel}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.lockIcon} aria-hidden="true">L</span>
            <div>
              <p className={styles.cardEyebrow}>Secure Sign In</p>
              <h2>Welcome back</h2>
            </div>
          </div>

          <p className={styles.copy}>
            Enter your admin credentials to continue to the dashboard.
          </p>

          <LoginForm />

          <div className={styles.helpBox}>
            <strong>Need access?</strong>
            <span>Ask the system owner to create an active admin account in the backend.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
