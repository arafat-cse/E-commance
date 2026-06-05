<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Get user's cart with items
     * GET /api/cart
     */
    public function index()
    {
        $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);

        $items = CartItem::where('cart_id', $cart->id)
                         ->with('product')
                         ->get();

        // Calculate totals
        $subtotal = $items->sum(fn($item) => $item->product->price * $item->quantity);
        $tax = $subtotal * 0.10; // 10% tax (adjustable)
        $total = $subtotal + $tax;

        return response()->json([
            'success' => true,
            'data' => [
                'items' => $items->map(fn($item) => [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'price' => $item->product->price,
                        'image' => $item->product->image,
                        'weight' => $item->product->weight,
                    ],
                    'quantity' => $item->quantity,
                    'subtotal' => $item->product->price * $item->quantity,
                ]),
                'summary' => [
                    'subtotal' => $subtotal,
                    'tax' => round($tax, 2),
                    'total' => round($total, 2),
                    'item_count' => $items->count(),
                ]
            ]
        ]);
    }

    /**
     * Add item to cart
     * POST /api/cart/add
     * Body: { product_id, quantity }
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1|max:100',
        ]);

        $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);
        $product = Product::findOrFail($request->product_id);

        // Check if item already in cart
        $cartItem = CartItem::where('cart_id', $cart->id)
                            ->where('product_id', $request->product_id)
                            ->first();

        if ($cartItem) {
            // Update quantity
            $cartItem->update([
                'quantity' => $cartItem->quantity + $request->quantity,
            ]);
        } else {
            // Add new item
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $product->price, // Store price at time of adding
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Item added to cart',
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'quantity' => $request->quantity,
            ]
        ], 201);
    }

    /**
     * Update cart item quantity
     * PUT /api/cart/item/{cartItemId}
     * Body: { quantity }
     */
    public function update(Request $request, $cartItemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:100',
        ]);

        $cartItem = CartItem::findOrFail($cartItemId);
        
        // Verify ownership
        $userCart = Cart::where('user_id', auth()->id())->first();
        if ($cartItem->cart_id !== $userCart->id) {
            return response()->json([
                'success' => false,
                'error' => 'Unauthorized'
            ], 403);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'success' => true,
            'message' => 'Cart item updated',
            'data' => $cartItem
        ]);
    }

    /**
     * Remove item from cart
     * DELETE /api/cart/item/{cartItemId}
     */
    public function removeItem($cartItemId)
    {
        $cartItem = CartItem::findOrFail($cartItemId);
        
        // Verify ownership
        $userCart = Cart::where('user_id', auth()->id())->first();
        if ($cartItem->cart_id !== $userCart->id) {
            return response()->json([
                'success' => false,
                'error' => 'Unauthorized'
            ], 403);
        }

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart'
        ]);
    }

    /**
     * Clear entire cart
     * DELETE /api/cart
     */
    public function clear()
    {
        $cart = Cart::where('user_id', auth()->id())->first();
        
        if ($cart) {
            CartItem::where('cart_id', $cart->id)->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared'
        ]);
    }

    /**
     * Get cart item count
     * GET /api/cart/count
     */
    public function count()
    {
        $cart = Cart::where('user_id', auth()->id())->first();
        $count = $cart ? CartItem::where('cart_id', $cart->id)->count() : 0;

        return response()->json([
            'success' => true,
            'count' => $count
        ]);
    }
}
