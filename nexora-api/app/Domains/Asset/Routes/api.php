<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Asset\Controllers\AssetCategoryController;
use App\Domains\Asset\Controllers\AssetLocationController;
use App\Domains\Asset\Controllers\AssetStatusController;
use App\Domains\Asset\Controllers\AssetController;

Route::middleware('auth:sanctum')->prefix('master-data/asset')->group(function () {
    Route::apiResource('asset-categories', AssetCategoryController::class);
    Route::apiResource('asset-locations', AssetLocationController::class);
    Route::apiResource('asset-statuses', AssetStatusController::class);
    Route::apiResource('assets', AssetController::class);
});

