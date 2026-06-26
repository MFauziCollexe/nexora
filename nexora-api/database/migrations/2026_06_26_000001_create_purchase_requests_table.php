<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_requests', function (Blueprint $table) {
            $table->id();
            $table->string('pr_no')->unique();
            $table->date('date');
            $table->foreignId('requested_by')->constrained('users')->onDelete('cascade');
            $table->string('department');
            $table->text('description')->nullable();
            $table->integer('total_items')->default(0);
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->enum('status', ['Draft', 'Pending', 'Approved', 'Rejected'])->default('Draft');
            $table->enum('priority', ['Low', 'Medium', 'High'])->default('Medium');
            $table->text('notes')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();

            $table->index('pr_no');
            $table->index('status');
            $table->index('priority');
            $table->index('date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_requests');
    }
};
