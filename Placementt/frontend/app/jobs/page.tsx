'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs')
            .then(res => setJobs(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Job Board</h1>
                <p className="text-slate-400">Discover and apply to top opportunities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-2 text-center py-20 text-slate-500 italic">Finding opportunities...</div>
                ) : jobs.map((job) => (
                    <div key={job.id} className="glass p-6 rounded-2xl hover:border-primary/50 transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: job.color }}>
                                    {job.logo}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{job.title}</h3>
                                    <p className="text-slate-400">{job.company}</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{job.type}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <MapPin className="w-4 h-4" /> {job.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                                <DollarSign className="w-4 h-4" /> {job.salary}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Clock className="w-4 h-4" /> {job.posted}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {job.skills.map(skill => (
                                <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button className="flex-1 py-2 primary-gradient text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/20">
                                Apply Now
                            </button>
                            <button className="px-3 py-2 bg-white/5 text-slate-300 rounded-xl hover:bg-white/10 transition-colors">
                                Save
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
