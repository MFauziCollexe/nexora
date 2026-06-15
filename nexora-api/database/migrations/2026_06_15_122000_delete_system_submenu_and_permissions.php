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
        if ($masterDataId) {
            $systemSubmenuId = DB::table('submenus')->where('main_menu_id', $masterDataId)->where('code', 'S06')->value('id');
            if ($systemSubmenuId) {
                // delete remaining child menus under System (e.g., C03)
                DB::table('child_menus')->where('submenu_id', $systemSubmenuId)->delete();

                // delete the submenu row
                DB::table('submenus')->where('id', $systemSubmenuId)->delete();
            }
        }

        // delete permissions and role mappings for M01.S06 and M01.S06.C03
        $codes = ['M01.S06', 'M01.S06.C03'];
        $permIds = DB::table('permissions')->whereIn('code', $codes)->pluck('id');
        if ($permIds->isNotEmpty()) {
            DB::table('role_permission')->whereIn('permission_id', $permIds)->delete();
            DB::table('permissions')->whereIn('id', $permIds)->delete();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // irreversible via migration; re-seed if needed
    }
};
