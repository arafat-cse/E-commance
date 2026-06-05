<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = ['cart_id', 'product_id', 'quantity', 'price'];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'float',
    ];

    /**
     * Get the cart this item belongs to
     */
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * Get the product for this cart item
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get item subtotal
     */
    public function getSubtotalAttribute()
    {
        return $this->product->price * $this->quantity;
    }
}
