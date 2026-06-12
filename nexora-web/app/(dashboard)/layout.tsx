"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/lib/ProtectedRoute";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MenuProvider } from "@/lib/MenuContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const breadcrumbRoutes = [
    { path: "/dashboard/master-data/users", title: "Users", subtitle: "Master Data › System › Users" },
    { path: "/dashboard/master-data/roles", title: "Roles", subtitle: "Master Data › System › Roles" },
    { path: "/dashboard/master-data/position", title: "Position", subtitle: "Master Data › Human Resource › Position" },
  ];

  const currentRoute = breadcrumbRoutes.find((route) => pathname?.includes(route.path));
  const title = currentRoute?.title ?? "Dashboard";
  const subtitle = currentRoute?.subtitle ?? "Master Data";

  return (
    <ProtectedRoute>
      <MenuProvider>
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
      </MenuProvider>
    </ProtectedRoute>
  );
}
