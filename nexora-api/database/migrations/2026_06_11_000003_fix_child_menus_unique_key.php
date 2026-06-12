<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('submenus', function (Blueprint $table) {
            $table->dropUnique('submenus_code_unique');
            $table->unique(['main_menu_id', 'code']);
        });

        Schema::table('child_menus', function (Blueprint $table) {
            $table->dropUnique('child_menus_code_unique');
            $table->unique(['submenu_id', 'code']);
        });
    }

    public function down(): void
    {
        Schema::table('submenus', function (Blueprint $table) {
            $table->dropUnique(['main_menu_id', 'code']);
            $table->unique('code');
        });

        Schema::table('child_menus', function (Blueprint $table) {
            $table->dropUnique(['submenu_id', 'code']);
            $table->unique('code');
        });
    }
};
