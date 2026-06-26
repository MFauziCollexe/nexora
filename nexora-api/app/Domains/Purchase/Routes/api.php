<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Purchase\Controllers\PurchaseRequestController;
use App\Domains\Purchase\Controllers\RfqController;
use App\Domains\Purchase\Controllers\PurchaseOrderController;
use App\Domains\Purchase\Controllers\PurchaseContractController;
use App\Domains\Purchase\Controllers\GoodsReceiptController;
use App\Domains\Purchase\Controllers\SupplierReturnController;
use App\Domains\Purchase\Controllers\SupplierInvoiceController;
use App\Domains\Purchase\Controllers\VendorEvaluationController;
use App\Domains\Purchase\Controllers\ApprovedVendorController;
use App\Domains\Purchase\Controllers\SupplierPaymentController;

Route::middleware('auth:sanctum')->prefix('purchase')->group(function () {
    Route::apiResource('purchase-requests', PurchaseRequestController::class);
    Route::apiResource('rfqs', RfqController::class);
    Route::apiResource('purchase-orders', PurchaseOrderController::class);
    Route::apiResource('purchase-contracts', PurchaseContractController::class);
    Route::apiResource('goods-receipts', GoodsReceiptController::class);
    Route::apiResource('supplier-returns', SupplierReturnController::class);
    Route::apiResource('supplier-invoices', SupplierInvoiceController::class);
    Route::apiResource('vendor-evaluations', VendorEvaluationController::class);
    Route::apiResource('approved-vendors', ApprovedVendorController::class);
    Route::apiResource('supplier-payments', SupplierPaymentController::class);
});
