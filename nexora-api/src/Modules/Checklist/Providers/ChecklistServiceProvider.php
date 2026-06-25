<?php

namespace Modules\Checklist\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class ChecklistServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Checklist';

    protected string $moduleNamespace = 'Modules\Checklist';

    public function bindings(): array
    {
        return [];
    }
}
