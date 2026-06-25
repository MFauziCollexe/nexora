<?php

use App\Domains\User\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('users', [UserController::class, 'index'])->name('api.v1.users.index');
    Route::get('users/{id}', [UserController::class, 'show'])->name('api.v1.users.show');
    Route::put('users/{id}', [UserController::class, 'update'])->name('api.v1.users.update');
    Route::delete('users/{id}', [UserController::class, 'destroy'])->name('api.v1.users.destroy');
});

