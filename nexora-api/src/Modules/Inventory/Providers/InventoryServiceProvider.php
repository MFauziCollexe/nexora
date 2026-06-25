<?php

namespace Modules\Inventory\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class InventoryServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Inventory';

    protected string $moduleNamespace = 'Modules\Inventory';

    public function bindings(): array
    {
        return [];
    }
}
