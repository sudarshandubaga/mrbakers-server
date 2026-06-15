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

        $settings = \App\Models\Setting::first();
        if ($settings && $settings->order_from_time && $settings->order_to_time) {
            $now = \Carbon\Carbon::now()->format('H:i:s');
            $from = $settings->order_from_time;
            $to = $settings->order_to_time;

            $isAllowed = false;
            if ($from <= $to) {
                $isAllowed = ($now >= $from && $now <= $to);
            } else {
                $isAllowed = ($now >= $from || $now <= $to);
            }

            if (!$isAllowed) {
                return response()->json([
                    'success' => false,
                    'message' => $settings->order_disabled_message ?: 'Orders are currently not accepted at this time.'
                ], 400);
            }
        }

        $user = $request->user();
        $items = $request->items;

        // Generate Order number
        $orderNumber = 'ORD-' . strtoupper(Str::random(6));

        try {
            return \Illuminate\Support\Facades\DB::transaction(function () use ($request, $user, $orderNumber, $items) {
                $orderData = [
                    'user_id' => $user->id,
                    'order_number' => $orderNumber,
                    'subtotal' => $request->subtotal,
                    'delivery_fee' => $request->deliveryFee ?? 0,
                    'discount_amount' => $request->discountAmount ?? 0,
                    'voucher_id' => $request->voucher_id,
                    'total' => $request->totalAmount,
                    'status' => 'Confirmed',
                    'payment_id' => $request->paymentId,
                    'address_id' => $request->address_id,
                ];
                if ($request->filled('notes')) {
                    $orderData['notes'] = $request->notes;
                }
                $order = Order::create($orderData);

                if ($request->voucher_id) {
                    \App\Models\Voucher::where('id', $request->voucher_id)->increment('usage_count');
                }

                foreach ($items as $item) {
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

                $orderLoaded = $order->load('items');
                \App\Services\FcmService::sendOrderNotification($orderLoaded);

                return response()->json([
                    'success' => true,
                    'order' => $orderLoaded
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

        $orders = Order::with('items')->where('user_id', $user->id)->orderBy('id', 'desc')->get()->map(function ($order) {
            return [
                'id' => $order->order_number,
                'date' => $order->created_at->format('j F Y'),
                'total' => $order->total,
                'subtotal' => $order->subtotal,
                'deliveryFee' => $order->delivery_fee,
                'discountAmount' => $order->discount_amount,
                'status' => $order->status,
                'notes' => $order->notes ?? '',
                'items' => $order->items->map(function ($item) {
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

    public function checkOrderStatus(Request $request)
    {
        $settings = \App\Models\Setting::first();
        if ($settings && $settings->order_from_time && $settings->order_to_time) {
            $now = \Carbon\Carbon::now()->format('H:i:s');
            $from = $settings->order_from_time;
            $to = $settings->order_to_time;

            $isAllowed = false;
            if ($from <= $to) {
                $isAllowed = ($now >= $from && $now <= $to);
            } else {
                $isAllowed = ($now >= $from || $now <= $to);
            }

            if (!$isAllowed) {
                return response()->json([
                    'success' => false,
                    'message' => $settings->order_disabled_message ?: 'Orders are currently not accepted at this time.'
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Ordering is available.'
        ]);
    }
    public function testCheckout(Request $request)
    {
        $user = \App\Models\User::where('role', 'customer')->first();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'No regular users found for testing']);
        }

        $address = \App\Models\UserAddress::where('user_id', $user->id)->first();
        $product = \App\Models\Product::first();

        if (!$product) {
            return response()->json(['success' => false, 'message' => 'No products found']);
        }

        $orderNumber = 'TEST-ORD-' . strtoupper(Str::random(6));

        return \Illuminate\Support\Facades\DB::transaction(function () use ($user, $address, $product, $orderNumber) {
            $price = $product->regular_price ?? 100;
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => $orderNumber,
                'subtotal' => $price,
                'delivery_fee' => 40,
                'discount_amount' => 0,
                'total' => $price + 40,
                'status' => 'Confirmed',
                'payment_id' => 'pay_test_' . Str::random(10),
                'address_id' => $address ? $address->id : null
            ]);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'qty' => 1,
                'price' => $price,
            ]);

            $orderLoaded = $order->load('items');
            \App\Services\FcmService::sendOrderNotification($orderLoaded);

            return response()->json([
                'success' => true,
                'message' => 'Test order placed successfully.',
                'order' => $orderLoaded
            ]);
        });
    }
}
