<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendor_evaluation_criteria', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_evaluation_id')->constrained('vendor_evaluations')->onDelete('cascade');
            $table->string('criterion_name');
            $table->decimal('weight', 5, 2)->default(0)->comment('Percentage weight');
            $table->decimal('score', 5, 2)->default(0)->comment('Score 0-100');
            $table->decimal('weighted_score', 5, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendor_evaluation_criteria');
    }
};
