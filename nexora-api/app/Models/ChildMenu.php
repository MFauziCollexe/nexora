<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChildMenu extends Model
{
    protected $table = 'child_menus';

    protected $fillable = [
        'submenu_id',
        'code',
        'name',
        'icon',
        'href',
        'description',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'full_code',
        'hierarchy',
    ];

    /**
     * Get the submenu that owns the child menu
     */
    public function submenu(): BelongsTo
    {
        return $this->belongsTo(Submenu::class);
    }

    /**
     * Scope to get only active child menus
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get full menu code path (M01.S01.C01)
     */
    public function getFullCodeAttribute(): string
    {
        return $this->submenu->mainMenu->code . '.' . $this->submenu->code . '.' . $this->code;
    }

    /**
     * Get menu hierarchy
     */
    public function getHierarchyAttribute(): array
    {
        return [
            'main' => $this->submenu->mainMenu->code,
            'sub' => $this->submenu->code,
            'child' => $this->code,
            'fullCode' => $this->getFullCodeAttribute(),
        ];
    }
}
