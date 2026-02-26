'use client';

import React from 'react';
import { User, Mail, Shield, BookOpen, Save, Camera } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Student Profile</h1>
                <p className="text-slate-400">Manage your personal information and academic records.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-8 rounded-3xl text-center">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl text-slate-400 font-bold border-4 border-primary/20">
                                SR
                            </div>
                            <button className="absolute bottom-1 right-1 p-2 primary-gradient rounded-full text-white shadow-lg shadow-primary/20">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-white">Sasidhar Rodda</h2>
                        <p className="text-sm text-slate-500 mb-6">B.Tech - Computer Science</p>
                        <div className="flex justify-center gap-2">
                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded">PLACEMENT READY</span>
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
                                <span className="text-slate-400">Identity Proof</span>
                                <span className="text-rose-400 font-bold">PENDING</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-8 rounded-3xl space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" defaultValue="Sasidhar Rodda" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" defaultValue="sasidhar@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">University</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" defaultValue="Placement University" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end">
                            <button className="flex items-center gap-2 px-6 py-3 primary-gradient text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-lg font-bold text-white mb-6">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Next.js', 'Node.js', 'Python', 'Clarity', 'System Design', 'Communication'].map(skill => (
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
