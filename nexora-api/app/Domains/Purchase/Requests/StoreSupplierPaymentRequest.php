<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'payment_no' => 'required|string|max:50|unique:supplier_payments,payment_no',
            'date' => 'required|date',
            'supplier_id' => 'required|exists:suppliers,id',
            'amount' => 'required|numeric|min:0',
            'paid_amount' => 'required|numeric|min:0',
            'currency' => 'sometimes|string|size:3',
            'payment_method' => 'nullable|string|in:Bank Transfer,Cash,Cheque,Giro',
            'bank_name' => 'nullable|string|max:255',
            'bank_account' => 'nullable|string|max:255',
            'reference_number' => 'nullable|string|max:255',
            'payment_date' => 'required|date',
            'description' => 'nullable|string',
            'status' => 'sometimes|string|in:Draft,Submitted,Approved,Paid,Cancelled',
            'notes' => 'nullable|string',
        ];
    }
}
