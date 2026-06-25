<?php

namespace Modules\BusinessPartner\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class BusinessPartnerServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'BusinessPartner';

    protected string $moduleNamespace = 'Modules\BusinessPartner';

    public function bindings(): array
    {
        return [];
    }
}
