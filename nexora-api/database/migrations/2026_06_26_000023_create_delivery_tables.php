<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('delivery_orders', function (Blueprint $table) {
            $table->id();
            $table->string('do_no')->unique();
            $table->date('do_date');
            $table->foreignId('sales_order_id')->nullable()->constrained('sales_orders')->onDelete('set null');
            $table->string('so_no')->nullable();
            $table->foreignId('customer_id')->nullable()->constrained('customers')->onDelete('set null');
            $table->string('customer_name');
            $table->string('warehouse')->nullable();
            $table->date('delivery_date')->nullable();
            $table->enum('status', ['Pending', 'In Delivery', 'Completed', 'Cancelled'])->default('Pending');
            $table->enum('delivery_type', ['Own Fleet', 'External'])->default('Own Fleet');
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('delivery_notes', function (Blueprint $table) {
            $table->id();
            $table->string('dn_no')->unique();
            $table->date('dn_date');
            $table->foreignId('delivery_order_id')->nullable()->constrained('delivery_orders')->onDelete('set null');
            $table->string('do_no')->nullable();
            $table->foreignId('customer_id')->nullable()->constrained('customers')->onDelete('set null');
            $table->string('customer_name');
            $table->date('delivery_date')->nullable();
            $table->string('receiver')->nullable();
            $table->enum('status', ['Pending', 'In Process', 'Completed'])->default('Pending');
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('delivery_notes');
        Schema::dropIfExists('delivery_orders');
    }
};
