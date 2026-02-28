'use client';

import { useState } from 'react';
import { FileDown, RefreshCcw, Sparkles, User, Briefcase, GraduationCap, Code, FolderGit2, Award, ChevronRight, ChevronLeft, Copy, Printer } from 'lucide-react';
import API_BASE_URL from '../config/api';

const steps = [
  { label: 'Personal Info', icon: User },
  { label: 'Experience', icon: Briefcase },
  { label: 'Skills & Certs', icon: Code },
  { label: 'Education', icon: GraduationCap },
];

export default function ResumeBuilderPage() {
  const [step, setStep] = useState(0);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', linkedin: '',
    targetRole: '', careerObjective: '', summary: '',
    experience: '',
    skills: '', certifications: '', projects: '',
    education: '',
  });

  const update = (field: string, val: string) => setForm(prev => ({ ...prev, [field]: val }));

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/resume/build`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setGeneratedResume(data.resume);
      else alert(data.message || 'Failed to generate');
    } catch { alert('Connection error'); }
    finally { setLoading(false); }
  };

  const inputClass = "w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-sm";
  const labelClass = "block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2";

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-white/10 pb-8">
        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-xl">
          <FileDown className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">AI Resume Builder</h1>
          <p className="text-slate-400 mt-1">Fill in your details and let AI craft a polished, ATS-optimized resume.</p>
        </div>
        <div className="ml-auto px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> NVIDIA Powered
        </div>
      </div>

      {!generatedResume ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step Tracker */}
          <div className="space-y-3">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setStep(i)} className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${step === i ? 'bg-sky-500/10 border-sky-500/30 text-white' : i < step ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-white/5 bg-slate-900/30 text-slate-500'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${step === i ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : i < step ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-600'}`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Step {i + 1}</p>
                  <p className="font-semibold text-sm">{s.label}</p>
                </div>
                {i < step && <div className="ml-auto text-emerald-500 text-[10px] font-bold">✓ Done</div>}
              </button>
            ))}

            <button
              onClick={handleGenerate}
              disabled={loading || !form.name || !form.targetRole || !form.experience || !form.skills || !form.education}
              className="w-full py-5 rounded-2xl primary-gradient text-white font-bold flex items-center justify-center gap-3 mt-4 hover:scale-[1.02] transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-30"
            >
              {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {loading ? 'Building Resume...' : 'Generate My Resume'}
            </button>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-2 glass p-10 rounded-[2.5rem] border border-white/10 space-y-6">
            <div className="min-h-[400px]">
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><label className={labelClass}>Full Name *</label><input className={inputClass} placeholder="e.g. Ravi Kumar" value={form.name} onChange={e => update('name', e.target.value)} /></div>
                    <div><label className={labelClass}>Email</label><input className={inputClass} placeholder="email@domain.com" value={form.email} onChange={e => update('email', e.target.value)} /></div>
                    <div><label className={labelClass}>Phone</label><input className={inputClass} placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
                    <div><label className={labelClass}>LinkedIn URL</label><input className={inputClass} placeholder="linkedin.com/in/username" value={form.linkedin} onChange={e => update('linkedin', e.target.value)} /></div>
                    <div className="md:col-span-2"><label className={labelClass}>Target Job Role *</label><input className={inputClass} placeholder="e.g. Senior Backend Engineer" value={form.targetRole} onChange={e => update('targetRole', e.target.value)} /></div>
                    <div className="md:col-span-2"><label className={labelClass}>Career Objective (Essential for Freshers)</label><textarea className={`${inputClass} h-24 resize-none`} placeholder="A brief statement about your career goals..." value={form.careerObjective} onChange={e => update('careerObjective', e.target.value)} /></div>
                    <div className="md:col-span-2"><label className={labelClass}>Professional Summary (optional)</label><textarea className={`${inputClass} h-24 resize-none`} placeholder="An alternative profile summary..." value={form.summary} onChange={e => update('summary', e.target.value)} /></div>
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-white">Work Experience</h2>
                  <div>
                    <label className={labelClass}>Work Experience *</label>
                    <textarea className={`${inputClass} h-64 resize-none`} placeholder={`Describe your work history...`} value={form.experience} onChange={e => update('experience', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Projects (Optional)</label>
                    <textarea className={`${inputClass} h-28 resize-none`} value={form.projects} onChange={e => update('projects', e.target.value)} />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-white">Skills & Certifications</h2>
                  <div><label className={labelClass}>Technical & Soft Skills *</label><textarea className={`${inputClass} h-28 resize-none`} value={form.skills} onChange={e => update('skills', e.target.value)} /></div>
                  <div><label className={labelClass}>Certifications</label><textarea className={`${inputClass} h-24 resize-none`} value={form.certifications} onChange={e => update('certifications', e.target.value)} /></div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-white">Education</h2>
                  <div><label className={labelClass}>Education Details *</label><textarea className={`${inputClass} h-36 resize-none`} value={form.education} onChange={e => update('education', e.target.value)} /></div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 pt-4 border-t border-white/5">
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white disabled:opacity-0 transition-all font-medium">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={step === 3} className="flex items-center gap-2 px-8 py-3 rounded-xl primary-gradient text-white font-bold ml-auto hover:scale-[1.02] transition-all disabled:opacity-50">
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-500">
          <div className="space-y-4">
            <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-bold text-white">Your Resume</h3>
              <p className="text-xs text-slate-500">AI-crafted, ATS-optimized resume ready to use!</p>
              <div className="space-y-3">
                <button onClick={() => navigator.clipboard.writeText(generatedResume)} className="w-full py-3 rounded-xl bg-sky-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-sky-600 transition-all">
                  <Copy className="w-4 h-4" /> Copy Resume Text
                </button>
                <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition-all">
                  <Printer className="w-4 h-4" /> Print / Save as PDF
                </button>
                <button onClick={() => setGeneratedResume(null)} className="w-full py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm flex items-center justify-center gap-2 transition-all">
                  <RefreshCcw className="w-4 h-4" /> Start Over
                </button>
              </div>
            </div>
            <div className="glass p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-emerald-400 font-bold text-sm mb-1">✅ ATS Optimized</p>
              <p className="text-xs text-slate-400">This resume is structured to pass applicant tracking systems.</p>
            </div>
          </div>

          <div className="lg:col-span-2 glass p-10 rounded-[2.5rem] border border-sky-500/20 bg-sky-500/5 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="prose prose-invert max-w-none prose-h1:text-white prose-h2:text-sky-400 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white whitespace-pre-wrap text-sm leading-relaxed">
              {generatedResume}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
