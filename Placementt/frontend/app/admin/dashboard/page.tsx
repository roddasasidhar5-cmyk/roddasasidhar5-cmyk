'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Users, 
  Briefcase, 
  Activity, 
  ShieldCheck, 
  LogOut, 
  Search, 
  Filter,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  User as UserIcon,
  CheckCircle2,
  Clock
} from 'lucide-react';

import API_BASE_URL from '../../config/api';
import GlassCard from '../../components/ui/GlassCard';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setUser(parsedUser);
    fetchApplications(token);
  }, [router]);

  const fetchApplications = async (token: string) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/jobs/admin/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <nav className="border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl bg-slate-900/50">
        <GlassCard className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between border-none rounded-none bg-transparent" hoverEffect={false}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">A</div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight uppercase">Admin Control</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Placement Management</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
               <span className="text-sm font-bold text-slate-300">{user.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<LogOut className="w-5 h-5" />}
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 px-2.5"
            />
          </div>
        </GlassCard>
      </nav>

      <div className="flex-1 max-w-[1600px] mx-auto w-full px-6 py-8 flex gap-8">
        {/* Modern Sidebar */}
        <aside className="w-72 flex-shrink-0 hidden lg:block space-y-6">
          <GlassCard className="p-4 bg-slate-900/40">
            <p className="px-4 text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Core Management</p>
            <nav className="space-y-1">
              {[
                { label: 'Overview', icon: Activity, active: true },
                { label: 'Manage Users', icon: Users },
                { label: 'Job Listings', icon: Briefcase },
                { label: 'Assessments', icon: ShieldCheck },
              ].map((item, idx) => (
                <button key={idx} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${item.active ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'}`}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </GlassCard>

          <div className="primary-gradient p-6 rounded-[2rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-10 transform scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-700">
               <ShieldCheck className="w-32 h-32" />
            </div>
            <h3 className="text-lg font-black mb-2">System Pro</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4 font-medium">Access advanced analytics and proctoring controls.</p>
            <button className="w-full py-2.5 bg-white text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors">Upgrade Now</button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8 min-w-0">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Applicants', value: applications.length, icon: UserIcon, color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { label: 'Active Openings', value: '12', icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { label: 'Review Required', value: applications.filter((a: any) => a.status === 'pending').length, icon: Clock, color: 'text-orange-400', bg: 'bg-orange-400/10' },
            ].map((stat, idx) => (
              <GlassCard key={idx} className="p-6 bg-slate-900/40 flex items-center justify-between border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon className="w-7 h-7" />
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Job Applications Table */}
          <GlassCard className="bg-slate-900/40 overflow-hidden flex flex-col border-white/5" hoverEffect={false}>
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Recent Job Applications</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Real-time tracking of candidate submissions</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="Search candidates..." className="bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all w-64" />
                </div>
                <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all"><Filter className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02]">
                    <th className="px-8 py-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Candidate</th>
                    <th className="px-8 py-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Applied For</th>
                    <th className="px-8 py-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Date</th>
                    <th className="px-8 py-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] text-slate-500 font-black uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                           <Skeleton className="w-64 h-4 mx-auto" count={3} />
                           <p className="text-slate-500 font-medium text-xs">Synchronizing with recruiter database...</p>
                        </div>
                      </td>
                    </tr>
                  ) : applications.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center grayscale opacity-30">
                          <Activity className="w-12 h-12 mb-4" />
                          <p className="text-sm font-bold">No applications found in the system</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    applications.map((app: any) => (
                      <tr key={app._id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-black text-slate-300">
                               {app.user?.name?.[0].toUpperCase()}
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{app.user?.name}</p>
                              <p className="text-[10px] text-slate-500 font-medium">{app.user?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: app.job?.color || '#333' }}>
                                 {app.job?.logo}
                              </div>
                              <div className="space-y-0.5">
                                 <p className="text-sm font-bold text-slate-200">{app.job?.title}</p>
                                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{app.job?.company}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-xs text-slate-400 font-medium tracking-tight">
                           {new Date(app.appliedAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6">
                           <StatusBadge status={app.status} />
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-2">
                             <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-primary transition-all"><ExternalLink className="w-4 h-4" /></button>
                             <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"><MoreVertical className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
               <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Showing {applications.length} latest candidates</p>
               <Button variant="ghost" size="sm" icon={<ChevronRight className="w-3 h-3" />} className="px-0 hover:bg-transparent text-primary font-black uppercase tracking-widest text-[10px]">
                 View Historical Logs
               </Button>
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
}
