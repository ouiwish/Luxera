<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\API\DealController;
use App\Http\Controllers\API\FashionDealController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\PayPalController;
use App\Http\Controllers\API\ReviewController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// API - Done
Route::middleware(['auth:sanctum'])->group(function () {

    // Auth - Profile - Done
    Route::post('/profile/auth', [ProfileController::class, 'updateProfile']);
    Route::post('/password/auth', [ProfileController::class, 'changePassword']);

    // Deals - Done
    Route::middleware('auth:sanctum')->post('/deal/sign', [DealController::class, 'signDeal']);
    Route::middleware('auth:sanctum')->post('/deal/unsign', [DealController::class, 'unSignDeal']);
    Route::middleware('auth:sanctum')->get('/deal/signed', [DealController::class, 'getSignedDeals']);

    // Payments - Done
    Route::post('/paypal/create', [PayPalController::class, 'createOrder']);
    Route::post('/paypal/capture', [PayPalController::class, 'captureOrder']);
});

// API - Done
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/collections', [FashionDealController::class, 'index']);
Route::get('/collections/{deal}', [FashionDealController::class, 'show']);
Route::get('/reviews', [ReviewController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::get('/reviews/get', [ReviewController::class, 'show']);
    Route::post('/reviews/update', [ReviewController::class, 'update']);
    Route::post('/reviews/delete', [ReviewController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/fashion-deals', [FashionDealController::class, 'store']);
    Route::post('/categories', [CategoryController::class, 'store']);
});
