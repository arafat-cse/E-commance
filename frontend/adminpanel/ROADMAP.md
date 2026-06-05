# Admin Panel Roadmap

## Overview

The Admin Panel is a Next.js application for managing the e-commerce platform. It controls product catalog, orders, customers, categories, reviews, and dashboard analytics through the Laravel backend API.

Current local admin URL:

```text
http://localhost:3001/admin/login
```

---

## Current Status

Completed:

- [x] Next.js app scaffold
- [x] `/admin/login` route
- [x] `/admin/dashboard` route
- [x] Products list page
- [x] Orders list page
- [x] Customers list page
- [x] Categories list page
- [x] Settings page
- [x] Shared admin shell/sidebar layout
- [x] Shared table and status badge components
- [x] Mock operational data for first UI pass
- [x] Build and lint passing

In progress / next:

- [ ] Connect UI to Laravel admin API
- [ ] JWT login and token storage
- [ ] Protected route middleware
- [ ] Create/edit product forms
- [ ] Order detail page and status update actions
- [ ] Customer detail page and status update actions
- [ ] Review moderation page
- [ ] Replace mock data with API services

---

## Architecture

Admin actions flow through the backend and update publicweb data:

```text
Admin Panel
  -> Laravel Admin API
  -> Database
  -> Public Website reads updated product/order/category data
```

Backend admin API namespace:

```text
/api/admin/...
```

Public storefront API namespace:

```text
/api/storefront/...
```

---

## Implemented Project Structure

```text
frontend/adminpanel/
|-- app/
|   |-- layout.tsx
|   |-- page.tsx                         # redirects to /admin/login
|   |-- globals.css
|   `-- admin/
|       |-- page.tsx                     # redirects to /admin/dashboard
|       |-- shared.module.css
|       |-- login/
|       |   |-- page.tsx                 # /admin/login
|       |   `-- login.module.css
|       |-- dashboard/
|       |   |-- page.tsx                 # /admin/dashboard
|       |   `-- page.module.css
|       |-- products/page.tsx            # /admin/products
|       |-- orders/page.tsx              # /admin/orders
|       |-- customers/page.tsx           # /admin/customers
|       |-- categories/page.tsx          # /admin/categories
|       `-- settings/page.tsx            # /admin/settings
|-- components/
|   |-- AdminShell.tsx
|   |-- AdminShell.module.css
|   |-- AdminTable.tsx
|   |-- AdminTable.module.css
|   |-- StatusBadge.tsx
|   `-- StatusBadge.module.css
|-- lib/
|   `-- adminData.ts                     # temporary mock data
|-- package.json
|-- tsconfig.json
|-- next.config.ts
`-- eslint.config.mjs
```

---

## Route Map

Admin UI:

```text
GET /admin/login
GET /admin/dashboard
GET /admin/products
GET /admin/orders
GET /admin/customers
GET /admin/categories
GET /admin/settings
```

Future detail/create pages:

```text
GET /admin/products/create
GET /admin/products/{id}
GET /admin/orders/{id}
GET /admin/customers/{id}
GET /admin/categories/{id}
GET /admin/reviews
```

---

## Backend API Integration

Authentication:

```text
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
POST /api/auth/refresh
```

Admin dashboard:

```text
GET /api/admin/dashboard
GET /api/admin/settings
```

Products:

```text
GET    /api/admin/products
POST   /api/admin/products
GET    /api/admin/products/{id}
PUT    /api/admin/products/{id}
DELETE /api/admin/products/{id}
```

Orders:

```text
GET /api/admin/orders
GET /api/admin/orders/{id}
PUT /api/admin/orders/{id}
```

Customers:

```text
GET    /api/admin/customers
GET    /api/admin/customers/{id}
PUT    /api/admin/customers/{id}
DELETE /api/admin/customers/{id}
```

Categories:

```text
GET    /api/admin/categories
PUT    /api/admin/categories/{category}
DELETE /api/admin/categories/{category}
```

Reviews:

```text
GET    /api/admin/reviews
PUT    /api/admin/reviews/{id}
DELETE /api/admin/reviews/{id}
```

---

## Feature Plan

### Authentication

- [x] Login screen UI
- [ ] Submit credentials to `/api/auth/login`
- [ ] Store JWT token securely
- [ ] Load current admin with `/api/auth/me`
- [ ] Redirect non-admin users away from `/admin/*`
- [ ] Logout and token refresh

### Dashboard

- [x] Metrics cards
- [x] Recent orders table
- [x] Operations focus panel
- [ ] Connect to `/api/admin/dashboard`
- [ ] Add basic charts after live data exists

### Product Management

- [x] Product list UI
- [x] Search/filter toolbar UI
- [ ] Fetch from `/api/admin/products`
- [ ] Create product form
- [ ] Edit product form
- [ ] Delete confirmation modal
- [ ] Publicweb preview link

### Order Management

- [x] Order list UI
- [x] Status/payment badges
- [ ] Fetch from `/api/admin/orders`
- [ ] Order detail page
- [ ] Status update action
- [ ] Invoice data view

### Customer Management

- [x] Customer list UI
- [ ] Fetch from `/api/admin/customers`
- [ ] Customer detail page
- [ ] Customer order history
- [ ] Suspend/delete customer action

### Category Management

- [x] Category list UI
- [ ] Fetch from `/api/admin/categories`
- [ ] Rename category
- [ ] Move products before deleting category

### Settings

- [x] Settings overview UI
- [ ] Fetch from `/api/admin/settings`
- [ ] Persist configurable settings when backend storage exists

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001/admin
NEXT_PUBLIC_PUBLIC_WEBSITE_URL=http://localhost:3000
```

---

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

Development server:

```text
http://localhost:3001/admin/login
```

---

## Verification

Last checked:

- [x] `npm run lint`
- [x] `npm run build`
- [x] `/admin/login` returns HTTP 200 locally

---

*Last Updated: 2026-06-05*
