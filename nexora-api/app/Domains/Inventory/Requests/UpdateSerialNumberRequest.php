<?php

namespace App\Domains\Inventory\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSerialNumberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'serial_number' => 'sometimes|string|max:255|unique:serial_numbers,serial_number,' . $this->route('id'),
            'item_id' => 'sometimes|integer|exists:items,id',
            'batch_lot_id' => 'nullable|integer|exists:batch_lots,id',
            'status' => 'sometimes|string|in:available,sold,used,scrap,in_repair,returned',
            'warehouse' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'warranty_expiry' => 'nullable|date',
            'notes' => 'nullable|string',
            'is_active' => 'boolean',
        ];
    }
}
