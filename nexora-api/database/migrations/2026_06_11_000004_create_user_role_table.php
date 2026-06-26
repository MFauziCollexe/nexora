<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Foreign keys already created by foreignId()->constrained()
        // in 2026_06_11_000002_create_permissions_table.php
    }

    public function down(): void
    {
        // No-op
    }
};
