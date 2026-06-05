# Admin Panel - Setup & Getting Started

## Overview

The Admin Panel is a Next.js application that provides administrative control over the entire e-commerce platform. It allows admins to:
- Manage products and inventory
- Track and manage orders
- Manage customers
- View analytics and reports
- Configure site settings

## Prerequisites

- **Node.js**: 18.17 or higher
- **npm** or **yarn**: Package manager
- **Git**: For version control
- **Backend API**: Laravel API running on `http://localhost:8000`

## Quick Start

### 1. Navigate to Admin Panel Directory

```bash
cd frontend/adminpanel
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
NEXT_PUBLIC_PUBLIC_WEBSITE_URL=http://localhost:3000
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Access the admin panel at: `http://localhost:3001`

---

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

---

## Project Structure

```
frontend/adminpanel/
├── app/                      # Next.js 15 app directory
│   ├── (auth)/              # Authentication pages
│   ├── dashboard/           # Dashboard pages
│   ├── products/            # Products management
│   ├── orders/              # Orders management
│   ├── customers/           # Customers management
│   ├── categories/          # Categories management
│   ├── settings/            # Settings pages
│   └── layout.tsx           # Root layout
│
├── components/              # Reusable components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── Forms/
│   ├── Tables/
│   └── ...
│
├── services/                # API services
│   ├── api.ts              # API client
│   ├── productService.ts
│   ├── orderService.ts
│   └── ...
│
├── context/                 # Context API
│   ├── AuthContext.tsx
│   └── AdminContext.tsx
│
├── hooks/                   # Custom hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── ...
│
├── types/                   # TypeScript types
├── utils/                   # Utility functions
├── public/                  # Static files
├── styles/                  # Global styles
├── .env.example            # Environment template
├── next.config.ts          # Next.js config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

---

## Key Features to Implement

### Authentication
- [ ] Login page with email/password
- [ ] JWT token management
- [ ] Protected routes
- [ ] Auto logout on token expiry

### Dashboard
- [ ] Overview metrics (orders, revenue, customers)
- [ ] Recent orders widget
- [ ] Sales charts
- [ ] Quick actions

### Product Management
- [ ] View all products
- [ ] Create new product
- [ ] Edit product details
- [ ] Upload product images
- [ ] Manage inventory
- [ ] Delete products

### Order Management
- [ ] View all orders
- [ ] Order details
- [ ] Update order status
- [ ] Generate invoices
- [ ] Filter and search

### Customer Management
- [ ] View customers list
- [ ] Customer details
- [ ] View customer orders
- [ ] Manage customer status

### Category Management
- [ ] View all categories
- [ ] Create/edit categories
- [ ] Upload category images
- [ ] Manage hierarchy

### Settings
- [ ] Site configuration
- [ ] Email settings
- [ ] Payment settings
- [ ] Shipping configuration

---

## Navigation Structure

```
Admin Panel
├── Dashboard
│   ├── Overview
│   ├── Analytics
│   └── Quick Actions
├── Products
│   ├── Product List
│   ├── Add Product
│   ├── Edit Product
│   └── Manage Categories
├── Orders
│   ├── Order List
│   ├── Order Details
│   └── Generate Invoice
├── Customers
│   ├── Customer List
│   ├── Customer Details
│   └── Customer Orders
├── Analytics
│   ├── Sales Reports
│   ├── Revenue Charts
│   └── Customer Analytics
└── Settings
    ├── Site Settings
    ├── Payment Settings
    ├── Email Settings
    └── User Management
```

---

## Internal Links

### View on Public Website

Create links to preview changes on the public website:

```typescript
// In admin panel components
import Link from 'next/link';

// Preview product on public site
<a href={`${process.env.NEXT_PUBLIC_PUBLIC_WEBSITE_URL}/products/${productId}`} 
   target="_blank" rel="noopener noreferrer">
  View on Website
</a>

// Preview category
<a href={`${process.env.NEXT_PUBLIC_PUBLIC_WEBSITE_URL}/collections/${categorySlug}`}>
  View Collection
</a>
```

---

## API Integration

### Authentication API

```typescript
// Login
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "password123"
}

// Get current user
GET /api/auth/me
Headers: Authorization: Bearer token

// Logout
POST /api/auth/logout
Headers: Authorization: Bearer token
```

### Product API

```typescript
// List products (with pagination)
GET /api/products?page=1&per_page=10&search=keyword

// Create product
POST /api/products
{
  "name": "Product Name",
  "description": "...",
  "price": 99.99,
  "category_id": 1,
  "stock": 100
}

// Update product
PUT /api/products/{id}

// Delete product
DELETE /api/products/{id}
```

### Order API

```typescript
// List orders
GET /api/orders?page=1&status=pending

// Get order details
GET /api/orders/{id}

// Update order status
PUT /api/orders/{id}
{
  "status": "shipped"
}
```

---

## State Management

### Context API Setup

```typescript
// app/layout.tsx
'use client';

import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <AdminProvider>
            {children}
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Using Context

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  
  return <div>Welcome, {user?.name}!</div>;
}
```

---

## Styling

### Tailwind CSS

The admin panel uses Tailwind CSS for styling:

```tsx
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Click me
</button>
```

### Custom Styles

Global styles in `app/globals.css` and component-specific styles.

---

## Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/admin-feature-name
   ```

2. **Make changes**
   - Create components
   - Add pages
   - Implement features

3. **Test locally**
   ```bash
   npm run dev
   ```

4. **Lint and format**
   ```bash
   npm run lint
   npm run format
   ```

5. **Build**
   ```bash
   npm run build
   ```

6. **Commit and push**
   ```bash
   git commit -m "Add admin feature"
   git push origin feature/admin-feature-name
   ```

---

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# URLs
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
NEXT_PUBLIC_PUBLIC_WEBSITE_URL=http://localhost:3000

# Optional
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_SENTRY_DSN=
```

---

## Dependencies

Main packages:
- **next**: ^15.0.0 - React framework
- **react**: ^18.0.0 - UI library
- **typescript**: Latest - Type safety
- **tailwindcss**: Latest - Styling
- **axios**: API client
- **react-hook-form**: Form management
- **zod**: Validation

---

## Common Tasks

### Create a New Page

```bash
# Pages are created in the app directory
# Example: app/products/page.tsx
```

### Create a New Component

```tsx
// components/MyComponent.tsx
'use client';

export default function MyComponent() {
  return <div>Component content</div>;
}
```

### Call API

```typescript
// services/productService.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const productService = {
  getProducts: async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },
  
  createProduct: async (data) => {
    const response = await axios.post(`${API_URL}/products`, data);
    return response.data;
  }
};
```

### Use Custom Hook

```typescript
// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
```

---

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3002
```

### API Connection Error
```bash
# Ensure backend is running on http://localhost:8000
# Check .env.local has correct API_URL
# Check network tab in browser DevTools
```

### Module Not Found Error
```bash
# Clear next cache
rm -rf .next

# Reinstall dependencies
npm install
```

### Build Errors
```bash
# Run type check
npm run type-check

# Check for lint errors
npm run lint
```

---

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production
Update `.env.production` or Vercel dashboard:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_ADMIN_URL=https://admin.yourdomain.com
NEXT_PUBLIC_PUBLIC_WEBSITE_URL=https://yourdomain.com
```

---

## Next Steps

1. ✅ Setup project
2. 🔄 Create authentication
3. 🔄 Build dashboard
4. 🔄 Create product management
5. 🔄 Add order management
6. 🔄 Implement analytics
7. 🔄 Deploy to production

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

For detailed roadmap, see [ROADMAP.md](./ROADMAP.md)

*Last Updated: 2026-06-05*
