<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['items', 'user', 'address']);

        // Filter by status if provided
        if ($request->filled('status')) {
            $statuses = explode(',', $request->status);
            $query->whereIn('status', $statuses);
        }

        $orders = $query->orderBy('id', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'customerName' => ($order->user->first_name ?? '') . ' ' . ($order->user->last_name ?? ''),
                    'customerEmail' => $order->user->email ?? 'N/A',
                    'customerPhone' => $order->user->phone ?? 'N/A',
                    'timestamp' => $order->created_at->toISOString(),
                    'status' => strtolower($order->status) === 'confirmed' ? 'PENDING' : strtoupper($order->status),
                    'subtotal' => (float)$order->subtotal,
                    'delivery_fee' => (float)$order->delivery_fee,
                    'discount_amount' => (float)$order->discount_amount,
                    'voucher_code' => $order->voucher->code ?? null,
                    'total' => (float)$order->total,
                    'payment_id' => $order->payment_id,
                    'payment_method' => $order->payment_id ? 'Prepaid (Razorpay)' : 'Cash on Delivery',
                    'address' => $order->address ? [
                        'label' => $order->address->label,
                        'address_line1' => $order->address->address_line1,
                        'address_line2' => $order->address->address_line2,
                        'landmark' => $order->address->landmark,
                        'city' => $order->address->city,
                        'pincode' => $order->address->pincode,
                        'lat' => $order->address->latitude,
                        'lng' => $order->address->longitude,
                    ] : null,
                    'items' => $order->items->map(function ($item) {
                        return [
                            'name' => $item->product_name . ($item->variant_name ? " ($item->variant_name)" : ""),
                            'quantity' => (int)$item->qty,
                            'price' => (float)$item->price
                        ];
                    })
                ];
            });

        return response()->json($orders);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return response()->json(['success' => true]);
    }
}
