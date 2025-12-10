<?php

use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/login", [LoginController::class, 'doLogin']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    // App Routes
    Route::get("/home", [HomeController::class, 'index']);

    // Admin Routes
    Route::group(['prefix' => 'admin'], function () {
        Route::apiResources([
            'category' => CategoryController::class,
            'product' => ProductController::class
        ]);
    });
});
