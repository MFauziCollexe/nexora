"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMenus } from "@/lib/MenuContext";
import { MainMenuType, SubmenuType } from "@/lib/menuApi";
import { ChevronRightIcon } from "@/components/ui/Icons";

interface MenuItemProps {
  level?: number;
  name: string;
  href?: string;
  children?: (SubmenuType | { name: string; href: string; code: string })[];
}

function MenuItemComponent({ item, level = 0 }: { item: MenuItemProps; level?: number }) {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isParent = hasChildren && (!item.href || item.href === "#" || item.href === "null");

  // Cek apakah halaman ini aktif
  const isActive = item.href && item.href !== "#" && item.href !== "null" && pathname === item.href;

  // Cek apakah salah satu child aktif (untuk auto-expand parent)
  const hasActiveChild = item.children?.some((child) => {
    if ("href" in child && child.href === pathname) return true;
    if ("child_menus" in child) {
      return (child as SubmenuType).child_menus?.some((c) => c.href === pathname);
    }
    return false;
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Auto expand kalau ada child yang aktif
  useEffect(() => {
    if (hasActiveChild) setIsExpanded(true);
  }, [hasActiveChild]);

  if (isParent) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-full flex items-center justify-between
            px-3 py-1.5 mx-1.5 mb-0.5
            rounded-md text-[12px] font-medium transition-colors
            ${hasActiveChild
              ? "text-blue-600 bg-blue-50"
              : "text-slate-600 hover:bg-slate-100"
            }
          `}
        >
          <span>{item.name}</span>
          <ChevronRightIcon className={`w-2.5 h-2.5 opacity-40 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
        </button>

        {isExpanded && (
          <div className="pl-2 space-y-0.5">
            {item.children?.map((child) => {
              const childItem: MenuItemProps = {
                name: child.name,
                href: "href" in child ? child.href : "#",
                children: "child_menus" in child
                  ? (child as SubmenuType).child_menus?.map((c) => ({
                      name: c.name,
                      href: c.href,
                      code: c.code,
                    }))
                  : undefined,
              };
              return <MenuItemComponent key={child.name} item={childItem} level={level + 1} />;
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      className={`
        flex items-center justify-between
        px-3 py-1.5 mx-1.5 mb-0.5
        rounded-md text-[12px] font-medium transition-colors
        ${isActive
          ? "bg-blue-600 text-white"
          : "text-slate-600 hover:bg-slate-100"
        }
        ${level > 0 ? "ml-3" : ""}
      `}
    >
      <span>{item.name}</span>
      {hasChildren && <ChevronRightIcon className="w-2.5 h-2.5 opacity-40" />}
    </Link>
  );
}

export function Sidebar() {
  const { menus, isLoading, error } = useMenus();

  return (
    <aside className="w-48 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-slate-100 dark:border-slate-700 h-[52px]">
        <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-[11px]">N</span>
        </div>
        <div>
          <div className="text-[12px] font-bold text-slate-800 dark:text-white leading-tight">NEXORA</div>
          <div className="text-[9px] text-slate-400 dark:text-slate-500 leading-tight">ERP SYSTEM</div>
        </div>
      </div>

      {/* Menu */}
      <nav 
          className="flex-1 py-2 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
        {isLoading && (
          <p className="px-3 py-2 text-[11px] text-slate-400">Loading menus...</p>
        )}
        {error && (
          <p className="px-3 py-2 text-[11px] text-red-400">Error: {error}</p>
        )}
        {!isLoading && menus.map((mainMenu) => {
          const item: MenuItemProps = {
            name: mainMenu.name,
            href: mainMenu.href || "#",
            children: mainMenu.submenus,
          };
          return <MenuItemComponent key={mainMenu.code} item={item} level={0} />;
        })}
      </nav>

      {/* System Info */}
      <div className="border-t border-slate-100 px-3 py-2.5">
        <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide mb-1">System Information</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-slate-400">Company</p>
            <p className="text-[11px] text-slate-600 font-medium">Nexora Solusi Indonesia</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-slate-400">Database</p>
            <p className="text-[11px] text-slate-600 font-medium">nexora_erp</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-slate-400">Version</p>
            <p className="text-[11px] text-slate-600 font-medium">v1.0.0</p>
          </div>
        </div>
        <p className="text-[9px] text-slate-300 mt-2">© 2026 Nexora ERP. All rights reserved.</p>
      </div>

    </aside>
  );
}