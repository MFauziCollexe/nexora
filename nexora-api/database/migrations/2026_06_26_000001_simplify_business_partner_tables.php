<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ── 1. Drop foreign keys from referencing tables ──
        $this->dropForeignKeys('suppliers', [
            'supplier_type_id', 'supplier_category_id',
            'payment_term_id', 'currency_id',
            'company_id', 'created_by', 'updated_by', 'deleted_by',
        ]);
        $this->dropForeignKeys('customers', [
            'payment_term_id', 'currency_id', 'customer_group_id',
            'company_id', 'created_by', 'updated_by', 'deleted_by',
        ]);
        $this->dropForeignKeys('supplier_types', [
            'company_id', 'created_by', 'updated_by', 'deleted_by',
        ]);
        $this->dropForeignKeys('supplier_categories', [
            'company_id', 'created_by', 'updated_by', 'deleted_by',
        ]);
        $this->dropForeignKeys('business_partner_groups', [
            'company_id', 'created_by', 'updated_by', 'deleted_by',
        ]);

        // ── 2. Simplify suppliers ──
        Schema::table('suppliers', function (Blueprint $table) {
            $columns = ['email', 'phone', 'mobile', 'address', 'city', 'province',
                'postal_code', 'country', 'tax_id',
                'payment_term_id', 'currency_id',
                'company_id', 'created_by', 'updated_by', 'deleted_by', 'deleted_at'];
            foreach ($columns as $col) {
                if (Schema::hasColumn('suppliers', $col)) {
                    $table->dropColumn($col);
                }
            }
        });

        // ── 3. Simplify customers: drop, rename FK, add new FK ──
        Schema::table('customers', function (Blueprint $table) {
            $columns = ['email', 'phone', 'mobile', 'address', 'city', 'province',
                'postal_code', 'country', 'tax_id', 'credit_limit',
                'customer_group_id',
                'company_id', 'created_by', 'updated_by', 'deleted_by', 'deleted_at'];
            foreach ($columns as $col) {
                if (Schema::hasColumn('customers', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
        if (!Schema::hasColumn('customers', 'business_partner_group_id')) {
            Schema::table('customers', function (Blueprint $table) {
                $table->foreignId('business_partner_group_id')
                    ->nullable()
                    ->constrained('business_partner_groups')
                    ->nullOnDelete()
                    ->after('currency_id');
            });
        }

        // ── 4. Simplify supplier_types: is_active → status ──
        Schema::table('supplier_types', function (Blueprint $table) {
            $columns = ['description', 'is_active',
                'company_id', 'created_by', 'updated_by', 'deleted_by', 'deleted_at'];
            foreach ($columns as $col) {
                if (Schema::hasColumn('supplier_types', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
        if (!Schema::hasColumn('supplier_types', 'status')) {
            Schema::table('supplier_types', function (Blueprint $table) {
                $table->string('status')->default('active')->after('name');
            });
        }

        // ── 5. Simplify supplier_categories: is_active → status ──
        Schema::table('supplier_categories', function (Blueprint $table) {
            $columns = ['description', 'is_active',
                'company_id', 'created_by', 'updated_by', 'deleted_by', 'deleted_at'];
            foreach ($columns as $col) {
                if (Schema::hasColumn('supplier_categories', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
        if (!Schema::hasColumn('supplier_categories', 'status')) {
            Schema::table('supplier_categories', function (Blueprint $table) {
                $table->string('status')->default('active')->after('name');
            });
        }

        // ── 6. Simplify business_partner_groups: is_active → status ──
        Schema::table('business_partner_groups', function (Blueprint $table) {
            $columns = ['type', 'description', 'is_active',
                'company_id', 'created_by', 'updated_by', 'deleted_by', 'deleted_at'];
            foreach ($columns as $col) {
                if (Schema::hasColumn('business_partner_groups', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
        if (!Schema::hasColumn('business_partner_groups', 'status')) {
            Schema::table('business_partner_groups', function (Blueprint $table) {
                $table->string('status')->default('active')->after('name');
            });
        }

        // ── 7. Re-add foreign keys that are still needed ──
        $this->addForeignKeyIfMissing('suppliers', 'supplier_type_id', 'supplier_types');
        $this->addForeignKeyIfMissing('suppliers', 'supplier_category_id', 'supplier_categories');
        $this->addForeignKeyIfMissing('customers', 'payment_term_id', 'payment_terms');
        $this->addForeignKeyIfMissing('customers', 'currency_id', 'currencies');
    }

    public function down(): void
    {
        // Reverse is too complex for auto-generated down;
        // the original migration 2026_06_25_000007 can be rolled back if needed.
    }

    private function dropForeignKeys(string $table, array $columns): void
    {
        if (!Schema::hasTable($table)) return;

        $existing = $this->getExistingForeignKeys($table);

        Schema::table($table, function (Blueprint $t) use ($table, $columns, $existing) {
            foreach ($columns as $col) {
                $fkName = "{$table}_{$col}_foreign";
                if (in_array($fkName, $existing, true) && Schema::hasColumn($table, $col)) {
                    $t->dropForeign($fkName);
                }
            }
        });
    }

    private function addForeignKeyIfMissing(string $table, string $column, string $references): void
    {
        if (!Schema::hasTable($table) || !Schema::hasColumn($table, $column)) return;
        if (!Schema::hasTable($references)) return;

        $fkName = "{$table}_{$column}_foreign";
        $existing = $this->getExistingForeignKeys($table);

        if (in_array($fkName, $existing, true)) return;

        Schema::table($table, function (Blueprint $t) use ($column, $references, $fkName) {
            $t->foreign($column, $fkName)
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
};
