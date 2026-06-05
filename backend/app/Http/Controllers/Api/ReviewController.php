<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Product;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Get reviews for a product
     * GET /api/products/{productId}/reviews
     */
    public function byProduct($productId)
    {
        $product = Product::findOrFail($productId);
        
        $reviews = Review::where('product_id', $productId)
                         ->where('is_approved', true)
                         ->orderBy('created_at', 'DESC')
                         ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => ReviewResource::collection($reviews->items()),
            'pagination' => [
                'total' => $reviews->total(),
                'per_page' => $reviews->perPage(),
                'current_page' => $reviews->currentPage(),
            ],
            'rating' => [
                'average' => $product->average_rating ?? 0,
                'count' => $reviews->total(),
            ]
        ]);
    }

    /**
     * Create new review (Authenticated users only)
     * POST /api/products/{productId}/reviews
     */
    public function store(StoreReviewRequest $request, $productId)
    {
        $product = Product::findOrFail($productId);

        $review = Review::create([
            'product_id' => $productId,
            'user_id' => auth()->id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_approved' => false, // Admin approval required
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Review submitted successfully. Pending approval.',
            'data' => new ReviewResource($review)
        ], 201);
    }

    /**
     * Update own review
     * PUT /api/reviews/{reviewId}
     */
    public function update(StoreReviewRequest $request, $reviewId)
    {
        $review = Review::findOrFail($reviewId);

        // Check if user owns this review
        if ($review->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'error' => 'Unauthorized'
            ], 403);
        }

        $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully',
            'data' => new ReviewResource($review)
        ]);
    }

    /**
     * Delete own review
     * DELETE /api/reviews/{reviewId}
     */
    public function destroy($reviewId)
    {
        $review = Review::findOrFail($reviewId);

        // Check if user owns this review or is admin
        if ($review->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'error' => 'Unauthorized'
            ], 403);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ]);
    }

    /**
     * Get user's own reviews
     * GET /api/my-reviews
     */
    public function myReviews()
    {
        $reviews = Review::where('user_id', auth()->id())
                         ->orderBy('created_at', 'DESC')
                         ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => ReviewResource::collection($reviews->items())
        ]);
    }

    /**
     * Mark review as helpful (for other users)
     * POST /api/reviews/{reviewId}/helpful
     */
    public function markHelpful($reviewId)
    {
        $review = Review::findOrFail($reviewId);
        
        $review->increment('helpful_count');

        return response()->json([
            'success' => true,
            'message' => 'Thanks for your feedback!',
            'helpful_count' => $review->helpful_count
        ]);
    }
}
