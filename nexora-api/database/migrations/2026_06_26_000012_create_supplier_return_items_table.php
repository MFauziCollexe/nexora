<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('supplier_return_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_return_id')->constrained('supplier_returns')->onDelete('cascade');
            $table->foreignId('purchase_order_item_id')->nullable()->constrained('purchase_order_items')->onDelete('set null');
            $table->foreignId('goods_receipt_item_id')->nullable()->constrained('goods_receipt_items')->onDelete('set null');
            $table->foreignId('item_id')->nullable()->constrained('items')->onDelete('set null');
            $table->string('item_name');
            $table->integer('quantity_returned');
            $table->decimal('unit_price', 15, 2)->default(0);
            $table->decimal('total_price', 15, 2)->default(0);
            $table->string('unit')->default('Pcs');
            $table->text('return_reason')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('supplier_return_items');
    }
};
