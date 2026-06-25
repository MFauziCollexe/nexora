<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Finance\Controllers\CoaItemController;
use App\Domains\Finance\Controllers\TaxController;
use App\Domains\Finance\Controllers\PaymentTermController;
use App\Domains\Finance\Controllers\CostCenterController;
use App\Domains\Finance\Controllers\ProfitCenterController;
use App\Domains\Finance\Controllers\BankAccountController;
use App\Domains\Finance\Controllers\ExchangeRateController;

Route::middleware('auth:sanctum')->prefix('master-data/finance')->group(function () {
    Route::apiResource('coa-items', CoaItemController::class);
    Route::apiResource('taxes', TaxController::class);
    Route::apiResource('payment-terms', PaymentTermController::class);
    Route::apiResource('cost-centers', CostCenterController::class);
    Route::apiResource('profit-centers', ProfitCenterController::class);
    Route::apiResource('bank-accounts', BankAccountController::class);
    Route::apiResource('exchange-rates', ExchangeRateController::class);
});

