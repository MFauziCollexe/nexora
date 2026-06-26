<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('supplier_payment_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_payment_id')->constrained('supplier_payments')->onDelete('cascade');
            $table->foreignId('supplier_invoice_id')->constrained('supplier_invoices')->onDelete('cascade');
            $table->decimal('invoice_amount', 15, 2);
            $table->decimal('paid_amount', 15, 2);
            $table->decimal('outstanding_before', 15, 2);
            $table->decimal('outstanding_after', 15, 2);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('supplier_payment_items');
    }
};
