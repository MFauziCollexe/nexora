# NEXORA GLOBAL ARCHITECTURE

Version: 1.0
Project: Nexora ERP API
Scope: Backend domain architecture and frontend API docs architecture

---

## 1. Architecture Overview

Nexora menggunakan pola modular berbasis domain. Setiap business module ditempatkan di folder:

```text
app/Domains/{Module}
```

API documentation UI ditempatkan secara modular di:

```text
resources/js/modules/api-docs/{module}
```

Pola ini sudah dipakai oleh module Auth dan User.

---

## 2. Backend Layering

Urutan tanggung jawab backend:

```text
Route
  -> Controller
    -> Form Request
    -> Service
      -> Model / Repository / Action
    -> Resource
  -> JSON Response
```

Tanggung jawab tiap layer:

- Route: mapping URL, middleware, dan route name.
- Controller: menerima request, memanggil service, menentukan HTTP response.
- Form Request: validasi dan authorization request.
- Service: business logic utama.
- Model: Eloquent entity dan relasi.
- Resource: bentuk response JSON.
- Repository: opsional untuk query kompleks.
- Action: opsional untuk proses spesifik yang reusable.
- DTO: opsional untuk data transfer yang kompleks.

---

## 3. Domain Folder Standard

Struktur standar:

```text
app/Domains/{Module}/
├── Actions/
├── Controllers/
├── DTO/
├── Interfaces/
├── Models/
├── Repositories/
├── Requests/
├── Resources/
└── Services/
```

Tidak semua folder wajib punya file. Gunakan folder sesuai kebutuhan.

Minimal untuk CRUD module:

```text
app/Domains/Product/
├── Controllers/ProductController.php
├── Models/Product.php
├── Requests/StoreProductRequest.php
├── Requests/UpdateProductRequest.php
├── Resources/ProductResource.php
└── Services/ProductService.php
```

---

## 4. Controller Pattern

Controller harus tipis.

Contoh:

```php
public function show(int $id): JsonResponse
{
    return response()->json(
        $this->productService->show($id)
    );
}
```

Controller boleh:

- Mengambil validated data.
- Memanggil service.
- Mengatur HTTP status.
- Mengembalikan JSON.

Controller tidak boleh:

- Menaruh query kompleks.
- Menaruh business rule panjang.
- Mengubah data langsung tanpa service.

---

## 5. Service Pattern

Service menyimpan business logic utama.

Contoh:

```php
public function show(int $id): array
{
    $product = Product::findOrFail($id);

    return ['product' => ProductResource::make($product)->resolve()];
}
```

Untuk collection:

```php
public function index(): AnonymousResourceCollection
{
    return ProductResource::collection(Product::latest()->get());
}
```

Gunakan `findOrFail()` untuk detail/update/delete agar Laravel menghasilkan HTTP 404 saat data tidak ditemukan.

---

## 6. Resource Pattern

Resource menentukan response public. Jangan return field sensitif.

Contoh:

```php
class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => optional($this->created_at)?->toISOString(),
            'updated_at' => optional($this->updated_at)?->toISOString(),
        ];
    }
}
```

---

## 7. Form Request Pattern

Gunakan Form Request untuk create/update/action request.

```text
Store{Module}Request.php
Update{Module}Request.php
{Action}{Module}Request.php
```

Rules harus berada di method `rules()`. Authorization default boleh `true` jika akses sudah dikontrol middleware, tetapi untuk role-specific module gunakan policy/gate.

---

## 8. Route Architecture

API routes berada di `routes/api.php`.

Public auth routes:

```php
Route::prefix('v1/auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('api.v1.auth.register');
    Route::post('login', [AuthController::class, 'login'])->name('api.v1.auth.login');
});
```

Protected routes:

```php
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::get('users', [UserController::class, 'index'])->name('api.v1.users.index');
});
```

Route naming standard:

```text
api.v1.{module}.{action}
```

Examples:

```text
api.v1.users.index
api.v1.users.show
api.v1.users.update
api.v1.users.destroy
api.v1.auth.login
```

---

## 9. Authentication Architecture

Nexora memakai:

- Laravel session auth untuk dashboard/Inertia.
- Laravel Sanctum untuk API token dan protected API endpoint.
- `/docs/try-it-out` sebagai proxy internal docs yang memakai current login session.

Protected API endpoint default:

```php
middleware('auth:sanctum')
```

Protected web/docs route default:

```php
middleware('auth')
```

---

## 10. API Docs Frontend Architecture

Setiap docs module harus mengikuti struktur:

```text
resources/js/modules/api-docs/{module}/
├── endpoints/
│   ├── list.js
│   ├── show.js
│   ├── store.js
│   ├── update.js
│   └── delete.js
├── schemas/
│   └── {module}.schema.js
├── index.js
└── navigation.js
```

Untuk non-CRUD, nama file endpoint mengikuti action:

```text
login.js
logout.js
forgot-password.js
reset-password.js
api-token.js
```

---

## 11. API Docs Module Contract

`index.js` module harus export object:

```js
export const productsApiDocsModule = {
    key: "products",
    title: "Products",
    description: "Manage products.",
    helpUrl: "#",
    navigation: productsNavigation,
    endpoints: productsEndpoints,
    models: productsModels,
};
```

`navigation.js` module:

```js
export const productsNavigation = {
    label: "Products",
    page: "products",
};
```

Endpoint file:

```js
export const listProductsEndpoint = {
    method: "GET",
    path: "/api/v1/products",
    name: "List Products",
    auth: true,
    description: "Returns all products.",
    payload: "None",
    response: "200 ProductCollection",
    methodClass: "bg-sky-100 text-sky-700",
    parameters: [],
    requestExample: null,
    schemaExample: null,
    responses: [],
};
```

---

## 12. API Docs Registry

Register module docs di:

```text
resources/js/modules/api-docs/registry/pages.js
resources/js/modules/api-docs/registry/navigation.js
```

`pages.js`:

```js
import { productsApiDocsModule } from "../products";

export const apiEndpointPages = {
    [productsApiDocsModule.key]: productsApiDocsModule,
};
```

`navigation.js`:

```js
{ label: productsApiDocsModule.navigation.label, routeName: "docs.page", page: productsApiDocsModule.navigation.page }
```

---

## 13. Try It Out Architecture

Frontend executor:

```text
resources/js/modules/api-docs/shared/composables/useEndpointExecutor.js
```

Docs proxy:

```text
app/Http/Controllers/ApiDocsTryItOutController.php
```

Reason:

- Browser tidak langsung menampilkan failed resource untuk API error status.
- UI docs tetap bisa menampilkan status asli API.
- Current login session dapat digunakan untuk endpoint protected.
- Debug Laravel dapat dinormalisasi agar response docs tetap clean.

---

## 14. Error Handling Architecture

Expected API error behavior:

- 401: unauthenticated.
- 403: unauthorized.
- 404: model not found.
- 422: validation error.
- 500: server error, tidak boleh tampil detail debug di docs UI.

Docs UI harus menampilkan:

- HTTP code.
- Description dari endpoint `responses`.
- JSON body yang clean.

---

## 15. Database Architecture

Default table naming:

```text
products
orders
suppliers
purchases
```

Default model fields:

```text
id
created_at
updated_at
```

Soft delete boleh dipakai jika business process membutuhkan restore/audit.

Relasi harus didefinisikan di Model dan dimuat dengan eager loading saat ditampilkan.

---

## 16. Testing And Verification

Minimum verification for each module:

```text
php -l app/Domains/{Module}/Controllers/{Module}Controller.php
php -l app/Domains/{Module}/Services/{Module}Service.php
php -l app/Domains/{Module}/Requests/{Request}.php
npm run build
```

Jika ada migration:

```text
php artisan migrate:status
php artisan migrate
```

Jika ada route baru:

```text
php artisan route:list
```

---

## 17. Dependency Rules

Default module tidak boleh menambah package baru kecuali:

- Requirement tidak bisa dipenuhi oleh Laravel/Vue existing stack.
- Package memberi manfaat jelas.
- Package tidak menambah kompleksitas berlebihan.

Untuk module CRUD biasa, tidak perlu package tambahan.

---

## 18. Future Architecture Extensions

Jika aplikasi berkembang, struktur ini dapat diperluas dengan:

- Policy per module.
- Repository untuk query kompleks.
- Action class untuk workflow panjang.
- DTO untuk transfer data lintas layer.
- Event/listener untuk side effect.
- Job/queue untuk proses berat.
- Audit log untuk module penting.

