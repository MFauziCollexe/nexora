<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('supplier_returns', function (Blueprint $table) {
            $table->id();
            $table->string('sr_no')->unique();
            $table->date('date');
            $table->foreignId('purchase_order_id')->nullable()->constrained('purchase_orders')->onDelete('set null');
            $table->foreignId('goods_receipt_id')->nullable()->constrained('goods_receipts')->onDelete('set null');
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
            $table->foreignId('warehouse_id')->nullable()->constrained('warehouses')->onDelete('set null');
            $table->string('reference_number')->nullable();
            $table->text('reason')->nullable();
            $table->integer('total_items')->default(0);
            $table->integer('total_quantity')->default(0);
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->enum('status', ['Draft', 'Completed', 'Cancelled'])->default('Draft');
            $table->text('notes')->nullable();
            $table->foreignId('returned_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            $table->index('sr_no');
            $table->index('status');
            $table->index('date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('supplier_returns');
    }
};
