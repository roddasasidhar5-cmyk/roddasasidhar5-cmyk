'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    
    // Strict admin check
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setUser(parsedUser);
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 uppercase tracking-wider">
                Admin Control
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Admin: {user.name}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  router.push('/login');
                }}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex gap-8">
        
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 hidden md:block">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
             <div className="p-4 border-b border-gray-100 dark:border-gray-700">
               <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Management</h2>
             </div>
             <nav className="p-2 space-y-1">
               <a href="#" className="bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-white group flex items-center px-4 py-3 text-sm font-medium rounded-xl">
                 Overview
               </a>
               <a href="#" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:text-gray-900 dark:hover:text-white group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors">
                 Manage Users
               </a>
               <a href="#" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:text-gray-900 dark:hover:text-white group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors">
                 Manage Jobs
               </a>
               <a href="#" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:text-gray-900 dark:hover:text-white group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors">
                 Manage Assessments
               </a>
             </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-bold mt-2">1,248</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Jobs</p>
                <p className="text-3xl font-bold mt-2">42</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</p>
                <p className="text-xl font-bold mt-2 text-green-500">Healthy</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                Add New Job Listing
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                Review Pending Approvals
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
