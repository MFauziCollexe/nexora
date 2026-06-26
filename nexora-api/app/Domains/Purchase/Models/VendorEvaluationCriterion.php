<?php

namespace App\Domains\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VendorEvaluationCriterion extends Model
{
    use HasFactory;

    protected $table = 'vendor_evaluation_criteria';

    protected $fillable = [
        'vendor_evaluation_id', 'criterion_name', 'weight', 'score',
        'weighted_score', 'notes',
    ];

    protected $casts = [
        'weight' => 'decimal:2',
        'score' => 'decimal:2',
        'weighted_score' => 'decimal:2',
    ];

    public function vendorEvaluation()
    {
        return $this->belongsTo(VendorEvaluation::class, 'vendor_evaluation_id');
    }
}
