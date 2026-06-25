<?php

namespace Shared\Infrastructure\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

abstract class ModuleServiceProvider extends ServiceProvider
{
    protected string $moduleName;
    protected string $moduleNamespace;

    abstract protected function bindings(): array;

    public function register(): void
    {
        $this->registerBindings();
    }

    public function boot(): void
    {
        $this->loadModuleRoutes();
        $this->loadModuleConfig();
    }

    protected function registerBindings(): void
    {
        foreach ($this->bindings() as $abstract => $concrete) {
            $this->app->bind($abstract, $concrete);
        }
    }

    protected function loadModuleRoutes(): void
    {
        $routePath = $this->getModulePath('Infrastructure/Routes/api.php');

        if (file_exists($routePath)) {
            Route::prefix(config('modules.discovery.route_prefix', 'v1'))
                ->group($routePath);
        }
    }

    protected function loadModuleConfig(): void
    {
        $configPath = $this->getModulePath('config.php');

        if (file_exists($configPath)) {
            $key = str_replace('-', '_', $this->moduleName);
            $this->mergeConfigFrom($configPath, "module.{$key}");
        }
    }

    protected function getModulePath(string $relativePath = ''): string
    {
        return base_path("src/Modules/{$this->moduleName}/{$relativePath}");
    }
}
