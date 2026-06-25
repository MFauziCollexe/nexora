<?php

namespace Modules\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class ModuleServiceProvider extends ServiceProvider
{
    private array $discovered = [];

    public function register(): void
    {
        $this->discoverModules();
        $this->registerModuleProviders();
    }

    public function boot(): void
    {
        $this->loadModuleRoutes();
        $this->loadModuleMigrations();
    }

    protected function discoverModules(): void
    {
        $modulesPath = base_path('src/Modules');
        $configModules = config('modules.modules', []);

        if (!is_dir($modulesPath)) {
            $this->discovered = $configModules;
            return;
        }

        $directories = File::directories($modulesPath);

        foreach ($directories as $dir) {
            $dirName = basename($dir);

            if ($dirName === 'Providers') {
                continue;
            }

            $moduleKey = $this->pascalToKebab($dirName);
            $name = $dirName;

            $providerDir = $dir . DIRECTORY_SEPARATOR . 'Providers';
            $routePath = $dir . DIRECTORY_SEPARATOR . 'Infrastructure' . DIRECTORY_SEPARATOR . 'Routes' . DIRECTORY_SEPARATOR . 'api.php';
            $migrationPath = $dir . DIRECTORY_SEPARATOR . 'Infrastructure' . DIRECTORY_SEPARATOR . 'Persistence' . DIRECTORY_SEPARATOR . 'Migrations';

            $providers = [];
            if (is_dir($providerDir)) {
                $providerFiles = File::glob($providerDir . DIRECTORY_SEPARATOR . '*ServiceProvider.php');
                foreach ($providerFiles as $file) {
                    $className = pathinfo($file, PATHINFO_FILENAME);
                    $ns = 'Modules\\' . $name . '\\Providers\\' . $className;
                    if (class_exists($ns)) {
                        $providers[] = $ns;
                    }
                }
            }

            $configOverride = $configModules[$moduleKey] ?? [];

            $this->discovered[$moduleKey] = array_merge(
                [
                    'name' => $name,
                    'namespace' => 'Modules\\' . $name,
                    'description' => $configOverride['description'] ?? '',
                    'version' => '1.0.0',
                    'enabled' => $configOverride['enabled'] ?? true,
                    'priority' => $configOverride['priority'] ?? 50,
                    'providers' => $providers,
                    'routes' => file_exists($routePath)
                        ? 'src/Modules/' . $name . '/Infrastructure/Routes/api.php'
                        : null,
                    'migrations' => is_dir($migrationPath) ? $migrationPath : null,
                    'permissions' => $configOverride['permissions'] ?? [],
                    'depends_on' => $configOverride['depends_on'] ?? [],
                ],
                $configOverride
            );
        }
    }

    private function pascalToKebab(string $pascal): string
    {
        return strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $pascal));
    }

    protected function registerModuleProviders(): void
    {
        $sorted = $this->sortByDependency($this->discovered);

        foreach ($sorted as $key => $module) {
            if (!($module['enabled'] ?? true)) {
                continue;
            }

            foreach ($module['providers'] ?? [] as $provider) {
                if (class_exists($provider)) {
                    $this->app->register($provider);
                }
            }
        }
    }

    protected function loadModuleRoutes(): void
    {
        if (!config('modules.discovery.enabled', true)) {
            return;
        }

        $sorted = $this->sortByDependency($this->discovered);
        $prefix = config('modules.discovery.route_prefix', 'v1');

        foreach ($sorted as $key => $module) {
            if (!($module['enabled'] ?? true)) {
                continue;
            }

            $routePath = $module['routes']
                ? base_path($module['routes'])
                : null;

            if ($routePath && file_exists($routePath)) {
                Route::prefix($prefix)->group($routePath);
            }
        }
    }

    protected function loadModuleMigrations(): void
    {
        foreach ($this->discovered as $key => $module) {
            if (!($module['enabled'] ?? true)) {
                continue;
            }

            $migrationPath = $module['migrations'] ?? null;

            if ($migrationPath && is_dir($migrationPath)) {
                $this->loadMigrationsFrom($migrationPath);
            }
        }
    }

    protected function sortByDependency(array $modules): array
    {
        $enabled = array_filter($modules, fn($m) => $m['enabled'] ?? true);

        $sorted = [];
        $visited = [];

        $visit = function (string $key) use (&$visit, &$sorted, &$visited, $enabled) {
            if (isset($visited[$key])) {
                return;
            }
            $visited[$key] = true;

            foreach ($enabled[$key]['depends_on'] ?? [] as $dep) {
                if (isset($enabled[$dep])) {
                    $visit($dep);
                }
            }

            $sorted[$key] = $enabled[$key];
        };

        foreach ($enabled as $key => $module) {
            $visit($key);
        }

        return $sorted;
    }

}
