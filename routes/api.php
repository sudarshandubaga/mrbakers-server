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
            'product' => ProductController::class,
            'orders' => \App\Http\Controllers\Admin\OrderController::class,
            'customers' => \App\Http\Controllers\Admin\CustomerController::class,
            'vouchers' => \App\Http\Controllers\Admin\VoucherController::class,
            'product-notifications' => \App\Http\Controllers\Admin\ProductNotificationController::class,
        ]);
        
        Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index']);
        Route::get('/settings', [\App\Http\Controllers\Admin\AppSettingController::class, 'index']);
        Route::post('/settings', [\App\Http\Controllers\Admin\AppSettingController::class, 'update']);
        Route::post('/orders/{id}/status', [\App\Http\Controllers\Admin\OrderController::class, 'updateStatus']);
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

Route::get('/settings', [\App\Http\Controllers\Admin\AppSettingController::class, 'index']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/home', [HomeController::class, 'index']);
    Route::get('/search', [HomeController::class, 'search']);
    Route::get('/product/{id}', [App\Http\Controllers\Api\ProductController::class, 'show']);

    Route::apiResources([
        'wishlist' => WishlistController::class
    ]);
    Route::post('/wishlist/toggle', [WishlistController::class, 'toggle']);
    Route::post('/notify-me', [\App\Http\Controllers\Api\ProductNotificationController::class, 'store']);

    Route::post('/place-order', [App\Http\Controllers\Api\OrderController::class, 'placeOrder']);
    Route::post('/validate-voucher', [App\Http\Controllers\Api\VoucherController::class, 'validateVoucher']);
    Route::get('/order-history', [App\Http\Controllers\Api\OrderController::class, 'history']);

    Route::get('/addresses', [App\Http\Controllers\Api\AddressController::class, 'index']);
    Route::post('/addresses', [App\Http\Controllers\Api\AddressController::class, 'store']);
    Route::post('/addresses/{id}/primary', [App\Http\Controllers\Api\AddressController::class, 'setPrimary']);
});