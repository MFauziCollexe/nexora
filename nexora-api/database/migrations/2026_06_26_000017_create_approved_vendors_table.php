<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('approved_vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
            $table->string('vendor_code')->unique();
            $table->string('category')->nullable();
            $table->string('certification')->nullable();
            $table->enum('approval_status', ['Pending', 'Approved', 'Suspended', 'Revoked'])->default('Pending');
            $table->date('approval_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->date('last_review_date')->nullable();
            $table->date('next_review_date')->nullable();
            $table->text('scope_of_supply')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            $table->index('vendor_code');
            $table->index('approval_status');
            $table->index('category');
            $table->unique('supplier_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('approved_vendors');
    }
};
