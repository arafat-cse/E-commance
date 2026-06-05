import AdminShell from "@/components/AdminShell";
import AdminTable from "@/components/AdminTable";
import StatusBadge from "@/components/StatusBadge";
import { orders } from "@/lib/adminData";
import styles from "../shared.module.css";

export default function OrdersPage() {
  return (
    <AdminShell title="Orders" subtitle="Track customer orders, payment state, and fulfillment progress.">
      <section className={styles.toolbar}>
        <input placeholder="Search order or customer" />
        <select defaultValue="all">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </section>
      <AdminTable
        headers={["Order", "Customer", "Total", "Status", "Payment"]}
        rows={orders.map((order) => [
          order.id,
          order.customer,
          `Tk ${order.total.toLocaleString()}`,
          <StatusBadge key={`${order.id}-status`} label={order.status} />,
          <StatusBadge key={`${order.id}-payment`} label={order.payment} />,
        ])}
      />
    </AdminShell>
  );
}
