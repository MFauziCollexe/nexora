<?php

namespace App\Services;

use App\Models\MainMenu;
use App\Models\Submenu;
use App\Models\ChildMenu;

class MenuService
{
    /**
     * Get all menus with hierarchy
     */
    public static function getAllMenus($onlyActive = true)
    {
        $query = MainMenu::with([
            'submenus' => function ($query) use ($onlyActive) {
                if ($onlyActive) {
                    $query->where('is_active', true);
                }

                $query->orderBy('order');
            },
            'submenus.childMenus' => function ($query) use ($onlyActive) {
                if ($onlyActive) {
                    $query->where('is_active', true);
                }

                $query->orderBy('order');
            },
        ]);

        if ($onlyActive) {
            $query->where('is_active', true);
        }

        return $query->orderBy('order')->get();
    }

    /**
     * Get menu by code (supports M01, M01.S01, M01.S01.C01)
     */
    public static function getMenuByCode($code)
    {
        $parts = explode('.', $code);

        if (count($parts) === 1) {
            return MainMenu::where('code', $code)->first();
        }

        if (count($parts) === 2) {
            return Submenu::where('code', $parts[1])
                ->whereHas('mainMenu', function ($query) use ($parts) {
                    $query->where('code', $parts[0]);
                })
                ->first();
        }

        if (count($parts) === 3) {
            return ChildMenu::where('code', $parts[2])
                ->whereHas('submenu', function ($query) use ($parts) {
                    $query->where('code', $parts[1])
                        ->whereHas('mainMenu', function ($query) use ($parts) {
                            $query->where('code', $parts[0]);
                        });
                })
                ->first();
        }

        return null;
    }

    /**
     * Get child menus by submenu code
     */
    public static function getChildMenusBySubmenu($submenuCode)
    {
        return ChildMenu::whereHas('submenu', function ($query) use ($submenuCode) {
            $query->where('code', $submenuCode);
        })->orderBy('order')->get();
    }

    /**
     * Get all permissions for a user
     * @param $user User model instance
     * @return array Permission codes
     */
    public static function getUserPermissions($user)
    {
        $rolePermissions = $user->roles()
            ->with('permissions')
            ->get()
            ->flatMap(function ($role) {
                return $role->permissions->pluck('code');
            });

        $userPermissions = $user->permissions()
            ->pluck('code');

        return collect($rolePermissions)
            ->merge($userPermissions)
            ->unique()
            ->toArray();
    }

    /**
     * Check if user has permission for a menu code
     * @param $user User model instance
     * @param $requiredCode string Menu code (M01, M01.S01, M01.S01.C01)
     * @return bool
     */
    public static function hasMenuAccess($user, $requiredCode)
    {
        return self::permissionListAllows(self::getUserPermissions($user), $requiredCode);
    }

    /**
     * Check if user has permission for a specific menu level
     * @param $user User model instance
     * @param $mainCode string Main menu code
     * @param $subCode string|null Submenu code
     * @param $childCode string|null Child menu code
     * @return bool
     */
    public static function hasMenuAccessByLevel($user, $mainCode, $subCode = null, $childCode = null)
    {
        $code = $mainCode;
        if ($subCode) {
            $code .= '.' . $subCode;
        }
        if ($childCode) {
            $code .= '.' . $childCode;
        }

        return self::hasMenuAccess($user, $code);
    }

    /**
     * Get filtered menus based on user permissions
     * @param $user User model instance
     * @return array Filtered menu hierarchy
     */
    public static function getMenusForUser($user)
    {
        $allMenus = self::getAllMenus();
        $userPermissions = self::getUserPermissions($user);

        return $allMenus->map(function ($mainMenu) use ($userPermissions) {
            $mainCode = $mainMenu->code;
            $mainHasDirectAccess = self::permissionListAllows($userPermissions, $mainCode);

            $submenus = $mainMenu->submenus->map(function ($submenu) use ($mainCode, $userPermissions) {
                $subCode = $mainCode . '.' . $submenu->code;
                $subHasDirectAccess = self::permissionListAllows($userPermissions, $subCode);

                $childMenus = $submenu->childMenus->filter(function ($childMenu) use ($subCode, $userPermissions) {
                    return self::permissionListAllows($userPermissions, $subCode . '.' . $childMenu->code);
                })->values();

                $submenu->setRelation('childMenus', $childMenus);

                if ($subHasDirectAccess || $childMenus->isNotEmpty()) {
                    return $submenu;
                }

                return null;
            })->filter()->values();

            $mainMenu->setRelation('submenus', $submenus);

            if ($mainHasDirectAccess || $submenus->isNotEmpty()) {
                return $mainMenu;
            }

            return null;
        })->filter()->values();
    }

    private static function permissionListAllows(array $permissions, string $requiredCode): bool
    {
        return collect($permissions)->some(function ($permission) use ($requiredCode) {
            return $permission === $requiredCode || str_starts_with($requiredCode, $permission . '.');
        });
    }
}
