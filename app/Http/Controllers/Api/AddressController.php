<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserAddress;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'addresses' => $request->user()->addresses
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required|in:home,office',
            'address_line1' => 'required|string',
            'city' => 'required|string',
            'pincode' => 'nullable|numeric',
        ]);

        $user = $request->user();

        if ($request->is_primary) {
            UserAddress::where('user_id', $user->id)->update(['is_primary' => false]);
        }

        $address = UserAddress::create([
            'user_id' => $user->id,
            'label' => $request->label,
            'address_line1' => $request->address_line1,
            'address_line2' => $request->address_line2,
            'landmark' => $request->landmark,
            'city' => $request->city,
            'pincode' => $request->pincode,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'is_primary' => $request->is_primary ?? false
        ]);

        return response()->json([
            'success' => true,
            'address' => $address
        ]);
    }

    public function setPrimary(Request $request, $id)
    {
        $user = $request->user();
        
        UserAddress::where('user_id', $user->id)->update(['is_primary' => false]);
        UserAddress::where('user_id', $user->id)->where('id', $id)->update(['is_primary' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Primary address updated'
        ]);
    }
}
