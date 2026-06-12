"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/lib/ProtectedRoute";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MenuProvider } from "@/lib/MenuContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <MenuProvider>
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
          <Sidebar />

          <div className="flex-1 flex flex-col min-w-0">
            <Header
              title="Users"
              subtitle="Master Data › System › Users"
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
