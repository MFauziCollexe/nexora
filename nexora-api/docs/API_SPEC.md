# NEXORA GLOBAL API SPEC

Version: 1.0
Project: Nexora ERP API
Base API Prefix: `/api/v1`
Auth: Laravel Sanctum Bearer Token and current login session for API docs Try it out

---

## 1. API Principles

Semua API module Nexora harus:

- Menggunakan JSON request dan JSON response.
- Menggunakan prefix `/api/v1`.
- Menggunakan route name `api.v1.{module}.{action}`.
- Menggunakan HTTP status code yang sesuai.
- Menggunakan Form Request untuk validasi.
- Menggunakan Resource untuk response entity.
- Mengikuti response docs di `resources/js/modules/api-docs/{module}`.

---

## 2. Headers

Default request headers:

```http
Accept: application/json
Content-Type: application/json
```

Protected endpoint dengan bearer token:

```http
Authorization: Bearer {token}
```

API docs Try it out memakai current login session melalui proxy `/docs/try-it-out`.

---

## 3. HTTP Status Code Standard

| Code | Meaning | Usage |
| --- | --- | --- |
| 200 | OK | Successful read, update, delete, login |
| 201 | Created | Successful create/register/token creation |
| 401 | Unauthenticated | Missing or invalid auth |
| 403 | Forbidden | Authenticated but not allowed |
| 404 | Not Found | Entity not found |
| 422 | Validation Error | Invalid request payload |
| 500 | Server Error | Unexpected server failure |

---

## 4. Response Shape Standard

Single entity:

```json
{
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@nexora.com"
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

Action message:

```json
{
  "message": "User deleted successfully."
}
```

Token:

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

Validation error:

```json
{
  "message": "The email has already been taken.",
  "errors": {
    "email": ["The email has already been taken."]
  }
}
```

Not found:

```json
{
  "message": "No query results for model [User] 99."
}
```

Unauthenticated:

```json
{
  "message": "Unauthenticated."
}
```

---

## 5. CRUD Endpoint Standard

Use this standard for normal entity modules.

| Action | Method | Path | Route Name | Auth |
| --- | --- | --- | --- | --- |
| List | GET | `/api/v1/{resources}` | `api.v1.{resources}.index` | Required |
| Create | POST | `/api/v1/{resources}` | `api.v1.{resources}.store` | Required |
| Detail | GET | `/api/v1/{resources}/{id}` | `api.v1.{resources}.show` | Required |
| Update | PUT | `/api/v1/{resources}/{id}` | `api.v1.{resources}.update` | Required |
| Delete | DELETE | `/api/v1/{resources}/{id}` | `api.v1.{resources}.destroy` | Required |

Example users:

```text
GET    /api/v1/users
GET    /api/v1/users/{id}
PUT    /api/v1/users/{id}
DELETE /api/v1/users/{id}
```

---

## 6. List Endpoint

Default list endpoint returns all records unless the PRD explicitly requires pagination, filtering, or search.

Request:

```http
GET /api/v1/products
```

Response 200:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Sample Product",
      "created_at": "2026-05-26T08:00:00.000000Z",
      "updated_at": "2026-05-26T08:00:00.000000Z"
    }
  ]
}
```

Only add query parameters if required by the module:

```text
search
status
category_id
page
per_page
date_from
date_to
```

If query parameters are not required, API docs `parameters` must be an empty array.

---

## 7. Create Endpoint

Request:

```http
POST /api/v1/products
```

Payload:

```json
{
  "name": "Sample Product",
  "sku": "SKU-001",
  "price": 150000
}
```

Response 201:

```json
{
  "product": {
    "id": 1,
    "name": "Sample Product",
    "sku": "SKU-001",
    "price": 150000,
    "created_at": "2026-05-26T08:00:00.000000Z",
    "updated_at": "2026-05-26T08:00:00.000000Z"
  }
}
```

---

## 8. Detail Endpoint

Request:

```http
GET /api/v1/products/{id}
```

Response 200:

```json
{
  "product": {
    "id": 1,
    "name": "Sample Product",
    "created_at": "2026-05-26T08:00:00.000000Z",
    "updated_at": "2026-05-26T08:00:00.000000Z"
  }
}
```

Response 404:

```json
{
  "message": "No query results for model [Product] 99."
}
```

---

## 9. Update Endpoint

Request:

```http
PUT /api/v1/products/{id}
```

Payload:

```json
{
  "name": "Updated Product",
  "price": 175000
}
```

Response 200:

```json
{
  "product": {
    "id": 1,
    "name": "Updated Product",
    "price": 175000,
    "created_at": "2026-05-26T08:00:00.000000Z",
    "updated_at": "2026-05-26T09:00:00.000000Z"
  }
}
```

Response 422:

```json
{
  "message": "The name field is required.",
  "errors": {
    "name": ["The name field is required."]
  }
}
```

---

## 10. Delete Endpoint

Request:

```http
DELETE /api/v1/products/{id}
```

Response 200:

```json
{
  "message": "Product deleted successfully."
}
```

Response 404:

```json
{
  "message": "No query results for model [Product] 99."
}
```

---

## 11. Auth API Reference

Existing auth endpoints:

| Action | Method | Path | Auth |
| --- | --- | --- | --- |
| Register | POST | `/api/v1/auth/register` | Public |
| Login | POST | `/api/v1/auth/login` | Public |
| Forgot Password | POST | `/api/v1/auth/forgot-password` | Public |
| Reset Password | POST | `/api/v1/auth/reset-password` | Public |
| Logout | POST | `/api/v1/auth/logout` | Required |
| Me | GET | `/api/v1/auth/me` | Required |
| Refresh Token | POST | `/api/v1/auth/refresh-token` | Required |
| API Token | POST | `/api/v1/auth/api-token` | Required |

Login response 200:

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

Login response 422:

```json
{
  "message": "Invalid email or password."
}
```

---

## 12. Users API Reference

Existing users endpoints:

| Action | Method | Path | Auth |
| --- | --- | --- | --- |
| List Users | GET | `/api/v1/users` | Required |
| Get User | GET | `/api/v1/users/{id}` | Required |
| Update User | PUT | `/api/v1/users/{id}` | Required |
| Delete User | DELETE | `/api/v1/users/{id}` | Required |

List users response 200:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Demo User",
      "email": "demo@nexora.com",
      "is_active": true,
      "email_verified_at": null,
      "created_at": "2026-05-26T08:00:00.000000Z",
      "updated_at": "2026-05-26T08:00:00.000000Z"
    }
  ]
}
```

---

## 13. API Docs Endpoint Definition Standard

Every API docs endpoint file must follow this shape:

```js
export const showProductEndpoint = {
    method: "GET",
    path: "/api/v1/products/{id}",
    name: "Get Product",
    auth: true,
    description: "Returns a single product by ID.",
    payload: "None",
    response: "200 Product",
    methodClass: "bg-sky-100 text-sky-700",
    parameters: [
        {
            name: "id",
            in: "path",
            type: "integer",
            required: true,
            description: "The product ID",
        },
    ],
    requestExample: null,
    schemaExample: null,
    responses: [
        {
            code: 200,
            description: "Product detail",
            example: {
                product: {
                    id: 1,
                    name: "Sample Product",
                },
            },
        },
        {
            code: 401,
            description: "Unauthenticated",
            example: { message: "Unauthenticated." },
        },
        {
            code: 404,
            description: "Product not found",
            example: { message: "No query results for model [Product] 99." },
        },
    ],
};
```

---

## 14. Parameter Rules For API Docs

Path parameter example:

```js
{
    name: "id",
    in: "path",
    type: "integer",
    required: true,
    description: "The product ID",
}
```

Query parameter example:

```js
{
    name: "search",
    in: "query",
    type: "string",
    required: false,
    description: "Search by product name or SKU",
}
```

Do not add query parameters for simple list endpoints unless backend actually uses them.

---

## 15. OpenAPI Attribute Standard

Controllers may include OpenAPI attributes to describe endpoints.

Example:

```php
#[OA\Get(
    path: '/products/{id}',
    tags: ['Products'],
    summary: 'Get product detail',
    description: 'Returns a single product by ID.',
    security: [['bearerAuth' => []]],
    parameters: [
        new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer', example: 1)),
    ],
    responses: [
        new OA\Response(response: 200, description: 'Product detail'),
        new OA\Response(response: 401, description: 'Unauthenticated'),
        new OA\Response(response: 404, description: 'Product not found'),
    ]
)]
```

---

## 16. Validation Rules Standard

Create request:

```php
return [
    'name' => ['required', 'string', 'max:255'],
];
```

Update request:

```php
return [
    'name' => ['sometimes', 'string', 'max:255'],
];
```

Use `required` for create, `sometimes` for partial update.

---

## 17. Naming Standard

Module:

```text
Product
Supplier
Order
Purchase
```

Route resource path:

```text
products
suppliers
orders
purchases
```

Response key:

```text
product
supplier
order
purchase
```

Collection key:

```text
data
```

Controller:

```text
ProductController
```

Service:

```text
ProductService
```

Resource:

```text
ProductResource
```

Requests:

```text
StoreProductRequest
UpdateProductRequest
```

