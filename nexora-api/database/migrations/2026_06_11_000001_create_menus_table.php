<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Main Menus Table
        Schema::create('main_menus', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // M00, M01, M02, etc
            $table->string('name');
            $table->string('icon')->nullable();
            $table->string('href')->nullable();
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('code');
        });

        // Submenus Table
        Schema::create('submenus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('main_menu_id')->constrained('main_menus')->onDelete('cascade');
            $table->string('code'); // S01, S02, S03, etc
            $table->string('name');
            $table->string('icon')->nullable();
            $table->string('href')->nullable();
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['main_menu_id', 'code']);
            $table->index('code');
            $table->index('main_menu_id');
        });

        // Child Menus Table
        Schema::create('child_menus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submenu_id')->constrained('submenus')->onDelete('cascade');
            $table->string('code'); // C01, C02, C03, etc
            $table->string('name');
            $table->string('icon')->nullable();
            $table->string('href');
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['submenu_id', 'code']);
            $table->index('code');
            $table->index('submenu_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('child_menus');
        Schema::dropIfExists('submenus');
        Schema::dropIfExists('main_menus');
    }
};
