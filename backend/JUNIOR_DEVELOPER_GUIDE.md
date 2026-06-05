# Laravel API - Junior Developer Guide

## 📖 Overview

This guide explains how the API is structured and how junior developers should use it. The API follows RESTful principles and is designed to be easy to understand and maintain.

---

## 🗂️ Folder Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/          # API controllers
│   │   │   ├── AuthController.php    # Authentication logic
│   │   │   ├── ProductController.php # Product endpoints
│   │   │   ├── CartController.php    # Shopping cart
│   │   │   ├── OrderController.php   # Orders
│   │   │   └── ReviewController.php  # Reviews & ratings
│   │   ├── Requests/                # Form validation
│   │   │   ├── StoreProductRequest.php
│   │   │   ├── StoreOrderRequest.php
│   │   │   └── StoreReviewRequest.php
│   │   └── Resources/               # Response formatting
│   │       ├── ProductResource.php
│   │       └── ReviewResource.php
│   │
│   ├── Models/                      # Database models
│   │   ├── User.php
│   │   ├── Product.php
│   │   ├── Cart.php
│   │   ├── CartItem.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   └── Review.php
│   │
│   └── Http/Middleware/            # Request middleware
│       └── JwtMiddleware.php (future)
│
├── routes/
│   └── api.php                      # All API routes
│
├── database/
│   └── migrations/                  # Database schema
│       ├── create_products_table.php
│       ├── create_reviews_table.php
│       ├── create_carts_table.php
│       ├── create_cart_items_table.php
│       ├── create_orders_table.php
│       └── create_order_items_table.php
│
└── .env                             # Configuration
```

---

## 🔑 Key Concepts for Juniors

### 1. Models

Models represent database tables. Each model corresponds to one table.

**Example: Product Model**
```php
// app/Models/Product.php
class Product extends Model
{
    protected $fillable = ['name', 'price', 'category'];
    
    // Get reviews for this product
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
```

**Key Points:**
- `$fillable` - Attributes that can be mass-assigned
- `$casts` - Type conversions (boolean, array, float)
- Methods define relationships (hasMany, belongsTo, etc.)

### 2. Controllers

Controllers handle the business logic for API endpoints.

**Example: ProductController**
```php
class ProductController extends Controller
{
    // GET /api/products
    public function index()
    {
        return Product::all();
    }
    
    // GET /api/products/{id}
    public function show($id)
    {
        return Product::find($id);
    }
}
```

**Key Points:**
- One controller method = One API endpoint
- Use models to fetch data
- Return JSON responses

### 3. Routes

Routes define URL endpoints in `routes/api.php`.

**Example:**
```php
// GET /api/products
Route::get('products', [ProductController::class, 'index']);

// POST /api/products (protected)
Route::middleware('auth:api')->post('products', [ProductController::class, 'store']);
```

### 4. Requests (Form Validation)

Request classes validate incoming data before processing.

**Example: StoreProductRequest**
```php
class StoreProductRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ];
    }
}
```

**Key Points:**
- Validates input data automatically
- Returns 422 error if validation fails
- Custom error messages in `messages()`

### 5. Resources (Response Formatting)

Resources format model data for API responses.

**Example: ProductResource**
```php
class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
        ];
    }
}
```

**Key Points:**
- Transforms model data for API responses
- Ensures consistent response format
- Can include related data

---

## 🌐 API Endpoints Overview

### Authentication (Public)

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/check-email` | Check if email exists | ❌ |

### Protected Auth Routes

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/auth/me` | Get current user | ✅ |
| POST | `/api/auth/logout` | Logout | ✅ |
| POST | `/api/auth/refresh` | Refresh token | ✅ |

### Products (Public)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products` | List products (paginated) |
| GET | `/api/products/{id}` | Get product details |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/categories` | Get all categories |

**Query Parameters:**
```
?search=honey           # Search by name
?category=মধু          # Filter by category
?min_price=100&max_price=500  # Price range
?sort=price&order=ASC   # Sort products
?per_page=12&page=2     # Pagination
```

### Shopping Cart (Protected)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/item/{itemId}` | Update item quantity |
| DELETE | `/api/cart/item/{itemId}` | Remove item |
| DELETE | `/api/cart` | Clear cart |

### Orders (Protected)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/orders` | Get user's orders |
| GET | `/api/orders/{id}` | Get order details |
| POST | `/api/orders` | Create new order |
| PUT | `/api/orders/{id}/cancel` | Cancel order |
| GET | `/api/orders/{id}/invoice` | Download invoice |

### Reviews (Protected)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products/{id}/reviews` | Get product reviews |
| POST | `/api/products/{id}/reviews` | Create review |
| GET | `/api/reviews/my` | Get my reviews |
| PUT | `/api/reviews/{id}` | Update my review |
| DELETE | `/api/reviews/{id}` | Delete my review |

---

## 🔐 Authentication (JWT)

The API uses JWT (JSON Web Tokens) for authentication.

### Login Flow

1. **Frontend sends login request:**
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

2. **API returns token:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "Bearer",
    "expires_in": 1440
  }
}
```

3. **Frontend stores token and sends with requests:**
```bash
GET /api/auth/me
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### Middleware Protection

In `routes/api.php`:
```php
// These endpoints require authentication
Route::middleware('auth:api')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
});
```

---

## 📊 Database Schema

### Products Table
```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  category VARCHAR(255),
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  sku VARCHAR(255) UNIQUE,
  stock INT,
  image VARCHAR(255),
  weight VARCHAR(255),
  rating DECIMAL(3,2),
  is_featured BOOLEAN,
  tag VARCHAR(255),
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
  subtotal DECIMAL(10,2),
  tax DECIMAL(10,2),
  shipping_cost DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
  payment_status ENUM('pending', 'paid', 'failed', 'refunded'),
  shipping_address JSON,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 📝 Common Workflows

### Adding a New Product

**For Junior Developers:**

1. **Request comes in:**
```bash
POST /api/products
Authorization: Bearer token
{
  "name": "New Product",
  "price": 500,
  "category": "Honey"
}
```

2. **Laravel processes request:**
   - Routes to `ProductController@store`
   - `StoreProductRequest` validates data
   - Controller creates product
   - Returns response

3. **Code in Controller:**
```php
public function store(StoreProductRequest $request)
{
    // Data is already validated by StoreProductRequest
    $product = Product::create($request->validated());
    
    return response()->json([
        'success' => true,
        'data' => new ProductResource($product)
    ], 201);
}
```

### Creating an Order

**Flow:**

1. User has items in cart
2. Frontend sends POST /api/orders with shipping address
3. Backend:
   - Gets user's cart items
   - Calculates totals
   - Creates Order
   - Creates OrderItems from cart
   - Clears cart
   - Returns order details

---

## 🧪 Testing Endpoints

### Using cURL (Command Line)

**Register User:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Products:**
```bash
curl http://localhost:8000/api/products
```

**Add to Cart (with token):**
```bash
curl -X POST http://localhost:8000/api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "quantity": 2
  }'
```

### Using Postman

1. Create new collection "E-Commerce API"
2. Create requests for each endpoint
3. Use variables for token and base URL
4. Test each endpoint

---

## 🐛 Debugging Tips

### 1. Check Database
```bash
php artisan tinker
>>> $products = \App\Models\Product::all();
>>> $products->first();
```

### 2. Enable Query Logging
In controller:
```php
use Illuminate\Support\Facades\DB;

DB::listen(function ($query) {
    logger()->info($query->sql);
});
```

### 3. Use Laravel Debugbar (optional)
Install: `composer require barryvdh/laravel-debugbar`

### 4. Check Logs
```bash
tail -f storage/logs/laravel.log
```

---

## 🔨 Common Tasks for Juniors

### Task 1: Add New Endpoint

**Steps:**
1. Create controller method
2. Add validation (Request class)
3. Add route in `routes/api.php`
4. Create resource if needed
5. Test with Postman

**Example: Add GET /api/products/bestsellers**

```php
// ProductController.php
public function bestsellers()
{
    $products = Product::where('is_featured', true)
                       ->orderBy('rating', 'DESC')
                       ->limit(5)
                       ->get();
    
    return response()->json([
        'success' => true,
        'data' => ProductResource::collection($products)
    ]);
}

// routes/api.php
Route::get('products/bestsellers', [ProductController::class, 'bestsellers']);
```

### Task 2: Update Product Model

**Add relationship:**
```php
// app/Models/Product.php
public function reviews()
{
    return $this->hasMany(Review::class);
}
```

**Use in controller:**
```php
$product = Product::with('reviews')->find(1);
return $product->reviews; // All reviews for product
```

### Task 3: Add Filtering

**In controller:**
```php
public function index(Request $request)
{
    $query = Product::query();
    
    if ($request->has('category')) {
        $query->where('category', $request->category);
    }
    
    return $query->paginate(12);
}
```

---

## 📚 Response Format

All API responses follow a standard format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "per_page": 12,
    "current_page": 1,
    "last_page": 9
  }
}
```

---

## 🎓 Learning Resources

- [Laravel Documentation](https://laravel.com/docs)
- [JWT Authentication](https://jwt.io/)
- [RESTful API Design](https://restfulapi.net/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)

---

## ✅ Checklist for Junior Developers

- [ ] Understand Models and Relationships
- [ ] Understand Controllers and Routes
- [ ] Understand Validation (Request classes)
- [ ] Understand JWT Authentication
- [ ] Know how to test endpoints
- [ ] Know how to debug issues
- [ ] Understand database migrations
- [ ] Know how to add new endpoints

---

## 🆘 Common Issues & Solutions

### Issue: 401 Unauthorized
**Solution:** Token is missing or expired. Re-login or refresh token.

### Issue: 422 Validation Error
**Solution:** Check request body matches validation rules.

### Issue: 404 Not Found
**Solution:** Endpoint doesn't exist. Check route spelling and method.

### Issue: 500 Server Error
**Solution:** Check logs in `storage/logs/laravel.log`.

---

*Last Updated: 2026-06-05*

For detailed API documentation, see [ROADMAP.md](./ROADMAP.md)
