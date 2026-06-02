<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApiActivityLog extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'user_name',
        'method',
        'endpoint',
        'route_name',
        'status_code',
        'ip_address',
        'response_time_ms',
        'user_agent',
        'request_payload',
        'response_payload',
        'created_at',
    ];

    protected $casts = [
        'request_payload' => 'array',
        'response_payload' => 'array',
        'created_at' => 'datetime',
    ];
}
