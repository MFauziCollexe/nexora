<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApiDocsTryItOutController;
use App\Http\Controllers\ApiActivityLogController;
use App\Domains\Settings\Controllers\SettingsController;
use App\Domains\AiChat\Controllers\AiChatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index');
    })->name('dashboard');

    Route::get('/docs/{page}', function ($page) {
        return Inertia::render('Dashboard/Placeholder', [
            'page' => $page,
        ]);
    })->name('docs.page');
    
    Route::post('/system/ai-chat', [AiChatController::class, 'chat'])->name('system.ai-chat');
    Route::post('/docs/try-it-out', ApiDocsTryItOutController::class)->name('docs.try-it-out');
    Route::get('/system/settings', [SettingsController::class, 'index'])->name('system.settings');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/system/api-activity-logs', [ApiActivityLogController::class, 'index'])->name('system.api-activity-logs.index');
    Route::get('/system/api-activity-logs/export', [ApiActivityLogController::class, 'export'])->name('system.api-activity-logs.export');
    Route::get('/system/api-activity-logs/{apiActivityLog}', [ApiActivityLogController::class, 'show'])->name('system.api-activity-logs.show');
    
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';