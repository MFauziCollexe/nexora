<?php

namespace Modules\User\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class UserServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'User';

    protected string $moduleNamespace = 'Modules\User';

    public function bindings(): array
    {
        return [];
    }
}
