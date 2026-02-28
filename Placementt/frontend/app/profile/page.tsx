'use client';

import React, { useEffect, useState } from 'react';
import { User, Mail, Shield, BookOpen, Save, Camera, GraduationCap, Hash, Calendar } from 'lucide-react';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!mounted || !user) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="w-8 h-8 rounded-full border-t-2 border-[#6366f1] animate-spin"></div>
        </div>
    );

    const initials = user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Student Profile</h1>
                <p className="text-slate-400">Your personal information and academic records.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-8 rounded-3xl text-center">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="w-full h-full rounded-full primary-gradient flex items-center justify-center text-4xl text-white font-bold border-4 border-primary/20 shadow-lg shadow-indigo-500/30">
                                {initials}
                            </div>
                            <button className="absolute bottom-1 right-1 p-2 bg-slate-800 rounded-full text-white shadow-lg border border-white/10">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-white">{user.name}</h2>
                        <p className="text-sm text-slate-500 mb-2">{user.email}</p>
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-4">{user.role}</p>
                        <div className="flex justify-center gap-2">
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20">PLACEMENT READY</span>
                        </div>
                    </div>

                    <div className="glass p-6 rounded-3xl">
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" /> Verification
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">Email Verified</span>
                                <span className="text-emerald-400 font-bold">YES</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">College Verified</span>
                                <span className={user.collegeName ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{user.collegeName ? 'YES' : 'PENDING'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h3 className="text-lg font-bold text-white mb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" defaultValue={user.name} readOnly />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" defaultValue={user.email} readOnly />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">College / University</label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" defaultValue={user.collegeName || 'Not provided'} readOnly />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Roll Number</label>
                                <div className="relative">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" defaultValue={user.rollNumber || 'Not provided'} readOnly />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Passed Out Year</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" defaultValue={user.passedOutYear || 'Not provided'} readOnly />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Account Type</label>
                                <div className="relative">
                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm capitalize" defaultValue={user.role} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-lg font-bold text-white mb-6">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Next.js', 'Node.js', 'Python', 'MongoDB', 'System Design', 'Communication'].map(skill => (
                                <div key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:bg-white/10 transition-colors cursor-default">
                                    {skill}
                                </div>
                            ))}
                            <button className="px-4 py-2 border border-dashed border-primary/40 text-primary text-sm font-medium rounded-xl hover:bg-primary/10 transition-colors">+ Add Skill</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
