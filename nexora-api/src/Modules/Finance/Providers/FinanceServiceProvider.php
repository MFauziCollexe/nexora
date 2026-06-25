<?php

namespace Modules\Finance\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class FinanceServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Finance';

    protected string $moduleNamespace = 'Modules\Finance';

    public function bindings(): array
    {
        return [];
    }
}
