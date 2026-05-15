<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductNotificationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $notification = ProductNotification::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $request->product_id,
            ],
            [
                'is_notified' => false,
            ]
        );

        return response()->json([
            'status' => true,
            'message' => 'We will notify you when this product is back in stock!',
            'data' => $notification
        ]);
    }
}
