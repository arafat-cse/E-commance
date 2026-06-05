<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'quantity',
        'price',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'float',
    ];

    /**
     * Get the order this item belongs to
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product for this order item
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
        return $this->price * $this->quantity;
    }
}
