<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $approvedReviewsCount = $this->resource->getAttribute('approved_reviews_count');
        $approvedReviewsAvg = $this->resource->getAttribute('approved_reviews_avg_rating');

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'category' => $this->category,
            'price' => $this->price,
            'original_price' => $this->original_price,
            'originalPrice' => $this->original_price,
            'discount_percentage' => $this->discount_percentage,
            'discountPercentage' => $this->discount_percentage,
            'sku' => $this->sku,
            'stock' => $this->stock,
            'is_in_stock' => $this->isInStock(),
            'isInStock' => $this->isInStock(),
            'image' => $this->image,
            'images' => $this->images,
            'weight' => $this->weight,
            'rating' => round($approvedReviewsAvg ?? $this->rating ?? 0, 1),
            'reviews_count' => $approvedReviewsCount ?? $this->reviews_count ?? 0,
            'reviewsCount' => $approvedReviewsCount ?? $this->reviews_count ?? 0,
            'is_featured' => $this->is_featured,
            'isFeatured' => $this->is_featured,
            'tag' => $this->tag,
            'created_at' => $this->created_at,
        ];
    }
}
