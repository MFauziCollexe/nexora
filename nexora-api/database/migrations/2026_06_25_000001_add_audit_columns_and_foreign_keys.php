<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ============ AUDIT COLUMNS ============

        Schema::table('main_menus', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('is_active');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
            $table->softDeletes()->after('updated_by');
        });

        Schema::table('submenus', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('order');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
            $table->softDeletes()->after('updated_by');
        });

        Schema::table('child_menus', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('order');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
            $table->softDeletes()->after('updated_by');
        });

        Schema::table('permissions', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('type');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
            $table->softDeletes()->after('updated_by');
        });

        Schema::table('roles', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('description');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
            $table->softDeletes()->after('updated_by');
        });

        Schema::table('role_permission', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('permission_id');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
            $table->softDeletes()->after('updated_by');
        });

        Schema::table('user_role', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('role_id');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
            $table->softDeletes()->after('updated_by');
        });

        // ============ ADDITIONAL INDEXES ============

        Schema::table('main_menus', function (Blueprint $table) {
            $table->index('order', 'idx_main_menus_order');
        });

        Schema::table('submenus', function (Blueprint $table) {
            $table->index('order', 'idx_submenus_order');
        });

        Schema::table('child_menus', function (Blueprint $table) {
            $table->index('order', 'idx_child_menus_order');
        });
    }

    public function down(): void
    {
        Schema::table('child_menus', function (Blueprint $table) {
            $table->dropIndex('idx_child_menus_order');
        });

        Schema::table('submenus', function (Blueprint $table) {
            $table->dropIndex('idx_submenus_order');
        });

        Schema::table('main_menus', function (Blueprint $table) {
            $table->dropIndex('idx_main_menus_order');
        });

        Schema::table('user_role', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
            $table->dropColumn(['created_by', 'updated_by', 'deleted_at']);
        });

        Schema::table('role_permission', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
            $table->dropColumn(['created_by', 'updated_by', 'deleted_at']);
        });

        Schema::table('roles', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
            $table->dropColumn(['created_by', 'updated_by', 'deleted_at']);
        });

        Schema::table('permissions', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
            $table->dropColumn(['created_by', 'updated_by', 'deleted_at']);
        });

        Schema::table('child_menus', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
            $table->dropColumn(['created_by', 'updated_by', 'deleted_at']);
        });

        Schema::table('submenus', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
            $table->dropColumn(['created_by', 'updated_by', 'deleted_at']);
        });

        Schema::table('main_menus', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['updated_by']);
            $table->dropColumn(['created_by', 'updated_by', 'deleted_at']);
        });
    }
};
