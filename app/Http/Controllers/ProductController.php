<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * GET /products
     */
    public function index()
    {
        $products = Product::with(['variants', 'category'])->latest()->paginate(10);

        return response()->json($products->toArray());
    }

    /**
     * POST /products
     */
    public function store(Request $request)
    {
        $request->validate([
            "name"          => "required|string|unique:products,name",
            "regular_price" => "nullable|numeric",
            "trade_price"   => "nullable|numeric",
            "has_variants"  => "boolean",

            "main_image"    => "nullable|string",
            "description"   => "nullable|string",

            "gst_rate"      => "required|numeric|min:0",
            "category_id"   => "required|numeric|exists:categories,id",

            // Variants (optional)
            "variants"                 => "required_if:has_variants,true|array",
            "variants.*.name"          => "required|string",
            "variants.*.regular_price" => "nullable|numeric",
            "variants.*.trade_price"   => "required|numeric",
            "variants.*.attributes"    => "nullable|array",
        ]);

        $minRegular = $request->regular_price;
        $minTrade = $request->trade_price;

        $variantPrices = $request->variants ?? [];

        if ($request->has_variants) {
            // Calculate main product prices as minimum of variants
            $minRegular = null;
            $regularPrices = array_filter(array_column($variantPrices, 'regular_price'), fn($v) => $v !== null);
            if (!empty($regularPrices)) {
                $minRegular = min($regularPrices);
            }

            $minTrade = min(array_column($variantPrices, 'trade_price'));
        } else {
            $minRegular = $request->regular_price ?? null;
            $minTrade = $request->trade_price ?? null;
        }

        // Create product
        $product = Product::create([
            "name"          => $request->name,
            "slug"          => Str::slug($request->name),
            "category_id"   => $request->category_id,
            "gst_rate"      => $request->gst_rate,
            "regular_price" => $minRegular,
            "trade_price"   => $minTrade,
            "main_image"    => dataUriToImage($request->main_image, "products"),
            "description"   => $request->description,
            "has_variants"  => $request->has_variants ?? false,
        ]);

        if ($product->has_variants) {
            foreach ($request->variants as $variantData) {
                ProductVariant::create([
                    "product_id"    => $product->id,
                    "name"          => $variantData["name"],
                    "regular_price" => $variantData["regular_price"] ?? null,
                    "trade_price"   => $variantData["trade_price"],
                    "attributes"    => json_encode($variantData["attributes"] ?? [])
                ]);
            }
        }

        return response()->json([
            "status"  => true,
            "message" => "Product created successfully",
            "data"    => $product->load(['variants', 'category'])
        ], 201);
    }

    /**
     * GET /products/{product}
     */
    public function show(Product $product)
    {
        return response()->json([
            "status" => true,
            "data"   => $product->load(['variants', 'category'])
        ]);
    }

    /**
     * PUT /products/{product}
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            "name"          => "required|string|unique:products,name,{$product->id}",
            "regular_price" => "nullable|numeric",
            "trade_price"   => "nullable|numeric",
            "has_variants"  => "boolean",

            "main_image"    => "nullable|string",
            "description"   => "nullable|string",

            "gst_rate"      => "required|numeric|min:0",
            "category_id"   => "required|numeric|exists:categories,id",

            // Variants
            "variants"                 => "required_if:has_variants,true|array",
            "variants.*.id"            => "nullable|exists:product_variants,id",
            "variants.*.name"          => "required|string",
            "variants.*.regular_price" => "nullable|numeric",
            "variants.*.trade_price"   => "required|numeric",
            "variants.*.attributes"    => "nullable|array",
        ]);

        /** -----------------------------------------
         *  CALCULATE MAIN PRICES (Same as store)
         * ----------------------------------------- */
        $minRegular = $request->regular_price;
        $minTrade   = $request->trade_price;

        $variantPrices = $request->variants ?? [];

        if ($request->has_variants) {
            // Calculate minimum variant regular price
            $regularPrices = array_filter(
                array_column($variantPrices, 'regular_price'),
                fn($v) => $v !== null
            );

            $minRegular = !empty($regularPrices) ? min($regularPrices) : null;

            // Trade price required, so min always exists
            $minTrade = min(array_column($variantPrices, 'trade_price'));
        }

        /** -----------------------------------------
         *  UPDATE PRODUCT
         * ----------------------------------------- */

        $data = [
            "name"          => $request->name,
            "slug"          => Str::slug($request->name),
            "category_id"   => $request->category_id,
            "gst_rate"      => $request->gst_rate,
            "regular_price" => $minRegular,
            "trade_price"   => $minTrade,
            "description"   => $request->description,
            "has_variants"  => $request->has_variants ?? false,
        ];

        // If a new base64 image is sent → replace
        if (!empty($request->main_image) && str_starts_with($request->main_image, 'data:image')) {
            $mainImage = dataUriToImage($request->main_image, "products");
            $data['main_image'] = $mainImage;
        }

        $product->update($data);


        /** -----------------------------------------
         *  UPDATE VARIANTS
         * ----------------------------------------- */
        $existingVariantIds = $product->variants()->pluck('id')->toArray();
        $sentVariantIds     = collect($request->variants)->pluck('id')->filter()->toArray();

        // Delete removed variants
        $variantsToDelete = array_diff($existingVariantIds, $sentVariantIds);
        ProductVariant::whereIn('id', $variantsToDelete)->delete();

        // Create or update variants
        if ($request->has_variants && is_array($request->variants)) {
            foreach ($request->variants as $variantData) {
                if (!empty($variantData["id"])) {
                    // Update existing variant
                    ProductVariant::where('id', $variantData["id"])
                        ->update([
                            "name"          => $variantData["name"],
                            "regular_price" => $variantData["regular_price"] ?? null,
                            "trade_price"   => $variantData["trade_price"],
                            "attributes"    => json_encode($variantData["attributes"] ?? [])
                        ]);
                } else {
                    // Create new variant
                    ProductVariant::create([
                        "product_id"    => $product->id,
                        "name"          => $variantData["name"],
                        "regular_price" => $variantData["regular_price"] ?? null,
                        "trade_price"   => $variantData["trade_price"],
                        "attributes"    => json_encode($variantData["attributes"] ?? [])
                    ]);
                }
            }
        }

        return response()->json([
            "status"  => true,
            "message" => "Product updated successfully",
            "data"    => $product->load(['variants', 'category'])
        ]);
    }


    /**
     * DELETE /products/{product}
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            "status"  => true,
            "message" => "Product deleted successfully"
        ]);
    }
}
