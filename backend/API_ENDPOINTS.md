# API Endpoints Documentation

Complete REST API reference for the E-Commerce Platform.

---

## 📍 Base URL

```
http://localhost:8000/api
```

---

## 🔐 Authentication

### JWT Token Authentication

All protected endpoints require an `Authorization` header:

```
Authorization: Bearer {your_jwt_token}
```

**Token Expiration:** 24 hours  
**Refresh Token:** 30 days

---

## 📚 Endpoints Reference

### 🔑 Authentication Endpoints

#### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "access_token": "eyJ0eXAi...",
    "token_type": "Bearer",
    "expires_in": 86400
  }
}
```

---

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "access_token": "eyJ0eXAi...",
    "token_type": "Bearer",
    "expires_in": 86400
  }
}
```

---

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "phone": "01700000000",
    "created_at": "2026-06-05T10:00:00Z"
  }
}
```

---

#### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {old_token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "access_token": "eyJ0eXAi...",
    "token_type": "Bearer",
    "expires_in": 86400
  }
}
```

---

#### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### Check Email Exists
```http
GET /auth/check-email?email=john@example.com
```

**Response:** 200 OK
```json
{
  "success": true,
  "email_exists": false
}
```

---

### 🛍️ Product Endpoints

#### Get All Products
```http
GET /products?page=1&per_page=12&search=honey&category=মধু&sort=price&order=ASC
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | integer | Page number (default: 1) |
| per_page | integer | Items per page (default: 12) |
| search | string | Search by name or description |
| category | string | Filter by category |
| min_price | number | Minimum price filter |
| max_price | number | Maximum price filter |
| sort | string | Sort by (price, rating, created_at) |
| order | string | ASC or DESC |

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "সুন্দরবনের খলিশা ফুলের মধু",
      "price": 1250,
      "original_price": 1400,
      "discount_percentage": 11,
      "image": "/images/honey.png",
      "weight": "১ কেজি",
      "rating": 4.9,
      "reviews_count": 128,
      "category": "মধু (Honey)",
      "is_featured": true,
      "tag": "জনপ্রিয়",
      "created_at": "2026-06-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "per_page": 12,
    "current_page": 1,
    "last_page": 9,
    "from": 1,
    "to": 12
  }
}
```

---

#### Get Product by ID
```http
GET /products/{id}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "সুন্দরবনের খলিশা ফুলের মধু",
    "description": "খাঁটি প্রাকৃতিক মধু",
    "price": 1250,
    "original_price": 1400,
    "sku": "HONEY-001",
    "stock": 50,
    "image": "/images/honey.png",
    "weight": "১ কেজি",
    "rating": 4.9,
    "reviews_count": 128,
    "category": "মধু (Honey)",
    "is_in_stock": true
  }
}
```

---

#### Get Featured Products
```http
GET /products/featured
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    { ... },
    { ... }
  ]
}
```

---

#### Get Products by Category
```http
GET /products/category/{category}?page=1
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": { ... }
}
```

---

#### Get All Categories
```http
GET /categories
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    "মধু (Honey)",
    "খেজুর (Dates)",
    "বাদাম (Nuts)"
  ]
}
```

---

### ⭐ Review Endpoints

#### Get Product Reviews
```http
GET /products/{productId}/reviews?page=1
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "user_name": "Ahmed",
      "rating": 5,
      "comment": "খুবই চমৎকার মধু। দাম সাশ্রয়ী এবং মান ভালো।",
      "helpful_count": 15,
      "is_approved": true,
      "created_at": "2026-06-01T10:00:00Z"
    }
  ],
  "pagination": { ... },
  "rating": {
    "average": 4.8,
    "count": 128
  }
}
```

---

#### Create Review (Protected)
```http
POST /products/{productId}/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "comment": "অসাধারণ পণ্য! সবাইকে সুপারিশ করছি।"
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Review submitted successfully. Pending approval.",
  "data": { ... }
}
```

---

#### Get My Reviews (Protected)
```http
GET /reviews/my
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": [ ... ]
}
```

---

#### Update My Review (Protected)
```http
PUT /reviews/{reviewId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 4,
  "comment": "আপডেটেড রিভিউ"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": { ... }
}
```

---

#### Delete Review (Protected)
```http
DELETE /reviews/{reviewId}
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

#### Mark Review as Helpful (Protected)
```http
POST /reviews/{reviewId}/helpful
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Thanks for your feedback!",
  "helpful_count": 16
}
```

---

### 🛒 Cart Endpoints

#### Get Cart (Protected)
```http
GET /cart
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "product_id": 1,
        "product": {
          "id": 1,
          "name": "সুন্দরবনের খলিশা ফুলের মধু",
          "price": 1250,
          "image": "/images/honey.png",
          "weight": "১ কেজি"
        },
        "quantity": 2,
        "subtotal": 2500
      }
    ],
    "summary": {
      "subtotal": 2500,
      "tax": 250,
      "total": 2750,
      "item_count": 1
    }
  }
}
```

---

#### Add to Cart (Protected)
```http
POST /cart/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Item added to cart",
  "product": {
    "id": 1,
    "name": "সুন্দরবনের খলিশা ফুলের মধু",
    "quantity": 2
  }
}
```

---

#### Update Cart Item (Protected)
```http
PUT /cart/item/{cartItemId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 5
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Cart item updated",
  "data": { ... }
}
```

---

#### Remove from Cart (Protected)
```http
DELETE /cart/item/{cartItemId}
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

---

#### Clear Cart (Protected)
```http
DELETE /cart
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

#### Get Cart Count (Protected)
```http
GET /cart/count
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "count": 3
}
```

---

### 📦 Order Endpoints

#### Get User's Orders (Protected)
```http
GET /orders?status=pending&page=1
Authorization: Bearer {token}
```

**Query Parameters:**
| Parameter | Description |
|-----------|-------------|
| status | Filter by status: pending, confirmed, shipped, delivered, cancelled |
| page | Page number |

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "order_number": "ORD-20260605-ABC123",
      "total_amount": 2750,
      "status": "pending",
      "payment_status": "pending",
      "created_at": "2026-06-05T10:00:00Z",
      "item_count": 1
    }
  ],
  "pagination": { ... }
}
```

---

#### Get Order Details (Protected)
```http
GET /orders/{orderId}
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "id": 1,
    "order_number": "ORD-20260605-ABC123",
    "status": "pending",
    "payment_status": "pending",
    "total_amount": 2750,
    "tax": 250,
    "shipping_cost": 100,
    "subtotal": 2400,
    "shipping_address": {
      "name": "Ahmed",
      "phone": "01700000000",
      "email": "ahmed@example.com",
      "address": "123 Main Street",
      "city": "Dhaka",
      "state": "Dhaka",
      "zip": "1000"
    },
    "notes": null,
    "created_at": "2026-06-05T10:00:00Z",
    "items": [
      {
        "product_id": 1,
        "product_name": "সুন্দরবনের খলিশা ফুলের মধু",
        "quantity": 2,
        "price": 1250,
        "subtotal": 2500
      }
    ]
  }
}
```

---

#### Create Order (Protected)
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shipping_address": {
    "name": "Ahmed",
    "phone": "01700000000",
    "email": "ahmed@example.com",
    "address": "123 Main Street",
    "city": "Dhaka",
    "state": "Dhaka",
    "zip": "1000"
  },
  "notes": "Please deliver in morning",
  "coupon_code": null
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 1,
    "order_number": "ORD-20260605-ABC123",
    "total_amount": 2750,
    "status": "pending"
  }
}
```

---

#### Cancel Order (Protected)
```http
PUT /orders/{orderId}/cancel
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": { ... }
}
```

---

#### Download Invoice (Protected)
```http
GET /orders/{orderId}/invoice
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "order_number": "ORD-20260605-ABC123",
    "order_date": "2026-06-05T10:00:00Z",
    "customer_name": "Ahmed",
    "customer_email": "ahmed@example.com",
    "shipping_address": { ... },
    "items": [ ... ],
    "subtotal": 2400,
    "tax": 250,
    "shipping_cost": 100,
    "total": 2750
  }
}
```

---

#### Update Order Status (Admin Only)
```http
PUT /orders/{orderId}/status
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "shipped",
  "payment_status": "paid"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Order status updated",
  "data": {
    "id": 1,
    "order_number": "ORD-20260605-ABC123",
    "status": "shipped",
    "payment_status": "paid"
  }
}
```

---

### 🛠️ Admin Endpoints

#### Create Product (Admin Only)
```http
POST /products
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "নতুন মধু",
  "description": "খাঁটি প্রাকৃতিক মধু",
  "category": "মধু (Honey)",
  "price": 1000,
  "original_price": 1200,
  "sku": "HONEY-NEW-001",
  "stock": 100,
  "image": "/images/honey.png",
  "weight": "১ কেজি",
  "is_featured": true,
  "tag": "নতুন পণ্য"
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": { ... }
}
```

---

#### Update Product (Admin Only)
```http
PUT /products/{id}
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "price": 950,
  "stock": 80
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": { ... }
}
```

---

#### Delete Product (Admin Only)
```http
DELETE /products/{id}
Authorization: Bearer {admin_token}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 🔴 Error Responses

### Validation Error (422)
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": ["The email field is required"],
    "password": ["The password must be at least 8 characters"]
  }
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "error": "Unauthenticated"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## 📝 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource doesn't exist |
| 422 | Unprocessable Entity - Validation error |
| 500 | Server Error |

---

## 🔄 Order Status Flow

```
pending → confirmed → shipped → delivered
   ↓
cancelled (can be cancelled from pending/confirmed)
```

---

## 💳 Payment Status Values

- `pending` - Payment not yet processed
- `paid` - Payment successful
- `failed` - Payment failed
- `refunded` - Payment refunded

---

## 🎯 Product Filter Values

**Categories:**
- মধু (Honey)
- খেজুর (Dates)
- বাদাম (Nuts)
- অন্যান্য (Others)

**Sort Fields:**
- created_at
- price
- rating
- name

**Sort Order:**
- ASC (ascending)
- DESC (descending)

---

## 🧪 Example cURL Requests

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:8000/api/products?category=মধু&per_page=12
```

### Add to Cart
```bash
curl -X POST http://localhost:8000/api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"product_id":1,"quantity":2}'
```

### Create Order
```bash
curl -X POST http://localhost:8000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shipping_address":{
      "name":"Ahmed","phone":"01700000000","email":"ahmed@example.com",
      "address":"123 Main Street","city":"Dhaka","state":"Dhaka","zip":"1000"
    }
  }'
```

---

*Last Updated: 2026-06-05*

For implementation guide, see [JUNIOR_DEVELOPER_GUIDE.md](./JUNIOR_DEVELOPER_GUIDE.md)  
For frontend integration, see [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md)
