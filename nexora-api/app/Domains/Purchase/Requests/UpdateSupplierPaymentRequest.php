<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplierPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('supplier_payment');
        return [
            'payment_no' => 'sometimes|string|max:50|unique:supplier_payments,payment_no,' . $id,
            'date' => 'sometimes|date',
            'supplier_id' => 'sometimes|exists:suppliers,id',
            'amount' => 'sometimes|numeric|min:0',
            'paid_amount' => 'sometimes|numeric|min:0',
            'currency' => 'sometimes|string|size:3',
            'payment_method' => 'nullable|string|in:Bank Transfer,Cash,Cheque,Giro',
            'bank_name' => 'nullable|string|max:255',
            'bank_account' => 'nullable|string|max:255',
            'reference_number' => 'nullable|string|max:255',
            'payment_date' => 'sometimes|date',
            'description' => 'nullable|string',
            'status' => 'sometimes|string|in:Draft,Submitted,Approved,Paid,Cancelled',
            'notes' => 'nullable|string',
        ];
    }
}
