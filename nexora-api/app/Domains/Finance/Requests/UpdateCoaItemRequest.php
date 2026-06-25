<?php

namespace App\Domains\Finance\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCoaItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'sometimes|string|max:50|unique:coa_items,code,' . $this->route('id'),
            'name' => 'sometimes|string|max:255',
            'is_active' => 'boolean',
        ];
    }
}