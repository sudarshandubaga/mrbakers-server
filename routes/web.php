<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'landing');
Route::view('/privacy', 'privacy');
Route::view('/terms', 'terms');
Route::view('/mrbakers-admin/{any?}', 'admin')->where('any', '.*');
