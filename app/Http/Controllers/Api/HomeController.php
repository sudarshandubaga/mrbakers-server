<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Slider;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Sliders
        $sliders = Slider::select('id', 'title', 'image')->get();

        // Categories (only parent categories for home)
        $categories = Category::whereNull('parent_id')
            ->has('products')
            ->select('id', 'name', 'slug', 'image', 'icon')
            ->get();

        // Products grouped by category
        $productsByCategories = [];

        foreach ($categories as $category) {
            $products = Product::with('variants')
                ->where('category_id', $category->id)
                ->select(
                    'id',
                    'name',
                    'slug',
                    'has_variants',
                    'regular_price',
                    'trade_price',
                    'main_image',
                    'category_id',
                    'is_in_stock'
                )
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => $product->has_variants
                            ? $product->trade_price
                            : $product->regular_price,
                        'image' => $product->main_image,
                        'is_in_stock' => $product->is_in_stock,
                        'in_wishlist' => $product->in_wishlist,
                        'variants' => $product->variants->map(function ($variant) {
                            return [
                                'id' => $variant->id,
                                'name' => $variant->name,
                                'price' => $variant->trade_price,
                                'attributes' => $variant->attributes,
                            ];
                        }),
                    ];
                });

            $productsByCategories[] = [
                'category_id' => $category->id,
                'heading' => $category->name,
                'items' => $products,
            ];
        }

        return response()->json([
            'categories' => $categories,
            'sliders' => $sliders,
            'products_by_categories' => $productsByCategories,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        if (! $query || strlen($query) < 2) {
            return response()->json([
                'categories' => [],
                'products' => [],
            ]);
        }

        $categories = Category::where('name', 'like', "%{$query}%")
            ->select('id', 'name', 'slug', 'icon')
            ->limit(5)
            ->get();

        $products = Product::where('name', 'like', "%{$query}%")
            ->select('id', 'name', 'slug', 'main_image', 'trade_price', 'regular_price', 'has_variants', 'is_in_stock')
            ->limit(10)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->has_variants ? $product->trade_price : $product->regular_price,
                    'image' => $product->main_image,
                    'is_in_stock' => $product->is_in_stock,
                    'in_wishlist' => $product->in_wishlist,
                ];
            });

        return response()->json([
            'categories' => $categories,
            'products' => $products,
        ]);
    }
}
