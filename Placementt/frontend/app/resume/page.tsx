'use client';

import { useState } from 'react';
import { FileText, Send, CheckCircle, AlertCircle, RefreshCcw, Sparkles, Download, BarChart3 } from 'lucide-react';

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('http://localhost:5001/api/ai/resume/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(data.feedback);
      } else {
        alert(data.message || 'Failed to analyze resume');
      }
    } catch (err) {
      console.error(err);
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl primary-gradient flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">AI Resume Analyzer</h1>
            <p className="text-slate-400 mt-1 text-lg">Powered by NVIDIA Llama 3.1 &bull; Get instant professional feedback.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-2xl border border-white/5">
            <div className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 text-sm font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Advanced AI
            </div>
        </div>
      </div>

      {!feedback ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -z-10 group-hover:bg-indigo-500/10 transition-all duration-700" />
              <label className="block text-xl font-bold text-white mb-4 flex items-center gap-2">
                 Paste Your Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the content of your resume here (Contact info, Summary, Work Experience, Skills, Education)..."
                className="w-full h-96 bg-slate-950/50 border border-white/10 rounded-2xl p-6 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none shadow-inner text-sm leading-relaxed"
              />
              <div className="mt-6 flex justify-between items-center">
                 <p className="text-xs text-slate-500">Supported formats: Plain Text (PDF/Doc coming soon)</p>
                 <button
                    onClick={handleAnalyze}
                    disabled={loading || !resumeText.trim()}
                    className="px-10 py-4 rounded-xl primary-gradient text-white font-bold text-lg disabled:opacity-30 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20"
                  >
                    {loading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                    {loading ? 'Analyzing...' : 'Boost My Resume'}
                  </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-green-500" />
                   Why Use AI Analysis?
                </h3>
                <ul className="space-y-3 text-sm text-slate-400">
                   <li className="flex gap-2"><span>&bull;</span> Find hidden keyword gaps for ATS systems.</li>
                   <li className="flex gap-2"><span>&bull;</span> Improve impact-driven bullet points.</li>
                   <li className="flex gap-2"><span>&bull;</span> Check for formatting and structural consistency.</li>
                   <li className="flex gap-2"><span>&bull;</span> Get a Recruiter's perspective instantly.</li>
                </ul>
             </div>

             <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-3xl space-y-4">
                <h3 className="font-bold text-indigo-400 flex items-center gap-2">
                   <AlertCircle className="w-5 h-5" />
                   Pro Tip
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                   Include the job description you're applying for at the bottom of your paste for more tailored feedback!
                </p>
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-indigo-400" />
                Analysis Results
             </h2>
             <button
               onClick={() => setFeedback(null)}
               className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm font-medium flex items-center gap-2"
             >
               <RefreshCcw className="w-4 h-4" />
               New Analysis
             </button>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-indigo-500/20 bg-slate-900/40 relative overflow-hidden">
             <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none" />
             
             <div className="prose prose-invert max-w-none 
                prose-h1:text-white prose-h2:text-indigo-400 prose-h2:mt-8 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2
                prose-p:text-slate-300 prose-p:leading-relaxed 
                prose-li:text-slate-300 prose-strong:text-white
                whitespace-pre-wrap">
               {feedback}
             </div>
          </div>

          <div className="flex gap-4">
             <button className="flex-1 py-5 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20">
                <Download className="w-5 h-5" />
                Download PDF Report
             </button>
             <button 
               onClick={() => window.print()}
               className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
             >
                Print results
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
