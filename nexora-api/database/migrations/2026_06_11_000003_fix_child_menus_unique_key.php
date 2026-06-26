<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Composite unique keys [main_menu_id, code] and [submenu_id, code]
        // already exist from 2026_06_11_000001_create_menus_table.
        // This migration previously tried to drop non-existent single-column
        // unique keys — those were never created, so this is now a no-op.
    }

    public function down(): void
    {
        // No-op
    }
};
