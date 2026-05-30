<?php

use App\Domains\Auth\Controllers\AuthController;
use App\Domains\User\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('api.v1.auth.register');
    Route::post('login', [AuthController::class, 'login'])->name('api.v1.auth.login');
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('api.v1.auth.forgot-password');
    Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('api.v1.auth.reset-password');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('api.v1.auth.logout');
        Route::get('me', [AuthController::class, 'me'])->name('api.v1.auth.me');
        Route::post('refresh-token', [AuthController::class, 'refreshToken'])->name('api.v1.auth.refresh-token');
        Route::post('api-token', [AuthController::class, 'apiToken'])->name('api.v1.auth.api-token');
    });
});

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::get('users', [UserController::class, 'index'])->name('api.v1.users.index');
    Route::get('users/{id}', [UserController::class, 'show'])->name('api.v1.users.show');
    Route::put('users/{id}', [UserController::class, 'update'])->name('api.v1.users.update');
    Route::delete('users/{id}', [UserController::class, 'destroy'])->name('api.v1.users.destroy');
});