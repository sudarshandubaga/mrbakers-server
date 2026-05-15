<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductNotification;
use Illuminate\Http\Request;

class ProductNotificationController extends Controller
{
    public function index()
    {
        $notifications = ProductNotification::with(['user', 'product'])
            ->latest()
            ->get();

        return response()->json($notifications);
    }

    public function destroy($id)
    {
        $notification = ProductNotification::findOrFail($id);
        $notification->delete();

        return response()->json([
            'status' => true,
            'message' => 'Notification request deleted successfully'
        ]);
    }
}
