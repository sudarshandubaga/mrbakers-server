<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;

class QuarterlySalesController extends Controller
{
    public function index()
    {
        $results = [];

        // Get all non-cancelled orders
        $orders = Order::where('status', '!=', 'cancelled')
            ->orderBy('created_at', 'asc')
            ->get(['total', 'created_at']);

        // Group by year and quarter
        $grouped = [];
        foreach ($orders as $order) {
            $date = Carbon::parse($order->created_at);
            $year = $date->year;
            $month = $date->month;
            $quarter = (int)ceil($month / 3);

            $key = "$year-Q$quarter";
            if (!isset($grouped[$key])) {
                $grouped[$key] = [
                    'year' => $year,
                    'quarter' => $quarter,
                    'months' => [],
                ];
            }

            $monthKey = $date->format('F');
            if (!isset($grouped[$key]['months'][$monthKey])) {
                $grouped[$key]['months'][$monthKey] = 0;
            }
            $grouped[$key]['months'][$monthKey] += (float)$order->total;
        }

        // Month labels for each quarter
        $monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Sort by year desc, quarter desc (newest first)
        krsort($grouped);

        foreach ($grouped as $key => $data) {
            $quarterStartIndex = ($data['quarter'] - 1) * 3;
            $quarterMonths = array_slice($monthLabels, $quarterStartIndex, 3);

            $monthly = [];
            $quarterTotal = 0;
            foreach ($quarterMonths as $month) {
                $amount = $data['months'][$month] ?? 0;
                $monthly[] = [
                    'name' => $month,
                    'amount' => $amount,
                ];
                $quarterTotal += $amount;
            }

            $results[] = [
                'label' => "Q{$data['quarter']}. {$quarterMonths[0]} to {$quarterMonths[2]}",
                'year' => $data['year'],
                'quarter' => $data['quarter'],
                'total' => $quarterTotal,
                'months' => $monthly,
            ];
        }

        return response()->json($results);
    }
}
