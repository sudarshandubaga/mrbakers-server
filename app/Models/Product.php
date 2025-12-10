<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'gst_rate',
        'has_variants',
        'regular_price',
        'trade_price',
        'main_image',
        'description'
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    // Attributes
    public function getCartQtyAttribute()
    {
        if (!Auth::check()) {
            return 0;
        }

        return Cart::where('user_id', Auth::id())
            ->where('product_id', $this->id)
            ->sum('qty');
    }
    public function getInWishlistAttribute()
    {
        if (!Auth::check()) {
            return false;
        }

        return \App\Models\Wishlist::where('user_id', Auth::id())
            ->where('product_id', $this->id)
            ->exists();
    }
    public function getMainImageAttribute($image)
    {
        return $image ? asset('storage/' . $image) : null;
    }

    // Relations
    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
