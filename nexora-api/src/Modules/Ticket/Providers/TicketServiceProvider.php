<?php

namespace Modules\Ticket\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class TicketServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Ticket';

    protected string $moduleNamespace = 'Modules\Ticket';

    public function bindings(): array
    {
        return [];
    }
}
