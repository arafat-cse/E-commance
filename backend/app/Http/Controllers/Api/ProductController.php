<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get all products with pagination
     * GET /api/products?page=1&per_page=12&search=honey&category=মধু
     */
    public function index(Request $request)
    {
        $query = Product::query();

        // Search by name or description
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->get('category'));
        }

        // Filter by price range
        if ($request->has('min_price') && $request->has('max_price')) {
            $minPrice = $request->get('min_price');
            $maxPrice = $request->get('max_price');
            $query->whereBetween('price', [$minPrice, $maxPrice]);
        }

        // Sort
        $sortBy = $request->get('sort', 'created_at');
        $sortOrder = $request->get('order', 'DESC');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 12);
        $products = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => ProductResource::collection($products->items()),
            'pagination' => [
                'total' => $products->total(),
                'per_page' => $products->perPage(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'from' => $products->firstItem(),
                'to' => $products->lastItem(),
            ]
        ]);
    }

    /**
     * Get single product by ID
     * GET /api/products/{id}
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product)
        ]);
    }

    /**
     * Get featured products
     * GET /api/products/featured
     */
    public function featured()
    {
        $products = Product::where('is_featured', true)
                           ->limit(8)
                           ->get();

        return response()->json([
            'success' => true,
            'data' => ProductResource::collection($products)
        ]);
    }

    /**
     * Get products by category
     * GET /api/categories/{category}/products
     */
    public function byCategory($category)
    {
        $products = Product::where('category', $category)
                           ->paginate(12);

        return response()->json([
            'success' => true,
            'data' => ProductResource::collection($products->items()),
            'pagination' => [
                'total' => $products->total(),
                'per_page' => $products->perPage(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
            ]
        ]);
    }

    /**
     * Create new product (Admin only)
     * POST /api/products
     */
    public function store(StoreProductRequest $request)
    {
        // Check if user is admin
        $this->authorize('create', Product::class);

        $product = Product::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => new ProductResource($product)
        ], 201);
    }

    /**
     * Update product (Admin only)
     * PUT /api/products/{id}
     */
    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        
        // Check if user is admin
        $this->authorize('update', $product);

        $product->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => new ProductResource($product)
        ]);
    }

    /**
     * Delete product (Admin only)
     * DELETE /api/products/{id}
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        
        // Check if user is admin
        $this->authorize('delete', $product);

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }

    /**
     * Get all unique categories
     * GET /api/categories
     */
    public function getCategories()
    {
        $categories = Product::distinct()
                             ->pluck('category')
                             ->filter()
                             ->values();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }
}
