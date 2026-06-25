<?php

namespace Modules\Attendance\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class AttendanceServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'Attendance';

    protected string $moduleNamespace = 'Modules\Attendance';

    public function bindings(): array
    {
        return [];
    }
}
