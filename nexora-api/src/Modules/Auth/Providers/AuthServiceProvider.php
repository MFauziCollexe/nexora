<?php

namespace Modules\Auth\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class AuthServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Auth';

    protected string $moduleNamespace = 'Modules\Auth';

    public function bindings(): array
    {
        return [];
    }
}
