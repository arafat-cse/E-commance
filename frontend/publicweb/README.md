# Public Website - E-Commerce Storefront

## Overview

The Public Website is a customer-facing Next.js e-commerce storefront. Customers can:
- Browse and search products
- Manage shopping cart
- Place orders
- Track orders
- Leave reviews
- Manage their account

## Prerequisites

- **Node.js**: 18.17 or higher
- **npm** or **yarn**: Package manager
- **Git**: For version control
- **Backend API**: Laravel API running on `http://localhost:8000`

## Quick Start

### 1. Navigate to Public Website Directory

```bash
cd frontend/publicweb
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
NEXT_PUBLIC_ADMIN_PANEL_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Access the website at: `http://localhost:3000`

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
frontend/publicweb/
├── app/                      # Next.js 15 app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── (auth)/              # Authentication pages
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/
│   ├── (customer)/          # Customer pages
│   │   ├── products/        # Products listing
│   │   ├── collections/     # Categories
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout
│   │   ├── orders/          # Order history
│   │   ├── account/         # User account
│   │   └── wishlist/        # Wishlist
│   └── combos/              # Bundle offers
│
├── components/              # Reusable components
│   ├── Common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   ├── Product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── ProductSlider.tsx
│   │   └── ...
│   ├── Shopping/
│   │   ├── SidebarCart.tsx
│   │   ├── Checkout.tsx
│   │   └── ...
│   └── Home/
│       ├── HeroSlider.tsx
│       ├── FeaturedCategories.tsx
│       └── ...
│
├── context/                 # Context API
│   ├── StoreContext.tsx
│   ├── CartContext.tsx
│   ├── AuthContext.tsx
│   └── ...
│
├── hooks/                   # Custom hooks
│   ├── useCart.ts
│   ├── useAuth.ts
│   ├── useProducts.ts
│   └── ...
│
├── services/                # API services
│   ├── api.ts              # API client
│   ├── productService.ts
│   ├── orderService.ts
│   ├── cartService.ts
│   └── ...
│
├── types/                   # TypeScript types
├── utils/                   # Utility functions
├── data/                    # Mock data (temporary)
├── public/                  # Static files
├── styles/                  # Global styles
├── .env.example            # Environment template
├── next.config.ts          # Next.js config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

---

## Current Components

### ✅ Already Available
- `Header.tsx` - Top navigation
- `Footer.tsx` - Footer section
- `ProductCard.tsx` - Product display card
- `ProductSlider.tsx` - Product carousel
- `CustomerReviews.tsx` - Reviews section
- `FeaturedCategories.tsx` - Category showcase
- `HeroSlider.tsx` - Banner carousel
- `SidebarCart.tsx` - Shopping cart drawer

### 🔄 To Be Enhanced/Created
- Product listing page with filters
- Product details page
- Shopping cart page
- Checkout flow
- User authentication
- Order management
- Account management
- Search functionality

---

## Feature Implementation Plan

### Phase 1: Homepage & Navigation
- [ ] Homepage layout
- [ ] Hero slider
- [ ] Featured products
- [ ] Featured categories
- [ ] Navigation menu
- [ ] Footer links

### Phase 2: Product Discovery
- [ ] Product listing page
- [ ] Category listing
- [ ] Product search
- [ ] Filtering options
- [ ] Sorting options
- [ ] Pagination

### Phase 3: Product Details
- [ ] Product detail page
- [ ] Image gallery
- [ ] Product specifications
- [ ] Price display with discounts
- [ ] Add to cart button
- [ ] Add to wishlist
- [ ] Related products

### Phase 4: Shopping Cart
- [ ] View cart
- [ ] Add/remove items
- [ ] Update quantities
- [ ] Cart summary
- [ ] Apply coupons
- [ ] Proceed to checkout

### Phase 5: Checkout & Orders
- [ ] Shipping address form
- [ ] Shipping method selection
- [ ] Payment method selection
- [ ] Order confirmation
- [ ] Order tracking
- [ ] Order history

### Phase 6: User Account
- [ ] Registration
- [ ] Login
- [ ] Profile management
- [ ] Address management
- [ ] Wishlist
- [ ] Order history
- [ ] Account settings

### Phase 7: Reviews & Ratings
- [ ] View reviews
- [ ] Submit reviews
- [ ] Rate products
- [ ] Helpful votes

---

## API Integration

### Products API

```typescript
// Fetch all products
GET /api/products

// Fetch product by ID
GET /api/products/{id}

// Search products
GET /api/products/search?q=keyword

// Get category products
GET /api/products/category/{categoryId}

// Get product reviews
GET /api/products/{id}/reviews
```

### Cart API

```typescript
// Get cart
GET /api/cart

// Add to cart
POST /api/cart/add
{
  "product_id": 1,
  "quantity": 2
}

// Update cart item
PUT /api/cart/update
{
  "item_id": 1,
  "quantity": 3
}

// Remove from cart
DELETE /api/cart/item/{itemId}
```

### Orders API

```typescript
// Create order
POST /api/orders
{
  "shipping_address": {...},
  "payment_method": "card"
}

// Get user orders
GET /api/orders

// Get order details
GET /api/orders/{orderId}

// Track order
GET /api/orders/{orderId}/tracking
```

### Authentication API

```typescript
// Register
POST /api/auth/register
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}

// Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Get current user
GET /api/auth/me

// Logout
POST /api/auth/logout
```

---

## State Management

### Context API

```typescript
// StoreContext - Global store data
- products
- categories
- user
- notifications

// CartContext - Shopping cart
- items
- totalPrice
- itemCount

// AuthContext - User authentication
- user
- isLoggedIn
- token
```

### Usage Example

```typescript
'use client';

import { useCart } from '@/hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}
```

---

## Key Pages

### Homepage (`/`)
- Hero banner
- Featured products
- Categories
- Special offers
- Customer reviews
- Newsletter signup

### Products (`/products`)
- Product grid
- Filters (price, category, rating)
- Sorting options
- Search
- Pagination

### Product Details (`/products/[id]`)
- Product images
- Specifications
- Price & availability
- Reviews & ratings
- Add to cart
- Related products

### Shopping Cart (`/cart`)
- Cart items list
- Update quantities
- Apply coupons
- Checkout button

### Checkout (`/checkout`)
- Shipping address
- Shipping method
- Payment method
- Order summary
- Place order button

### My Account (`/account`)
- Profile info
- Order history
- Addresses
- Wishlist
- Settings

### Orders (`/orders`)
- Order list
- Order details
- Order tracking
- Reorder button

---

## Navigation Structure

```
Public Website
├── Home
├── Products
│   ├── All Products
│   ├── By Category
│   │   ├── Electronics
│   │   ├── Clothing
│   │   └── ...
│   └── [Product Details]
├── Collections
│   ├── Offer Zone
│   └── Combos
├── Search Results
├── Shopping Cart
├── Checkout
├── Account (if logged in)
│   ├── Profile
│   ├── Orders
│   ├── Addresses
│   ├── Wishlist
│   └── Settings
└── Authentication (if not logged in)
    ├── Login
    ├── Register
    └── Forgot Password
```

---

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# URLs
NEXT_PUBLIC_ADMIN_PANEL_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_SENTRY_DSN=
```

---

## Component Examples

### ProductCard Component

```tsx
'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

export default function ProductCard({ id, name, price, image, rating }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image src={image} alt={name} width={250} height={250} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-blue-600">${price}</span>
          <div className="text-yellow-500">⭐ {rating}</div>
        </div>
        <button
          onClick={() => addToCart({ id, name, price })}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

### useCart Hook

```typescript
// hooks/useCart.ts
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export function useCart() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  
  return context;
}
```

---

## Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/website-feature
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
   git commit -m "Add website feature"
   git push origin feature/website-feature
   ```

---

## Dependencies

Main packages:
- **next**: ^15.0.0
- **react**: ^18.0.0
- **typescript**: Latest
- **tailwindcss**: Latest
- **axios**: API client
- **react-hook-form**: Form management
- **zustand** or **context-api**: State management

---

## Performance Tips

- [ ] Image optimization with `next/image`
- [ ] Code splitting
- [ ] Lazy loading components
- [ ] API response caching
- [ ] Database query optimization
- [ ] CDN for static assets

---

## SEO Optimization

- [ ] Meta tags (title, description)
- [ ] Open Graph tags
- [ ] Structured data (schema.org)
- [ ] Sitemap
- [ ] Robots.txt
- [ ] Canonical URLs

---

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### API Connection Error
- Ensure backend is running
- Check API_URL in .env.local
- Check browser console for errors

### Build Errors
```bash
npm run type-check
npm run lint
rm -rf .next && npm run build
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
npm i -g vercel
vercel
```

---

## Next Steps

1. ✅ Setup project
2. 🔄 Enhance existing components
3. 🔄 Create product pages
4. 🔄 Build shopping cart
5. 🔄 Implement checkout
6. 🔄 Add user authentication
7. 🔄 Integrate API
8. 🔄 Deploy to production

---

For detailed roadmap, see [ROADMAP.md](./ROADMAP.md)

*Last Updated: 2026-06-05*
