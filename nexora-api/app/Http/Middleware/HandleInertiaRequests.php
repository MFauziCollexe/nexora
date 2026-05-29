<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id'   => $request->user()->id,
                    'name' => $request->user()->name,
                    // jangan tambahkan email, phone, dll kalau tidak perlu
                ] : null,
            ],
            'ziggy' => fn () => [
                'url'      => config('app.url'),
                'port'     => null,
                'defaults' => [],
                'location' => $request->url(),
                'routes'   => collect((new Ziggy)->toArray()['routes'])
                    ->only([
                        'dashboard',
                        'profile.edit',
                        'logout',
                        'docs.page',
                        // tambahkan hanya route yang dibutuhkan frontend
                    ])
                    ->toArray(),
            ],
        ];
    }
}