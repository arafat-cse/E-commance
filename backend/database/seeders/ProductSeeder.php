<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['Sundarban Natural Honey', 'Honey', 1250, 1400, 'HN-001', 84, '/images/honey.png', '1 kg', 4.9, 128, true, 'জনপ্রিয়'],
            ['Premium Ajwa Dates', 'Dates & Nuts', 900, 1100, 'DT-001', 42, '/images/dates.png', '1 kg', 4.9, 112, true, null],
            ['Pure Gawa Ghee', 'Ghee & Oil', 1600, 1800, 'GH-001', 9, '/images/ghee.png', '1 kg', 4.9, 232, true, 'সেরা বিক্রেতা'],
            ['Wood Pressed Mustard Oil', 'Ghee & Oil', 320, 380, 'OL-001', 130, '/images/oil.png', '1 liter', 4.8, 185, true, 'জনপ্রিয়'],
            ['Mixed Nuts Combo', 'Combo Offer', 1500, 1682, 'CB-001', 24, '/images/nuts.png', '1 set', 4.8, 45, false, '10.8% ছাড়'],
        ];

        foreach ($products as [$name, $category, $price, $originalPrice, $sku, $stock, $image, $weight, $rating, $reviewsCount, $featured, $tag]) {
            Product::updateOrCreate(
                ['sku' => $sku],
                [
                    'name' => $name,
                    'description' => $name . ' for Ghorer Bazar storefront.',
                    'category' => $category,
                    'price' => $price,
                    'original_price' => $originalPrice,
                    'stock' => $stock,
                    'image' => $image,
                    'images' => [$image],
                    'weight' => $weight,
                    'rating' => $rating,
                    'reviews_count' => $reviewsCount,
                    'is_featured' => $featured,
                    'tag' => $tag,
                ],
            );
        }
    }
}
