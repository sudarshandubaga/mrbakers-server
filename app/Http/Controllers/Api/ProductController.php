<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function show($id)
    {
        $product = Product::with(['variants', 'category'])->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([
            'status' => true,
            'data' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'image' => $product->main_image,
                'price' => $product->has_variants ? $product->trade_price : $product->regular_price,
                'regular_price' => $product->regular_price,
                'trade_price' => $product->trade_price,
                'is_in_stock' => $product->is_in_stock,
                'in_wishlist' => $product->in_wishlist,
                'category' => [
                    'id' => $product->category->id,
                    'name' => $product->category->name,
                ],
                'variants' => $product->variants->map(function ($v) {
                    return [
                        'id' => $v->id,
                        'name' => $v->name,
                        'price' => $v->trade_price,
                        'regular_price' => $v->regular_price,
                    ];
                })
            ]
        ]);
    }
}
