<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AdminCommerceController extends Controller
{
    public function dashboard()
    {
        $todayRevenue = Order::query()
            ->whereDate('created_at', today())
            ->where('status', '!=', 'cancelled')
            ->sum('total_amount');

        $recentOrders = Order::query()
            ->with('user')
            ->latest()
            ->limit(8)
            ->get()
            ->map(fn (Order $order) => $this->orderSummary($order));

        $topProducts = OrderItem::query()
            ->select('product_id', 'product_name', DB::raw('SUM(quantity) as units_sold'), DB::raw('SUM(quantity * price) as revenue'))
            ->groupBy('product_id', 'product_name')
            ->orderByDesc('units_sold')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'metrics' => [
                    'total_products' => Product::count(),
                    'active_products' => Product::where('stock', '>', 0)->count(),
                    'low_stock_products' => Product::whereBetween('stock', [1, 10])->count(),
                    'total_orders' => Order::count(),
                    'pending_orders' => Order::where('status', 'pending')->count(),
                    'total_customers' => User::where('role', 'customer')->count(),
                    'total_revenue' => Order::where('status', '!=', 'cancelled')->sum('total_amount'),
                    'today_revenue' => $todayRevenue,
                    'pending_reviews' => Review::where('is_approved', false)->count(),
                ],
                'recent_orders' => $recentOrders,
                'top_products' => $topProducts,
            ],
        ]);
    }

    public function products(Request $request)
    {
        $query = Product::query();

        if ($request->filled('search')) {
            $search = trim((string) $request->input('search'));
            $query->where(function (Builder $builder) use ($search) {
                $builder->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('sku', 'LIKE', "%{$search}%")
                    ->orWhere('category', 'LIKE', "%{$search}%")
                    ->orWhere('tag', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->filled('stock_status')) {
            match ($request->input('stock_status')) {
                'out' => $query->where('stock', '<=', 0),
                'low' => $query->whereBetween('stock', [1, 10]),
                'in' => $query->where('stock', '>', 10),
                default => null,
            };
        }

        $sort = (string) $request->input('sort', 'newest');
        match ($sort) {
            'price-asc' => $query->orderBy('price'),
            'price-desc' => $query->orderByDesc('price'),
            'stock-asc' => $query->orderBy('stock'),
            'stock-desc' => $query->orderByDesc('stock'),
            default => $query->latest(),
        };

        $products = $query->paginate($this->perPage($request));

        return response()->json([
            'success' => true,
            'data' => ProductResource::collection($products->items()),
            'pagination' => $this->pagination($products),
        ]);
    }

    public function storeProduct(Request $request)
    {
        $validated = $this->validateProduct($request);
        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => new ProductResource($product),
        ], 201);
    }

    public function showProduct(int $id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product),
        ]);
    }

    public function updateProduct(Request $request, int $id)
    {
        $product = Product::findOrFail($id);
        $product->update($this->validateProduct($request, $product));

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => new ProductResource($product->fresh()),
        ]);
    }

    public function deleteProduct(int $id)
    {
        Product::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully',
        ]);
    }

    public function orders(Request $request)
    {
        $query = Order::query()
            ->with('user')
            ->withCount('items');

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->input('payment_status'));
        }

        if ($request->filled('search')) {
            $search = trim((string) $request->input('search'));
            $query->where(function (Builder $builder) use ($search) {
                $builder->where('order_number', 'LIKE', "%{$search}%")
                    ->orWhereHas('user', function (Builder $userQuery) use ($search) {
                        $userQuery->where('name', 'LIKE', "%{$search}%")
                            ->orWhere('email', 'LIKE', "%{$search}%")
                            ->orWhere('phone', 'LIKE', "%{$search}%");
                    });
            });
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->input('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->input('date_to'));
        }

        $orders = $query->latest()->paginate($this->perPage($request));

        return response()->json([
            'success' => true,
            'data' => $orders->getCollection()->map(fn (Order $order) => $this->orderSummary($order)),
            'pagination' => $this->pagination($orders),
        ]);
    }

    public function showOrder(int $id)
    {
        $order = Order::with(['user', 'items'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                ...$this->orderSummary($order),
                'tax' => $order->tax,
                'shipping_cost' => $order->shipping_cost,
                'subtotal' => $order->subtotal,
                'shipping_address' => $order->shipping_address,
                'notes' => $order->notes,
                'items' => $order->items->map(fn (OrderItem $item) => [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product_name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->subtotal,
                ]),
            ],
        ]);
    }

    public function updateOrder(Request $request, int $id)
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:pending,confirmed,shipped,delivered,cancelled',
            'payment_status' => 'sometimes|in:pending,paid,failed,refunded',
            'notes' => 'nullable|string|max:1000',
        ]);

        $order = Order::findOrFail($id);
        $order->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Order updated successfully',
            'data' => $this->orderSummary($order->fresh('user')),
        ]);
    }

    public function customers(Request $request)
    {
        $query = User::query()
            ->withCount('orders')
            ->withSum('orders', 'total_amount');

        if ($request->filled('search')) {
            $search = trim((string) $request->input('search'));
            $query->where(function (Builder $builder) use ($search) {
                $builder->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $customers = $query->latest()->paginate($this->perPage($request));

        return response()->json([
            'success' => true,
            'data' => $customers->getCollection()->map(fn (User $user) => $this->customerSummary($user)),
            'pagination' => $this->pagination($customers),
        ]);
    }

    public function showCustomer(int $id)
    {
        $customer = User::query()
            ->withCount('orders')
            ->withSum('orders', 'total_amount')
            ->with(['orders' => fn ($query) => $query->latest()->limit(10)])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                ...$this->customerSummary($customer),
                'orders' => $customer->orders->map(fn (Order $order) => $this->orderSummary($order)),
            ],
        ]);
    }

    public function updateCustomer(Request $request, int $id)
    {
        $customer = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => ['sometimes', 'email', Rule::unique('users', 'email')->ignore($customer->id)],
            'phone' => 'nullable|string|max:30',
            'role' => 'sometimes|in:customer,admin,moderator',
            'status' => 'sometimes|in:active,suspended,deleted',
        ]);

        if ($customer->id === auth()->id() && (($validated['role'] ?? 'admin') !== 'admin' || ($validated['status'] ?? 'active') !== 'active')) {
            return response()->json([
                'success' => false,
                'error' => 'You cannot remove your own active admin access',
            ], 422);
        }

        $customer->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Customer updated successfully',
            'data' => $this->customerSummary($customer->fresh()->loadCount('orders')->loadSum('orders', 'total_amount')),
        ]);
    }

    public function deleteCustomer(int $id)
    {
        $customer = User::findOrFail($id);

        if ($customer->id === auth()->id()) {
            return response()->json([
                'success' => false,
                'error' => 'You cannot delete your own admin account',
            ], 422);
        }

        $customer->update(['status' => 'deleted']);

        return response()->json([
            'success' => true,
            'message' => 'Customer marked as deleted successfully',
        ]);
    }

    public function categories()
    {
        $categories = Product::query()
            ->select('category')
            ->selectRaw('COUNT(*) as products_count')
            ->selectRaw('SUM(stock) as total_stock')
            ->selectRaw('AVG(price) as average_price')
            ->whereNotNull('category')
            ->groupBy('category')
            ->orderBy('category')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function updateCategory(Request $request, string $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $updated = Product::where('category', $category)->update(['category' => $validated['name']]);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => [
                'old_name' => $category,
                'name' => $validated['name'],
                'products_updated' => $updated,
            ],
        ]);
    }

    public function deleteCategory(Request $request, string $category)
    {
        $replacement = $request->input('replacement_category');
        $productsCount = Product::where('category', $category)->count();

        if ($productsCount > 0 && !$replacement) {
            return response()->json([
                'success' => false,
                'error' => 'Category has products. Provide replacement_category to move products before deleting.',
            ], 409);
        }

        if ($replacement) {
            Product::where('category', $category)->update(['category' => $replacement]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Category removed successfully',
            'data' => [
                'category' => $category,
                'products_moved' => $productsCount,
                'replacement_category' => $replacement,
            ],
        ]);
    }

    public function reviews(Request $request)
    {
        $query = Review::query()->with(['user', 'product']);

        if ($request->filled('approved')) {
            $query->where('is_approved', $request->boolean('approved'));
        }

        $reviews = $query->latest()->paginate($this->perPage($request));

        return response()->json([
            'success' => true,
            'data' => $reviews->getCollection()->map(fn (Review $review) => [
                'id' => $review->id,
                'product_id' => $review->product_id,
                'product_name' => $review->product?->name,
                'customer_name' => $review->user?->name,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'is_approved' => $review->is_approved,
                'helpful_count' => $review->helpful_count,
                'created_at' => $review->created_at,
            ]),
            'pagination' => $this->pagination($reviews),
        ]);
    }

    public function updateReview(Request $request, int $id)
    {
        $validated = $request->validate([
            'is_approved' => 'required|boolean',
        ]);

        $review = Review::findOrFail($id);
        $review->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully',
            'data' => $review,
        ]);
    }

    public function deleteReview(int $id)
    {
        Review::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully',
        ]);
    }

    public function settings()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'order_statuses' => ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
                'payment_statuses' => ['pending', 'paid', 'failed', 'refunded'],
                'customer_statuses' => ['active', 'suspended', 'deleted'],
                'customer_roles' => ['customer', 'admin', 'moderator'],
                'product_tags' => ['জনপ্রিয়', 'সেরা বিক্রেতা'],
                'public_preview' => [
                    'products' => '/products/{id}',
                    'collections' => '/collections/{slug}',
                    'offer_zone' => '/collections/offer-zone',
                    'combos' => '/combos',
                ],
            ],
        ]);
    }

    private function validateProduct(Request $request, ?Product $product = null): array
    {
        $isUpdate = $product !== null;

        $validated = $request->validate([
            'name' => [$isUpdate ? 'sometimes' : 'required', 'string', 'max:255'],
            'description' => 'nullable|string',
            'category' => [$isUpdate ? 'sometimes' : 'required', 'string', 'max:255'],
            'price' => [$isUpdate ? 'sometimes' : 'required', 'numeric', 'min:0'],
            'original_price' => 'nullable|numeric|min:0',
            'sku' => [$isUpdate ? 'sometimes' : 'required', 'string', 'max:255', Rule::unique('products', 'sku')->ignore($product?->id)],
            'stock' => [$isUpdate ? 'sometimes' : 'required', 'integer', 'min:0'],
            'image' => 'nullable|string|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'string|max:2048',
            'weight' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews_count' => 'nullable|integer|min:0',
            'is_featured' => 'nullable|boolean',
            'tag' => 'nullable|string|max:255',
        ]);

        $price = (float) ($validated['price'] ?? $product?->price ?? 0);
        $originalPrice = $validated['original_price'] ?? $product?->original_price;

        if ($originalPrice !== null && (float) $originalPrice < $price) {
            throw ValidationException::withMessages([
                'original_price' => ['Original price must be greater than or equal to price'],
            ]);
        }

        return $validated;
    }

    private function orderSummary(Order $order): array
    {
        return [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'customer' => $order->user ? [
                'id' => $order->user->id,
                'name' => $order->user->name,
                'email' => $order->user->email,
                'phone' => $order->user->phone,
            ] : null,
            'items_count' => $order->items_count ?? $order->items()->count(),
            'total_amount' => $order->total_amount,
            'status' => $order->status,
            'payment_status' => $order->payment_status,
            'created_at' => $order->created_at,
        ];
    }

    private function customerSummary(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
            'status' => $user->status,
            'orders_count' => $user->orders_count ?? 0,
            'total_spent' => $user->orders_sum_total_amount ?? 0,
            'created_at' => $user->created_at,
        ];
    }

    private function perPage(Request $request): int
    {
        return max(1, min((int) $request->integer('per_page', 15), 100));
    }

    private function pagination($paginator): array
    {
        return [
            'total' => $paginator->total(),
            'per_page' => $paginator->perPage(),
            'current_page' => $paginator->currentPage(),
            'last_page' => $paginator->lastPage(),
            'from' => $paginator->firstItem(),
            'to' => $paginator->lastItem(),
        ];
    }
}
