<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use App\Models\CartItem;
use App\Http\Requests\StoreOrderRequest;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Get user's orders
     * GET /api/orders
     */
    public function index(Request $request)
    {
        $query = Order::where('user_id', auth()->id());

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->get('status'));
        }

        $orders = $query->orderBy('created_at', 'DESC')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $orders->map(fn($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'total_amount' => $order->total_amount,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'created_at' => $order->created_at,
                'item_count' => $order->items()->count(),
            ]),
            'pagination' => [
                'total' => $orders->total(),
                'per_page' => $orders->perPage(),
                'current_page' => $orders->currentPage(),
            ]
        ]);
    }

    /**
     * Get order details with items
     * GET /api/orders/{orderId}
     */
    public function show($orderId)
    {
        $order = Order::findOrFail($orderId);

        // Verify ownership
        if ($order->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'error' => 'Unauthorized'
            ], 403);
        }

        $items = OrderItem::where('order_id', $order->id)->get();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'total_amount' => $order->total_amount,
                'tax' => $order->tax,
                'shipping_cost' => $order->shipping_cost,
                'subtotal' => $order->total_amount - $order->tax - $order->shipping_cost,
                'shipping_address' => $order->shipping_address,
                'notes' => $order->notes,
                'created_at' => $order->created_at,
                'items' => $items->map(fn($item) => [
                    'product_id' => $item->product_id,
                    'product_name' => $item->product_name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->quantity * $item->price,
                ]),
            ]
        ]);
    }

    /**
     * Create new order from cart
     * POST /api/orders
     * Body: { shipping_address: {name, phone, email, address, city, state, zip}, coupon_code }
     */
    public function store(StoreOrderRequest $request)
    {
        // Get user's cart
        $cart = Cart::where('user_id', auth()->id())->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'error' => 'Cart is empty'
            ], 400);
        }

        $cartItems = CartItem::where('cart_id', $cart->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'success' => false,
                'error' => 'Cart is empty'
            ], 400);
        }

        // Calculate totals
        $subtotal = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);
        $tax = $subtotal * 0.10; // 10% tax
        $shippingCost = 100; // Fixed shipping cost
        $total = $subtotal + $tax + $shippingCost;

        // Generate order number
        $orderNumber = 'ORD-' . date('Ymd') . '-' . strtoupper(uniqid());

        // Create order
        $order = Order::create([
            'user_id' => auth()->id(),
            'order_number' => $orderNumber,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'shipping_cost' => $shippingCost,
            'total_amount' => $total,
            'status' => 'pending',
            'payment_status' => 'pending',
            'shipping_address' => json_encode($request->shipping_address),
            'notes' => $request->notes ?? null,
        ]);

        // Create order items from cart
        foreach ($cartItems as $cartItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cartItem->product_id,
                'product_name' => $cartItem->product->name,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->product->price,
            ]);
        }

        // Clear cart
        CartItem::where('cart_id', $cart->id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully',
            'data' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'total_amount' => $order->total_amount,
                'status' => $order->status,
            ]
        ], 201);
    }

    /**
     * Update order status (Admin only)
     * PUT /api/orders/{orderId}/status
     * Body: { status, payment_status }
     */
    public function updateStatus(Request $request, $orderId)
    {
        // Check if user is admin
        if (auth()->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'error' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
            'payment_status' => 'nullable|in:pending,paid,failed,refunded',
        ]);

        $order = Order::findOrFail($orderId);
        $order->update($request->only(['status', 'payment_status']));

        return response()->json([
            'success' => true,
            'message' => 'Order status updated',
            'data' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
            ]
        ]);
    }

    /**
     * Cancel order
     * PUT /api/orders/{orderId}/cancel
     */
    public function cancel($orderId)
    {
        $order = Order::findOrFail($orderId);

        // Verify ownership
        if ($order->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'error' => 'Unauthorized'
            ], 403);
        }

        // Can only cancel pending or confirmed orders
        if (!in_array($order->status, ['pending', 'confirmed'])) {
            return response()->json([
                'success' => false,
                'error' => 'Cannot cancel order with status: ' . $order->status
            ], 400);
        }

        $order->update(['status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Order cancelled successfully',
            'data' => $order
        ]);
    }

    /**
     * Download invoice
     * GET /api/orders/{orderId}/invoice
     */
    public function invoice($orderId)
    {
        $order = Order::with('items')->findOrFail($orderId);

        // Verify ownership
        if ($order->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'error' => 'Unauthorized'
            ], 403);
        }

        // Return invoice data (frontend can generate PDF using this data)
        return response()->json([
            'success' => true,
            'data' => [
                'order_number' => $order->order_number,
                'order_date' => $order->created_at,
                'customer_name' => auth()->user()->name,
                'customer_email' => auth()->user()->email,
                'shipping_address' => json_decode($order->shipping_address),
                'items' => $order->items,
                'subtotal' => $order->total_amount - $order->tax - $order->shipping_cost,
                'tax' => $order->tax,
                'shipping_cost' => $order->shipping_cost,
                'total' => $order->total_amount,
            ]
        ]);
    }
}
