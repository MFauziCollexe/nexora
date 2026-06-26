<?php

namespace App\Domains\BusinessPartner\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplierCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'sometimes|string|max:50|unique:supplier_categories,code,' . $this->route('id'),
            'name' => 'sometimes|string|max:255',
            'status' => 'sometimes|string|in:active,inactive',
        ];
    }
}