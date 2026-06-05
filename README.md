# E-Commerce Project Map

This repository is organized to separate the client-side customer storefront, the administrative dashboard, and the backend service APIs.

## Repository Directory Map

```text
E-commance/
│
├── frontend/                     # Frontend applications
│   ├── publicweb/                # Next.js customer-facing storefront (Current)
│   │   ├── app/                  # Next.js App Router routes and page components
│   │   ├── components/           # Reusable client-side UI components
│   │   ├── context/              # React Context provider for state management (Cart, Wishlist)
│   │   ├── data/                 # Sample product and review data
│   │   ├── public/               # Static assets (images, icons)
│   │   └── package.json          # Dependency and run script definitions
│   │
│   └── adminpanel/               # Future Next.js admin control dashboard (Placeholder)
│
├── backend/                      # Backend APIs
│   └── [laravel-api]             # Future Laravel RESTful API database endpoints (Placeholder)
│
└── README.md                     # Project directory structure map and developer guide
```

---

## Getting Started

### Customer Storefront (frontend/publicweb)

First, navigate to the public web project directory:

```bash
cd frontend/publicweb
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the customer storefront.

---

## Architectural Role Summary

1. **`frontend/publicweb` (Next.js)**: The customer-facing website where visitors browse organic food products, add items to their carts, view combo offers, and place orders.
2. **`frontend/adminpanel` (React/Next.js)**: The management dashboard where store administrators manage product inventory, view customer orders, and update configurations.
3. **`backend` (Laravel REST API)**: The data server handling database entities, order processing logic, payment gateway APIs, and store settings.
