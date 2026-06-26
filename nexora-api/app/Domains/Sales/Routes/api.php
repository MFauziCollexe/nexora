<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Sales\Controllers\InvoiceController;
use App\Domains\Sales\Controllers\QuotationController;
use App\Domains\Sales\Controllers\SalesOrderController;
use App\Domains\Sales\Controllers\DeliveryOrderController;
use App\Domains\Sales\Controllers\DeliveryNoteController;
use App\Domains\Sales\Controllers\SalesReturnController;
use App\Domains\Sales\Controllers\CreditNoteController;

Route::middleware('auth:sanctum')->prefix('sales')->group(function () {
    Route::get('reports/summary', [InvoiceController::class, 'summary'])->name('api.v1.sales.reports.summary');
    Route::get('reports/customer-sales', [InvoiceController::class, 'customerReport'])->name('api.v1.sales.reports.customer');
    Route::get('reports/outstanding', [InvoiceController::class, 'outstandingReport'])->name('api.v1.sales.reports.outstanding');
    Route::apiResource('invoices', InvoiceController::class)->except(['update', 'destroy']);

    Route::apiResource('quotations', QuotationController::class);
    Route::post('quotations/{id}/convert-to-so', [QuotationController::class, 'convertToSo'])->name('api.v1.sales.quotations.convert');
    Route::post('quotations/{id}/attachments', [QuotationController::class, 'uploadAttachments'])->name('api.v1.sales.quotations.attachments.upload');
    Route::delete('quotations/{id}/attachments', [QuotationController::class, 'deleteAttachment'])->name('api.v1.sales.quotations.attachments.delete');

    Route::apiResource('sales-orders', SalesOrderController::class);
    Route::apiResource('delivery-orders', DeliveryOrderController::class);
    Route::apiResource('delivery-notes', DeliveryNoteController::class);
    Route::apiResource('sales-returns', SalesReturnController::class);
    Route::apiResource('credit-notes', CreditNoteController::class);
});
