'use client';

import React from 'react';
import { MessageSquare, Video, Mic, Brain } from 'lucide-react';

export default function InterviewPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">AI Interview Simulator</h1>
                <p className="text-slate-400">Practice your interview skills with our advanced AI trainer.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass rounded-3xl overflow-hidden aspect-video flex flex-col items-center justify-center relative bg-slate-900 border-2 border-primary/20">
                    <Video className="w-20 h-20 text-slate-700 mb-4" />
                    <p className="text-slate-500">Camera Preview (Demo Only)</p>
                    <div className="absolute top-4 left-4 bg-rose-500/80 text-white text-[10px] px-2 py-1 rounded font-bold animate-pulse">REC</div>
                </div>

                <div className="glass rounded-3xl p-8 flex flex-col">
                    <div className="flex-1 space-y-4 mb-6">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center text-xs text-white">AI</div>
                            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 max-w-[80%]">
                                <p className="text-sm text-slate-200">Welcome! I'll be your interviewer today. Tell me about yourself and your background in software development.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <input className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary transition-colors text-sm" placeholder="Type your response..." />
                        <button className="p-3 primary-gradient rounded-2xl text-white shadow-lg shadow-primary/20">
                            <Mic className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Tone Analysis', icon: Mic, value: 'Professional', color: 'text-blue-400' },
                    { label: 'Emotion', icon: Brain, value: 'Confident', color: 'text-emerald-400' },
                    { label: 'Clarity', icon: MessageSquare, value: '88%', color: 'text-purple-400' },
                ].map(stat => (
                    <div key={stat.label} className="glass p-6 rounded-2xl flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-lg font-bold text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
