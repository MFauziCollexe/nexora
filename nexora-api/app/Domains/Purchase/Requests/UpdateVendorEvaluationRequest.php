<?php

namespace App\Domains\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVendorEvaluationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('vendor_evaluation');
        return [
            'evaluation_no' => 'sometimes|string|max:50|unique:vendor_evaluations,evaluation_no,' . $id,
            'evaluation_date' => 'sometimes|date',
            'period' => 'sometimes|string|max:50',
            'supplier_id' => 'sometimes|exists:suppliers,id',
            'supplier_category' => 'nullable|string|max:255',
            'overall_score' => 'sometimes|numeric|min:0|max:100',
            'rating' => 'nullable|string|in:Excellent,Good,Fair,Poor',
            'summary' => 'nullable|string',
            'recommendation' => 'nullable|string',
            'status' => 'sometimes|string|in:Draft,Completed,Cancelled',
            'notes' => 'nullable|string',
            'evaluated_by' => 'sometimes|exists:users,id',
        ];
    }
}
