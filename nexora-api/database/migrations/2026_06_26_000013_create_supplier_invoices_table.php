<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('supplier_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no')->unique();
            $table->date('date');
            $table->date('due_date');
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
            $table->foreignId('purchase_order_id')->nullable()->constrained('purchase_orders')->onDelete('set null');
            $table->foreignId('goods_receipt_id')->nullable()->constrained('goods_receipts')->onDelete('set null');
            $table->string('supplier_invoice_ref')->nullable();
            $table->string('reference_number')->nullable();
            $table->decimal('subtotal', 15, 2)->default(0);
            $table->decimal('tax_amount', 15, 2)->default(0);
            $table->decimal('tax_rate', 5, 2)->default(11);
            $table->decimal('discount_amount', 15, 2)->default(0);
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->decimal('amount_due', 15, 2)->default(0);
            $table->string('currency', 3)->default('IDR');
            $table->text('description')->nullable();
            $table->enum('status', ['Draft', 'Submitted', 'Approved', 'Rejected', 'Paid', 'Overdue', 'Cancelled'])->default('Draft');
            $table->enum('payment_status', ['Unpaid', 'Partial', 'Paid'])->default('Unpaid');
            $table->text('notes')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            $table->index('invoice_no');
            $table->index('status');
            $table->index('payment_status');
            $table->index('date');
            $table->index('due_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('supplier_invoices');
    }
};
