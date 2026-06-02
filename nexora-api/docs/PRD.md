# NEXORA GLOBAL MODULE PRD

Version: 1.0
Project: Nexora ERP API
Scope: Global module creation guideline
Stack: Laravel 12 + Sanctum + Inertia.js + Vue 3 + Tailwind CSS + MySQL

---

## 1. Purpose

Dokumen ini menjadi acuan global untuk membuat modul baru di Nexora. Gunakan PRD ini bersama `ARCHITECTURE.md` dan `API_SPEC.md` setiap kali membuat domain/module baru seperti Product, Supplier, Order, Purchase, Category, atau module operasional lainnya.

Tujuan utama:

- Modul konsisten dengan Auth dan User yang sudah ada.
- Backend mengikuti pola domain-driven di `app/Domains/{Module}`.
- API docs otomatis mudah ditambahkan di `resources/js/modules/api-docs/{module}`.
- Response, validasi, authorization, dan dokumentasi memiliki format yang seragam.
- Modul mudah dikembangkan, dites, dan dirawat.

---

## 2. Module Definition

Setiap module harus punya identitas berikut sebelum coding:

```text
Module Name:
Business Purpose:
Primary Actor:
Core Entity:
API Prefix:
Authentication:
Authorization:
CRUD Scope:
Frontend API Docs Page:
```

Contoh:

```text
Module Name: Users
Business Purpose: Manage user accounts
Primary Actor: Authenticated admin
Core Entity: User
API Prefix: /api/v1/users
Authentication: auth:sanctum
Authorization: authenticated user
CRUD Scope: list, detail, update, delete
Frontend API Docs Page: /docs/users
```

---

## 3. Required Module Deliverables

Setiap module baru minimal menghasilkan:

- Domain folder di `app/Domains/{Module}`.
- Controller di `app/Domains/{Module}/Controllers`.
- Model di `app/Domains/{Module}/Models` jika module punya table.
- Service di `app/Domains/{Module}/Services`.
- Form Request di `app/Domains/{Module}/Requests`.
- Resource di `app/Domains/{Module}/Resources`.
- Route di `routes/api.php`.
- Migration jika membutuhkan table baru.
- Seeder jika membutuhkan sample/master data.
- API docs frontend di `resources/js/modules/api-docs/{module}`.
- Registrasi navigation dan page docs.

Folder opsional yang boleh dipakai bila diperlukan:

- `Actions`
- `DTO`
- `Interfaces`
- `Repositories`

Gunakan folder opsional hanya jika kompleksitas module memang membutuhkan pemisahan tambahan.

---

## 4. User Stories

Setiap module harus diturunkan ke user story sebelum implementasi.

Template:

```text
As a [role],
I want to [action],
So that [business value].
```

Contoh module Users:

- As an authenticated user, I want to list users, so that I can review registered accounts.
- As an authenticated user, I want to view user detail, so that I can inspect account information.
- As an authenticated user, I want to update a user, so that account data stays accurate.
- As an authenticated user, I want to delete a user, so that inactive or invalid accounts can be removed.

---

## 5. Functional Requirements

Setiap module CRUD standar harus mendukung:

- List records.
- Show record detail.
- Create record jika entity bisa dibuat oleh user.
- Update record jika entity bisa diedit.
- Delete record jika entity bisa dihapus.
- Validate request input dengan Form Request.
- Return JSON response melalui Resource.
- Return consistent error response untuk validation, unauthenticated, unauthorized, dan not found.

Jika module bukan CRUD, tulis action spesifik seperti:

- Login
- Logout
- Refresh token
- Forgot password
- Reset password
- Create API token

---

## 6. API Documentation Requirements

Setiap endpoint harus punya file docs frontend:

```text
resources/js/modules/api-docs/{module}/endpoints/{action}.js
```

Setiap endpoint docs wajib berisi:

- `method`
- `path`
- `name`
- `auth`
- `description`
- `payload`
- `response`
- `methodClass`
- `parameters`
- `requestExample`
- `schemaExample`
- `responses`

Response docs harus mencerminkan response backend yang sebenarnya.

Contoh response error not found:

```json
{
  "message": "No query results for model [User] 99."
}
```

Contoh validation error:

```json
{
  "message": "The email has already been taken.",
  "errors": {
    "email": ["The email has already been taken."]
  }
}
```

---

## 7. UX Requirements For API Docs

Halaman docs module harus:

- Menampilkan endpoint per operation.
- Mendukung Try it out.
- Menggunakan current login session untuk endpoint protected.
- Menampilkan response code, description, dan JSON body.
- Menampilkan request body editor untuk endpoint yang punya body.
- Tidak menampilkan input parameter yang tidak dibutuhkan.
- Menampilkan "No parameters" untuk endpoint tanpa parameter.

Untuk endpoint list sederhana, jangan tampilkan `page` atau `per_page` kecuali module memang membutuhkan pagination.

---

## 8. Authentication And Authorization

Default API module harus protected dengan Sanctum:

```php
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // module routes
});
```

Endpoint public hanya boleh dibuat jika memang diperlukan, seperti:

- register
- login
- forgot password
- reset password

Authorization lebih lanjut dapat memakai policy, gate, role, atau permission bila module membutuhkan pembatasan akses per role.

---

## 9. Validation Requirements

Gunakan Form Request untuk validasi:

```text
app/Domains/{Module}/Requests/{Action}{Module}Request.php
```

Rules harus jelas, minimal, dan sesuai business requirement.

Contoh:

```php
public function rules(): array
{
    return [
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email', 'unique:users,email'],
    ];
}
```

Untuk update, field boleh optional jika module mendukung partial update.

---

## 10. Response Requirements

Gunakan format response yang konsisten:

Single resource:

```json
{
  "user": {
    "id": 1,
    "name": "Demo User"
  }
}
```

Collection:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Demo User"
    }
  ]
}
```

Message:

```json
{
  "message": "User deleted successfully."
}
```

Token response:

```json
{
  "token_type": "Bearer",
  "access_token": "1|sanctum-token",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@nexora.com"
  }
}
```

---

## 11. Non-Functional Requirements

Setiap module harus:

- Fast enough untuk data normal.
- Menghindari query N+1.
- Menggunakan eager loading bila relasi dibutuhkan.
- Menjaga response payload tetap relevan.
- Tidak membocorkan field sensitif seperti password atau token internal.
- Tidak mengembalikan stack trace ke UI docs.
- Mudah ditambahkan test.

---

## 12. Coding Standards

Backend:

- Gunakan strict, readable Laravel style.
- Controller tipis, business logic di Service.
- Validasi di Form Request.
- Response transform di Resource.
- Route name format: `api.v1.{module}.{action}`.
- Jangan menaruh business logic kompleks di route closure.

Frontend API docs:

- Gunakan struktur modular seperti Auth dan Users.
- Satu endpoint satu file.
- Satu schema file per module.
- Navigation module harus terdaftar di registry.
- Example response harus sama dengan backend.

---

## 13. Acceptance Criteria

Module dianggap selesai jika:

- Semua route berjalan.
- Protected endpoint membutuhkan auth.
- Validation error tampil dengan HTTP 422.
- Not found tampil dengan HTTP 404.
- Resource tidak membocorkan data sensitif.
- API docs page muncul di sidebar.
- Try it out berjalan untuk semua endpoint module.
- `npm run build` sukses.
- `php -l` untuk file PHP baru sukses.

---

## 14. Module Creation Checklist

```text
[ ] Define module purpose and entity
[ ] Create domain folders
[ ] Create migration
[ ] Create model
[ ] Create resource
[ ] Create request classes
[ ] Create service
[ ] Create controller
[ ] Register API routes
[ ] Add OpenAPI attributes when needed
[ ] Create API docs endpoints
[ ] Create API docs schema
[ ] Create API docs navigation
[ ] Register docs page
[ ] Test auth behavior
[ ] Test validation behavior
[ ] Test not found behavior
[ ] Run PHP lint
[ ] Run frontend build
```

---

## 15. Explicit Restrictions

Do not:

- Add unnecessary packages.
- Create a different architecture for each module.
- Return raw Eloquent models directly for user-facing API.
- Add query parameters to docs if the endpoint does not need them.
- Show Laravel debug stack traces in API docs response.
- Mix unrelated module logic in one service.
- Modify existing modules unless the new module requires integration.

