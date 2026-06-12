"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { fetchUserMenus, MainMenuType } from "@/lib/menuApi";
import { useAuth } from "@/lib/AuthContext";

type MenuContextType = {
  menus: MainMenuType[];
  isLoading: boolean;
  error: string | null;
  refetchMenus: () => Promise<void>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menus, setMenus] = useState<MainMenuType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const loadMenus = async () => {
    if (!isAuthenticated) {
      setMenus([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUserMenus();
      setMenus(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load menus";
      setError(message);
      console.error("Error loading menus:", message);
      setMenus([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadMenus();
    }
  }, [isAuthenticated]);

  const value: MenuContextType = {
    menus,
    isLoading,
    error,
    refetchMenus: loadMenus,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenus(): MenuContextType {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenus must be used within MenuProvider");
  }
  return context;
}
