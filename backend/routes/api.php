<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\StorefrontController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('storefront')->group(function () {
    Route::get('home', [StorefrontController::class, 'home']);
    Route::get('products', [StorefrontController::class, 'products']);
    Route::get('products/{product}', [StorefrontController::class, 'product'])->whereNumber('product');
    Route::get('categories', [StorefrontController::class, 'categories']);
    Route::get('collections/{slug}', [StorefrontController::class, 'collection'])->where('slug', '[A-Za-z0-9-]+');
    Route::get('offers', [StorefrontController::class, 'offers']);
    Route::get('combos', [StorefrontController::class, 'combos']);
    Route::get('brands', [StorefrontController::class, 'brands']);
    Route::post('cart/quote', [StorefrontController::class, 'cartQuote']);
});

// Public routes (no authentication required)
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('check-email', [AuthController::class, 'checkEmail']);
});

// Product routes (public)
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/featured', [ProductController::class, 'featured']);
    Route::get('/category/{category}', [ProductController::class, 'byCategory']);
    Route::get('/{id}', [ProductController::class, 'show'])->whereNumber('id');
    
    // Reviews for product
    Route::get('/{productId}/reviews', [ReviewController::class, 'byProduct'])->whereNumber('productId');
});

// Categories route (public)
Route::get('categories', [ProductController::class, 'getCategories']);

// Protected routes (authentication required)
Route::middleware('auth:api')->group(function () {
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });

    // Cart routes
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index']);
        Route::post('add', [CartController::class, 'add']);
        Route::get('count', [CartController::class, 'count']);
        Route::put('item/{cartItemId}', [CartController::class, 'update']);
        Route::delete('item/{cartItemId}', [CartController::class, 'removeItem']);
        Route::delete('/', [CartController::class, 'clear']);
    });

    // Order routes
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::post('/', [OrderController::class, 'store']);
        Route::get('/{orderId}', [OrderController::class, 'show']);
        Route::put('/{orderId}/cancel', [OrderController::class, 'cancel']);
        Route::get('/{orderId}/invoice', [OrderController::class, 'invoice']);
        
        // Admin only
        Route::middleware('admin')->group(function () {
            Route::put('/{orderId}/status', [OrderController::class, 'updateStatus']);
        });
    });

    // Review routes
    Route::prefix('reviews')->group(function () {
        Route::post('/products/{productId}', [ReviewController::class, 'store']);
        Route::get('/my', [ReviewController::class, 'myReviews']);
        Route::put('/{reviewId}', [ReviewController::class, 'update']);
        Route::delete('/{reviewId}', [ReviewController::class, 'destroy']);
        Route::post('/{reviewId}/helpful', [ReviewController::class, 'markHelpful']);
    });
});

// Admin routes (authentication + admin role required)
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::prefix('products')->group(function () {
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });
});

// Health check endpoint
Route::get('health', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is running',
        'timestamp' => now(),
    ]);
});

// Catch-all 404
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'error' => 'Endpoint not found'
    ], 404);
});
