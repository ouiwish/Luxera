<?php

use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;


Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->middleware('guest');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->middleware('guest');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['auth:sanctum', 'signed', 'throttle:6,1']);

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware(['auth:sanctum', 'throttle:6,1']);
