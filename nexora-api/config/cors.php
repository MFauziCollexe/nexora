<?php

return [

    /*
     * You can enable CORS for 0, 1, or multiple paths.
     * A value of ['api/*'] will enable CORS for api/* routes.
     * A value of ['*'] will enable CORS for all paths.
     */
    'paths' => ['api/*', 'login', 'register'],

    /*
     * Domains that are allowed to make requests to your application.
     *
     * You can specify those with an exact match or a wildcard like *.example.com
     */
    'allowed_methods' => ['*'],

    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001')),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
