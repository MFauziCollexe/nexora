<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendorEvaluationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'evaluation_no' => $this->evaluation_no,
            'evaluation_date' => $this->evaluation_date,
            'period' => $this->period,
            'supplier_id' => $this->supplier_id,
            'supplier' => $this->whenLoaded('supplier', fn() => [
                'id' => $this->supplier->id,
                'name' => $this->supplier->name,
            ]),
            'supplier_category' => $this->supplier_category,
            'overall_score' => $this->overall_score,
            'rating' => $this->rating,
            'summary' => $this->summary,
            'recommendation' => $this->recommendation,
            'status' => $this->status,
            'notes' => $this->notes,
            'evaluated_by' => $this->evaluated_by,
            'evaluator' => $this->whenLoaded('evaluator', fn() => [
                'id' => $this->evaluator->id,
                'name' => $this->evaluator->name,
            ]),
            'criteria' => VendorEvaluationCriterionResource::collection($this->whenLoaded('criteria')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
