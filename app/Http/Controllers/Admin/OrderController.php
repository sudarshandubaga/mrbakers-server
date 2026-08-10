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

        // Map UI statuses to database statuses
        // UI uses 'pending' but DB stores 'Confirmed' for new orders
        if ($request->filled('status')) {
            $statuses = explode(',', $request->status);
            $dbStatuses = [];
            foreach ($statuses as $s) {
                $s = trim(strtolower($s));
                if ($s === 'pending') {
                    $dbStatuses[] = 'Confirmed';
                } elseif ($s === 'accepted') {
                    $dbStatuses[] = 'Accepted';
                } elseif ($s === 'processing') {
                    $dbStatuses[] = 'Processing';
                } elseif ($s === 'completed') {
                    $dbStatuses[] = 'Completed';
                } elseif ($s === 'cancelled') {
                    $dbStatuses[] = 'Cancelled';
                } else {
                    $dbStatuses[] = ucfirst($s);
                }
            }
            $query->whereIn('status', $dbStatuses);
        }

        $orders = $query->orderBy('id', 'desc')
            ->get()
            ->map(function ($order) {
                $status = strtolower($order->status);
                $displayStatus = match ($status) {
                    'confirmed' => 'PENDING',
                    'accepted' => 'ACCEPTED',
                    'processing' => 'PROCESSING',
                    'completed' => 'COMPLETED',
                    'cancelled' => 'CANCELLED',
                    default => strtoupper($order->status),
                };

                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'customerName' => ($order->user->first_name ?? '') . ' ' . ($order->user->last_name ?? ''),
                    'customerEmail' => $order->user->email ?? 'N/A',
                    'customerPhone' => $order->user->phone ?? 'N/A',
                    'timestamp' => $order->created_at->toISOString(),
                    'status' => $displayStatus,
                    'subtotal' => (float)$order->subtotal,
                    'delivery_fee' => (float)$order->delivery_fee,
                    'discount_amount' => (float)$order->discount_amount,
                    'voucher_code' => $order->voucher->code ?? null,
                    'total' => (float)$order->total,
                    'notes' => $order->notes,
                    'payment_id' => $order->payment_id,
                    'payment_method' => $order->payment_id ? 'Prepaid (Razorpay)' : 'Cash on Delivery',
                    'address' => $order->address
                        ? implode(', ', array_filter([
                            $order->address->label,
                            $order->address->address_line1,
                            $order->address->address_line2,
                            $order->address->landmark,
                            $order->address->city,
                            $order->address->pincode,
                        ]))
                        : null,
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

        // Map incoming status values to database values
        $status = strtolower($request->status);
        $dbStatus = match ($status) {
            'pending' => 'Confirmed',
            'accepted' => 'Accepted',
            'processing' => 'Processing',
            'completed' => 'Completed',
            'cancelled' => 'Cancelled',
            default => ucfirst($status),
        };

        $order->status = $dbStatus;
        $order->save();

        return response()->json([
            'success' => true,
            'status' => $dbStatus,
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['items', 'user', 'address', 'voucher'])
            ->findOrFail($id);

        $status = strtolower($order->status);

        $displayStatus = match ($status) {
            'confirmed' => 'PENDING',
            'accepted' => 'ACCEPTED',
            'processing' => 'PROCESSING',
            'completed' => 'COMPLETED',
            'cancelled' => 'CANCELLED',
            default => strtoupper($order->status),
        };

        return response()->json([
            'id' => $order->id,
            'order_number' => $order->order_number,

            'customerName' => trim(
                ($order->user->first_name ?? '') . ' ' .
                    ($order->user->last_name ?? '')
            ),
            'customerEmail' => $order->user->email ?? 'N/A',
            'customerPhone' => $order->user->phone ?? 'N/A',

            'timestamp' => $order->created_at?->toISOString(),
            'status' => $displayStatus,

            'subtotal' => (float) $order->subtotal,
            'delivery_fee' => (float) $order->delivery_fee,
            'discount_amount' => (float) $order->discount_amount,
            'voucher_code' => $order->voucher->code ?? null,
            'total' => (float) $order->total,

            'notes' => $order->notes,
            'payment_id' => $order->payment_id,
            'payment_method' => $order->payment_id
                ? 'Prepaid (Razorpay)'
                : 'Cash on Delivery',

            'address' => $order->address
                ? implode(', ', array_filter([
                    $order->address->label,
                    $order->address->address_line1,
                    $order->address->address_line2,
                    $order->address->landmark,
                    $order->address->city,
                    $order->address->pincode,
                ]))
                : null,

            'items' => $order->items->map(function ($item) {
                return [
                    'name' => $item->product_name .
                        ($item->variant_name
                            ? " ({$item->variant_name})"
                            : ''),
                    'quantity' => (int) $item->qty,
                    'price' => (float) $item->price,
                ];
            })->values(),
        ]);
    }
}
