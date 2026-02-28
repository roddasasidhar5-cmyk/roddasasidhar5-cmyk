'use client';

import { useState } from 'react';
import { Video, Mic, MicOff, Send, RefreshCcw, Sparkles, BookOpen, MessageSquare, Star, ChevronDown } from 'lucide-react';
import API_BASE_URL from '../config/api';

const topics = [
  'Explain OOP Concepts',
  'What is REST API?',
  'Describe your greatest strength',
  'Why should we hire you?',
  'Explain the Software Development Life Cycle',
  'What is Cloud Computing?',
  'Describe a challenging project you worked on',
  'Explain your experience with Agile methodology',
];

export default function VideoPracticePage() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const activeTopic = customTopic || selectedTopic;

  const handleEvaluate = async () => {
    if (!activeTopic || !transcript.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/video-practice/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: activeTopic, transcript }),
      });
      const data = await res.json();
      if (res.ok) setFeedback(data.feedback);
      else alert(data.message);
    } catch (e) {
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-white/10 pb-8">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-xl">
          <Video className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Video Practice</h1>
          <p className="text-slate-400 mt-1">Practice your spoken answers and get AI coaching feedback.</p>
        </div>
        <div className="ml-auto px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> NVIDIA Powered
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left panel */}
        <div className="space-y-5">
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="font-bold text-white flex items-center gap-2"><BookOpen className="w-4 h-4 text-rose-400" /> Choose a Topic</h3>
            <div className="space-y-2">
              {topics.map(t => (
                <button
                  key={t}
                  onClick={() => { setSelectedTopic(t); setCustomTopic(''); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${selectedTopic === t && !customTopic
                    ? 'bg-rose-500/10 border border-rose-500/30 text-white'
                    : 'bg-slate-900/50 border border-white/5 text-slate-400 hover:border-white/20'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Or type custom topic</p>
              <input
                type="text"
                placeholder="Your own topic..."
                value={customTopic}
                onChange={(e) => { setCustomTopic(e.target.value); setSelectedTopic(''); }}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
              />
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white">💡 Speaking Tips</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Use STAR method (Situation, Task, Action, Result)</li>
              <li>• Speak slowly and clearly</li>
              <li>• Use concrete examples</li>
              <li>• Avoid filler words (um, uh, like)</li>
            </ul>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-2 space-y-6">
          {activeTopic && (
            <div className="glass p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5">
              <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Current Topic</p>
              <p className="text-white font-bold text-lg">{activeTopic}</p>
            </div>
          )}

          {!feedback ? (
            <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-white font-bold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-400" />
                  Your Answer (Transcript)
                </label>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isRecording ? 'bg-red-500/20 border border-red-500/50 text-red-400 animate-pulse' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isRecording ? 'Stop Recording' : 'Mic (Tip)'}
                </button>
              </div>

              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Type your spoken answer here. Imagine you are speaking to an interviewer and write what you would say..."
                className="w-full h-56 bg-slate-950/50 border border-white/10 rounded-2xl p-5 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/40 resize-none text-sm leading-relaxed transition-all"
              />

              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-slate-600">{transcript.split(/\s+/).filter(Boolean).length} words</p>
                <button
                  onClick={handleEvaluate}
                  disabled={loading || !activeTopic || !transcript.trim()}
                  className="px-10 py-4 rounded-xl bg-rose-500 text-white font-bold flex items-center gap-3 hover:bg-rose-600 hover:scale-[1.02] transition-all shadow-lg shadow-rose-500/20 disabled:opacity-30"
                >
                  {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  {loading ? 'Evaluating...' : 'Get AI Coaching'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> AI Coaching Report
                </h2>
                <button onClick={() => setFeedback(null)} className="text-slate-500 hover:text-white text-sm flex items-center gap-1 transition-colors">
                  <RefreshCcw className="w-4 h-4" /> Try Again
                </button>
              </div>
              <div className="glass p-8 rounded-[2.5rem] border border-rose-500/20 bg-rose-500/5">
                <div className="prose prose-invert max-w-none prose-h2:text-rose-400 prose-h3:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white whitespace-pre-wrap">
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
