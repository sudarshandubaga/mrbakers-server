<?php

use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/**
 * Admin Panel Routes
 */
Route::post("/login", [LoginController::class, 'doLogin']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Admin Routes
    Route::group(['prefix' => 'admin'], function () {
        Route::apiResources([
            'category' => CategoryController::class,
            'product' => ProductController::class
        ]);
    });
});

/**
 * Mobile Application Routes
 */
Route::post('/send-otp', [LoginController::class, 'send_otp']);
Route::post('/verify-otp', [LoginController::class, 'verify_otp']);
Route::post('/sign-up', [LoginController::class, 'sign_up']);
Route::get('/razorpay-keys', function () {
    return response()->json([
        'rp_key' => env('RAZORPAY_KEY'),
        'rp_key_secret' => env('RAZORPAY_SECRET')
    ]);
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/home', [HomeController::class, 'index']);

    Route::apiResources([
        'wishlist' => WishlistController::class
    ]);

    Route::post('/place-order', [App\Http\Controllers\Api\OrderController::class, 'placeOrder']);
    Route::get('/order-history', [App\Http\Controllers\Api\OrderController::class, 'history']);
});