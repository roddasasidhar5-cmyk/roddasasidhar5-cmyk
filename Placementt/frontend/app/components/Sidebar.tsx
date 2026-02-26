'use client';

import React from 'react';
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
    GraduationCap
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    {
        group: 'Overview', items: [
            { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
            { label: 'Job Board', icon: Briefcase, href: '/jobs' },
        ]
    },
    {
        group: 'AI Interview', items: [
            { label: 'Mock Interview', icon: MessageSquare, href: '/interview' },
        ]
    },
    {
        group: 'Assessments', items: [
            { label: 'Mock Test', icon: GraduationCap, href: '/assessment' },
            { label: 'AI Proctoring', icon: ShieldCheck, href: '/proctoring' },
        ]
    },
    {
        group: 'Learning', items: [
            { label: 'Videos', icon: Youtube, href: '/learning' },
        ]
    },
    {
        group: 'General', items: [
            { label: 'Profile', icon: User, href: '/profile' },
            { label: 'Admin', icon: Settings, href: '/admin' },
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 glass border-r hidden md:flex flex-col h-screen fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    P
                </div>
                <div>
                    <h1 className="font-bold text-white text-lg leading-tight">PlaceAI</h1>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Assistant</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-2 space-y-6 overflow-y-auto custom-scrollbar">
                {navItems.map((group) => (
                    <div key={group.group}>
                        <h2 className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                            {group.group}
                        </h2>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-sm",
                                            isActive
                                                ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "group-hover:text-white")} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800/50">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-medium">
                        SR
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Sasidhar R.</p>
                        <p className="text-xs text-slate-500 truncate">Student</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
