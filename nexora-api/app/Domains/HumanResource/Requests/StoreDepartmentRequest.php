<?php

namespace App\Domains\HumanResource\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string|max:50|unique:departments,code',
            'name' => 'required|string|max:255',
            'is_active' => 'boolean',
        ];
    }
}