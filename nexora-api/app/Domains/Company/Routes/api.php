<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Company\Controllers\BranchController;
use App\Domains\Company\Controllers\CurrencyController;
use App\Domains\Company\Controllers\FiscalYearController;

Route::middleware('auth:sanctum')->prefix('master-data/company')->group(function () {
    Route::apiResource('branches', BranchController::class);
    Route::apiResource('currencies', CurrencyController::class);
    Route::apiResource('fiscal-years', FiscalYearController::class);
});

