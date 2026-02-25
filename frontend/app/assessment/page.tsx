'use client';

import React, { useState } from 'react';
import { GraduationCap, Timer, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function AssessmentPage() {
    const [activeTab, setActiveTab] = useState('aptitude');

    const categories = [
        { id: 'aptitude', name: 'Aptitude', icon: GraduationCap },
        { id: 'verbal', name: 'Verbal', icon: CheckCircle2 },
        { id: 'logical', name: 'Logical', icon: Brain },
        { id: 'coding', name: 'Coding', icon: Code },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Assessments</h1>
                <p className="text-slate-400">Test your knowledge with category-wise mock tests.</p>
            </div>

            <div className="flex gap-4 border-b border-white/10 pb-4">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === cat.id
                                ? 'bg-primary/20 text-primary shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="glass p-8 rounded-3xl text-center space-y-6">
                <div className="w-20 h-20 primary-gradient rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl shadow-primary/20">
                    <Timer className="w-10 h-10" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">{activeTab} Mock Test</h2>
                    <p className="text-slate-400 max-w-md mx-auto">This test consists of 15 questions. You will have 20 minutes to complete it. Good luck!</p>
                </div>
                <div className="flex justify-center gap-8 text-sm">
                    <div className="text-slate-500">Questions: <span className="text-white font-bold">15</span></div>
                    <div className="text-slate-500">Duration: <span className="text-white font-bold">20m</span></div>
                    <div className="text-slate-500">Passing: <span className="text-white font-bold">60%</span></div>
                </div>
                <button className="px-8 py-3 primary-gradient text-white font-bold rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                    Start Assessment
                </button>
            </div>
        </div>
    );
}

const Brain = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 5 5 0 0 0 9.006-2M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.52 8.105 5 5 0 0 1-9.006-2M12 5V20M12 11h.01M12 15h.01M7 11h.01M17 11h.01M9 15h.01M15 15h.01" /></svg>;
const Code = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
