<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVendorEvaluationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'evaluation_no' => 'required|string|max:50|unique:vendor_evaluations,evaluation_no',
            'evaluation_date' => 'required|date',
            'period' => 'required|string|max:50',
            'supplier_id' => 'required|exists:suppliers,id',
            'supplier_category' => 'nullable|string|max:255',
            'overall_score' => 'required|numeric|min:0|max:100',
            'rating' => 'nullable|string|in:Excellent,Good,Fair,Poor',
            'summary' => 'nullable|string',
            'recommendation' => 'nullable|string',
            'status' => 'sometimes|string|in:Draft,Completed,Cancelled',
            'notes' => 'nullable|string',
            'evaluated_by' => 'required|exists:users,id',
        ];
    }
}
