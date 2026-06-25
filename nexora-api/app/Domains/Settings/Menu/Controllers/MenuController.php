<?php

namespace App\Domains\Settings\Menu\Controllers;

use App\Domains\Settings\Menu\Services\MenuService;
use Shared\Infrastructure\Http\Responses\ApiController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MenuController extends ApiController
{
    public function __construct(
        private readonly MenuService $menuService,
    ) {}

    public function getMenusForUser(Request $request): JsonResponse
    {
        $menus = $this->menuService->getMenusForUser($request->user());

        return $this->success($menus);
    }
}
