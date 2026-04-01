<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('role', '!=', 'admin') // Assuming there is a role field or filter
            ->latest()
            ->get()
            ->map(function($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone ?? 'N/A', // Assuming phone field
                    'joined' => $user->created_at->toISOString(),
                    'orders' => $user->orders_count ?? 0, // Placeholder
                    'status' => 'Active'
                ];
            });

        return response()->json($customers);
    }
}
