<?php

use App\Domains\Settings\Menu\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('menus', [MenuController::class, 'getMenusForUser'])->name('api.v1.menus');
});

