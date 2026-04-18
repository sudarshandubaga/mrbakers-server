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
        \Illuminate\Support\Facades\Log::info('New order attempt: ', $request->all());

        $request->validate([
            'items' => 'required|array',
            'subtotal' => 'required',
            'totalAmount' => 'required',
            'address_id' => 'required',
            'paymentId' => 'required'
        ]);

        $user = $request->user();
        $items = $request->items;
        
        // Generate Order number
        $orderNumber = 'ORD-' . strtoupper(Str::random(6));

        try {
            return \Illuminate\Support\Facades\DB::transaction(function() use ($request, $user, $orderNumber, $items) {
                $order = Order::create([
                    'user_id' => $user->id,
                    'order_number' => $orderNumber,
                    'subtotal' => $request->subtotal,
                    'delivery_fee' => $request->deliveryFee ?? 0,
                    'total' => $request->totalAmount,
                    'status' => 'Confirmed',
                    'payment_id' => $request->paymentId,
                    'address_id' => $request->address_id
                ]);

                foreach($items as $item) {
                    // Safety check for keys
                    $productId = $item['productId'] ?? ($item['id'] ?? null);
                    
                    if (!$productId) {
                        throw new \Exception("Missing product ID for item: " . ($item['name'] ?? 'Unknown'));
                    }

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $productId,
                        'variant_id' => (isset($item['id']) && $item['id'] != $productId) ? $item['id'] : null,
                        'product_name' => $item['name'],
                        'variant_name' => $item['variantName'] ?? null,
                        'qty' => $item['qty'],
                        'price' => $item['price'],
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'order' => $order->load('items')
                ]);
            });
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Order Placement Failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Order failed: ' . $e->getMessage()
            ], 500);
        }
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
