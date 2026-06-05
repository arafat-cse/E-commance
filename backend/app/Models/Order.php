<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'subtotal',
        'tax',
        'shipping_cost',
        'total_amount',
        'status',
        'payment_status',
        'shipping_address',
        'notes',
    ];

    protected $casts = [
        'shipping_address' => 'array',
        'total_amount' => 'float',
        'tax' => 'float',
        'shipping_cost' => 'float',
        'subtotal' => 'float',
    ];

    /**
     * Get the user who placed this order
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get order items
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Check if order is completed
     */
    public function isCompleted()
    {
        return $this->status === 'delivered';
    }

    /**
     * Check if order is pending
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Check if payment is pending
     */
    public function isPaymentPending()
    {
        return $this->payment_status === 'pending';
    }
}
