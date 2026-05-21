<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ApiController extends Controller
{
    /**
     * Show the Nexora API welcome / documentation page.
     */
    public function welcome()
    {
        return Inertia::render('Api/Welcome', [
            'api' => [
                'name' => config('app.name'),
                'version' => '1.0.0',
                'description' => 'Nexora REST API provides access to users, authentication, and all core platform resources. All endpoints require Bearer token authentication unless stated otherwise.',
            ],
            'baseUrl' => env('APP_URL', 'http://localhost:8000'),
        ]);
    }
}
