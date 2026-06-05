# Backend API - Laravel Setup Guide

## Overview
This is the Laravel backend API for the E-Commerce platform. It provides RESTful endpoints for the Admin Panel and Public Website.

## Prerequisites

- **PHP**: 8.2 or higher
- **Composer**: Latest version
- **MySQL**: 8.0 or higher
- **Git**: For version control
- **Node.js**: Optional (for frontend assets)

## Installation Steps

### 1. Clone or Initialize the Project

```bash
cd backend
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Generate JWT secret
php artisan jwt:secret
```

### 4. Database Setup

Create a new MySQL database:

```bash
mysql -u root -p
CREATE DATABASE ecommerce;
EXIT;
```

### 5. Update .env File

Edit `.env` file with your configuration:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=root
DB_PASSWORD=your_password

JWT_SECRET=your-generated-secret-from-step-3
```

### 6. Run Migrations

```bash
php artisan migrate
```

### 7. Seed Database (Optional)

```bash
php artisan db:seed
```

### 8. Start Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

---

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/      # Request handlers
│   │   ├── Middleware/       # Request middleware
│   │   └── Requests/         # Form requests
│   ├── Models/               # Database models
│   └── Services/             # Business logic
│
├── routes/
│   ├── api.php              # API routes
│   └── web.php              # Web routes
│
├── database/
│   ├── migrations/          # Database migrations
│   ├── seeders/            # Database seeders
│   └── factories/           # Model factories
│
├── config/                  # Configuration files
├── storage/                # File storage
├── tests/                  # Test files
├── .env.example           # Environment template
├── composer.json          # Dependencies
└── artisan                # Artisan CLI
```

---

## Key Artisan Commands

```bash
# Create new model
php artisan make:model ModelName -mcr

# Create migration
php artisan make:migration create_table_name

# Create controller
php artisan make:controller ControllerName --resource

# Create request class
php artisan make:request RequestName

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Seed database
php artisan db:seed

# Create seeder
php artisan make:seeder SeederName

# Run tests
php artisan test

# Clear cache
php artisan cache:clear

# Start server
php artisan serve

# Tinker (REPL)
php artisan tinker
```

---

## API Routes

The API routes are defined in `routes/api.php`. All routes are prefixed with `/api`.

### Base URL
```
http://localhost:8000/api
```

### Authentication Routes
```
POST   /auth/register      - Register new user
POST   /auth/login         - Login user
POST   /auth/logout        - Logout user (requires token)
POST   /auth/refresh       - Refresh JWT token
GET    /auth/me            - Get current user (requires token)
```

### Public Routes (No Auth Required)
```
GET    /products           - List products
GET    /products/{id}      - Get product details
GET    /categories         - List categories
GET    /reviews            - List reviews
```

### Protected Routes (Auth Required)
```
POST   /cart/add           - Add to cart
PUT    /orders             - Create order
GET    /orders             - Get user orders
```

### Admin Routes (Admin Only)
```
POST   /products           - Create product
PUT    /products/{id}      - Update product
DELETE /products/{id}      - Delete product
POST   /customers          - Manage customers
```

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Getting a Token

1. Register a new user:
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

2. Login:
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "Bearer",
  "expires_in": 1440,
  "user": { ... }
}
```

### Using Token

Include the token in the Authorization header:

```bash
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### Token Refresh

When token expires, refresh it:

```bash
POST /api/auth/refresh
Authorization: Bearer old_token
```

---

## Database Models

### User
- id (Primary Key)
- name
- email
- password
- phone
- role (customer, admin, moderator)
- status (active, suspended, deleted)
- email_verified_at
- timestamps

### Product
- id (Primary Key)
- category_id (Foreign Key)
- name
- description
- price
- discount_price
- sku
- stock
- images (JSON)
- is_featured
- rating
- timestamps

### Category
- id (Primary Key)
- name
- slug
- description
- image
- parent_id
- is_active
- timestamps

### Order
- id (Primary Key)
- user_id (Foreign Key)
- order_number
- total_amount
- tax
- shipping_cost
- status
- payment_status
- shipping_address (JSON)
- notes
- timestamps

### OrderItem
- id (Primary Key)
- order_id (Foreign Key)
- product_id (Foreign Key)
- quantity
- price

### Review
- id (Primary Key)
- product_id (Foreign Key)
- user_id (Foreign Key)
- rating (1-5)
- comment
- is_verified
- timestamps

---

## Error Handling

All API responses follow a standard format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { ... }
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

## Testing

Run tests with PHPUnit:

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test tests/Feature/ApiTest.php

# Run with coverage
php artisan test --coverage
```

---

## Development Workflow

1. **Feature Branch**: Create a feature branch for each feature
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make Changes**: Implement your feature

3. **Write Tests**: Add tests for your feature

4. **Run Tests**: Ensure all tests pass
   ```bash
   php artisan test
   ```

5. **Commit**: Commit your changes
   ```bash
   git commit -m "Add feature description"
   ```

6. **Push**: Push to origin
   ```bash
   git push origin feature/feature-name
   ```

7. **Create PR**: Create a pull request for review

---

## Useful Resources

- [Laravel Documentation](https://laravel.com/docs)
- [JWT Authentication](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## Troubleshooting

### Database Connection Error
```bash
# Check your .env file database settings
# Make sure MySQL service is running
# Ensure database exists
```

### Permission Denied Error
```bash
# Set proper permissions
chmod -R 775 storage bootstrap/cache
```

### Composer Dependency Error
```bash
# Clear composer cache
composer clear-cache

# Update dependencies
composer update
```

### Port Already in Use
```bash
# Use different port
php artisan serve --port=8001
```

---

## Next Steps

1. ✅ Setup and installation
2. 🔄 Create database models
3. 🔄 Implement API controllers
4. 🔄 Add validation
5. 🔄 Implement authentication
6. 🔄 Write tests
7. 🔄 Deploy to production

---

For more details, see the [ROADMAP.md](./ROADMAP.md) file.

*Last Updated: 2026-06-05*
