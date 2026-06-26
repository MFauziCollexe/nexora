<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('supplier_payments', function (Blueprint $table) {
            $table->id();
            $table->string('payment_no')->unique();
            $table->date('date');
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
            $table->decimal('amount', 15, 2)->default(0);
            $table->decimal('paid_amount', 15, 2)->default(0);
            $table->string('currency', 3)->default('IDR');
            $table->string('payment_method')->nullable()->comment('Bank Transfer, Cash, Cheque, Giro');
            $table->string('bank_name')->nullable();
            $table->string('bank_account')->nullable();
            $table->string('reference_number')->nullable();
            $table->date('payment_date');
            $table->text('description')->nullable();
            $table->enum('status', ['Draft', 'Submitted', 'Approved', 'Paid', 'Cancelled'])->default('Draft');
            $table->text('notes')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            $table->index('payment_no');
            $table->index('status');
            $table->index('date');
            $table->index('payment_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('supplier_payments');
    }
};
