<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'customerName' => $order->user->name ?? 'Guest User',
                    'timestamp' => $order->created_at->toISOString(),
                    'status' => strtoupper($order->status),
                    'total' => (float)$order->total,
                    'items' => $order->items->map(function($item) {
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
