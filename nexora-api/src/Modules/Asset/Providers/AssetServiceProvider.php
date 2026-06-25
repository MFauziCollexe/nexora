<?php

namespace Modules\Asset\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class AssetServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Asset';

    protected string $moduleNamespace = 'Modules\Asset';

    public function bindings(): array
    {
        return [];
    }
}
