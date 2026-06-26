<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE sales_orders MODIFY COLUMN status ENUM('Draft','Confirmed','Released','Delivered','Invoiced','Cancelled','Pending') NOT NULL DEFAULT 'Draft'");

        Schema::table('sales_orders', function (Blueprint $table) {
            $table->string('warehouse')->nullable()->after('notes');
        });
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE sales_orders MODIFY COLUMN status ENUM('Draft','Confirmed','Delivered','Invoiced','Cancelled') NOT NULL DEFAULT 'Draft'");

        Schema::table('sales_orders', function (Blueprint $table) {
            $table->dropColumn('warehouse');
        });
    }
};
