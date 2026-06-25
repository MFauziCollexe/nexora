<?php

namespace Modules\AiChat\Providers;

use Shared\Infrastructure\Providers\ModuleServiceProvider;

class AiChatServiceProvider extends ModuleServiceProvider
{
    protected string $moduleName = 'AiChat';

    protected string $moduleNamespace = 'Modules\AiChat';

    public function bindings(): array
    {
        return [];
    }
}
