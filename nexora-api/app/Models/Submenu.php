<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Submenu extends Model
{
    protected $table = 'submenus';

    protected $fillable = [
        'main_menu_id',
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
     * Get the main menu that owns the submenu
     */
    public function mainMenu(): BelongsTo
    {
        return $this->belongsTo(MainMenu::class);
    }

    /**
     * Get the child menus for the submenu
     */
    public function childMenus(): HasMany
    {
        return $this->hasMany(ChildMenu::class)->orderBy('order');
    }

    /**
     * Scope to get only active submenus
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get full menu code path (M01.S01)
     */
    public function getFullCodeAttribute(): string
    {
        return $this->mainMenu->code . '.' . $this->code;
    }
}
