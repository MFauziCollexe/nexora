<?php

namespace App\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{
    protected $table = 'permissions';

    protected $fillable = [
        'code',
        'name',
        'description',
        'type',
    ];

    /**
     * Get roles that have this permission
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_permission');
    }

    /**
     * Get users that have this permission
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_permission');
    }

    /**
     * Scope to get menu permissions only
     */
    public function scopeMenus($query)
    {
        return $query->where('type', 'menu');
    }

    /**
     * Scope to get action permissions only
     */
    public function scopeActions($query)
    {
        return $query->where('type', 'action');
    }
}
