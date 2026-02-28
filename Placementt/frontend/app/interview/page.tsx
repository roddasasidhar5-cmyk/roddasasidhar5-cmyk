'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Play, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCcw,
  ArrowRight,
  MessageSquare,
  Award,
  BookOpen
} from 'lucide-react';
import API_BASE_URL from '../config/api';

export default function InterviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState('setup'); // setup, interview, feedback
  const [role, setRole] = useState(searchParams.get('role') || '');
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [feedback, setFeedback] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const maxQuestions = 5;

  const chatEndRef = useRef<HTMLDivElement>(null);

  const roles = [
    "Software Engineer",
    "Data Analyst",
    "Product Manager",
    "UX Designer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Cybersecurity Analyst"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, currentQuestion]);

  const startInterview = async () => {
    if (!role) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/interview/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      setCurrentQuestion(data.question);
      setStep('interview');
      setQuestionCount(1);
    } catch (err) {
      console.error("Failed to start", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (!userAnswer.trim()) return;
    
    setLoading(true);
    const updatedHistory = [
      ...chatHistory, 
      { type: 'ai', text: currentQuestion },
      { type: 'user', text: userAnswer }
    ];
    setChatHistory(updatedHistory);

    try {
      if (questionCount >= maxQuestions) {
        // Get Result
      const res = await fetch(`${API_BASE_URL}/ai/interview/result`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role, chatHistory: updatedHistory }),
        });
        const data = await res.json();
        setFeedback(data.feedback);
        setStep('feedback');
      } else {
        // Get Next Question
        const res = await fetch(`${API_BASE_URL}/ai/interview/next`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            role, 
            currentQuestion, 
            userAnswer, 
            chatHistory: updatedHistory 
          }),
        });
        const data = await res.json();
        setCurrentQuestion(data.question);
        setUserAnswer('');
        setQuestionCount(prev => prev + 1);
      }
    } catch (err) {
      console.error("Error in interview flow", err);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'setup') {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">AI Mock Interview</h1>
          <p className="text-slate-400">Select your target role and start a realistic practice session powered by NVIDIA.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`p-6 rounded-2xl border text-left transition-all hover:scale-[1.02] ${
                role === r 
                ? 'border-indigo-500 bg-indigo-500/10 text-white' 
                : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-white/20'
              }`}
            >
              <h3 className="font-semibold">{r}</h3>
              <p className="text-sm opacity-60 mt-1">Practice role-specific scenarios.</p>
            </button>
          ))}
        </div>

        <button
          onClick={startInterview}
          disabled={!role || loading}
          className="w-full py-4 rounded-xl primary-gradient text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
          Start Interview Room
        </button>
      </div>
    );
  }

  if (step === 'interview') {
    return (
      <div className="p-8 max-w-3xl mx-auto h-[calc(100vh-120px)] flex flex-col animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full primary-gradient flex items-center justify-center text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white">{role} Interview</h2>
              <p className="text-xs text-slate-500">Question {questionCount} of {maxQuestions}</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium uppercase tracking-wider">
            Live Session
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pb-4 pr-2 custom-scrollbar">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                msg.type === 'ai' 
                ? 'bg-slate-900/80 border border-white/5 text-slate-200 rounded-bl-none' 
                : 'primary-gradient text-white rounded-br-none shadow-lg'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {currentQuestion && (
            <div className="flex justify-start">
              <div className="max-w-[85%] p-4 rounded-2xl text-sm bg-slate-900/80 border border-indigo-500/30 text-white rounded-bl-none animate-pulse-subtle">
                <span className="text-indigo-400 font-bold mb-1 block">Interviewer:</span>
                {currentQuestion}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="pt-6 relative">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={loading}
            placeholder="Type your answer here..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 min-h-[120px] resize-none transition-all"
          />
          <button
            onClick={handleNext}
            disabled={loading || !userAnswer.trim()}
            className="absolute right-4 bottom-8 p-3 rounded-xl primary-gradient text-white disabled:opacity-30 transition-all hover:scale-110 active:scale-95 shadow-lg"
          >
            {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'feedback') {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-extrabold text-white">Interview Complete!</h1>
          <p className="text-slate-400">Great job practicing. Here is your AI-analyzed feedback report.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-2">
            <Award className="w-6 h-6 text-yellow-500" />
            <h3 className="text-white font-bold">Overall Score</h3>
            <p className="text-3xl font-extrabold text-indigo-400">Analyzed...</p>
          </div>
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h3 className="text-white font-bold">Concept Mastery</h3>
            <p className="text-sm text-slate-400">Strong theoretical knowledge observed.</p>
          </div>
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-2">
            <MessageSquare className="w-6 h-6 text-purple-500" />
            <h3 className="text-white font-bold">Communication</h3>
            <p className="text-sm text-slate-400">Balanced and professional tone.</p>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle className="w-24 h-24 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Play className="w-5 h-5 fill-indigo-400 text-indigo-400" />
            Detailed Analysis
          </h2>
          <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300 whitespace-pre-wrap">
            {feedback}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setStep('setup');
              setChatHistory([]);
              setFeedback('');
              setUserAnswer('');
            }}
            className="flex-1 py-4 rounded-2xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Another Role
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-4 rounded-2xl primary-gradient text-white font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2"
          >
            Return to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
