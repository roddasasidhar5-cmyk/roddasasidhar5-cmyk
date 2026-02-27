'use client';

import { useState } from 'react';
import { ScanLine, RefreshCcw, Sparkles, CheckCircle, XCircle, Target, Lightbulb, BarChart3 } from 'lucide-react';

type ATSResult = {
  ats_score: number;
  verdict: string;
  matched_keywords: string[];
  missing_keywords: string[];
  section_scores: {
    skills_match: number;
    experience_relevance: number;
    education_match: number;
    keyword_density: number;
  };
  recommendations: string[];
  summary: string;
};

const verdictColors: Record<string, string> = {
  'Excellent Match': 'text-emerald-400',
  'Good Match': 'text-sky-400',
  'Moderate Match': 'text-yellow-400',
  'Poor Match': 'text-red-400',
};
const verdictBg: Record<string, string> = {
  'Excellent Match': 'bg-emerald-500/10 border-emerald-500/30',
  'Good Match': 'bg-sky-500/10 border-sky-500/30',
  'Moderate Match': 'bg-yellow-500/10 border-yellow-500/30',
  'Poor Match': 'bg-red-500/10 border-red-500/30',
};
const scoreColor = (s: number) => s >= 75 ? 'text-emerald-400' : s >= 50 ? 'text-yellow-400' : 'text-red-400';
const scoreBar = (s: number) => s >= 75 ? 'bg-emerald-500' : s >= 50 ? 'bg-yellow-500' : 'bg-red-500';

export default function ATSScorePage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScore = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('http://localhost:5001/api/ai/ats/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else alert(data.message);
    } catch { alert('Connection error'); }
    finally { setLoading(false); }
  };

  const circumference = 2 * Math.PI * 54;
  const dash = result ? ((100 - result.ats_score) / 100) * circumference : circumference;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-white/10 pb-8">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-xl">
          <ScanLine className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">ATS Score Detector</h1>
          <p className="text-slate-400 mt-1">Match your resume against a job description and see your ATS compatibility score.</p>
        </div>
        <div className="ml-auto px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center gap-2">
          <ScanLine className="w-4 h-4" /> ATS Engine
        </div>
      </div>

      <div className={`grid grid-cols-1 ${result ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8`}>
        {/* Input */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-[2rem] border border-white/10 space-y-4">
              <label className="text-sm font-bold text-white block">📄 Your Resume Text</label>
              <textarea
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste your full resume text here..."
                className="w-full h-72 bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none text-sm transition-all"
              />
            </div>
            <div className="glass p-6 rounded-[2rem] border border-white/10 space-y-4">
              <label className="text-sm font-bold text-white block">💼 Job Description</label>
              <textarea
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                placeholder="Paste the full job description you are applying for..."
                className="w-full h-72 bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none text-sm transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleScore}
            disabled={loading || !resumeText.trim() || !jobDescription.trim()}
            className="w-full py-5 rounded-2xl bg-amber-500 text-slate-900 font-black text-lg flex items-center justify-center gap-3 hover:bg-amber-400 hover:scale-[1.01] transition-all shadow-lg shadow-amber-500/20 disabled:opacity-30"
          >
            {loading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <ScanLine className="w-6 h-6" />}
            {loading ? 'Scanning Resume...' : 'Calculate ATS Score'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            {/* Score Ring */}
            <div className={`glass p-8 rounded-[2rem] border ${verdictBg[result.verdict] || 'border-white/10'} flex items-center gap-8`}>
              <div className="relative w-36 h-36 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgb(30,41,59)" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="54" fill="none"
                    stroke={result.ats_score >= 75 ? '#10b981' : result.ats_score >= 50 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dash}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-black text-white">{result.ats_score}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">/ 100</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">ATS Verdict</p>
                <p className={`text-2xl font-black ${verdictColors[result.verdict]}`}>{result.verdict}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{result.summary}</p>
              </div>
            </div>

            {/* Section Scores */}
            <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2"><BarChart3 className="w-4 h-4 text-amber-400" /> Section Breakdown</h3>
              {Object.entries(result.section_scores).map(([key, score]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">{key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                    <span className={`text-xs font-bold ${scoreColor(score)}`}>{score}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${scoreBar(score)} rounded-full transition-all duration-1000`} style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Keyword match */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
                <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Matched Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {result.matched_keywords.map(kw => (
                    <span key={kw} className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 text-[10px] font-bold">{kw}</span>
                  ))}
                </div>
              </div>
              <div className="glass p-5 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-3">
                <h3 className="text-xs font-black text-red-400 uppercase tracking-widest flex items-center gap-1"><XCircle className="w-3 h-3" /> Missing Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missing_keywords.map(kw => (
                    <span key={kw} className="px-2 py-1 rounded-lg bg-red-500/10 text-red-300 text-[10px] font-bold">{kw}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2"><Lightbulb className="w-4 h-4" /> Recommendations</h3>
              {result.recommendations.map((r, i) => (
                <div key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="text-amber-500 font-black shrink-0">{i + 1}.</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setResult(null)} className="w-full py-3 rounded-xl border border-white/10 text-slate-500 hover:text-white text-sm flex items-center justify-center gap-2 transition-all">
              <RefreshCcw className="w-4 h-4" /> Try Another Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
