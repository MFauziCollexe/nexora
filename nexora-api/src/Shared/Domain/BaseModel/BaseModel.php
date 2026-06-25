<?php

namespace Shared\Domain\BaseModel;

use Illuminate\Database\Eloquent\Model;
use Shared\Infrastructure\Persistence\Models\Traits\HasAudit;

abstract class BaseModel extends Model
{
    use HasAudit;

    protected $guarded = ['id'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeSearch($query, string $term, array $columns)
    {
        $query->where(function ($q) use ($term, $columns) {
            foreach ($columns as $column) {
                $q->orWhere($column, 'like', "%{$term}%");
            }
        });
        return $query;
    }
}
