<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AccountDeletionController;

Route::view('/', 'landing');
Route::view('/privacy', 'privacy');
Route::view('/terms', 'terms');
Route::get('/delete-account', [AccountDeletionController::class, 'index'])->name('account.delete');
Route::post('/delete-account', [AccountDeletionController::class, 'store'])->name('account.delete.request');
Route::view('/mrbakers-admin/{any?}', 'admin')->where('any', '.*');
