<?php

namespace Modules\Settings\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class SettingsServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Settings';

    protected string $moduleNamespace = 'Modules\Settings';

    public function bindings(): array
    {
        return [];
    }
}
