'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, MapPin, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import API_BASE_URL from '../config/api';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/jobs`);
            setJobs(res.data);
        } catch (err) {
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to apply for jobs');
            return;
        }

        setApplying(jobId);
        try {
            await axios.post(
                `${API_BASE_URL}/jobs/apply`,
                { jobId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Application submitted successfully!');
            // Refresh jobs or update local state if needed
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error submitting application');
        } finally {
            setApplying(null);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Job Board</h1>
                    <p className="text-slate-400">Discover and apply to top opportunities matching your AI profile.</p>
                </div>
                <div className="hidden md:block px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Active Status</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Open for Applications
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {loading ? (
                    <div className="col-span-full py-20 flex flex-col items-center">
                        <Skeleton className="w-[450px] h-[250px] rounded-[2rem]" count={2} />
                        <p className="text-slate-500 font-medium text-xs mt-8">Finding opportunities tailored for you...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <GlassCard className="col-span-full p-20 text-center" hoverEffect={false}>
                        <Briefcase className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
                        <p className="text-slate-500">Check back later for new opportunities.</p>
                    </GlassCard>
                ) : jobs.map((job: any) => (
                    <GlassCard key={job._id} className="p-7 flex flex-col h-full border-white/5">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex gap-5">
                                <div className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-white font-black text-2xl shadow-lg transform group-hover:scale-110 transition-transform" style={{ backgroundColor: job.color || '#primary' }}>
                                    {job.logo}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">{job.title}</h3>
                                    <p className="text-slate-500 font-semibold">{job.company}</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full">{job.type}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 mb-8">
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                <MapPin className="w-3.5 h-3.5 text-slate-600" /> {job.location}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-emerald-400 font-black tracking-tight">
                                <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-tight">
                                <Clock className="w-3.5 h-3.5 text-slate-600" /> {job.posted}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                            {job.skills?.map((skill: string) => (
                                <span key={skill} className="px-2.5 py-1 bg-primary/5 border border-primary/20 rounded-lg text-[10px] font-bold text-primary/80">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <Button 
                                variant="primary"
                                size="md"
                                onClick={() => handleApply(job._id)}
                                loading={applying === job._id}
                                className="flex-1"
                            >
                                Apply Now
                            </Button>
                            <Button 
                                variant="outline" 
                                size="md" 
                                className="flex-1 bg-white/5 border-white/10 text-slate-400 hover:text-white"
                                onClick={() => window.location.href = `/interview?role=${encodeURIComponent(job.title)}`}
                            >
                                Practice Interview
                            </Button>
                            <Button variant="ghost" size="md" className="p-3 bg-white/5 border-white/10 text-slate-400 hover:text-white">
                                <CheckCircle className="w-4 h-4" />
                            </Button>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
