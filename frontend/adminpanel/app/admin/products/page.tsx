import AdminShell from "@/components/AdminShell";
import AdminTable from "@/components/AdminTable";
import StatusBadge from "@/components/StatusBadge";
import { products } from "@/lib/adminData";
import styles from "../shared.module.css";

export default function ProductsPage() {
  return (
    <AdminShell
      title="Products"
      subtitle="Manage storefront catalog, pricing, inventory, and public visibility."
      action={<button className={styles.primaryBtn}>Add Product</button>}
    >
      <section className={styles.toolbar}>
        <input placeholder="Search products" />
        <select defaultValue="all">
          <option value="all">All categories</option>
          <option value="honey">Honey</option>
          <option value="dates">Dates & Nuts</option>
          <option value="ghee">Ghee & Oil</option>
        </select>
      </section>
      <AdminTable
        headers={["Product", "Category", "Stock", "Price", "Status"]}
        rows={products.map((product) => [
          product.name,
          product.category,
          product.stock,
          `Tk ${product.price.toLocaleString()}`,
          <StatusBadge key={product.id} label={product.status} />,
        ])}
      />
    </AdminShell>
  );
}
