<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $masterDataId = DB::table('main_menus')->where('code', 'M01')->value('id');
        if (!$masterDataId) {
            return;
        }

        $systemSubmenuId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S06')->value('id');
        if ($systemSubmenuId) {
            // delete child menus Users and Roles under System
            DB::table('child_menus')->where('submenu_id', $systemSubmenuId)->whereIn('code', ['C01','C02'])->delete();
        }

        // delete permissions and any role mappings for M01.S06.C01 and M01.S06.C02
        $oldCodes = ['M01.S06.C01','M01.S06.C02'];
        $oldPermIds = DB::table('permissions')->whereIn('code', $oldCodes)->pluck('id');

        if ($oldPermIds->isNotEmpty()) {
            DB::table('role_permission')->whereIn('permission_id', $oldPermIds)->delete();
            DB::table('permissions')->whereIn('id', $oldPermIds)->delete();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // irreversibly removed in up(); manual restore required if needed
    }
};
