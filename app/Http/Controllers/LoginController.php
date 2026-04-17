<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;

class LoginController extends Controller
{
    public function doLogin(Request $request)
    {
        // Validate inputs
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $role = $request?->role ?: 'customer';

        // Find user by email
        $user = User::where('email', $request->email)->where('role', $role)->first();

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
            'token' => $token,
            'user' => $user
        ], 200);
    }

    public function send_otp(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        $otp = rand(1000, 9999);

        if (!$user) {
            $user = new User();
            $user->email = $request->email;
            $user->role = 'customer';
        }

        $user->otp = $otp;
        $user->otp_expires_at = now()->addMinutes(10);
        $user->save();

        // Send OTP via Email
        Mail::to($request->email)->send(new OtpMail($otp));

        return response()->json([
            'message' => 'OTP sent successfully',
            'otp' => $otp
        ], 200);
    }

    public function verify_otp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|numeric|min:1000|max:9999',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid email address'
            ], 401);
        }

        if ($user->otp != $request->otp) {
            return response()->json([
                'message' => 'Invalid OTP'
            ], 401);
        }


        if (empty($user->first_name)) {
            return response()->json([
                'user' => $user
            ], 200);
        }

        $token = $user->createToken('user_token')->plainTextToken;
        return response()->json([
            'message' => 'Success! You\'re now logged in.',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    public function sign_up(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'name' => 'required|string|regex:/^[a-zA-Z ]+$/',
        ]);

        $user = User::where('email', $request->email)->firstOrFail();
        $user->first_name = $request->name;
        $user->save();

        $token = $user->createToken('user_token')->plainTextToken;

        return response()->json([
            'message' => 'You are logged in successfully',
            'token' => $token,
            'user' => $user
        ], 200);
    }
}
