<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        $user = $request->user();
        $items = $request->items; // cart items array
        
        // Generate Order number
        $orderNumber = 'ORD-' . strtoupper(Str::random(6));

        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => $orderNumber,
            'subtotal' => $request->subtotal,
            'delivery_fee' => $request->deliveryFee,
            'total' => $request->totalAmount,
            'status' => 'Confirmed',
            'payment_id' => $request->paymentId
        ]);

        foreach($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['productId'],
                'variant_id' => isset($item['id']) && $item['id'] !== $item['productId'] ? $item['id'] : null,
                'product_name' => $item['name'],
                'variant_name' => $item['variantName'] ?? null,
                'qty' => $item['qty'],
                'price' => $item['price'],
            ]);
        }

        return response()->json([
            'success' => true,
            'order' => $order
        ]);
    }

    public function history(Request $request)
    {
        $user = $request->user();
        
        $orders = Order::with('items')->where('user_id', $user->id)->orderBy('id', 'desc')->get()->map(function($order) {
            return [
                'id' => $order->order_number,
                'date' => $order->created_at->format('j F Y'),
                'total' => $order->total,
                'subtotal' => $order->subtotal,
                'deliveryFee' => $order->delivery_fee,
                'status' => $order->status,
                'items' => $order->items->map(function($item) {
                    return [
                        'name' => $item->product_name,
                        'variantName' => $item->variant_name,
                        'qty' => $item->qty,
                        'price' => $item->price
                    ];
                })
            ];
        });

        return response()->json([
            'success' => true,
            'orders' => $orders
        ]);
    }
}
