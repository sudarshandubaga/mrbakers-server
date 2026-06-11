<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;

class QuarterlySalesController extends Controller
{
    public function index()
    {
        // Get all non-cancelled orders
        $orders = Order::where('status', '!=', 'cancelled')
            ->orderBy('created_at', 'asc')
            ->get(['total', 'created_at']);

        // Group by year → quarter → month
        $years = [];
        $monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        foreach ($orders as $order) {
            $date = Carbon::parse($order->created_at);
            $year = $date->year;
            $month = $date->month;
            $quarter = (int)ceil($month / 3);
            $monthName = $date->format('F');

            if (!isset($years[$year])) {
                $years[$year] = [];
            }

            $qKey = "Q$quarter";
            if (!isset($years[$year][$qKey])) {
                $quarterStartIndex = ($quarter - 1) * 3;
                $quarterMonths = array_slice($monthLabels, $quarterStartIndex, 3);
                $years[$year][$qKey] = [
                    'label' => "Q$quarter. {$quarterMonths[0]} to {$quarterMonths[2]}",
                    'quarter' => $quarter,
                    'months' => [],
                ];
            }

            if (!isset($years[$year][$qKey]['months'][$monthName])) {
                $years[$year][$qKey]['months'][$monthName] = 0;
            }
            $years[$year][$qKey]['months'][$monthName] += (float)$order->total;
        }

        // Build response: years sorted descending
        krsort($years);
        $results = [];

        foreach ($years as $year => $quarters) {
            $yearlyTotal = 0;
            $quarterList = [];

            // Sort quarters ascending (Q1 → Q4)
            ksort($quarters);

            foreach ($quarters as $qKey => $qData) {
                $quarterTotal = 0;
                $monthList = [];

                foreach ($monthLabels as $monthName) {
                    $amount = $qData['months'][$monthName] ?? 0;
                    if ($amount > 0) {
                        $monthList[] = [
                            'name' => $monthName,
                            'amount' => $amount,
                        ];
                    }
                    $quarterTotal += $amount;
                }

                $quarterList[] = [
                    'label' => $qData['label'],
                    'quarter' => $qData['quarter'],
                    'total' => $quarterTotal,
                    'months' => $monthList,
                ];

                $yearlyTotal += $quarterTotal;
            }

            $results[] = [
                'year' => $year,
                'total' => $yearlyTotal,
                'quarters' => $quarterList,
            ];
        }

        return response()->json($results);
    }
}
