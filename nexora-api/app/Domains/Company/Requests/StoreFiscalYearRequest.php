<?php

namespace App\Domains\Company\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFiscalYearRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string|max:50|unique:fiscal_years,code',
            'name' => 'required|string|max:255',
            'is_active' => 'boolean',
        ];
    }
}