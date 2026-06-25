<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Each domain registers its own routes in:
|   app/Domains/{Domain}/Routes/api.php
|
| These are loaded automatically below.
|
*/

// ============ AUTO-LOAD DOMAIN ROUTES ============

$domainPath = base_path('app/Domains');

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($domainPath, RecursiveDirectoryIterator::SKIP_DOTS)
);
$routeFiles = [];
foreach ($iterator as $file) {
    if ($file->isFile() && $file->getFilename() === 'api.php' && str_contains($file->getPathname(), DIRECTORY_SEPARATOR . 'Routes' . DIRECTORY_SEPARATOR)) {
        $routeFiles[] = $file->getPathname();
    }
}
sort($routeFiles);
foreach ($routeFiles as $routeFile) {
    Route::prefix('v1')->group($routeFile);
}
