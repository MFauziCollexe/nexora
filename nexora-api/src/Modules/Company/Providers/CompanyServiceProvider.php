<?php

namespace Modules\Company\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class CompanyServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Company';

    protected string $moduleNamespace = 'Modules\Company';

    public function bindings(): array
    {
        return [];
    }
}
