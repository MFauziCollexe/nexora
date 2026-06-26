<?php

namespace App\Domains\Purchase\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class VendorEvaluation extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'vendor_evaluations';

    protected $fillable = [
        'evaluation_no', 'evaluation_date', 'period', 'supplier_id',
        'supplier_category', 'overall_score', 'rating', 'summary',
        'recommendation', 'status', 'notes', 'evaluated_by', 'approved_by',
        'approved_at', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'evaluation_date' => 'date',
        'approved_at' => 'datetime',
        'overall_score' => 'decimal:2',
    ];

    public function criteria()
    {
        return $this->hasMany(VendorEvaluationCriterion::class, 'vendor_evaluation_id');
    }

    public function supplier()
    {
        return $this->belongsTo(\App\Domains\BusinessPartner\Models\Supplier::class, 'supplier_id');
    }

    public function evaluator()
    {
        return $this->belongsTo(User::class, 'evaluated_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
