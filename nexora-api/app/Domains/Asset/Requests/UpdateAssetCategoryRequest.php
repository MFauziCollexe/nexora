<?php

namespace App\Domains\Asset\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAssetCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'sometimes|string|max:50|unique:asset_categories,code,' . $this->route('id'),
            'name' => 'sometimes|string|max:255',
            'is_active' => 'boolean',
        ];
    }
}