<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rfq_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rfq_id')->constrained('rfqs')->onDelete('cascade');
            $table->foreignId('item_id')->nullable()->constrained('items')->onDelete('set null');
            $table->string('item_name');
            $table->text('description')->nullable();
            $table->integer('quantity');
            $table->string('unit')->default('Pcs');
            $table->decimal('estimated_unit_price', 15, 2)->default(0);
            $table->decimal('subtotal', 15, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rfq_items');
    }
};
