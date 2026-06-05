import AdminShell from "@/components/AdminShell";
import AdminTable from "@/components/AdminTable";
import { categories } from "@/lib/adminData";
import styles from "../shared.module.css";

export default function CategoriesPage() {
  return (
    <AdminShell
      title="Categories"
      subtitle="Organize publicweb collections using product category data."
      action={<button className={styles.primaryBtn}>Add Category</button>}
    >
      <AdminTable
        headers={["Category", "Products", "Total Stock", "Average Price"]}
        rows={categories.map((category) => [
          category.name,
          category.products,
          category.stock,
          `Tk ${category.averagePrice.toLocaleString()}`,
        ])}
      />
    </AdminShell>
  );
}
