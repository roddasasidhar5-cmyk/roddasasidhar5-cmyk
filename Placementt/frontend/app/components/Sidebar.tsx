'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    ShieldCheck,
    Youtube,
    Settings,
    User,
    GraduationCap,
    Users,
    LogOut,
    Bot,
    FileText,
    Video,
    Zap,
    Activity,
    FileDown,
    ScanLine,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const userNavItems = [
    {
        group: 'Overview', items: [
            { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
            { label: 'Job Board', icon: Briefcase, href: '/jobs' },
        ]
    },
    {
        group: 'AI Interview Lab', items: [
            { label: 'AI Mock Interview', icon: MessageSquare, href: '/interview' },
            { label: 'Video Practice', icon: Video, href: '/video-practice' },
            { label: 'Realtime Feedback', icon: Zap, href: '/feedback' },
            { label: 'Sentiment Analysis', icon: Activity, href: '/sentiment' },
        ]
    },
    {
        group: 'Resume Tools', items: [
            { label: 'Resume Analyzer', icon: FileText, href: '/resume' },
            { label: 'Resume Builder', icon: FileDown, href: '/resume-builder' },
            { label: 'ATS Score', icon: ScanLine, href: '/ats-score' },
        ]
    },
    {
        group: 'Learn & Assess', items: [
            { label: 'Mock Test', icon: GraduationCap, href: '/assessment' },
            { label: 'Learning Hub', icon: Youtube, href: '/learning' },
            { label: 'Career Assistant', icon: Bot, href: '/assistant' },
        ]
    },
    {
        group: 'General', items: [
            { label: 'Profile', icon: User, href: '/profile' },
        ]
    }
];

const adminNavItems = [
    {
        group: 'Management', items: [
            { label: 'Admin Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
            { label: 'Manage Users', icon: Users, href: '/admin/users' },
            { label: 'Manage Jobs', icon: Briefcase, href: '/admin/jobs' },
            { label: 'Manage Assessments', icon: ShieldCheck, href: '/admin/assessments' },
        ]
    },
    {
        group: 'Settings', items: [
            { label: 'Settings', icon: Settings, href: '/admin/settings' },
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    if (!mounted) return null;

    const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;
    const initials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

    return (
        <aside className="w-64 glass border-r hidden md:flex flex-col h-screen fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    P
                </div>
                <div>
                    <h1 className="font-bold text-white text-lg leading-tight">PlaceAI</h1>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {user?.role === 'admin' ? 'Admin Portal' : 'AI Career Suite'}
                    </p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-2 space-y-5 overflow-y-auto custom-scrollbar">
                {navItems.map((group) => (
                    <div key={group.group}>
                        <h2 className="px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2">
                            {group.group}
                        </h2>
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm",
                                            isActive
                                                ? "bg-primary/15 text-primary shadow-[0_0_20px_rgba(99,102,241,0.15)] border border-primary/20"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-primary" : "group-hover:text-white")} />
                                        <span className="truncate">{item.label}</span>
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto shrink-0" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800/50 flex items-center justify-between">
                <Link href={user?.role === 'admin' ? '/admin/profile' : '/profile'} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group flex-1">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs border border-white/10 group-hover:border-primary/50 transition-colors">
                        {initials}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{user?.name || 'Loading...'}</p>
                        <p className="text-[10px] text-slate-500 truncate capitalize">{user?.role || 'User'}</p>
                    </div>
                </Link>
                <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    title="Logout"
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
        </aside>
    );
}
