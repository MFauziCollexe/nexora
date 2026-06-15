# Menu Code Structure - Role-Based Access Control

## Overview

Setiap menu dalam sidebar memiliki kode unik yang digunakan untuk sistem manajemen role dan permission. Kode tersebut mengikuti format hierarki dengan level independen:

**Format:** `M[XX].[S[XX]].[C[XX]]`

- **M** = Main Menu (M00-M12)
- **S** = Submenu (S01-S06)
- **C** = Child/Detail Menu (C01-C06)

Contoh: Master Data > Business Partner > Customer = `M01.S01.C01`

---

## Menu Code Structure

### Main Menus

| No  | Menu                | Code  |
| --- | ------------------- | ----- |
| 1   | Dashboard           | `M00` |
| 2   | Master Data         | `M01` |
| 3   | Sales               | `M02` |
| 4   | Purchase            | `M03` |
| 5   | Inventory           | `M04` |
| 6   | Production          | `M05` |
| 7   | Finance             | `M06` |
| 8   | HR & Payroll        | `M07` |
| 9   | Assets Management   | `M08` |
| 10  | Project             | `M09` |
| 11  | CRM                 | `M10` |
| 12  | Reports & Analytics | `M11` |
| 13  | Settings            | `M12` |

---

### Master Data (M01)

#### Business Partner (S01)

```
M01            = Master Data
├─ S01         = Business Partner
│  ├─ C01      = Customer        (Full: M01.S01.C01)
│  ├─ C02      = Supplier        (Full: M01.S01.C02)
│  └─ C03      = Vendor          (Full: M01.S01.C03)
```

#### Inventory (S02)

```
├─ S02         = Inventory
│  ├─ C01      = Item Master     (Full: M01.S02.C01)
│  ├─ C02      = Category        (Full: M01.S02.C02)
│  ├─ C03      = Brand           (Full: M01.S02.C03)
│  ├─ C04      = UOM             (Full: M01.S02.C04)
│  └─ C05      = Warehouse       (Full: M01.S02.C05)
```

#### Asset Management (S03)

```
├─ S03         = Asset Management
│  ├─ C01      = Asset           (Full: M01.S03.C01)
│  ├─ C02      = Asset Category  (Full: M01.S03.C02)
│  ├─ C03      = Asset Location  (Full: M01.S03.C03)
│  └─ C04      = Asset Status    (Full: M01.S03.C04)
```

#### Human Resource (S04)

```
├─ S04         = Human Resource
│  ├─ C01      = Employee        (Full: M01.S04.C01)
│  ├─ C02      = Department      (Full: M01.S04.C02)
│  └─ C03      = Position        (Full: M01.S04.C03)
```

#### Finance (S05)

```
├─ S05         = Finance
│  ├─ C01      = COA             (Full: M01.S05.C01)
│  ├─ C02      = Tax             (Full: M01.S05.C02)
│  └─ C03      = Payment Terms   (Full: M01.S05.C03)
```

#### System (S06)

```
└─ S06         = System
  └─ C03      = Permissions     (Full: M01.S06.C03)
```

---

#### User & Security (M12.S01)

```
└─ S01         = User & Security
  ├─ C01      = Users           (Full: M12.S01.C01)
  └─ C02      = Roles           (Full: M12.S01.C02)
```

---

## Contoh Penggunaan

### 1. Memberikan Akses ke User A (Customer Only)

```typescript
// User A hanya bisa akses Master Data > Business Partner > Customer
const userAPermissions = ["M00", "M01.S01.C01"];
```

### 2. Memberikan Akses ke Submenu (Business Partner)

```typescript
// Manager Business Partner bisa akses semua di Business Partner
const managerPermissions = ["M00", "M01.S01.C01", "M01.S01.C02", "M01.S01.C03"];
```

### 3. Memberikan Akses ke Module (Master Data)

```typescript
// Staff Master Data bisa akses semua di Master Data
// Format: M01.S01.C*, M01.S02.C*, dst
const staffPermissions = [
  "M00",
  "M01.S01.C01",
  "M01.S01.C02",
  "M01.S01.C03",
  "M01.S02.C01",
  "M01.S02.C02",
  "M01.S02.C03",
  "M01.S02.C04",
  "M01.S02.C05",
  // ... dst
];
```

### 4. Memberikan Akses ke Admin (Semua Menu)

```typescript
// Admin diberikan akses ke semua menu
const adminPermissions = [
  "M00",
  "M01",
  "M02",
  "M03",
  "M04",
  "M05",
  "M06",
  "M07",
  "M08",
  "M09",
  "M10",
  "M11",
  "M12",
];
```

---

## Implementation di Frontend

### Import dan Gunakan

```typescript
import { hasMenuAccess, buildMenuCode, parseMenuCode } from "@/lib/menuCodes";

// Dapatkan permissions dari user (dari API/Context)
const userPermissions = ["M00", "M01.S01.C01", "M02"];

// Check apakah user bisa akses Customer
if (hasMenuAccess(userPermissions, "M01", "S01", "C01")) {
  // Tampilkan halaman Customer
}

// Build code
const code = buildMenuCode("M01", "S01", "C01"); // "M01.S01.C01"

// Parse code
const parsed = parseMenuCode("M01.S01.C01");
// { main: 'M01', sub: 'S01', child: 'C01' }
```

---

## Implementation di Backend (Laravel)

### Database Schema

```sql
CREATE TABLE permissions (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE role_permission (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT UNSIGNED NOT NULL,
  permission_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  UNIQUE KEY unique_role_permission (role_id, permission_id)
);
```

### User Model

```php
// app/Models/User.php
public function hasMenuAccess(string $requiredCode): bool
{
    $userPermissions = $this->roles()
        ->with('permissions')
        ->get()
        ->flatMap(fn($role) => $role->permissions->pluck('code'))
        ->toArray();

    // Check exact match atau parent code
    return collect($userPermissions)->some(function($code) use ($requiredCode) {
        return $code === $requiredCode ||
               $requiredCode->startsWith($code . '.');
    });
}
```

### Middleware

```php
// app/Http/Middleware/CheckMenuPermission.php
public function handle($request, Closure $next, string $mainCode, string $subCode = null, string $childCode = null)
{
    $user = auth()->user();
    $requiredCode = $this->buildCode($mainCode, $subCode, $childCode);

    if (!$user->hasMenuAccess($requiredCode)) {
        abort(403, 'Unauthorized - Menu access denied');
    }

    return $next($request);
}

private function buildCode($main, $sub = null, $child = null): string
{
    $code = $main;
    if ($sub) $code .= '.' . $sub;
    if ($child) $code .= '.' . $child;
    return $code;
}
```

### Route Protection

```php
// routes/web.php
Route::middleware(['auth', 'check-menu:M01,S01,C01'])
    ->get('/master-data/customer', CustomerController::class);
```

---

## Role Template Standar

### 1. Administrator (Full Access)

```
M00, M01, M02, M03, M04, M05, M06, M07, M08, M09, M10, M11, M12
```

### 2. Master Data Manager

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

```
M00, M01.S02.C01, M01.S02.C02, M01.S02.C03, M01.S02.C04, M01.S02.C05, M04
```

### 4. Finance Officer

```
M00, M01.S05.C01, M01.S05.C02, M01.S05.C03, M06, M11
```

### 5. HR Manager

```
M00, M01.S04.C01, M01.S04.C02, M01.S04.C03, M07
```

### 6. Read-Only User

```
M00, M11
```

---

## Best Practices

1. **Granular Control**: Gunakan kode level detail (M01.S01.C01) untuk kontrol per fitur
2. **Role-Based**: Assign permission ke role, bukan langsung ke user
3. **Hierarchy Awareness**: Parent code grants access ke semua child code
   - M01 → akses semua submenu Master Data
   - M01.S01 → akses semua item di Business Partner
4. **Audit Trail**: Catat setiap perubahan permission user/role
5. **Cache**: Cache permission data untuk performa lebih baik

---

## File Reference

- **Frontend Menu Data**: [data/menu.ts](data/menu.ts)
- **Menu Code Utilities**: [lib/menuCodes.ts](lib/menuCodes.ts)
- **Sidebar Component**: [components/layout/Sidebar.tsx](components/layout/Sidebar.tsx)

---

## Menu Code Structure

### Main Menus

| No  | Menu                | Code  |
| --- | ------------------- | ----- |
| 1   | Dashboard           | `M00` |
| 2   | Master Data         | `M01` |
| 3   | Sales               | `M02` |
| 4   | Purchase            | `M03` |
| 5   | Inventory           | `M04` |
| 6   | Production          | `M05` |
| 7   | Finance             | `M06` |
| 8   | HR & Payroll        | `M07` |
| 9   | Assets Management   | `M08` |
| 10  | Project             | `M09` |
| 11  | CRM                 | `M10` |
| 12  | Reports & Analytics | `M11` |
| 13  | Settings            | `M12` |

---

### Master Data (M01)

#### Business Partner (M01.S01)

```
M01.S01        = Business Partner (Submenu Header)
├── M01.S01.C01 = Customer
├── M01.S01.C02 = Supplier
└── M01.S01.C03 = Vendor
```

#### Inventory (M01.S02)

```
M01.S02        = Inventory (Submenu Header)
├── M01.S02.C01 = Item Master
├── M01.S02.C02 = Category
├── M01.S02.C03 = Brand
├── M01.S02.C04 = UOM
└── M01.S02.C05 = Warehouse
```

#### Asset Management (M01.S03)

```
M01.S03        = Asset Management (Submenu Header)
├── M01.S03.C01 = Asset
├── M01.S03.C02 = Asset Category
├── M01.S03.C03 = Asset Location
└── M01.S03.C04 = Asset Status
```

#### Human Resource (M01.S04)

```
M01.S04        = Human Resource (Submenu Header)
├── M01.S04.C01 = Employee
├── M01.S04.C02 = Department
└── M01.S04.C03 = Position
```

#### Finance (M01.S05)

```
M01.S05        = Finance (Submenu Header)
├── M01.S05.C01 = COA
├── M01.S05.C02 = Tax
└── M01.S05.C03 = Payment Terms
```

#### System (M01.S06)

```
M01.S06        = System (Submenu Header)
└── M01.S06.C03 = Permissions
```

#### User & Security (M12.S01)

```
M12.S01        = User & Security (Submenu Header)
├── M12.S01.C01 = Users
└── M12.S01.C02 = Roles
```

---

## Contoh Penggunaan

### 1. Memberikan Akses ke User A

```typescript
// User A diberikan akses ke Master Data > Business Partner > Customer
const userAPermissions = ["M00", "M01.S01.C01"];
```

### 2. Memberikan Akses ke Seluruh Submenu

```typescript
// Manager diberikan akses ke semua Master Data
const managerPermissions = ["M00", "M01"];
// Dengan M01, user bisa akses semua di bawahnya (M01.S01, M01.S02, dst)
```

### 3. Memberikan Akses ke Admin (Semua Menu)

```typescript
// Admin diberikan akses ke semua menu
const adminPermissions = [
  "M00",
  "M01",
  "M02",
  "M03",
  "M04",
  "M05",
  "M06",
  "M07",
  "M08",
  "M09",
  "M10",
  "M11",
  "M12",
];
// Atau lebih singkat:
const adminPermissions = Object.values(MENU_CODES);
```

---

## Implementasi di Backend (Laravel)

### Database Schema - Permission Table

```sql
CREATE TABLE permissions (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) UNIQUE NOT NULL, -- contoh: M01.S01.C01
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE role_permission (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT UNSIGNED NOT NULL,
  permission_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  UNIQUE KEY unique_role_permission (role_id, permission_id)
);
```

### Check Permission di Backend

```php
// app/Http/Middleware/CheckMenuPermission.php
public function handle($request, Closure $next, string $menuCode)
{
    $user = auth()->user();

    if (!$user->hasMenuAccess($menuCode)) {
        abort(403, 'Unauthorized');
    }

    return $next($request);
}

// Di Model User
public function hasMenuAccess(string $requiredCode): bool
{
    $userCodes = $this->roles()
        ->with('permissions')
        ->get()
        ->flatMap(fn($role) => $role->permissions->pluck('code'))
        ->toArray();

    return in_array($requiredCode, $userCodes) ||
           collect($userCodes)->some(fn($code) => $requiredCode->startsWith($code . '.'));
}
```

### Implementasi di Frontend (TypeScript/React)

```typescript
import { hasMenuAccess, MENU_CODES } from "@/lib/menuCodes";

// Dapatkan permissions dari user (dari API/Context)
const userPermissions = ["M00", "M01.S01.C01", "M02"];

// Check apakah user bisa akses Customer
if (hasMenuAccess(userPermissions, MENU_CODES.CUSTOMER)) {
  // Tampilkan menu atau halaman
}
```

---

## Role Template Standar

### 1. Administrator (Full Access)

```
M00, M01, M02, M03, M04, M05, M06, M07, M08, M09, M10, M11, M12
```

### 2. Master Data Manager

```
M00, M01 (semua submenu Master Data)
```

### 3. Inventory Manager

```
M00, M01.S02 (Inventory), M04 (Inventory Menu)
```

### 4. Finance Officer

```
M00, M01.S05 (Finance), M06 (Finance Menu), M11 (Reports)
```

### 5. HR Manager

```
M00, M01.S04 (Human Resource), M07 (HR & Payroll)
```

### 6. Read-Only User

```
M00, M11 (Reports & Analytics - View Only)
```

---

## Best Practices

1. **Granular Control**: Gunakan kode level detail (C01, C02) untuk kontrol per fitur
2. **Role-Based**: Assign permission ke role, bukan langsung ke user
3. **Hierarchy Awareness**: Jika user punya akses ke S01, dia otomatis punya akses ke semua C01, C02, C03-nya
4. **Audit Trail**: Catat setiap perubahan permission user/role
5. **Cache**: Cache permission data untuk performa lebih baik

---

## File Reference

- **Frontend Menu Data**: `data/menu.ts`
- **Menu Code Constants**: `lib/menuCodes.ts`
- **Sidebar Component**: `components/layout/Sidebar.tsx`
