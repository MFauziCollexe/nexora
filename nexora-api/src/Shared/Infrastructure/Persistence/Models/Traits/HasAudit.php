<?php

namespace Shared\Infrastructure\Persistence\Models\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait HasAudit
{
    protected static function bootHasAudit(): void
    {
        static::creating(function (Model $model) {
            if (Auth::check()) {
                $userId = Auth::id();
                if (!$model->getKey()) {
                    $model->created_by = $userId;
                }
                $model->updated_by = $userId;
            }
        });

        static::updating(function (Model $model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
            }
        });

        static::deleting(function (Model $model) {
            if (Auth::check() && in_array('SoftDeletes', class_uses_recursive($model))) {
                $model->deleted_by = Auth::id();
                $model->save();
            }
        });
    }

    public function creator()
    {
        return $this->belongsTo(config('auth.providers.users.model'), 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(config('auth.providers.users.model'), 'updated_by');
    }
}
