<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class LoginController extends Controller
{
    public function doLogin(Request $request)
    {
        // Validate inputs
        $request->validate([
            'phone'    => 'required|regex:/\d{10}$/',
            'password' => 'required'
        ]);

        $role = $request?->role ?: 'customer';

        // Find user by phone
        $user = User::where('phone', $request->phone)->where('role', $role)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Check password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Create token (Sanctum)
        $token = $user->createToken('user_token')->plainTextToken;

        return response()->json([
            'message' => 'Success! You\'re now logged in.',
            'token'   => $token,
            'user'    => $user
        ], 200);
    }
}
