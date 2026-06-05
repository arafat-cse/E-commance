import AdminShell from "@/components/AdminShell";
import StatusBadge from "@/components/StatusBadge";
import { browserStats, campaigns, orders, products, stats, trafficTypes } from "@/lib/adminData";
import styles from "./page.module.css";

function StatIcon({ type }: { type: string }) {
  if (type === "bars") {
    return (
      <div className={styles.barIcon} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (type === "file") {
    return <span className={styles.fileIcon} aria-hidden="true" />;
  }

  if (type === "gauge") {
    return <span className={styles.gaugeIcon} aria-hidden="true" />;
  }

  return <span className={styles.peopleIcon} aria-hidden="true" />;
}

function Sparkline({ tone = "blue" }: { tone?: "blue" | "green" | "amber" }) {
  const stroke = tone === "green" ? "#00d853" : tone === "amber" ? "#ffc400" : "#2f67ff";

  return (
    <svg className={styles.sparkline} viewBox="0 0 120 36" role="img" aria-label="Trend">
      <path d="M2 30 L18 21 L32 18 L48 7 L62 16 L76 10 L91 2 L112 31" fill="none" stroke={stroke} strokeWidth="2" />
      <path d="M2 30 L18 21 L32 18 L48 7 L62 16 L76 10 L91 2 L112 31 L112 36 L2 36 Z" fill={stroke} opacity="0.18" />
    </svg>
  );
}

export default function DashboardPage() {
  const lowStock = products.filter((product) => product.status === "Low stock");
  const pendingOrders = orders.filter((order) => order.status === "Pending");

  return (
    <AdminShell title="Dashboard" subtitle="Storefront performance, fulfillment, catalog health, and campaigns.">
      <section className={styles.kpiGrid}>
        {stats.map((stat) => (
          <article key={stat.label} className={`${styles.kpiCard} ${styles[stat.tone]}`}>
            <div>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <small>{stat.meta}</small>
            </div>
            <StatIcon type={stat.icon} />
          </article>
        ))}
      </section>

      <section className={styles.analyticsGrid}>
        <article className={`${styles.panel} ${styles.userStats}`}>
          <div className={styles.panelHeader}>
            <h2>User Statistics</h2>
            <span className={styles.toggle} />
          </div>
          <svg className={styles.lineChart} viewBox="0 0 620 290" role="img" aria-label="Monthly user statistics">
            {[40, 92, 144, 196, 248].map((y) => (
              <line key={y} x1="48" y1={y} x2="596" y2={y} className={styles.gridLine} />
            ))}
            <polyline points="50,252 90,212 138,210 184,211 226,182 272,203 318,203 362,170 414,204 458,246 514,242 580,236" className={styles.yellowLine} />
            <polyline points="50,244 90,220 138,219 184,219 226,219 272,219 318,219 362,219 414,218 458,247 514,244 580,243" className={styles.blueLine} />
            <polyline points="50,230 90,208 138,209 184,209 226,209 272,190 318,189 362,204 414,203 458,184 514,54 580,184" className={styles.pinkLine} />
            {["Jan", "Feb", "April", "June", "Aug", "Sep", "Oct", "Dec"].map((month, index) => (
              <text key={month} x={48 + index * 76} y="276" className={styles.chartLabel}>
                {month}
              </text>
            ))}
          </svg>
          <div className={styles.chartSummary}>
            <div>
              <span>Weekly Users</span>
              <strong>324,222</strong>
            </div>
            <div>
              <span>Monthly Users</span>
              <strong>123,432</strong>
            </div>
            <div>
              <span>Trend</span>
              <strong className={styles.greenText}>↗</strong>
            </div>
          </div>
        </article>

        <div className={styles.middleColumn}>
          <article className={`${styles.panel} ${styles.satisfaction}`}>
            <h2>Customer Satisfaction</h2>
            <strong>93.13%</strong>
            <div className={styles.progress}>
              <span />
            </div>
            <div className={styles.satStats}>
              <span>Previous <b>79.82</b></span>
              <span>% Change <b>+14.29</b></span>
              <span>Trend <b>↗</b></span>
            </div>
          </article>

          <article className={`${styles.panel} ${styles.browserPanel}`}>
            <div className={styles.panelHeader}>
              <h2>Browser Stats</h2>
              <span>×</span>
            </div>
            {browserStats.map((item) => (
              <div key={item.name} className={styles.browserRow}>
                <span>{item.name}</span>
                <em className={styles[item.tone]}>{item.value}</em>
              </div>
            ))}
          </article>
        </div>

        <article className={`${styles.panel} ${styles.trafficPanel}`}>
          <div className={styles.panelHeader}>
            <h2>Visit By Traffic Types</h2>
            <span>↻ ⋮</span>
          </div>
          <div className={styles.pieWrap}>
            <div className={styles.pie} />
          </div>
          <div className={styles.trafficRows}>
            {trafficTypes.map((item) => (
              <div key={item.name} className={styles.trafficRow}>
                <span className={`${styles.dot} ${styles[item.tone]}`} />
                <div>
                  <strong>{item.value} {item.name}</strong>
                  <small>{item.visits}</small>
                </div>
                <Sparkline tone={item.tone as "blue" | "green" | "amber"} />
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.bottomGrid}>
        <article className={`${styles.panel} ${styles.campaignPanel}`}>
          <div className={styles.panelHeader}>
            <h2>Store Campaigns</h2>
            <span>↻ ⛶ ⋮</span>
          </div>
          <table className={styles.dashboardTable}>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Client</th>
                <th>Changes</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.name}>
                  <td>{campaign.name}</td>
                  <td>{campaign.client}</td>
                  <td>{campaign.changes}</td>
                  <td>{campaign.budget}</td>
                  <td><StatusBadge label={campaign.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className={`${styles.panel} ${styles.promoPanel}`}>
          <div className={styles.panelHeader}>
            <h2>Advertising & Promotions</h2>
            <span>↻ ⋮</span>
          </div>
          <div className={styles.promoBars}>
            <div><span>Honey</span><b style={{ width: "82%" }} /></div>
            <div><span>Dates</span><b style={{ width: "64%" }} /></div>
            <div><span>Ghee</span><b style={{ width: "48%" }} /></div>
            <div><span>Combos</span><b style={{ width: "71%" }} /></div>
          </div>
          <div className={styles.alertBox}>
            <strong>{pendingOrders.length} pending order batch</strong>
            <span>{lowStock.length} product needs inventory review before next offer push.</span>
          </div>
        </article>
      </section>
    </AdminShell>
  );
}
