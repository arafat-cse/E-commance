# Public Website Roadmap

## Overview
The Public Website is a customer-facing Next.js e-commerce storefront. Customers can browse products, manage shopping carts, make purchases, and track orders. All content is managed through the Admin Panel.

---

## Key Objectives

1. **Product Discovery** - Browse and search products
2. **Shopping Experience** - Add to cart, wishlist, checkout
3. **Customer Accounts** - Register, login, order history
4. **Product Information** - Detailed product pages with reviews
5. **Category Navigation** - Organized product browsing
6. **Order Management** - Place orders and track them

---

## Current Structure

```
frontend/publicweb/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   │
│   ├── (customer)/
│   │   ├── products/
│   │   │   ├── page.tsx        # Products listing
│   │   │   └── [id]/page.tsx   # Product details
│   │   │
│   │   ├── collections/
│   │   │   ├── page.tsx        # All categories
│   │   │   ├── [slug]/page.tsx # Category products
│   │   │   └── offer-zone/
│   │   │       └── page.tsx    # Special offers
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx        # Shopping cart
│   │   │
│   │   ├── checkout/
│   │   │   └── page.tsx        # Checkout page
│   │   │
│   │   ├── orders/
│   │   │   ├── page.tsx        # Orders history
│   │   │   └── [id]/page.tsx   # Order details
│   │   │
│   │   ├── account/
│   │   │   ├── page.tsx        # Account dashboard
│   │   │   ├── profile/
│   │   │   ├── addresses/
│   │   │   └── settings/
│   │   │
│   │   └── wishlist/
│   │       └── page.tsx        # Wishlist page
│   │
│   ├── (auth)/
│   │   ├── login/page.tsx      # Login page
│   │   ├── register/page.tsx   # Registration
│   │   └── forgot-password/
│   │       └── page.tsx
│   │
│   └── combos/
│       └── page.tsx            # Bundle offers
│
├── components/
│   ├── Common/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Footer
│   │   ├── Navbar.tsx          # Top navigation
│   │   └── Sidebar.tsx         # Filter sidebar
│   │
│   ├── Product/
│   │   ├── ProductCard.tsx     # Product card
│   │   ├── ProductSlider.tsx   # Product carousel
│   │   ├── ProductDetails.tsx  # Detail page
│   │   ├── ProductImage.tsx    # Image gallery
│   │   └── ProductReviews.tsx  # Reviews section
│   │
│   ├── Shopping/
│   │   ├── SidebarCart.tsx     # Cart drawer
│   │   ├── CartItem.tsx        # Cart item
│   │   ├── Checkout.tsx        # Checkout form
│   │   └── PaymentForm.tsx     # Payment integration
│   │
│   ├── Home/
│   │   ├── HeroSlider.tsx      # Banner carousel
│   │   ├── FeaturedCategories.tsx
│   │   ├── PromoBanner.tsx     # Special offers
│   │   └── CustomerReviews.tsx # Testimonials
│   │
│   ├── Account/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProfileForm.tsx
│   │
│   └── Common/
│       ├── Pagination.tsx
│       ├── SearchBar.tsx
│       └── Filters.tsx
│
├── context/
│   ├── StoreContext.tsx        # Global store state
│   ├── CartContext.tsx         # Cart management
│   ├── AuthContext.tsx         # Auth state
│   └── NotificationContext.tsx
│
├── hooks/
│   ├── useCart.ts
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useFetch.ts
│   └── useNotification.ts
│
├── services/
│   ├── api.ts                  # API client
│   ├── productService.ts
│   ├── orderService.ts
│   ├── cartService.ts
│   ├── authService.ts
│   └── paymentService.ts
│
├── types/
│   ├── product.ts
│   ├── order.ts
│   ├── cart.ts
│   ├── user.ts
│   └── api.ts
│
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   ├── formatters.ts
│   └── validators.ts
│
├── data/
│   └── products.ts             # Mock data (temporary)
│
├── public/
│   └── images/
│
└── [config files]
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.js
    └── eslint.config.mjs
```

---

## Feature Set

### 🏠 Homepage
- [ ] Hero slider/banner
- [ ] Featured categories
- [ ] Best sellers carousel
- [ ] Flash deals section
- [ ] Customer reviews/testimonials
- [ ] Newsletter signup
- [ ] Recent products

### 🛍️ Product Browsing
- [ ] Product listing page with grid view
- [ ] Product filtering (price, category, rating)
- [ ] Product search functionality
- [ ] Sorting options (newest, price, rating)
- [ ] Pagination
- [ ] Product details page
- [ ] Product images gallery
- [ ] Product specifications
- [ ] Price display with discounts

### 🛒 Shopping Cart
- [ ] Add to cart functionality
- [ ] View cart (sidebar/dedicated page)
- [ ] Update product quantity
- [ ] Remove items from cart
- [ ] Save for later
- [ ] Cart summary (subtotal, tax, total)
- [ ] Apply coupon codes
- [ ] Free shipping threshold indicator

### 💳 Checkout Process
- [ ] Shopping cart review
- [ ] Shipping address selection/entry
- [ ] Shipping method selection
- [ ] Payment method selection
- [ ] Order review
- [ ] Place order confirmation

### 👤 User Account
- [ ] User registration
- [ ] Email verification
- [ ] Login/logout
- [ ] Forgot password
- [ ] Profile management
- [ ] Address management
- [ ] Order history
- [ ] Order tracking
- [ ] Wishlist management
- [ ] Account settings

### ⭐ Reviews & Ratings
- [ ] View product reviews
- [ ] Submit reviews (logged-in users)
- [ ] Rate products
- [ ] Helpful review votes
- [ ] Review moderation

### 🎁 Special Offers
- [ ] Flash deals section
- [ ] Offer zone page
- [ ] Bundle combos
- [ ] Seasonal promotions
- [ ] Coupon/discount codes
- [ ] Limited time offers

### 📦 Order Management
- [ ] Order confirmation email
- [ ] Order tracking page
- [ ] Real-time status updates
- [ ] Download invoices
- [ ] Return requests
- [ ] Customer support chat

### 🔍 Search & Discovery
- [ ] Full-text product search
- [ ] Category navigation
- [ ] Filter options
- [ ] Search suggestions
- [ ] Related products
- [ ] Frequently bought together

---

## E-Commerce Essential Components

### Required Components to Create

1. **ProductCard** - Display product in grid
   - Product image
   - Product name
   - Price & discount
   - Rating & reviews count
   - Add to cart button
   - Add to wishlist button

2. **ProductDetails** - Detailed product view
   - Image gallery
   - Product info
   - Pricing & availability
   - Size/Color options
   - Quantity selector
   - Add to cart button
   - Reviews section

3. **CartItem** - Individual cart item
   - Product image
   - Product name
   - Price per item
   - Quantity control
   - Remove button
   - Subtotal

4. **CheckoutForm** - Checkout process
   - Shipping details
   - Payment method selection
   - Order summary
   - Submit order

5. **ProductFilters** - Sidebar filters
   - Price range
   - Category
   - Rating
   - Availability
   - Sort options

6. **SearchBar** - Product search
   - Search input
   - Auto-suggestions
   - Search filters

---

## API Endpoints Used

### Products
- `GET /api/products` - Fetch products
- `GET /api/products/{id}` - Get product details
- `GET /api/products/category/{catId}` - Category products
- `GET /api/products/search?q=term` - Search products

### Cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/item/{id}` - Remove item
- `GET /api/cart` - Get cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - User orders
- `GET /api/orders/{id}` - Order details
- `PUT /api/orders/{id}/cancel` - Cancel order

### Users
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/users/profile` - User profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/addresses` - Add address

### Reviews
- `GET /api/products/{id}/reviews` - Product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review

---

## Development Timeline

| Week | Tasks | Status |
|------|-------|--------|
| 1 | Homepage, header, footer, navigation | ✅ Basic |
| 2 | Product listing, product details | 🔄 |
| 3 | Shopping cart, checkout | ⏳ |
| 4 | User account, orders | ⏳ |
| 5 | Reviews, search, filters | ⏳ |
| 6 | Performance, optimization | ⏳ |

---

## Current Components Status

### ✅ Already Available
- [x] Header component
- [x] Footer component
- [x] ProductCard
- [x] ProductSlider
- [x] CustomerReviews
- [x] FeaturedCategories
- [x] HeroSlider
- [x] SidebarCart

### 🔄 In Progress / Need Enhancement

### ⏳ To Be Created
- [ ] Product Listing Page (with filters)
- [ ] Product Details Page
- [ ] Shopping Cart Page
- [ ] Checkout Page
- [ ] Login/Register Pages
- [ ] User Account Pages
- [ ] Order Tracking
- [ ] Search Functionality
- [ ] Filter/Sorting System

---

## State Management Strategy

### Context API Usage
```typescript
// StoreContext - Global app state
- products
- categories
- currentUser
- notifications

// CartContext - Shopping cart
- cartItems
- totalPrice
- itemCount

// AuthContext - User authentication
- user
- isLoggedIn
- token
```

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_ADMIN_PANEL_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_KEY=your-stripe-key
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

---

## Performance Targets

- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 90
- [ ] Mobile responsiveness 100%
- [ ] SEO optimization
- [ ] Image optimization
- [ ] Code splitting implemented

---

## Security Implementation

- [ ] HTTPS only
- [ ] CORS configuration
- [ ] Input sanitization
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Secure password handling
- [ ] Rate limiting
- [ ] Payment security (PCI compliance)

---

## Next Steps

1. ✅ Create this roadmap
2. 🔄 Complete existing components
3. 🔄 Create pages structure
4. 🔄 Setup state management
5. 🔄 Integrate with backend API
6. 🔄 Add authentication
7. 🔄 Implement shopping flow
8. 🔄 Add payment integration

---

*Last Updated: 2026-06-05*
