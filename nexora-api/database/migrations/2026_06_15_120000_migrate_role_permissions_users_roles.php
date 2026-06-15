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
        $mappings = [
            'M01.S06.C01' => 'M12.S01.C01', // Users
            'M01.S06.C02' => 'M12.S01.C02', // Roles
        ];

        foreach ($mappings as $oldCode => $newCode) {
            $oldPerm = DB::table('permissions')->where('code', $oldCode)->first();
            $newPerm = DB::table('permissions')->where('code', $newCode)->first();

            if (!$oldPerm || !$newPerm) {
                // nothing to do if either permission is missing
                continue;
            }

            $roleIds = DB::table('role_permission')->where('permission_id', $oldPerm->id)->pluck('role_id');

            foreach ($roleIds as $roleId) {
                DB::table('role_permission')->updateOrInsert(
                    [
                        'role_id' => $roleId,
                        'permission_id' => $newPerm->id,
                    ],
                    [
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }

            // remove old mappings after inserting new ones
            DB::table('role_permission')->where('permission_id', $oldPerm->id)->delete();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $mappings = [
            'M01.S06.C01' => 'M12.S01.C01',
            'M01.S06.C02' => 'M12.S01.C02',
        ];

        foreach ($mappings as $oldCode => $newCode) {
            $oldPerm = DB::table('permissions')->where('code', $oldCode)->first();
            $newPerm = DB::table('permissions')->where('code', $newCode)->first();

            if (!$oldPerm || !$newPerm) {
                continue;
            }

            $roleIds = DB::table('role_permission')->where('permission_id', $newPerm->id)->pluck('role_id');

            foreach ($roleIds as $roleId) {
                DB::table('role_permission')->updateOrInsert(
                    [
                        'role_id' => $roleId,
                        'permission_id' => $oldPerm->id,
                    ],
                    [
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }

            DB::table('role_permission')->where('permission_id', $newPerm->id)->delete();
        }
    }
};
