'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const isAuthPage = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      if (!isAuthPage) {
        router.push('/login');
      } else {
        setAuthorized(true);
      }
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const isAdminRoute = pathname.startsWith('/admin');

      if (user.role === 'admin') {
        // Technically an admin can see the normal site or we can restrict them to /admin only.
        // If we strictly segregate, we bounce them from normal routes (like /dashboard) to /admin/dashboard
        if (!isAdminRoute && pathname !== '/admin/dashboard' && pathname !== '/') {
            // Optional strict segregation: force admin into admin space
            // router.push('/admin/dashboard'); 
        }
        setAuthorized(true);
      } else {
        // user.role === 'user'
        if (isAdminRoute) {
          // Strictly protect /admin routes from regular users
          router.push('/');
        } else {
          setAuthorized(true);
        }
      }

      // If they are logged in and try to visit /login, bounce them to their dashboard
      if (isAuthPage) {
        if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }

    } catch (e) {
      // Invalid user JSON
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }

  }, [pathname, router, isAuthPage]);

  // Prevent flash of authenticated content or unauthorized content during hydration/checks
  if (!mounted || (!authorized && !isAuthPage)) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
         <div className="w-8 h-8 rounded-full border-t-2 border-[#6366f1] animate-spin"></div>
      </div>
    );
  }

  // Hide sidebar on Auth Pages
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-slate-200 flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0b] text-slate-200">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 md:p-8 relative z-0">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
