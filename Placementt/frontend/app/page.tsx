'use client';

import React from 'react';
import {
  TrendingUp,
  Users,
  Clock,
  Calendar,
  ChevronRight,
  Target,
  Briefcase
} from 'lucide-react';

const stats = [
  { label: 'Jobs Applied', value: '47', icon: Briefcase, color: 'text-emerald-400' },
  { label: 'Tests Taken', value: '23', icon: Target, color: 'text-blue-400' },
  { label: 'Interviews', value: '12', icon: Users, color: 'text-purple-400' },
  { label: 'Avg Score', value: '82%', icon: TrendingUp, color: 'text-orange-400' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back, Sasidhar! Here's your placement preparation overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-500 font-medium">+12% vs last month</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
              {stat.value}
            </h3>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recommended Jobs</h2>
              <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-white font-bold group-hover:primary-gradient transition-all">
                    {i === 1 ? 'G' : i === 2 ? 'M' : 'A'}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Software Engineer</h4>
                    <p className="text-sm text-slate-500">{i === 1 ? 'Google' : i === 2 ? 'Microsoft' : 'Amazon'} • Bangalore</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-medium">25-35 LPA</p>
                    <p className="text-xs text-slate-500">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Google Interview', date: 'Feb 28, 10:00 AM', type: 'Interview' },
                { title: 'Mock Test - DSA', date: 'March 2, 02:00 PM', type: 'Assessment' },
              ].map((event) => (
                <div key={event.title} className="p-3 rounded-lg bg-white/5 space-y-1 hover:bg-white/10 transition-colors border-l-2 border-primary">
                  <h4 className="text-sm font-medium text-white">{event.title}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{event.type} • {event.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              AI Insights
            </h2>
            <div className="space-y-4">
               <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <p className="text-xs text-slate-400 mb-1">Resume Strength</p>
                  <div className="flex items-center gap-3">
                     <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[78%]" />
                     </div>
                     <span className="text-xs font-bold text-white">78%</span>
                  </div>
               </div>
               <p className="text-[10px] text-slate-500 leading-relaxed italic">
                 "Your interview performance in DSA is improving. Focus on Graph algorithms for the Google interview."
               </p>
            </div>
          </div>

          <div className="primary-gradient p-6 rounded-2xl text-white shadow-[0_20px_40px_rgba(99,102,241,0.3)]">
            <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
            <p className="text-sm text-white/80 mb-4">Get unlimited mock interviews and advanced proctoring reports.</p>
            <button className="w-full py-2 bg-white text-primary rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
