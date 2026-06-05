<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id'];

    /**
     * Get cart items
     */
    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Get the user who owns this cart
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get total cart value
     */
    public function getTotalAttribute()
    {
        return $this->items->sum(fn($item) => $item->product->price * $item->quantity);
    }

    /**
     * Get item count in cart
     */
    public function getItemCountAttribute()
    {
        return $this->items->sum('quantity');
    }
}
