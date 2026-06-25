<?php

use Illuminate\Support\Facades\Route;
use App\Domains\HumanResource\Controllers\DepartmentController;
use App\Domains\HumanResource\Controllers\PositionController;
use App\Domains\HumanResource\Controllers\EmployeeController;

Route::middleware('auth:sanctum')->prefix('master-data/hr')->group(function () {
    Route::apiResource('departments', DepartmentController::class);
    Route::apiResource('positions', PositionController::class);
    Route::apiResource('employees', EmployeeController::class);
});

