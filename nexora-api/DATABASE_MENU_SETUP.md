# Database Menu Structure - Setup Guide

## Overview

Sistem menu telah diimplementasikan di database dengan struktur hierarki 3 level:

1. **Main Menus** - Menu utama (M00-M12)
2. **Submenus** - Submenu dalam main menu (S01-S06)
3. **Child Menus** - Detail menu dalam submenu (C01-C06)

Serta sistem **Permissions** untuk role-based access control.

---

## Database Tables

### 1. `main_menus`

Tabel untuk main menu (Dashboard, Master Data, Sales, dll)

```sql
CREATE TABLE main_menus (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,      -- M00, M01, M02, etc
    name VARCHAR(255) NOT NULL,            -- Dashboard, Master Data, etc
    icon VARCHAR(255) NULLABLE,            -- home, database, etc
    href VARCHAR(255) NULLABLE,            -- /dashboard, etc
    description TEXT NULLABLE,
    order INT DEFAULT 0,                   -- Urutan tampilan
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 2. `submenus`

Tabel untuk submenu dalam main menu (Business Partner, Inventory, dll)

```sql
CREATE TABLE submenus (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    main_menu_id BIGINT UNSIGNED NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,      -- S01, S02, S03, etc
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NULLABLE,
    href VARCHAR(255) NULLABLE,
    description TEXT NULLABLE,
    order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (main_menu_id) REFERENCES main_menus(id) ON DELETE CASCADE
);
```

### 3. `child_menus`

Tabel untuk child/detail menu (Customer, Supplier, Category, dll)

```sql
CREATE TABLE child_menus (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    submenu_id BIGINT UNSIGNED NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,      -- C01, C02, C03, etc
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NULLABLE,
    href VARCHAR(255) NOT NULL,
    description TEXT NULLABLE,
    order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (submenu_id) REFERENCES submenus(id) ON DELETE CASCADE
);
```

### 4. `permissions`

Tabel untuk permission (untuk role-based access control)

```sql
CREATE TABLE permissions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,      -- M01, M01.S01, M01.S01.C01, etc
    name VARCHAR(255) NOT NULL,
    description TEXT NULLABLE,
    type VARCHAR(50) DEFAULT 'menu',       -- menu, action
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 5. `role_permission`

Tabel junction untuk mapping role ke permission (Many-to-Many)

```sql
CREATE TABLE role_permission (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    role_id BIGINT UNSIGNED NOT NULL,
    permission_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_role_permission (role_id, permission_id)
);
```

### 6. `user_permission`

Tabel junction untuk direct permission assignment ke user (Many-to-Many)

```sql
CREATE TABLE user_permission (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    permission_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_permission (user_id, permission_id)
);
```

---

## Setup Instructions

### Step 1: Run Migrations

```bash
cd nexora-api

# Run all migrations
php artisan migrate

# Atau run migration tertentu
php artisan migrate --path=database/migrations/2026_06_11_000001_create_menus_table.php
php artisan migrate --path=database/migrations/2026_06_11_000002_create_permissions_table.php
```

### Step 2: Seed Data

```bash
# Seed menu data
php artisan db:seed --class=MenuSeeder

# Seed permission data
php artisan db:seed --class=PermissionSeeder

# Atau seed semua sekaligus
php artisan db:seed
```

### Step 3: Update DatabaseSeeder (Optional)

Edit `database/seeders/DatabaseSeeder.php` untuk auto-run seeders:

```php
public function run(): void
{
    $this->call([
        MenuSeeder::class,
        PermissionSeeder::class,
    ]);
}
```

---

## File Structure

```
nexora-api/
├── database/
│   ├── migrations/
│   │   ├── 2026_06_11_000001_create_menus_table.php
│   │   └── 2026_06_11_000002_create_permissions_table.php
│   └── seeders/
│       ├── MenuSeeder.php
│       └── PermissionSeeder.php
├── app/
│   ├── Models/
│   │   ├── MainMenu.php
│   │   ├── Submenu.php
│   │   ├── ChildMenu.php
│   │   └── Permission.php
│   └── Services/
│       └── MenuService.php
```

---

## Eloquent Models

### MainMenu Model

```php
use App\Models\MainMenu;

// Get main menu with all submenus and child menus
$menu = MainMenu::with('submenus.childMenus')->where('code', 'M01')->first();

// Get all active menus
$menus = MainMenu::active()->orderBy('order')->get();

// Get specific main menu
$dashboard = MainMenu::where('code', 'M00')->first();
```

### Submenu Model

```php
use App\Models\Submenu;

// Get submenu with child menus
$submenu = Submenu::with('childMenus')->where('code', 'S01')->first();

// Get full code (M01.S01)
echo $submenu->getFullCodeAttribute(); // M01.S01
```

### ChildMenu Model

```php
use App\Models\ChildMenu;

// Get child menu with its submenu
$child = ChildMenu::with('submenu')->where('code', 'C01')->first();

// Get full code (M01.S01.C01)
echo $child->getFullCodeAttribute(); // M01.S01.C01

// Get hierarchy array
echo json_encode($child->hierarchy);
// {
//   "main": "M01",
//   "sub": "S01",
//   "child": "C01",
//   "fullCode": "M01.S01.C01"
// }
```

---

## MenuService - Helper Methods

### Get All Menus

```php
use App\Services\MenuService;

// Get all menus with hierarchy
$allMenus = MenuService::getAllMenus();

// Get only active menus
$activeMenus = MenuService::getAllMenus(true);
```

### Get Menu by Code

```php
// Get main menu
$mainMenu = MenuService::getMenuByCode('M01');

// Get submenu
$submenu = MenuService::getMenuByCode('M01.S01');

// Get child menu
$child = MenuService::getMenuByCode('M01.S01.C01');
```

### Get Child Menus by Submenu

```php
// Get all child menus of Business Partner (S01)
$childMenus = MenuService::getChildMenusBySubmenu('S01');
```

### Check User Permission

```php
// Check if user has permission to access menu
$hasAccess = MenuService::hasMenuAccess($user, 'M01.S01.C01');

// Check by level
$hasAccess = MenuService::hasMenuAccessByLevel($user, 'M01', 'S01', 'C01');
```

### Get Filtered Menus for User

```php
// Get only menus that user has permission to access
$userMenus = MenuService::getMenusForUser($user);

// Result: Menu hierarchy filtered by user's permissions
```

---

## Sample Permission Codes

### Main Menus

- `M00` - Dashboard
- `M01` - Master Data
- `M02` - Sales
- `M03` - Purchase
- `M04` - Inventory
- `M05` - Production
- `M06` - Finance
- `M07` - HR & Payroll
- `M08` - Assets Management
- `M09` - Project
- `M10` - CRM
- `M11` - Reports & Analytics
- `M12` - Settings

### Master Data Submenus

- `M01.S01` - Business Partner
- `M01.S02` - Inventory
- `M01.S03` - Asset Management
- `M01.S04` - Human Resource
- `M01.S05` - Finance
- `M01.S06` - System

### Business Partner Child Menus

- `M01.S01.C01` - Customer
- `M01.S01.C02` - Supplier
- `M01.S01.C03` - Vendor

(Dan seterusnya untuk submenu lainnya)

---

## Role Template Examples

### 1. Admin Role

Permissions:

```
M00, M01, M02, M03, M04, M05, M06, M07, M08, M09, M10, M11, M12
```

### 2. Master Data Manager

Permissions:

```
M00,
M01.S01.C01, M01.S01.C02, M01.S01.C03,
M01.S02.C01, M01.S02.C02, M01.S02.C03, M01.S02.C04, M01.S02.C05,
M01.S03.C01, M01.S03.C02, M01.S03.C03, M01.S03.C04,
M01.S04.C01, M01.S04.C02, M01.S04.C03,
M01.S05.C01, M01.S05.C02, M01.S05.C03,
M01.S06.C03, M12.S01.C01, M12.S01.C02
```

### 3. Inventory Manager

Permissions:

```
M00,
M01.S02.C01, M01.S02.C02, M01.S02.C03, M01.S02.C04, M01.S02.C05,
M04
```

### 4. Finance Officer

Permissions:

```
M00,
M01.S05.C01, M01.S05.C02, M01.S05.C03,
M06,
M11
```

### 5. Read-Only User

Permissions:

```
M00,
M11
```

---

## Backend Implementation

### API Endpoint - Get Menus for Current User

```php
// routes/api.php
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/menus', 'MenuController@getMenusForUser');
});

// app/Http/Controllers/MenuController.php
public function getMenusForUser(Request $request)
{
    $menus = MenuService::getMenusForUser($request->user());

    return response()->json([
        'success' => true,
        'data' => $menus,
    ]);
}
```

### Middleware - Check Menu Permission

```php
// app/Http/Middleware/CheckMenuPermission.php
public function handle($request, Closure $next, string $menuCode)
{
    $user = auth()->user();

    if (!MenuService::hasMenuAccess($user, $menuCode)) {
        abort(403, 'Unauthorized - Menu access denied');
    }

    return $next($request);
}

// Register di app/Http/Kernel.php
protected $routeMiddleware = [
    // ...
    'check-menu' => \App\Http\Middleware\CheckMenuPermission::class,
];

// Usage di routes
Route::middleware(['auth:sanctum', 'check-menu:M01.S01.C01'])
    ->get('/master-data/customer', 'CustomerController@index');
```

---

## Frontend Integration

### Get Menus from API

```typescript
// lib/api.ts
export async function getMenusForUser() {
    const response = await fetch("/api/menus", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return response.json();
}

// Usage di component
import { getMenusForUser } from "@/lib/api";

useEffect(() => {
    getMenusForUser().then((data) => {
        setMenus(data.data);
    });
}, []);
```

---

## Troubleshooting

### Q: Migration gagal karena foreign key

**A:** Pastikan order migration benar. Main menus harus dibuat sebelum submenus dan child menus.

### Q: Seeder tidak berjalan

**A:** Pastikan migration sudah dijalankan terlebih dahulu:

```bash
php artisan migrate
php artisan db:seed
```

### Q: Roles table not found

**A:** Periksa apakah migrations untuk roles sudah berjalan. Jika belum ada, buat migration roles terlebih dahulu.

---

## References

- [Database Migrations - Laravel Docs](https://laravel.com/docs/11.x/migrations)
- [Database Seeders - Laravel Docs](https://laravel.com/docs/11.x/seeding)
- [Eloquent Relationships - Laravel Docs](https://laravel.com/docs/11.x/eloquent-relationships)
