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
        $now = Carbon::now();
        $last7DaysStart = Carbon::today()->subDays(6);
        $prev7DaysStart = Carbon::today()->subDays(13);
        $prev7DaysEnd = Carbon::today()->subDays(7);

        // Current period stats (Last 7 days)
        $currentRevenue = Order::where('status', '!=', 'cancelled')
            ->whereBetween('created_at', [$last7DaysStart, $now])
            ->sum('total');
        $currentDelivered = Order::where('status', 'delivered')
            ->whereBetween('created_at', [$last7DaysStart, $now])
            ->count();
        $currentNewUsers = User::where('role', 'customer')
            ->whereBetween('created_at', [$last7DaysStart, $now])
            ->count();

        // Previous period stats (7 days before last 7 days)
        $prevRevenue = Order::where('status', '!=', 'cancelled')
            ->whereBetween('created_at', [$prev7DaysStart, $prev7DaysEnd])
            ->sum('total');
        $prevDelivered = Order::where('status', 'delivered')
            ->whereBetween('created_at', [$prev7DaysStart, $prev7DaysEnd])
            ->count();
        $prevNewUsers = User::where('role', 'customer')
            ->whereBetween('created_at', [$prev7DaysStart, $prev7DaysEnd])
            ->count();

        // Calculate trends
        $calculateTrend = function ($current, $previous) {
            if ($previous == 0) return $current > 0 ? 100 : 0;
            return round((($current - $previous) / $previous) * 100, 1);
        };

        $stats = [
            'total_revenue' => [
                'value' => (float)Order::where('status', '!=', 'cancelled')->sum('total'),
                'trend' => $calculateTrend($currentRevenue, $prevRevenue)
            ],
            'active_orders' => [
                'value' => Order::where('status', 'pending')->count(),
                'trend' => null // Trend for active orders might not be as meaningful as revenue
            ],
            'delivered_orders' => [
                'value' => Order::where('status', 'delivered')->count(),
                'trend' => $calculateTrend($currentDelivered, $prevDelivered)
            ],
            'new_customers' => [
                'value' => User::where('role', 'customer')->count(),
                'trend' => $calculateTrend($currentNewUsers, $prevNewUsers)
            ],
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
