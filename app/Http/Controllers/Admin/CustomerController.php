<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('role', '!=', 'admin') 
            ->with(['orders', 'addresses'])
            ->withCount('orders')
            ->latest()
            ->get()
            ->map(function($user) {
                // Determine primary location or first one
                $location = $user->addresses->where('is_primary', true)->first();
                if (!$location) $location = $user->addresses->first();

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone ?? 'N/A',
                    'location' => $location ? ($location->city . ', ' . $location->state) : 'No address set',
                    'totalOrders' => (int)$user->orders_count,
                    'totalSpent' => (float)$user->orders->sum('total'),
                    'lastOrderDate' => $user->orders->sortByDesc('id')->first()?->created_at->toISOString() ?? $user->created_at->toISOString(),
                    'status' => 'Active'
                ];
            });

        return response()->json($customers);
    }
}
