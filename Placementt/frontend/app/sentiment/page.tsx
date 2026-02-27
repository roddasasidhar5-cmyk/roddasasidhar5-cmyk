'use client';

import { useState } from 'react';
import { Activity, Send, RefreshCcw, Sparkles, TrendingUp, Heart, AlertCircle } from 'lucide-react';

type SentimentResult = {
  overall: string;
  confidence_score: number;
  emotions: { confident: number; nervous: number; enthusiastic: number; professional: number; assertive: number };
  tone: string;
  strengths: string[];
  improvements: string[];
  summary: string;
};

const emotionColors: Record<string, string> = {
  confident: 'bg-blue-500',
  nervous: 'bg-red-500',
  enthusiastic: 'bg-yellow-500',
  professional: 'bg-emerald-500',
  assertive: 'bg-purple-500',
};

const emotionLabels: Record<string, string> = {
  confident: '💪 Confident',
  nervous: '😟 Nervous',
  enthusiastic: '🔥 Enthusiastic',
  professional: '👔 Professional',
  assertive: '🎯 Assertive',
};

export default function SentimentPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('http://localhost:5001/api/ai/sentiment/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else alert(data.message || 'Failed to analyze');
    } catch {
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const overallColor = result?.overall === 'Positive' ? 'text-emerald-400' : result?.overall === 'Negative' ? 'text-red-400' : 'text-yellow-400';
  const overallBg = result?.overall === 'Positive' ? 'bg-emerald-500/10 border-emerald-500/20' : result?.overall === 'Negative' ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20';

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-white/10 pb-8">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-xl">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Sentiment Analysis</h1>
          <p className="text-slate-400 mt-1">Analyze the emotional tone and confidence of any interview text.</p>
        </div>
        <div className="ml-auto px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold flex items-center gap-2">
          <Activity className="w-4 h-4" /> Emotional AI
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
            <label className="text-sm font-bold text-slate-300 uppercase tracking-wider block">Paste Your Interview Text or Speech</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your answer, cover letter paragraph, speech script, or any professional text here for emotional analysis..."
              className="w-full h-72 bg-slate-950/50 border border-white/10 rounded-2xl p-5 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 resize-none text-sm leading-relaxed transition-all"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-600">{text.split(/\s+/).filter(Boolean).length} words</p>
              <button
                onClick={handleAnalyze}
                disabled={loading || !text.trim()}
                className="px-10 py-4 rounded-2xl bg-purple-500 text-white font-bold flex items-center gap-3 hover:bg-purple-600 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-30"
              >
                {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
                {loading ? 'Analyzing...' : 'Analyze Sentiment'}
              </button>
            </div>
          </div>

          <div className="glass p-5 rounded-2xl border border-white/5 space-y-3">
            <AlertCircle className="w-5 h-5 text-purple-400" />
            <p className="text-sm font-bold text-white">How it works</p>
            <p className="text-xs text-slate-400 leading-relaxed">Our AI analyzes word choice, structure, and language patterns to detect emotional signals — giving you precise feedback on how you come across professionally.</p>
          </div>
        </div>

        {/* Results */}
        <div>
          {!result && !loading && (
            <div className="h-full glass rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center p-12 space-y-6">
              <Heart className="w-16 h-16 text-purple-500/30" />
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Emotion Breakdown</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Paste your text to reveal your emotional fingerprint across 5 dimensions.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                {Object.entries(emotionLabels).map(([key, label]) => (
                  <div key={key} className="px-3 py-2 rounded-xl bg-slate-900/60 text-[10px] text-slate-500 font-bold text-center">{label}</div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="h-full glass rounded-[2rem] border border-white/5 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin mx-auto" />
                <p className="text-slate-400 text-sm">Reading emotional signals...</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-in zoom-in-95 duration-500">
              {/* Overall verdict */}
              <div className={`glass p-6 rounded-2xl border ${overallBg} flex items-center justify-between`}>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Overall Sentiment</p>
                  <p className={`text-3xl font-black ${overallColor}`}>{result.overall}</p>
                  <p className="text-xs text-slate-500 mt-1">Tone: {result.tone}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Confidence</p>
                  <p className="text-5xl font-black text-white">{result.confidence_score}<span className="text-2xl text-slate-500">%</span></p>
                </div>
              </div>

              {/* Emotion bars */}
              <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white">Emotion Breakdown</h3>
                {Object.entries(result.emotions).map(([emotion, score]) => (
                  <div key={emotion} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">{emotionLabels[emotion]}</span>
                      <span className="text-xs font-bold text-white">{score}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${emotionColors[emotion]} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
                  <h3 className="text-sm font-bold text-emerald-400">✅ Strengths</h3>
                  {result.strengths.map((s, i) => <p key={i} className="text-xs text-slate-300">{s}</p>)}
                </div>
                <div className="glass p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-3">
                  <h3 className="text-sm font-bold text-amber-400">⚡ Improve</h3>
                  {result.improvements.map((s, i) => <p key={i} className="text-xs text-slate-300">{s}</p>)}
                </div>
              </div>

              <div className="glass p-5 rounded-2xl border border-white/5 space-y-2">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Summary</p>
                <p className="text-sm text-slate-300 leading-relaxed italic">"{result.summary}"</p>
              </div>

              <button onClick={() => setResult(null)} className="w-full py-3 rounded-xl text-slate-500 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors">
                <RefreshCcw className="w-4 h-4" /> Analyze Another Text
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
