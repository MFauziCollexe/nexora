<?php

namespace Shared\Infrastructure\Http\Responses;

use App\Http\Controllers\Controller;

abstract class ApiController extends Controller
{
    use ApiResponse;
}
