<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Module System Configuration
    |--------------------------------------------------------------------------
    | Enterprise module registry with auto-discovery, dependency management,
    | permission generation, and route registration.
    |
    | Each module follows the structure:
    |   src/Modules/{Name}/
    |     Application/
    |     Domain/
    |     Infrastructure/
    |     Providers/
    |
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | System Status
    |--------------------------------------------------------------------------
    | Controls overall module system behavior.
    */
    'status' => env('MODULES_STATUS', 'active'),

    /*
    |--------------------------------------------------------------------------
    | Discovery Configuration
    |--------------------------------------------------------------------------
    | Auto-discovery scans configured paths for module providers and routes.
    */
    'discovery' => [
        'enabled' => env('MODULES_DISCOVERY', true),
        'paths' => [
            base_path('src/Modules'),
        ],
        'route_prefix' => 'v1',
        'cache' => [
            'enabled' => env('MODULES_CACHE_ENABLED', false),
            'key' => 'modules.discovered',
            'ttl' => 3600,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Module Registry
    |--------------------------------------------------------------------------
    | Each module is uniquely identified by its snake_case key. Priority
    | determines service provider registration order (higher = earlier).
    |
    | Permission key format: {prefix}.{module_key}.{entity}.{action}
    | Example: module.inventory.item.create
    |
    */
    'modules' => [

        'auth' => [
            'name' => 'Auth',
            'namespace' => 'Modules\\Auth',
            'description' => 'Authentication & authorization management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 100,
            'providers' => [
                'Modules\\Auth\\Providers\\AuthServiceProvider',
            ],
            'routes' => 'src/Modules/Auth/Infrastructure/Routes/api.php',
            'permissions' => ['login', 'register', 'logout', 'tokens'],
            'depends_on' => [],
        ],

        'user' => [
            'name' => 'User',
            'namespace' => 'Modules\\User',
            'description' => 'User profile & account management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 99,
            'providers' => [
                'Modules\\User\\Providers\\UserServiceProvider',
            ],
            'routes' => 'src/Modules/User/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete'],
            'depends_on' => ['auth'],
        ],

        'settings' => [
            'name' => 'Settings',
            'namespace' => 'Modules\\Settings',
            'description' => 'Application configuration & menu management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 95,
            'providers' => [
                'Modules\\Settings\\Providers\\SettingsServiceProvider',
            ],
            'routes' => 'src/Modules/Settings/Infrastructure/Routes/api.php',
            'permissions' => ['read', 'update'],
            'depends_on' => ['auth'],
        ],

        'ai-chat' => [
            'name' => 'AiChat',
            'namespace' => 'Modules\\AiChat',
            'description' => 'AI-powered chat & voice assistant',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 90,
            'providers' => [
                'Modules\\AiChat\\Providers\\AiChatServiceProvider',
            ],
            'routes' => 'src/Modules/AiChat/Infrastructure/Routes/api.php',
            'permissions' => ['chat', 'voice'],
            'depends_on' => ['auth'],
        ],

        'company' => [
            'name' => 'Company',
            'namespace' => 'Modules\\Company',
            'description' => 'Multi-company, branch & fiscal year configuration',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 80,
            'providers' => [
                'Modules\\Company\\Providers\\CompanyServiceProvider',
            ],
            'routes' => 'src/Modules/Company/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete'],
            'depends_on' => ['auth', 'user'],
        ],

        'asset' => [
            'name' => 'Asset',
            'namespace' => 'Modules\\Asset',
            'description' => 'Asset, category, location & status management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 60,
            'providers' => [
                'Modules\\Asset\\Providers\\AssetServiceProvider',
            ],
            'routes' => 'src/Modules/Asset/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete'],
            'depends_on' => ['auth', 'company'],
        ],

        'business-partner' => [
            'name' => 'BusinessPartner',
            'namespace' => 'Modules\\BusinessPartner',
            'description' => 'Customer, supplier, group & category management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 55,
            'providers' => [
                'Modules\\BusinessPartner\\Providers\\BusinessPartnerServiceProvider',
            ],
            'routes' => 'src/Modules/BusinessPartner/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete'],
            'depends_on' => ['auth', 'company'],
        ],

        'attendance' => [
            'name' => 'Attendance',
            'namespace' => 'Modules\\Attendance',
            'description' => 'Employee attendance & time tracking',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 50,
            'providers' => [
                'Modules\\Attendance\\Providers\\AttendanceServiceProvider',
            ],
            'routes' => 'src/Modules/Attendance/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete', 'approve'],
            'depends_on' => ['auth', 'human-resource'],
        ],

        'human-resource' => [
            'name' => 'HumanResource',
            'namespace' => 'Modules\\HumanResource',
            'description' => 'Employee, department & position management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 50,
            'providers' => [
                'Modules\\HumanResource\\Providers\\HumanResourceServiceProvider',
            ],
            'routes' => 'src/Modules/HumanResource/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete'],
            'depends_on' => ['auth', 'company'],
        ],

        'checklist' => [
            'name' => 'Checklist',
            'namespace' => 'Modules\\Checklist',
            'description' => 'Checklist entry & template management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 45,
            'providers' => [
                'Modules\\Checklist\\Providers\\ChecklistServiceProvider',
            ],
            'routes' => 'src/Modules/Checklist/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete'],
            'depends_on' => ['auth'],
        ],

        'ticket' => [
            'name' => 'Ticket',
            'namespace' => 'Modules\\Ticket',
            'description' => 'Service desk ticket & incident management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 45,
            'providers' => [
                'Modules\\Ticket\\Providers\\TicketServiceProvider',
            ],
            'routes' => 'src/Modules/Ticket/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete', 'assign'],
            'depends_on' => ['auth', 'human-resource'],
        ],

        'finance' => [
            'name' => 'Finance',
            'namespace' => 'Modules\\Finance',
            'description' => 'COA, cost center, tax, bank account & payment terms',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 40,
            'providers' => [
                'Modules\\Finance\\Providers\\FinanceServiceProvider',
            ],
            'routes' => 'src/Modules/Finance/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete'],
            'depends_on' => ['auth', 'company'],
        ],

        'inventory' => [
            'name' => 'Inventory',
            'namespace' => 'Modules\\Inventory',
            'description' => 'Item, warehouse, brand, category & UOM management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 35,
            'providers' => [
                'Modules\\Inventory\\Providers\\InventoryServiceProvider',
            ],
            'routes' => 'src/Modules/Inventory/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete'],
            'depends_on' => ['auth', 'company'],
        ],

        'purchase' => [
            'name' => 'Purchase',
            'namespace' => 'Modules\\Purchase',
            'description' => 'Purchase requisition, order & vendor management',
            'version' => '1.0.0',
            'enabled' => true,
            'priority' => 30,
            'providers' => [
                'Modules\\Purchase\\Providers\\PurchaseServiceProvider',
            ],
            'routes' => 'src/Modules/Purchase/Infrastructure/Routes/api.php',
            'permissions' => ['create', 'read', 'update', 'delete', 'approve'],
            'depends_on' => ['auth', 'inventory', 'business-partner'],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Permission Generation
    |--------------------------------------------------------------------------
    | When enabled, module permissions are automatically generated from
    | each module's defined permission keys.
    */
    'permissions' => [
        'generate' => true,
        'prefix' => 'module',
        'format' => '{prefix}.{module}.{entity}.{action}',
    ],
];
