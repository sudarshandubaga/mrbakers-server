<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ProductVariant extends Model
{
    protected $fillable = [
        "product_id",
        "name",
        "regular_price",
        "trade_price",
        "attributes"
    ];

    protected $casts = [
        "attributes" => "array"
    ];

    // Attributes
    public function getCartQtyAttribute()
    {
        if (!Auth::check()) {
            return 0;
        }

        return Cart::where('user_id', Auth::id())
            ->where('product_variant_id', $this->id)
            ->sum('qty');
    }
}
