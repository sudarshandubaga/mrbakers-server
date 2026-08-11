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
            ->map(function ($user) {

                // Format all customer addresses as full address strings
                // List all customer addresses 
                $locations = $user->addresses->map(function ($address) {
                    return collect([$address->address_line1, $address->address_line2, $address->landmark, $address->city, $address->pincode,])->filter(fn($value) => filled($value))->implode(', ');
                })->values();

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone ?? 'N/A',
                    'location' => $locations,
                    'totalOrders' => (int) $user->orders_count,
                    'totalSpent' => (float) $user->orders->sum('total'),
                    'lastOrderDate' => $user->orders->sortByDesc('id')->first()?->created_at->toISOString()
                        ?? $user->created_at->toISOString(),
                    'status' => 'Active',
                    'addresses' => $user->addresses
                ];
            });

        return response()->json($customers);
    }
}
