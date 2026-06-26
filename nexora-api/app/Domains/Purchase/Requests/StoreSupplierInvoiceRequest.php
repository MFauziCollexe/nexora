<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'invoice_no' => 'required|string|max:50|unique:supplier_invoices,invoice_no',
            'date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:date',
            'supplier_id' => 'required|exists:suppliers,id',
            'purchase_order_id' => 'nullable|exists:purchase_orders,id',
            'goods_receipt_id' => 'nullable|exists:goods_receipts,id',
            'supplier_invoice_ref' => 'nullable|string|max:255',
            'reference_number' => 'nullable|string|max:255',
            'subtotal' => 'required|numeric|min:0',
            'tax_amount' => 'required|numeric|min:0',
            'tax_rate' => 'required|numeric|min:0',
            'discount_amount' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'amount_due' => 'required|numeric|min:0',
            'currency' => 'sometimes|string|size:3',
            'description' => 'nullable|string',
            'status' => 'sometimes|string|in:Draft,Submitted,Approved,Rejected,Paid,Overdue,Cancelled',
            'payment_status' => 'sometimes|string|in:Unpaid,Partial,Paid',
            'notes' => 'nullable|string',
        ];
    }
}
