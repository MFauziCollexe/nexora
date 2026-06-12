<?php

namespace App\Http\Controllers;

use App\Services\MenuService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    /**
     * Return menu hierarchy filtered by authenticated user's permissions
     */
    public function getMenusForUser(Request $request): JsonResponse
    {
        $user = $request->user();

        $menus = MenuService::getMenusForUser($user);

        return response()->json([
            'success' => true,
            'data' => $menus,
        ]);
    }
}
