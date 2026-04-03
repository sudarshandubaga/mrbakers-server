<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AccountDeletionController extends Controller
{
    public function index()
    {
        return view('delete-account');
    }

    public function store(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|exists:users,phone',
            'reason' => 'nullable|string|max:500',
            'confirm' => 'required|accepted',
        ], [
            'phone.exists' => 'No account found with this phone number.',
            'confirm.accepted' => 'You must confirm the deletion request.',
        ]);

        // In a real application, you might mark the user for deletion
        // or send an email to the administrator.
        // For now, we will just simulate a successful request.
        
        // $user = User::where('phone', $request->phone)->first();
        // Notify admin or log the request here.

        return back()->with('success', 'Your account deletion request has been received. We will process it within 30 days.');
    }
}
