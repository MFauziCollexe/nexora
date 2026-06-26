<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Inventory\Controllers\CategoryController;
use App\Domains\Inventory\Controllers\BrandController;
use App\Domains\Inventory\Controllers\UomController;
use App\Domains\Inventory\Controllers\WarehouseController;
use App\Domains\Inventory\Controllers\BinLocationController;
use App\Domains\Inventory\Controllers\ItemGroupController;
use App\Domains\Inventory\Controllers\ItemTypeController;
use App\Domains\Inventory\Controllers\ItemController;
use App\Domains\Inventory\Controllers\SerialNumberController;

Route::middleware('auth:sanctum')->prefix('master-data/inventory')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('brands', BrandController::class);
    Route::apiResource('uoms', UomController::class);
    Route::apiResource('warehouses', WarehouseController::class);
    Route::apiResource('bin-locations', BinLocationController::class);
    Route::apiResource('item-groups', ItemGroupController::class);
    Route::apiResource('item-types', ItemTypeController::class);
    Route::apiResource('items', ItemController::class);
    Route::apiResource('serial-numbers', SerialNumberController::class);
});

