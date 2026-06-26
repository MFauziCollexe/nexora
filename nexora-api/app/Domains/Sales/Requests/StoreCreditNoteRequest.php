<?php

namespace App\Domains\Sales\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCreditNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'credit_note_no' => 'required|string|max:50|unique:credit_notes,credit_note_no',
            'date' => 'required|date',
            'invoice_id' => 'nullable|exists:invoices,id',
            'invoice_no' => 'nullable|string|max:50',
            'customer_id' => 'nullable|exists:customers,id',
            'customer_name' => 'required|string|max:255',
            'reason' => 'nullable|string|max:500',
            'total_amount' => 'required|numeric|min:0',
            'used_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:Unused,Partial,Used',
            'expires_on' => 'nullable|date',
            'notes' => 'nullable|string',
        ];
    }
}
