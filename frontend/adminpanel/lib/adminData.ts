export const stats = [
  { label: "Monthly Revenue", value: "Tk 684,200", meta: "Paid + COD", tone: "red", icon: "people" },
  { label: "Conversion Rate", value: "46.41%", meta: "Storefront visits", tone: "amber", icon: "gauge" },
  { label: "Pageviews", value: "4,054,876", meta: "Publicweb traffic", tone: "green", icon: "file" },
  { label: "Growth Rate", value: "46.43%", meta: "Orders this month", tone: "blue", icon: "bars" },
];

export const products = [
  { id: 1, name: "Sundarban Natural Honey", category: "Honey", stock: 84, price: 1250, status: "Active" },
  { id: 2, name: "Premium Ajwa Dates", category: "Dates & Nuts", stock: 42, price: 900, status: "Active" },
  { id: 3, name: "Pure Gawa Ghee", category: "Ghee & Oil", stock: 9, price: 1600, status: "Low stock" },
  { id: 4, name: "Wood Pressed Mustard Oil", category: "Ghee & Oil", stock: 130, price: 320, status: "Active" },
  { id: 5, name: "Mixed Nuts Combo", category: "Combo Offer", stock: 24, price: 1500, status: "Active" },
];

export const orders = [
  { id: "ORD-20260605-81A", customer: "Mostafizur Rahman", total: 2850, status: "Pending", payment: "COD" },
  { id: "ORD-20260605-77B", customer: "Nusrat Jahan", total: 1600, status: "Confirmed", payment: "COD" },
  { id: "ORD-20260604-49C", customer: "Tariqul Islam", total: 4420, status: "Shipped", payment: "Paid" },
  { id: "ORD-20260604-12D", customer: "Sultana Razia", total: 950, status: "Delivered", payment: "Paid" },
];

export const customers = [
  { id: 1, name: "Mostafizur Rahman", email: "mostafiz@example.com", orders: 14, spent: 28400, status: "Active" },
  { id: 2, name: "Nusrat Jahan", email: "nusrat@example.com", orders: 9, spent: 17350, status: "Active" },
  { id: 3, name: "Tariqul Islam", email: "tariqul@example.com", orders: 6, spent: 11220, status: "Active" },
  { id: 4, name: "Sultana Razia", email: "sultana@example.com", orders: 3, spent: 5900, status: "Suspended" },
];

export const categories = [
  { name: "Honey", products: 18, stock: 420, averagePrice: 920 },
  { name: "Dates & Nuts", products: 13, stock: 280, averagePrice: 780 },
  { name: "Ghee & Oil", products: 10, stock: 260, averagePrice: 840 },
  { name: "Combo Offer", products: 12, stock: 140, averagePrice: 2050 },
  { name: "Spices", products: 8, stock: 310, averagePrice: 220 },
];

export const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "D", group: "Main" },
  { href: "/admin/products", label: "Products", icon: "P", group: "Main", badge: "Hot" },
  { href: "/admin/orders", label: "Orders", icon: "O", group: "Main", badge: "28" },
  { href: "/admin/customers", label: "Customers", icon: "C", group: "Commerce" },
  { href: "/admin/categories", label: "Categories", icon: "K", group: "Commerce" },
  { href: "/admin/settings", label: "Settings", icon: "S", group: "System" },
];

export const browserStats = [
  { name: "Chrome", value: "50%", tone: "amber" },
  { name: "Firefox", value: "10%", tone: "red" },
  { name: "Edge", value: "30%", tone: "green" },
  { name: "Safari", value: "10%", tone: "blue" },
];

export const trafficTypes = [
  { name: "Organic", value: "44.46%", visits: "356 Visits", tone: "blue" },
  { name: "Referral", value: "5.54%", visits: "36 Visits", tone: "green" },
  { name: "Other", value: "50%", visits: "245 Visits", tone: "amber" },
];

export const campaigns = [
  { name: "Honey Eid Bundle", client: "Publicweb", changes: "+18%", budget: "Tk 32,000", status: "Running" },
  { name: "Dates Flash Offer", client: "Combos", changes: "+9%", budget: "Tk 18,500", status: "Review" },
  { name: "Ghee Restock Push", client: "Inventory", changes: "+12%", budget: "Tk 11,200", status: "Planned" },
];
