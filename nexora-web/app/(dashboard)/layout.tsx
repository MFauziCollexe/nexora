"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/lib/ProtectedRoute";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MenuProvider, useMenus } from "@/lib/MenuContext";
import { MainMenuType } from "@/lib/menuApi";

function findMenuBreadcrumb(
  menus: MainMenuType[],
  pathname: string
): { title: string; subtitle: string } | null {
  const matches: Array<{ title: string; subtitle: string; href: string }> = [];

  function pathMatches(href: string): boolean {
    return pathname === href || pathname.startsWith(href + "/");
  }

  for (const main of menus) {
    for (const sub of main.submenus || []) {
      for (const child of sub.child_menus || []) {
        if (pathMatches(child.href)) {
          matches.push({ title: child.name, subtitle: main.name, href: child.href });
        }
      }
      if (sub.href && sub.href !== "#" && sub.href !== "null" && pathMatches(sub.href)) {
        matches.push({ title: sub.name, subtitle: main.name, href: sub.href });
      }
    }
    if (main.href && main.href !== "#" && main.href !== "null" && pathMatches(main.href)) {
      matches.push({ title: main.name, subtitle: "", href: main.href });
    }
  }

  matches.sort((a, b) => b.href.length - a.href.length);

  return matches.length > 0
    ? { title: matches[0].title, subtitle: matches[0].subtitle }
    : null;
}

function DashboardContent({ children, pathname }: { children: ReactNode; pathname: string }) {
  const { menus } = useMenus();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const breadcrumb = findMenuBreadcrumb(menus, pathname);
  const title = breadcrumb?.title ?? "Dashboard";
  const subtitle = breadcrumb?.subtitle ?? "";

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={title}
          subtitle={subtitle}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ProtectedRoute>
      <MenuProvider>
        <DashboardContent pathname={pathname}>
          {children}
        </DashboardContent>
      </MenuProvider>
    </ProtectedRoute>
  );
}
