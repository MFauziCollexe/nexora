"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/modules/auth/services/authService";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin">
        <div className="h-8 w-8 rounded-full border-4 border-slate-300 border-t-violet-600"></div>
      </div>
    </div>
  );
}
