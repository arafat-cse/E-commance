import AdminShell from "@/components/AdminShell";
import AdminTable from "@/components/AdminTable";
import StatusBadge from "@/components/StatusBadge";
import { customers } from "@/lib/adminData";
import styles from "../shared.module.css";

export default function CustomersPage() {
  return (
    <AdminShell title="Customers" subtitle="Review customer status, order history, and lifetime value.">
      <section className={styles.toolbar}>
        <input placeholder="Search customers" />
        <select defaultValue="all">
          <option value="all">All customers</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </section>
      <AdminTable
        headers={["Name", "Email", "Orders", "Total Spent", "Status"]}
        rows={customers.map((customer) => [
          customer.name,
          customer.email,
          customer.orders,
          `Tk ${customer.spent.toLocaleString()}`,
          <StatusBadge key={customer.id} label={customer.status} />,
        ])}
      />
    </AdminShell>
  );
}
