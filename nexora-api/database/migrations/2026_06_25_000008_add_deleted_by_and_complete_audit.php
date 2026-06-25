<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private array $auditTables = [
        // Menus (from migration 000001 — has created_by, updated_by, deleted_at, NO deleted_by)
        'main_menus', 'submenus', 'child_menus',
        // RBAC (from migration 000001)
        'permissions', 'roles', 'role_permission', 'user_role',
        // Company (from migration 000002 — has created_by, updated_by, deleted_at)
        'branches', 'currencies', 'fiscal_years',
        // Finance (from migration 000003)
        'payment_terms', 'taxes', 'coa_items', 'cost_centers',
        'profit_centers', 'bank_accounts', 'exchange_rates',
        // Inventory (from migration 000004)
        'categories', 'brands', 'uoms', 'warehouses', 'bin_locations',
        'item_groups', 'item_types', 'items',
        // HR (from migration 000005)
        'departments', 'positions', 'employees',
        // Asset (from migration 000006)
        'asset_categories', 'asset_locations', 'asset_statuses', 'assets',
        // Business Partner (from migration 000007)
        'business_partner_groups', 'supplier_categories',
        'supplier_types', 'suppliers', 'customers',
    ];

    public function up(): void
    {
        $this->addDeletedByToExistingTables();
        $this->addAuditToUsers();
        $this->addAuditToApiActivityLogs();
        $this->addAuditToPersonalAccessTokens();
        $this->addMissingForeignKeys();
    }

    private function addDeletedByToExistingTables(): void
    {
        foreach ($this->auditTables as $tableName) {
            if (!Schema::hasTable($tableName)) {
                continue;
            }

            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                if (!Schema::hasColumn($tableName, 'deleted_by')) {
                    $table->foreignId('deleted_by')
                        ->nullable()
                        ->constrained('users')
                        ->nullOnDelete()
                        ->after('updated_by');
                }

                if (!Schema::hasColumn($tableName, 'updated_at')) {
                    $table->timestamps();
                }
            });
        }
    }

    private function addAuditToUsers(): void
    {
        if (!Schema::hasTable('users')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'deleted_at')) {
                $table->softDeletes()->after('remember_token');
            }

            if (!Schema::hasColumn('users', 'deleted_by')) {
                $table->foreignId('deleted_by')
                    ->nullable()
                    ->constrained('users')
                    ->nullOnDelete()
                    ->after('deleted_at');
            }

            if (!Schema::hasColumn('users', 'updated_at')) {
                $table->timestamps();
            }
        });
    }

    private function addAuditToApiActivityLogs(): void
    {
        if (!Schema::hasTable('api_activity_logs')) {
            return;
        }

        Schema::table('api_activity_logs', function (Blueprint $table) {
            if (!Schema::hasColumn('api_activity_logs', 'updated_at')) {
                $table->timestamp('updated_at')->nullable()->after('created_at');
            }

            if (!Schema::hasColumn('api_activity_logs', 'deleted_at')) {
                $table->softDeletes()->after('updated_at');
            }

            if (!Schema::hasColumn('api_activity_logs', 'deleted_by')) {
                $table->foreignId('deleted_by')
                    ->nullable()
                    ->constrained('users')
                    ->nullOnDelete()
                    ->after('deleted_at');
            }
        });
    }

    private function addAuditToPersonalAccessTokens(): void
    {
        if (!Schema::hasTable('personal_access_tokens')) {
            return;
        }

        Schema::table('personal_access_tokens', function (Blueprint $table) {
            if (!Schema::hasColumn('personal_access_tokens', 'deleted_at')) {
                $table->softDeletes()->after('expires_at');
            }

            if (!Schema::hasColumn('personal_access_tokens', 'created_by')) {
                $table->foreignId('created_by')
                    ->nullable()
                    ->constrained('users')
                    ->nullOnDelete()
                    ->after('deleted_at');
            }

            if (!Schema::hasColumn('personal_access_tokens', 'updated_by')) {
                $table->foreignId('updated_by')
                    ->nullable()
                    ->constrained('users')
                    ->nullOnDelete()
                    ->after('created_by');
            }

            if (!Schema::hasColumn('personal_access_tokens', 'deleted_by')) {
                $table->foreignId('deleted_by')
                    ->nullable()
                    ->constrained('users')
                    ->nullOnDelete()
                    ->after('updated_by');
            }
        });
    }

    private function addMissingForeignKeys(): void
    {
        $fks = [
            ['api_activity_logs', 'user_id', 'users'],
            ['employees', 'user_id', 'users'],
            ['employees', 'supervisor_id', 'employees'],
            ['departments', 'parent_id', 'departments'],
            ['departments', 'head_of_department', 'employees'],
            ['categories', 'parent_id', 'categories'],
            ['uoms', 'base_uom_id', 'uoms'],
            ['coa_items', 'parent_id', 'coa_items'],
        ];

        foreach ($fks as [$table, $column, $references]) {
            $this->addForeignKeyIfMissing($table, $column, $references);
        }
    }

    private function addForeignKeyIfMissing(string $table, string $column, string $references): void
    {
        if (!Schema::hasTable($table) || !Schema::hasColumn($table, $column)) {
            return;
        }

        $fkName = "{$table}_{$column}_foreign";
        $existing = $this->getExistingForeignKeys($table);

        if (in_array($fkName, $existing)) {
            return;
        }

        Schema::table($table, function (Blueprint $table) use ($column, $references, $fkName) {
            $table->foreign($column, $fkName)
                ->references('id')
                ->on($references)
                ->nullOnDelete();
        });
    }

    private function getExistingForeignKeys(string $table): array
    {
        $conn = Schema::getConnection();
        $database = $conn->getDatabaseName();

        $results = $conn->select("
            SELECT CONSTRAINT_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = ?
              AND TABLE_NAME = ?
              AND REFERENCED_TABLE_NAME IS NOT NULL
        ", [$database, $table]);

        return array_map(fn($row) => $row->CONSTRAINT_NAME, $results);
    }

    public function down(): void
    {
        // Remove deleted_by from all audited tables
        foreach ($this->auditTables as $tableName) {
            if (!Schema::hasTable($tableName)) {
                continue;
            }

            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                if (Schema::hasColumn($tableName, 'deleted_by')) {
                    $table->dropForeign([$tableName . '_deleted_by_foreign']);
                    $table->dropColumn('deleted_by');
                }
            });
        }

        // Users table
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'deleted_by')) {
                $table->dropForeign(['deleted_by']);
                $table->dropColumn('deleted_by');
            }
            if (Schema::hasColumn('users', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
        });

        // api_activity_logs
        Schema::table('api_activity_logs', function (Blueprint $table) {
            if (Schema::hasColumn('api_activity_logs', 'deleted_by')) {
                $table->dropForeign(['deleted_by']);
                $table->dropColumn('deleted_by');
            }
            if (Schema::hasColumn('api_activity_logs', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
            if (Schema::hasColumn('api_activity_logs', 'updated_at')) {
                $table->dropColumn('updated_at');
            }
        });

        // personal_access_tokens
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            foreach (['deleted_by', 'updated_by', 'created_by'] as $col) {
                if (Schema::hasColumn('personal_access_tokens', $col)) {
                    $table->dropForeign([$col]);
                }
            }
            if (Schema::hasColumn('personal_access_tokens', 'deleted_at')) {
                $table->dropSoftDeletes();
            }
            if (Schema::hasColumn('personal_access_tokens', 'created_by')) {
                $table->dropColumn(['created_by', 'updated_by', 'deleted_by']);
            }
        });
    }
};
