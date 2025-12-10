<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Slider;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $banners = Slider::get()->toArray();
        $products = Category::with(['products'])->get()->toArray();

        return response()->json(compact('products'));
    }
}
