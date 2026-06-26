<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_contracts', function (Blueprint $table) {
            $table->id();
            $table->string('contract_no')->unique();
            $table->date('date');
            $table->date('start_date');
            $table->date('end_date');
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('contract_value', 15, 2)->default(0);
            $table->enum('status', ['Draft', 'Active', 'Expired', 'Terminated', 'Renewed'])->default('Draft');
            $table->enum('payment_terms', ['Monthly', 'Quarterly', 'Semi-Annually', 'Annually', 'Upon Delivery'])->default('Monthly');
            $table->text('terms_and_conditions')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            $table->index('contract_no');
            $table->index('status');
            $table->index('start_date');
            $table->index('end_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_contracts');
    }
};
