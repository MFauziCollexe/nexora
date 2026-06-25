<?php

namespace Modules\HumanResource\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class HumanResourceServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'HumanResource';

    protected string $moduleNamespace = 'Modules\HumanResource';

    public function bindings(): array
    {
        return [];
    }
}
