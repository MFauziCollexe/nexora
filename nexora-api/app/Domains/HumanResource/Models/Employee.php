<?php

namespace App\Domains\HumanResource\Models;

use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory, SoftDeletes, HasAudit;

    protected $fillable = [
        'employee_number', 'first_name', 'last_name', 'email', 'phone', 'mobile',
        'address', 'city', 'province', 'postal_code', 'birth_date', 'gender',
        'marital_status', 'department_id', 'position_id', 'supervisor_id',
        'hire_date', 'employment_status', 'employment_type', 'salary',
        'bank_name', 'bank_account', 'tax_id', 'bpjs_ketenagakerjaan', 'bpjs_kesehatan',
        'image', 'is_active', 'company_id', 'user_id', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'hire_date' => 'date',
            'salary' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function supervisor()
    {
        return $this->belongsTo(self::class, 'supervisor_id');
    }

    public function subordinates()
    {
        return $this->hasMany(self::class, 'supervisor_id');
    }
}
