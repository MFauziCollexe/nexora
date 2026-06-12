<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MainMenu extends Model
{
    protected $table = 'main_menus';

    protected $fillable = [
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
    ];

    /**
     * Get the submenus for the main menu
     */
    public function submenus(): HasMany
    {
        return $this->hasMany(Submenu::class);
    }

    /**
     * Get all child menus through submenus
     */
    public function childMenus()
    {
        return $this->hasManyThrough(ChildMenu::class, Submenu::class);
    }

    /**
     * Scope to get only active menus
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get menu with all nested relations
     */
    public function getMenuHierarchy()
    {
        return $this->load('submenus.childMenus');
    }

    public function getFullCodeAttribute(): string
    {
        return $this->code;
    }
}
