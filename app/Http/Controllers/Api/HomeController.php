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
                    'category_id'
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
}
