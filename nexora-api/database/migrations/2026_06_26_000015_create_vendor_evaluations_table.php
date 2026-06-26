<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendor_evaluations', function (Blueprint $table) {
            $table->id();
            $table->string('evaluation_no')->unique();
            $table->date('evaluation_date');
            $table->string('period')->comment('e.g. Q1-2026, Jan-2026');
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
            $table->string('supplier_category')->nullable();
            $table->decimal('overall_score', 5, 2)->default(0);
            $table->string('rating')->nullable()->comment('Excellent, Good, Fair, Poor');
            $table->text('summary')->nullable();
            $table->text('recommendation')->nullable();
            $table->enum('status', ['Draft', 'Completed', 'Cancelled'])->default('Draft');
            $table->text('notes')->nullable();
            $table->foreignId('evaluated_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            $table->index('evaluation_no');
            $table->index('status');
            $table->index('period');
            $table->index('rating');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendor_evaluations');
    }
};
