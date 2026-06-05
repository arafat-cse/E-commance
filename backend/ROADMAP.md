# Backend API Roadmap

## Overview
The Laravel backend provides RESTful APIs for the entire e-commerce platform. It handles:
- User authentication and authorization
- Product management
- Order processing
- Payment handling
- Business logic & validation
- Database operations

---

## Architecture

```
┌─────────────────────────────────────────┐
│      Frontend Applications              │
│  (Admin Panel & Public Website)         │
└────────────────┬────────────────────────┘
                 │
                 │ HTTP Requests
                 ▼
┌─────────────────────────────────────────┐
│      Laravel Backend API                │
│                                         │
│  ├─ Controllers (Request Handling)      │
│  ├─ Models (Data Representation)        │
│  ├─ Services (Business Logic)           │
│  ├─ Middleware (Auth & Validation)      │
│  └─ Routes (API Endpoints)              │
│                                         │
└────────────────┬────────────────────────┘
                 │
                 │ Database Queries
                 ▼
        ┌──────────────────┐
        │   MySQL Database │
        └──────────────────┘
```

---

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── ProductController.php
│   │   │   ├── OrderController.php
│   │   │   ├── CustomerController.php
│   │   │   ├── CategoryController.php
│   │   │   ├── ReviewController.php
│   │   │   ├── CartController.php
│   │   │   └── DashboardController.php
│   │   │
│   │   ├── Requests/
│   │   │   ├── LoginRequest.php
│   │   │   ├── RegisterRequest.php
│   │   │   ├── ProductRequest.php
│   │   │   ├── OrderRequest.php
│   │   │   └── ReviewRequest.php
│   │   │
│   │   ├── Middleware/
│   │   │   ├── JwtMiddleware.php
│   │   │   ├── AdminMiddleware.php
│   │   │   └── CustomerMiddleware.php
│   │   │
│   │   └── Resources/
│   │       ├── ProductResource.php
│   │       ├── OrderResource.php
│   │       ├── CustomerResource.php
│   │       └── ReviewResource.php
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── Product.php
│   │   ├── Category.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   ├── Customer.php
│   │   ├── Review.php
│   │   ├── Cart.php
│   │   ├── CartItem.php
│   │   └── Payment.php
│   │
│   ├── Services/
│   │   ├── AuthService.php
│   │   ├── ProductService.php
│   │   ├── OrderService.php
│   │   ├── PaymentService.php
│   │   ├── EmailService.php
│   │   └── ReportService.php
│   │
│   └── Exceptions/
│       ├── AuthException.php
│       ├── ValidationException.php
│       └── PaymentException.php
│
├── routes/
│   ├── api.php                 # API routes
│   ├── web.php                 # Web routes
│   └── auth.php                # Auth routes
│
├── database/
│   ├── migrations/
│   │   ├── 2024_01_01_000000_create_users_table.php
│   │   ├── 2024_01_01_000001_create_products_table.php
│   │   ├── 2024_01_01_000002_create_categories_table.php
│   │   ├── 2024_01_01_000003_create_orders_table.php
│   │   ├── 2024_01_01_000004_create_order_items_table.php
│   │   ├── 2024_01_01_000005_create_reviews_table.php
│   │   ├── 2024_01_01_000006_create_carts_table.php
│   │   └── 2024_01_01_000007_create_payments_table.php
│   │
│   ├── seeders/
│   │   ├── DatabaseSeeder.php
│   │   ├── UserSeeder.php
│   │   ├── CategorySeeder.php
│   │   ├── ProductSeeder.php
│   │   └── ReviewSeeder.php
│   │
│   └── factories/
│       ├── UserFactory.php
│       ├── ProductFactory.php
│       └── OrderFactory.php
│
├── config/
│   ├── app.php
│   ├── database.php
│   ├── auth.php
│   ├── cors.php
│   └── jwt.php                 # JWT config
│
├── .env.example
├── composer.json
├── artisan
└── server.php
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  role ENUM('customer', 'admin', 'moderator'),
  status ENUM('active', 'suspended', 'deleted'),
  email_verified_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY,
  category_id BIGINT,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  discount_price DECIMAL(10, 2),
  sku VARCHAR(255) UNIQUE,
  stock INT,
  images JSON,
  is_featured BOOLEAN,
  rating DECIMAL(3, 2),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id BIGINT PRIMARY KEY,
  name VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  image VARCHAR(255),
  parent_id BIGINT,
  is_active BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  user_id BIGINT,
  order_number VARCHAR(255) UNIQUE,
  total_amount DECIMAL(10, 2),
  tax DECIMAL(10, 2),
  shipping_cost DECIMAL(10, 2),
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
  payment_status ENUM('pending', 'paid', 'failed', 'refunded'),
  shipping_address JSON,
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id BIGINT PRIMARY KEY,
  order_id BIGINT,
  product_id BIGINT,
  quantity INT,
  price DECIMAL(10, 2),
  created_at TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id BIGINT PRIMARY KEY,
  product_id BIGINT,
  user_id BIGINT,
  rating INT (1-5),
  comment TEXT,
  is_verified BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
POST   /api/auth/refresh       - Refresh JWT token
GET    /api/auth/me            - Get current user
```

### Product Endpoints
```
GET    /api/products           - List all products (with pagination)
GET    /api/products/{id}      - Get product details
POST   /api/products           - Create product (admin only)
PUT    /api/products/{id}      - Update product (admin only)
DELETE /api/products/{id}      - Delete product (admin only)
GET    /api/products/search?q= - Search products
GET    /api/products/category/{catId} - Products by category
GET    /api/products/{id}/reviews - Product reviews
```

### Category Endpoints
```
GET    /api/categories         - List all categories
GET    /api/categories/{id}    - Get category details
POST   /api/categories         - Create category (admin)
PUT    /api/categories/{id}    - Update category (admin)
DELETE /api/categories/{id}    - Delete category (admin)
```

### Order Endpoints
```
GET    /api/orders             - Get user orders
GET    /api/orders/{id}        - Get order details
POST   /api/orders             - Create new order
PUT    /api/orders/{id}        - Update order (admin)
PUT    /api/orders/{id}/status - Update order status (admin)
DELETE /api/orders/{id}        - Cancel order
GET    /api/orders/{id}/invoice - Download invoice
```

### Cart Endpoints
```
GET    /api/cart               - Get user cart
POST   /api/cart/add           - Add item to cart
PUT    /api/cart/update        - Update cart item quantity
DELETE /api/cart/item/{itemId} - Remove from cart
DELETE /api/cart/clear         - Clear entire cart
```

### Customer Endpoints (Admin)
```
GET    /api/customers          - List all customers
GET    /api/customers/{id}     - Get customer details
PUT    /api/customers/{id}     - Update customer
DELETE /api/customers/{id}     - Delete customer
GET    /api/customers/{id}/orders - Customer orders
```

### Review Endpoints
```
GET    /api/reviews            - List reviews
POST   /api/reviews            - Create review
PUT    /api/reviews/{id}       - Update review
DELETE /api/reviews/{id}       - Delete review
POST   /api/reviews/{id}/helpful - Mark as helpful
```

### Dashboard Endpoints (Admin)
```
GET    /api/dashboard/stats    - Dashboard statistics
GET    /api/dashboard/sales    - Sales data
GET    /api/dashboard/orders   - Recent orders
GET    /api/dashboard/revenue  - Revenue reports
```

---

## Authentication

### JWT Implementation
- Token expiry: 24 hours
- Refresh token: 30 days
- Headers: `Authorization: Bearer {token}`
- Middleware: Verify on protected routes

### User Roles
```
1. CUSTOMER - Regular user
   - Browse products
   - Create reviews
   - Place orders
   - View own orders

2. ADMIN - Administrator
   - Full access
   - Manage products
   - Manage orders
   - Manage users
   - View analytics

3. MODERATOR - Content moderator
   - Approve/reject reviews
   - Manage reported content
```

---

## Key Features to Implement

### Phase 1: Authentication & Basic Setup
- [ ] User registration
- [ ] User login
- [ ] JWT token generation
- [ ] Password hashing
- [ ] Email verification

### Phase 2: Product Management
- [ ] Product CRUD
- [ ] Product search
- [ ] Category management
- [ ] Product images handling
- [ ] Inventory management

### Phase 3: Order Management
- [ ] Shopping cart logic
- [ ] Order creation
- [ ] Order status tracking
- [ ] Order cancellation
- [ ] Invoice generation

### Phase 4: Payment Processing
- [ ] Payment gateway integration
- [ ] Payment verification
- [ ] Refund handling
- [ ] Transaction logging

### Phase 5: Additional Features
- [ ] Product reviews & ratings
- [ ] Email notifications
- [ ] Admin dashboard stats
- [ ] Customer reports
- [ ] Audit logging

---

## Development Timeline

| Week | Phase | Tasks | Status |
|------|-------|-------|--------|
| 1 | Setup | Project init, DB, Auth | 🔄 |
| 2 | Core | Products, Categories | ⏳ |
| 3 | Shopping | Cart, Orders | ⏳ |
| 4 | Features | Payments, Reviews | ⏳ |
| 5 | Polish | Testing, Optimization | ⏳ |

---

## Technology Stack

- **Framework**: Laravel 11
- **PHP Version**: 8.2 or higher
- **Database**: MySQL 8.0+
- **Authentication**: JWT (tymon/jwt-auth)
- **API Documentation**: OpenAPI/Swagger
- **Testing**: PHPUnit
- **Validation**: Laravel Validation
- **Queue**: Redis/Database jobs

---

## Dependencies

```json
{
  "require": {
    "php": "^8.2",
    "laravel/framework": "^11.0",
    "laravel/sanctum": "^3.0",
    "tymon/jwt-auth": "^2.0",
    "symfony/http-client": "^6.0",
    "maatwebsite/excel": "^3.1"
  },
  "require-dev": {
    "phpunit/phpunit": "^11.0",
    "laravel/pint": "^1.0",
    "phpstan/phpstan": "^1.0"
  }
}
```

---

## Environment Configuration

```env
APP_NAME="E-Commerce API"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://api.example.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRES_IN=1440

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=
MAIL_PASSWORD=

STRIPE_KEY=sk_live_...
STRIPE_SECRET=
```

---

## CORS Configuration

```php
// Access-Control-Allow-Origin: http://localhost:3000, http://localhost:3001
// Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
// Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Error Handling

### Standard Response Format

```json
// Success
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}

// Error
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### HTTP Status Codes
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Unprocessable Entity
- 500: Server Error

---

## Performance & Security

- [ ] Database indexing on frequently queried columns
- [ ] Query optimization
- [ ] Rate limiting
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Password hashing (bcrypt)
- [ ] Secure headers
- [ ] API key management
- [ ] Logging & monitoring

---

## Testing

- [ ] Unit tests for services
- [ ] Feature tests for API endpoints
- [ ] Integration tests
- [ ] Database seeding for tests
- [ ] Test coverage > 80%

---

## Deployment

- [ ] Environment setup
- [ ] Database migration
- [ ] Caching configuration
- [ ] Queue setup
- [ ] Monitoring setup
- [ ] Backup strategy

---

## Next Steps

1. ✅ Create this roadmap
2. 🔄 Initialize Laravel project
3. 🔄 Setup database & migrations
4. 🔄 Create models
5. 🔄 Implement authentication
6. 🔄 Create API endpoints
7. 🔄 Add validation & error handling
8. 🔄 Write tests
9. 🔄 Deploy

---

*Last Updated: 2026-06-05*
