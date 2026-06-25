<?php

namespace Modules\Purchase\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class PurchaseServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Purchase';

    protected string $moduleNamespace = 'Modules\Purchase';

    public function bindings(): array
    {
        return [];
    }
}
