<?php

namespace App\Domains\BusinessPartner\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string|max:50|unique:supplier_categories,code',
            'name' => 'required|string|max:255',
            'is_active' => 'boolean',
        ];
    }
}