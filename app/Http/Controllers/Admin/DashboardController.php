<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_revenue' => (float)Order::where('status', '!=', 'cancelled')->sum('total'),
            'active_orders' => Order::where('status', 'pending')->count(),
            'delivered_orders' => Order::where('status', 'delivered')->count(),
            'new_customers' => User::where('role', 'customer')->count(),
        ];

        // Weekly Revenue Data (Last 7 days)
        $weekly_revenue = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $revenue = Order::whereDate('created_at', $date)
                ->where('status', '!=', 'cancelled')
                ->sum('total');
            
            $weekly_revenue[] = [
                'name' => $date->format('D'),
                'sales' => (float)$revenue
            ];
        }

        // Sales by Category
        $category_sales = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('categories.name', DB::raw('SUM(order_items.qty * order_items.price) as value'))
            ->groupBy('categories.name')
            ->orderBy('value', 'desc')
            ->get();

        return response()->json([
            'stats' => $stats,
            'weekly_revenue' => $weekly_revenue,
            'category_sales' => $category_sales,
        ]);
    }
}
