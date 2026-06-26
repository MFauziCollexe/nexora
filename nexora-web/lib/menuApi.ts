import { getToken } from "@/modules/auth/services/authService";

export type ChildMenuType = {
  id: number;
  submenu_id: number;
  code: string;
  name: string;
  icon?: string;
  href: string;
  description?: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SubmenuType = {
  id: number;
  main_menu_id: number;
  code: string;
  name: string;
  icon?: string;
  href?: string;
  description?: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  child_menus?: ChildMenuType[];
};

export type MainMenuType = {
  id: number;
  code: string;
  name: string;
  icon?: string;
  href?: string;
  description?: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  submenus?: SubmenuType[];
};

/**
 * Fetch menus for authenticated user (filtered by permissions)
 */
export async function fetchUserMenus(): Promise<MainMenuType[]> {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost"}/api/v1/menus`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - Please login again");
    }
    throw new Error(`Failed to fetch menus: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}

/**
 * Format menu for display (handles legacy data or nested structure)
 */
export function formatMenuHierarchy(menu: MainMenuType) {
  return {
    label: menu.name,
    href: menu.href || "#",
    active: false,
    code: menu.code,
    children: menu.submenus?.map((sub) => ({
      label: sub.name,
      href: sub.href || "#",
      active: false,
      code: sub.code,
      children: sub.child_menus?.map((child) => ({
        label: child.name,
        href: child.href,
        active: false,
        code: child.code,
      })) || [],
    })) || [],
  };
}
