<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display all cart items for the authenticated user.
     */
    public function index(Request $request)
    {
        $cart = Cart::where('user_id', $request()->user()->id)
            ->with(['product', 'variant'])
            ->get();

        return response()->json($cart);
    }

    /**
     * Store a new cart item.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_variant_id' => 'nullable|exists:product_variants,id',
            'qty' => 'required|numeric|min:1'
        ]);

        // Check if item already exists (same product + variant)
        $existing = Cart::where('user_id', $request()->user()->id)
            ->where('product_id', $validated['product_id'])
            ->where('product_variant_id', $validated['product_variant_id'])
            ->first();

        if ($existing) {
            $existing->qty += $validated['qty'];
            $existing->save();

            return response()->json([
                'status' => true,
                'message' => 'Cart updated successfully',
                'data' => $existing
            ], 200);
        }

        $validated['user_id'] = $request()->user()->id;

        $cart = Cart::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Cart item added successfully',
            'data' => $cart
        ], 201);
    }

    /**
     * Display a specific cart item.
     */
    public function show(Request $request, Cart $cart)
    {
        // Restrict user access
        if ($cart->user_id !== $request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cart->load(['product', 'variant']);

        return response()->json([
            'status' => true,
            'data' => $cart
        ]);
    }

    /**
     * Update an existing cart item.
     */
    public function update(Request $request, Cart $cart)
    {
        if ($cart->user_id !== $request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'qty' => 'required|numeric|min:1'
        ]);

        $cart->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Cart item updated successfully',
            'data' => $cart
        ]);
    }

    /**
     * Remove a cart item from storage.
     */
    public function destroy(Request $request, Cart $cart)
    {
        if ($cart->user_id !== $request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cart->delete();

        return response()->json([
            'status' => true,
            'message' => 'Cart item removed successfully'
        ]);
    }
}
