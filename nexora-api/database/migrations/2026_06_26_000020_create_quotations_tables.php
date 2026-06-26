<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->string('quotation_no')->unique();
            $table->date('date');
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->string('customer_name');
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->enum('status', ['Draft', 'Sent', 'Open', 'Expired', 'Converted', 'Cancelled'])->default('Draft');
            $table->date('valid_until')->nullable();
            $table->foreignId('sales_person_id')->nullable()->constrained('users')->onDelete('set null');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            $table->index('quotation_no');
            $table->index('status');
            $table->index('date');
        });

        Schema::create('quotation_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quotation_id')->constrained('quotations')->onDelete('cascade');
            $table->foreignId('item_id')->nullable()->constrained('items')->onDelete('set null');
            $table->string('item_name');
            $table->integer('quantity');
            $table->decimal('unit_price', 15, 2);
            $table->decimal('subtotal', 15, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quotation_items');
        Schema::dropIfExists('quotations');
    }
};
