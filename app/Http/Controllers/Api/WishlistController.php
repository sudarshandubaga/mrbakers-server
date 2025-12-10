<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    /**
     * Display the user's wishlist.
     */
    public function index()
    {
        $items = Wishlist::where('user_id', Auth::id())
            ->with('product')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $items
        ]);
    }

    /**
     * Add product to wishlist.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        // Prevent duplicates
        $exists = Wishlist::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($exists) {
            return response()->json([
                'status' => true,
                'message' => 'Already in wishlist',
                'data' => $exists
            ], 200);
        }

        $wishlist = Wishlist::create([
            'user_id' => Auth::id(),
            'product_id' => $validated['product_id']
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Added to wishlist',
            'data' => $wishlist
        ], 201);
    }

    /**
     * Show a specific wishlist item.
     */
    public function show(Wishlist $wishlist)
    {
        if ($wishlist->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $wishlist->load('product');

        return response()->json([
            'status' => true,
            'data' => $wishlist
        ]);
    }

    /**
     * Remove item from wishlist.
     */
    public function destroy(Wishlist $wishlist)
    {
        if ($wishlist->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $wishlist->delete();

        return response()->json([
            'status' => true,
            'message' => 'Removed from wishlist'
        ]);
    }
}
