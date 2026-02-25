'use client';

import React, { useState } from 'react';
import { Youtube, Play, ExternalLink } from 'lucide-react';

const videos = [
    { title: 'Data Structures & Algorithms Complete Course', channel: 'freeCodeCamp', views: '2.1M', duration: '12:30:00', category: 'DSA', thumb: '📊' },
    { title: 'React.js Full Tutorial for Beginners', channel: 'Traversy Media', views: '1.8M', duration: '4:15:00', category: 'Web Dev', thumb: '⚛️' },
    { title: 'Machine Learning A-Z™', channel: 'Krish Naik', views: '900K', duration: '8:45:00', category: 'Machine Learning', thumb: '🤖' },
    { title: 'System Design Interview Masterclass', channel: 'Gaurav Sen', views: '1.2M', duration: '3:20:00', category: 'System Design', thumb: '🏗️' },
    { title: 'JavaScript Interview Questions', channel: 'Akshay Saini', views: '3.4M', duration: '2:45:00', category: 'Interview Prep', thumb: '💡' },
];

export default function LearningPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Learning Resources</h1>
                    <p className="text-slate-400">Curated videos and courses to sharpen your skills.</p>
                </div>
                <button className="px-4 py-2 bg-rose-500/10 text-rose-500 rounded-xl font-bold flex items-center gap-2 hover:bg-rose-500/20 transition-colors">
                    <Youtube className="w-5 h-5" /> Browse YouTube
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((v, i) => (
                    <div key={i} className="glass rounded-2xl overflow-hidden group">
                        <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
                            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{v.thumb}</span>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                                    <Play className="w-6 h-6 fill-current" />
                                </div>
                            </div>
                            <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-[10px] text-white font-medium">{v.duration}</span>
                        </div>
                        <div className="p-4">
                            <h3 className="text-white font-bold mb-1 hover:text-primary transition-colors cursor-pointer line-clamp-2">{v.title}</h3>
                            <p className="text-xs text-slate-500 mb-3">{v.channel} • {v.views} views</p>
                            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold rounded uppercase tracking-wider">{v.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
