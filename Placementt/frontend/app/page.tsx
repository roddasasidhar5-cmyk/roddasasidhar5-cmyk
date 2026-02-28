'use client';

import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  ChevronRight,
  Code,
  BookOpen,
  PieChart,
  Settings,
  ShieldAlert,
  LogOut,
  User,
  ExternalLink,
  BrainCircuit,
  Target,
  FileText
} from 'lucide-react';
import GlassCard from './components/ui/GlassCard';
import StatusBadge from './components/ui/StatusBadge';
import Button from './components/ui/Button';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-7xl mx-auto pb-12 px-4 md:px-0">
      {/* Top Section: Hero & Overall Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Banner */}
        <div className="lg:col-span-2 relative group">
          <GlassCard className="primary-gradient p-8 shadow-[0_20px_50px_rgba(99,102,241,0.3)] border-white/10 h-full" hoverEffect={true}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between h-full">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                    Welcome {user?.name || 'Demo'}
                    <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-white/20 animate-pulse" />
                  </h1>
                  <p className="text-white/70 font-medium">Email: {user?.email || 'userdemo@instacks.co'}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/80">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Organization</p>
                    <p className="text-sm font-bold">Demoaccess</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Batch</p>
                    <p className="text-sm font-bold">Demo Batch - 2028</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-60">ID No</p>
                    <p className="text-sm font-bold">73866</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="outline" size="sm" icon={<ShieldAlert className="w-3 h-3" />} className="bg-sky-400/10 border-sky-400/20 text-sky-100">
                    Reported Issues
                  </Button>
                  <Button variant="outline" size="sm" icon={<Settings className="w-3 h-3" />} className="bg-orange-500/10 border-orange-500/20 text-orange-100">
                    Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    icon={<LogOut className="w-3 h-3" />} 
                    className="bg-rose-500/10 border-rose-500/20 text-rose-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center opacity-20 transform hover:scale-110 transition-transform">
                 <BrainCircuit className="w-48 h-48 text-white rotate-12" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Overall Accuracy */}
        <GlassCard className="bg-slate-900/40 p-8 flex flex-col justify-center space-y-6" hoverEffect={false}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">Your Overall Accuracy</h2>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <PieChart className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <p className="text-6xl font-black text-white tracking-tighter">29<span className="text-2xl text-slate-500 ml-1">%</span></p>
              <TrendingUp className="text-emerald-400 w-8 h-8 mb-2" />
            </div>
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/5">
              <div className="h-full primary-gradient w-[29%] relative">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">Top 40% among batchmates</p>
          </div>
        </GlassCard>
      </div>

      {/* Middle Section: Activity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'AI Interview Lab', 
            icon: BrainCircuit, 
            metrics: { 'Mock Interviews': '8/20', 'Video Practice': '12/50', 'Feedback Score': '84%' }, 
            link: 'Recent Labs',
            color: 'border-t-primary'
          },
          { 
            title: 'Resume Tools', 
            icon: FileText, 
            metrics: { 'Analyzer Uses': '5/10', 'Builder Drafts': '2/5', 'ATS Score Avg': '78%' }, 
            link: 'Resume History',
            color: 'border-t-emerald-500'
          },
          { 
            title: 'Placement Assessments', 
            icon: Target, 
            metrics: { 'MCQ Tests': '4/15', 'Coding Labs': '2/10', 'Rank': '#42' }, 
            link: 'Recent Assessments',
            color: 'border-t-orange-500'
          },
        ].map((activity, idx) => (
          <GlassCard key={idx} className={`p-7 border-t-4 ${activity.color}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white text-lg tracking-tight">{activity.title}</h3>
              <activity.icon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
            </div>
            <div className="space-y-3 mb-6">
              {Object.entries(activity.metrics).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400 font-medium">{key}</span>
                  <span className="text-sm font-bold text-white">{val}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />} className="w-full justify-between px-0 hover:bg-transparent hover:gap-3 transition-all text-primary font-black uppercase tracking-widest text-[10px]">
              View {activity.link}
            </Button>
          </GlassCard>
        ))}
      </div>

      {/* Bottom Section: Accuracy Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MCQ Accuracy */}
        <GlassCard className="p-8 flex flex-col h-[500px]" hoverEffect={false}>
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold text-white">Subject Level Accuracy</h3>
             <div className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aptitude & Core</div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
            {[
              { label: 'System Design', score: 62, color: 'bg-emerald-500' },
              { label: 'Data Structures', score: 78, color: 'bg-emerald-500' },
              { label: 'Algorithms', score: 54, color: 'bg-orange-500' },
              { label: 'Quantitative Aptitude', score: 40, color: 'bg-rose-500' },
              { label: 'Reasoning Aptitude', score: 68, color: 'bg-emerald-500' },
              { label: 'Operating Systems', score: 45, color: 'bg-orange-500' },
              { label: 'DBMS', score: 32, color: 'bg-rose-500' },
            ].map((subject, idx) => (
              <div key={idx} className="space-y-3 group cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors flex items-center gap-2">
                    {subject.label}
                    <ExternalLink className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-sm font-black text-white">{subject.score}%</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                   <div 
                    className={`h-full ${subject.color} rounded-full transition-all duration-1000`} 
                    style={{ width: `${subject.score}%` }} 
                   />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Coding Accuracy */}
        <GlassCard className="p-8 flex flex-col h-[500px]" hoverEffect={false}>
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold text-white">Programming Performance</h3>
             <Code className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="space-y-8">
            {[
              { lang: 'Python', q: 12, sub: 15, test: 85, score: 92, color: 'bg-emerald-500' },
              { lang: 'Java', q: 8, sub: 12, test: 45, score: 72, color: 'bg-emerald-500' },
              { lang: 'C++', q: 6, sub: 10, test: 30, score: 58, color: 'bg-orange-500' },
            ].map((code, idx) => (
              <GlassCard key={idx} className="bg-white/5 p-6 space-y-4 hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold text-white">{code.lang}</h4>
                  <span className="text-xl font-black text-white">{code.score}%</span>
                </div>
                <div className="flex gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <span>Questions Solved: {code.q}</span>
                  <span>Avg TestCasesPassed: {code.score}%</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={`h-full ${code.color} rounded-full transition-all duration-1000`} 
                    style={{ width: `${code.score}%` }} 
                  />
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="mt-auto p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
             <div className="p-2 bg-emerald-500 rounded-lg text-white">
                <TrendingUp className="w-4 h-4" />
             </div>
             <p className="text-xs text-emerald-100 font-medium">Your Python skills are in the top <span className="font-bold">5%</span> of developers nationwide!</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
