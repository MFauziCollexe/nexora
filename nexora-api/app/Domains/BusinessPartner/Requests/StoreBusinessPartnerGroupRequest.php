<?php

namespace App\Domains\BusinessPartner\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBusinessPartnerGroupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string|max:50|unique:business_partner_groups,code',
            'name' => 'required|string|max:255',
            'status' => 'sometimes|string|in:active,inactive',
        ];
    }
}