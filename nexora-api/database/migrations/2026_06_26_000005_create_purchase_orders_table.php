<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->string('po_no')->unique();
            $table->date('date');
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
            $table->foreignId('rfq_id')->nullable()->constrained('rfqs')->onDelete('set null');
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('expected_delivery_date')->nullable();
            $table->integer('total_items')->default(0);
            $table->decimal('subtotal', 15, 2)->default(0);
            $table->decimal('discount', 15, 2)->default(0);
            $table->decimal('tax', 15, 2)->default(0);
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->enum('status', ['Draft', 'Pending', 'Approved', 'Sent', 'Partial', 'Received', 'Cancelled'])->default('Draft');
            $table->enum('priority', ['Low', 'Medium', 'High'])->default('Medium');
            $table->text('notes')->nullable();
            $table->string('payment_terms')->nullable();
            $table->string('shipping_method')->nullable();
            $table->foreignId('requested_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            $table->index('po_no');
            $table->index('status');
            $table->index('priority');
            $table->index('date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};
