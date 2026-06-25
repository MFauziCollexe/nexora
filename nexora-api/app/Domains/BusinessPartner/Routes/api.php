<?php

use Illuminate\Support\Facades\Route;
use App\Domains\BusinessPartner\Controllers\SupplierTypeController;
use App\Domains\BusinessPartner\Controllers\SupplierCategoryController;
use App\Domains\BusinessPartner\Controllers\BusinessPartnerGroupController;
use App\Domains\BusinessPartner\Controllers\CustomerController;
use App\Domains\BusinessPartner\Controllers\SupplierController;

Route::middleware('auth:sanctum')->prefix('master-data/business-partner')->group(function () {
    Route::apiResource('supplier-types', SupplierTypeController::class);
    Route::apiResource('supplier-categories', SupplierCategoryController::class);
    Route::apiResource('business-partner-groups', BusinessPartnerGroupController::class);
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('suppliers', SupplierController::class);
});

