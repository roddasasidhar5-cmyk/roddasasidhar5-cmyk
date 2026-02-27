'use client';

import React, { useState } from 'react';
import { Youtube, Play, ExternalLink, Sparkles, Map, ArrowRight, RefreshCcw, BookOpen, Clock, Target } from 'lucide-react';

const initialVideos = [
    { title: 'Data Structures & Algorithms Complete Course', channel: 'freeCodeCamp', views: '2.1M', duration: '12:30:00', category: 'DSA', thumb: '📊' },
    { title: 'React.js Full Tutorial for Beginners', channel: 'Traversy Media', views: '1.8M', duration: '4:15:00', category: 'Web Dev', thumb: '⚛️' },
    { title: 'Machine Learning A-Z™', channel: 'Krish Naik', views: '900K', duration: '8:45:00', category: 'Machine Learning', thumb: '🤖' },
    { title: 'System Design Interview Masterclass', channel: 'Gaurav Sen', views: '1.2M', duration: '3:20:00', category: 'System Design', thumb: '🏗️' },
    { title: 'JavaScript Interview Questions', channel: 'Akshay Saini', views: '3.4M', duration: '2:45:00', category: 'Interview Prep', thumb: '💡' },
];

export default function LearningPage() {
    const [goal, setGoal] = useState('');
    const [roadmap, setRoadmap] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateRoadmap = async () => {
        if (!goal.trim()) return;
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5001/api/ai/roadmap/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ goal }),
            });
            const data = await res.json();
            if (res.ok) {
                setRoadmap(data.roadmap);
            } else {
                alert('Failed to generate roadmap');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/10">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">Learning Hub</h1>
                        <p className="text-slate-400 mt-1">Master new skills with AI-powered roadmaps and curated content.</p>
                    </div>
                </div>
            </div>

            {/* AI Roadmap Generator Section */}
            <div className="glass p-1 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10">
                <div className="p-8 md:p-12 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">NV</div>
                           <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                        </div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                           AI Learning Shortcut
                           <Sparkles className="w-5 h-5 text-yellow-500" />
                        </h2>
                    </div>

                    {!roadmap ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold text-white leading-tight">
                                    Where do you want to be in <span className="text-indigo-400">6 months?</span>
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Tell us your dream role (e.g., "Full Stack Dev", "Quant Trader", "DevOps Engineer"), and our NVIDIA-powered AI will build a step-by-step master plan for you.
                                </p>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={goal}
                                        onChange={(e) => setGoal(e.target.value)}
                                        placeholder="e.g. Senior Frontend Architect"
                                        className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-lg shadow-inner"
                                    />
                                    <button
                                        onClick={generateRoadmap}
                                        disabled={loading || !goal.trim()}
                                        className="absolute right-2 top-2 bottom-2 px-6 rounded-xl primary-gradient text-white font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                                        Generate
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Data Scientist', 'iOS Developer', 'Cloud Architect'].map(t => (
                                        <button 
                                            key={t}
                                            onClick={() => setGoal(t)}
                                            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 hover:text-indigo-400 hover:border-indigo-400/30 transition-all uppercase tracking-widest"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 space-y-2">
                                    <Target className="w-6 h-6 text-indigo-400" />
                                    <p className="text-white font-bold">Goal Oriented</p>
                                    <p className="text-xs text-slate-500">Tailored to your specific career aspirations.</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 space-y-2">
                                    <Clock className="w-6 h-6 text-purple-400" />
                                    <p className="text-white font-bold">Phase Based</p>
                                    <p className="text-xs text-slate-500">Logical progression from zero to hero.</p>
                                </div>
                                <div className="col-span-2 p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                                        <Map className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Resource Mapping</p>
                                        <p className="text-xs text-slate-500">Links to best learning materials for each topic.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in zoom-in-95 duration-500">
                             <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Map className="w-6 h-6 text-indigo-400" />
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">{goal} Roadmap</h3>
                                </div>
                                <button 
                                    onClick={() => setRoadmap(null)}
                                    className="text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors"
                                >
                                    <RefreshCcw className="w-4 h-4" /> Reset
                                </button>
                             </div>
                             <div className="glass p-8 rounded-[2.5rem] border border-indigo-500/30 bg-slate-900/40 shadow-inner">
                                <div className="prose prose-invert max-w-none 
                                    prose-h1:text-indigo-400 prose-h2:text-white prose-h2:mt-8 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2
                                    prose-p:text-slate-300 prose-p:leading-relaxed 
                                    prose-li:text-slate-300 prose-strong:text-indigo-400
                                    whitespace-pre-wrap">
                                    {roadmap}
                                </div>
                             </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Library Section */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Youtube className="w-6 h-6 text-rose-500" />
                        Curated Video Library
                    </h2>
                    <div className="flex gap-2">
                        {['All', 'Web Dev', 'DSA', 'AI'].map(f => (
                            <button key={f} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${f === 'All' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {initialVideos.map((v, i) => (
                        <div key={i} className="glass rounded-[2rem] overflow-hidden group border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
                            <div className="aspect-[16/9] bg-slate-950 flex items-center justify-center relative">
                                <span className="text-6xl group-hover:scale-125 transition-transform duration-700 pointer-events-none opacity-50">{v.thumb}</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                                <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform shadow-2xl">
                                        <Play className="w-6 h-6 fill-current text-indigo-400" />
                                    </div>
                                </div>
                                <span className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 backdrop-blur-md rounded-lg text-[10px] text-white font-black tracking-widest">{v.duration}</span>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{v.category}</p>
                                    <h3 className="text-white font-bold leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2">{v.title}</h3>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                            {v.channel[0]}
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-medium">{v.channel}</p>
                                    </div>
                                    <button className="text-indigo-400 hover:text-white transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
