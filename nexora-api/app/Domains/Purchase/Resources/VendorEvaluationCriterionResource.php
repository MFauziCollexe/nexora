<?php

namespace App\Domains\Purchase\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendorEvaluationCriterionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'vendor_evaluation_id' => $this->vendor_evaluation_id,
            'criterion_name' => $this->criterion_name,
            'weight' => $this->weight,
            'score' => $this->score,
            'weighted_score' => $this->weighted_score,
            'notes' => $this->notes,
        ];
    }
}
