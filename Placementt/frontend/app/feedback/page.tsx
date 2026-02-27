'use client';

import { useState } from 'react';
import { Zap, Send, RefreshCcw, Sparkles, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const sampleQuestions = [
  'Explain the concept of polymorphism in OOP.',
  'What is the difference between SQL and NoSQL?',
  'How does the event loop work in JavaScript?',
  'What is the CAP theorem?',
  'Explain the SOLID principles.',
  'What is load balancing and why is it important?',
];

export default function RealtimeFeedbackPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    if (!question.trim() || !answer.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('http://localhost:5001/api/ai/feedback/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });
      const data = await res.json();
      if (res.ok) setFeedback(data.feedback);
      else alert(data.message);
    } catch {
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-white/10 pb-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xl">
          <Zap className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Realtime Feedback</h1>
          <p className="text-slate-400 mt-1">Submit any interview Q&A and get an instant rubric-scored evaluation.</p>
        </div>
        <div className="ml-auto px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> AI Graded
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Column */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Interview Question</label>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Paste or type the interview question here..."
                className="w-full h-28 bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-none text-sm transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Your Answer</label>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Write your answer as you would in a real interview..."
                className="w-full h-44 bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-none text-sm transition-all"
              />
            </div>

            <button
              onClick={handleEvaluate}
              disabled={loading || !question.trim() || !answer.trim()}
              className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 hover:scale-[1.01] transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-30"
            >
              {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {loading ? 'Evaluating...' : 'Get Instant Feedback'}
            </button>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white">Quick Samples</h3>
            <div className="space-y-2">
              {sampleQuestions.map(q => (
                <button key={q} onClick={() => setQuestion(q)} className="w-full text-left text-xs px-3 py-2 rounded-lg bg-slate-900/50 border border-white/5 text-slate-500 hover:text-white hover:border-emerald-500/30 transition-all">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div>
          {!feedback && !loading && (
            <div className="h-full glass rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center p-12 space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-white font-bold text-xl">Instant Rubric Scoring</h3>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">Submit a question and your answer to receive a detailed evaluation scored on Accuracy, Depth, Clarity, and Use of Examples.</p>
              <div className="flex gap-3 pt-4">
                {['Accuracy', 'Depth', 'Clarity', 'Examples'].map(c => (
                  <div key={c} className="px-3 py-1 rounded-full bg-slate-800 text-slate-500 text-[10px] font-bold">
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="h-full glass rounded-[2rem] border border-white/5 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mx-auto" />
                <p className="text-slate-400">AI is evaluating your answer...</p>
              </div>
            </div>
          )}

          {feedback && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Evaluation Report</h2>
                <button onClick={() => { setFeedback(null); setAnswer(''); }} className="text-slate-500 hover:text-white text-sm flex items-center gap-1 transition-colors">
                  <RefreshCcw className="w-3 h-3" /> Reset
                </button>
              </div>
              <div className="glass p-8 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5">
                <div className="prose prose-invert max-w-none prose-h2:text-emerald-400 prose-h3:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white whitespace-pre-wrap text-sm">
                  {feedback}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
