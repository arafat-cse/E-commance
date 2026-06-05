<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'category',
        'price',
        'original_price',
        'sku',
        'stock',
        'image',
        'images',
        'weight',
        'rating',
        'reviews_count',
        'is_featured',
        'tag',
    ];

    protected $casts = [
        'images' => 'array',
        'is_featured' => 'boolean',
        'rating' => 'float',
        'price' => 'float',
        'original_price' => 'float',
    ];

    /**
     * Get all reviews for this product
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get average rating
     */
    public function getAverageRatingAttribute()
    {
        return $this->reviews()
                    ->where('is_approved', true)
                    ->avg('rating') ?? 0;
    }

    /**
     * Check if product is in stock
     */
    public function isInStock()
    {
        return $this->stock > 0;
    }

    /**
     * Get discount percentage
     */
    public function getDiscountPercentageAttribute()
    {
        if (!$this->original_price) {
            return 0;
        }
        return round((($this->original_price - $this->price) / $this->original_price) * 100);
    }
}
