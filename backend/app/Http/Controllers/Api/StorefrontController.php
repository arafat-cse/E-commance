<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class StorefrontController extends Controller
{
    private const COLLECTIONS = [
        'honey' => [
            'title' => 'Honey Collection',
            'category' => 'মধু (Honey)',
        ],
        'dates' => [
            'title' => 'Dates and Nuts Collection',
            'category' => 'খেজুর ও বাদাম',
        ],
        'ghee-oil' => [
            'title' => 'Ghee and Oil Collection',
            'category' => 'ঘি ও তেল',
        ],
        'spices' => [
            'title' => 'Spices Collection',
            'category' => 'মশলা',
        ],
        'combos' => [
            'title' => 'Combo Offers',
            'category' => 'কম্বো অফার',
        ],
        'offers' => [
            'title' => 'Offer Zone',
            'discounted' => true,
        ],
    ];

    public function home()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'hero_slides' => $this->heroSlides(),
                'featured_categories' => $this->featuredCategories(),
                'sections' => [
                    'best_sellers' => ProductResource::collection($this->bestSellerQuery()->limit(4)->get()),
                    'honey' => ProductResource::collection($this->productsForCategory('মধু (Honey)', 8)),
                    'ghee_oil' => ProductResource::collection($this->productsForCategory('ঘি ও তেল', 8)),
                    'dates_nuts' => ProductResource::collection($this->productsForCategory('খেজুর ও বাদাম', 8)),
                    'combos' => ProductResource::collection($this->productsForCategory('কম্বো অফার', 12)),
                    'just_for_you' => ProductResource::collection($this->baseProductQuery()->latest()->limit(8)->get()),
                ],
                'reviews' => $this->customerReviews(),
                'brands' => $this->brandList(),
            ],
        ]);
    }

    public function products(Request $request)
    {
        $query = $this->filterProducts($request, $this->baseProductQuery());

        $this->applySort($query, $request->string('sort')->toString());

        $perPage = max(1, min((int) $request->integer('per_page', 12), 48));
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
            ],
        ]);
    }

    public function product(Product $product)
    {
        $product->loadCount(['reviews as approved_reviews_count' => fn (Builder $query) => $query->where('is_approved', true)])
            ->loadAvg(['reviews as approved_reviews' => fn (Builder $query) => $query->where('is_approved', true)], 'rating');

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product),
        ]);
    }

    public function categories()
    {
        $counts = Product::query()
            ->selectRaw('category, count(*) as products_count')
            ->whereNotNull('category')
            ->groupBy('category')
            ->pluck('products_count', 'category');

        $categories = collect($this->featuredCategories())
            ->map(fn (array $category) => [
                ...$category,
                'products_count' => (int) ($counts[$category['category']] ?? 0),
            ]);

        return response()->json([
            'success' => true,
            'data' => $categories->values(),
        ]);
    }

    public function collection(Request $request, string $slug)
    {
        $collection = self::COLLECTIONS[$slug] ?? null;

        if (!$collection) {
            return response()->json([
                'success' => false,
                'error' => 'Collection not found',
            ], 404);
        }

        $query = $this->baseProductQuery();

        if (isset($collection['category'])) {
            $query->where('category', $collection['category']);
        }

        if (($collection['discounted'] ?? false) === true) {
            $query->whereNotNull('original_price')
                ->whereColumn('original_price', '>', 'price');
        }

        $query = $this->filterProducts($request, $query, includeCollection: false);
        $this->applySort($query, $request->string('sort')->toString());

        $perPage = max(1, min((int) $request->integer('per_page', 12), 48));
        $products = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => [
                'collection' => [
                    'slug' => $slug,
                    'title' => $collection['title'],
                ],
                'products' => ProductResource::collection($products->items()),
                'pagination' => [
                    'total' => $products->total(),
                    'per_page' => $products->perPage(),
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'from' => $products->firstItem(),
                    'to' => $products->lastItem(),
                ],
            ],
        ]);
    }

    public function offers(Request $request)
    {
        return $this->collection($request, 'offers');
    }

    public function combos(Request $request)
    {
        return $this->collection($request, 'combos');
    }

    public function brands()
    {
        return response()->json([
            'success' => true,
            'data' => $this->brandList(),
        ]);
    }

    public function cartQuote(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1|max:99',
        ]);

        $items = collect($validated['items']);
        $products = Product::query()
            ->whereIn('id', $items->pluck('product_id'))
            ->get()
            ->keyBy('id');

        $quotedItems = $items->map(function (array $item) use ($products) {
            $product = $products[(int) $item['product_id']];
            $quantity = (int) $item['quantity'];
            $lineTotal = (float) $product->price * $quantity;

            return [
                'product_id' => $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'quantity' => $quantity,
                'line_total' => $lineTotal,
                'available_stock' => $product->stock,
                'is_available' => $product->stock >= $quantity,
            ];
        });

        $subtotal = $quotedItems->sum('line_total');
        $shippingFee = $subtotal > 0 ? 80 : 0;

        return response()->json([
            'success' => true,
            'data' => [
                'items' => $quotedItems->values(),
                'subtotal' => $subtotal,
                'shipping_fee' => $shippingFee,
                'total' => $subtotal + $shippingFee,
            ],
        ]);
    }

    private function baseProductQuery(): Builder
    {
        return Product::query()
            ->withCount(['reviews as approved_reviews_count' => fn (Builder $query) => $query->where('is_approved', true)])
            ->withAvg(['reviews as approved_reviews' => fn (Builder $query) => $query->where('is_approved', true)], 'rating');
    }

    private function productsForCategory(string $category, int $limit): Collection
    {
        return $this->baseProductQuery()
            ->where('category', $category)
            ->latest()
            ->limit($limit)
            ->get();
    }

    private function bestSellerQuery(): Builder
    {
        return $this->baseProductQuery()
            ->where(function (Builder $query) {
                $query->where('tag', 'সেরা বিক্রেতা')
                    ->orWhere('tag', 'জনপ্রিয়')
                    ->orWhere('is_featured', true);
            })
            ->orderByDesc('reviews_count')
            ->orderByDesc('rating');
    }

    private function filterProducts(Request $request, Builder $query, bool $includeCollection = true): Builder
    {
        $search = trim((string) $request->input('search', $request->input('q', '')));

        if ($search !== '') {
            $query->where(function (Builder $builder) use ($search) {
                $builder->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")
                    ->orWhere('category', 'LIKE', "%{$search}%")
                    ->orWhere('tag', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->string('category')->toString());
        }

        if ($includeCollection && $request->filled('collection')) {
            $collection = self::COLLECTIONS[$request->string('collection')->toString()] ?? null;

            if (isset($collection['category'])) {
                $query->where('category', $collection['category']);
            }

            if (($collection['discounted'] ?? false) === true) {
                $query->whereNotNull('original_price')
                    ->whereColumn('original_price', '>', 'price');
            }
        }

        if ($request->boolean('discounted')) {
            $query->whereNotNull('original_price')
                ->whereColumn('original_price', '>', 'price');
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', (float) $request->input('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', (float) $request->input('max_price'));
        }

        if ($request->filled('brand')) {
            $brand = $request->string('brand')->toString();
            $query->where(fn (Builder $builder) => $this->applyBrandFilter($builder, $brand));
        }

        return $query;
    }

    private function applySort(Builder $query, string $sort): void
    {
        match ($sort) {
            'price-asc', 'price_asc' => $query->orderBy('price'),
            'price-desc', 'price_desc' => $query->orderByDesc('price'),
            'rating-desc', 'rating_desc' => $query->orderByDesc('approved_reviews_avg_rating')->orderByDesc('rating'),
            'newest' => $query->latest(),
            default => $query->latest(),
        };
    }

    private function applyBrandFilter(Builder $query, string $brand): Builder
    {
        return match ($brand) {
            'Khejuri' => $query->where(function (Builder $builder) {
                $builder->where('name', 'LIKE', '%Ajwa%')
                    ->orWhere('name', 'LIKE', '%Mariam%')
                    ->orWhere('name', 'LIKE', '%Medjool%')
                    ->orWhere('name', 'LIKE', '%Khejuri%')
                    ->orWhere('name', 'LIKE', '%খেজুর%');
            }),
            'Shosti Food' => $query->where('name', 'LIKE', '%Shosti%'),
            'Glarvest Organic' => $query->where('name', 'LIKE', '%Glarvest%'),
            default => $query->where(function (Builder $builder) {
                $builder->where('name', 'NOT LIKE', '%Ajwa%')
                    ->where('name', 'NOT LIKE', '%Mariam%')
                    ->where('name', 'NOT LIKE', '%Medjool%')
                    ->where('name', 'NOT LIKE', '%Khejuri%')
                    ->where('name', 'NOT LIKE', '%খেজুর%')
                    ->where('name', 'NOT LIKE', '%Shosti%')
                    ->where('name', 'NOT LIKE', '%Glarvest%');
            }),
        };
    }

    private function featuredCategories(): array
    {
        return [
            ['slug' => 'honey', 'name' => 'সুন্দরবনের মধু', 'category' => 'মধু (Honey)', 'anchor' => '#honey', 'color' => '#ca8a04'],
            ['slug' => 'ghee-oil', 'name' => 'ঘি ও তেল', 'category' => 'ঘি ও তেল', 'anchor' => '#ghee', 'color' => '#16a34a'],
            ['slug' => 'dates', 'name' => 'খেজুর ও বাদাম', 'category' => 'খেজুর ও বাদাম', 'anchor' => '#dates', 'color' => '#b45309'],
            ['slug' => 'spices', 'name' => 'খাঁটি মশলা', 'category' => 'মশলা', 'anchor' => '#spices', 'color' => '#dc2626'],
            ['slug' => 'combos', 'name' => 'কম্বো অফার', 'category' => 'কম্বো অফার', 'anchor' => '#combos', 'color' => '#2563eb'],
        ];
    }

    private function heroSlides(): array
    {
        return [
            ['id' => 1, 'collection' => 'honey', 'badge' => '100% খাঁটি ও প্রাকৃতিক', 'title' => 'সুন্দরবনের প্রাকৃতিক চাকের মধু', 'accent_color' => '#ca8a04'],
            ['id' => 2, 'collection' => 'dates', 'badge' => 'প্রিমিয়াম কোয়ালিটি খেজুর', 'title' => 'সরাসরি মদীনা থেকে আমদানিকৃত মরিয়ম খেজুর', 'accent_color' => '#ea580c'],
            ['id' => 3, 'collection' => 'ghee-oil', 'badge' => 'ঐতিহ্যবাহী গাওয়া ঘি', 'title' => 'শতভাগ বিশুদ্ধ ও সুগন্ধিযুক্ত গাওয়া ঘি', 'accent_color' => '#16a34a'],
        ];
    }

    private function customerReviews(): Collection
    {
        return Review::query()
            ->with('user')
            ->where('is_approved', true)
            ->latest()
            ->limit(8)
            ->get()
            ->map(fn (Review $review) => [
                'id' => $review->id,
                'name' => $review->user?->name ?? 'Verified Customer',
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => $review->created_at,
            ]);
    }

    private function brandList(): array
    {
        return [
            ['name' => 'Ghorer Bazar'],
            ['name' => 'Khejuri'],
            ['name' => 'Shosti Food'],
            ['name' => 'Glarvest Organic'],
        ];
    }
}
