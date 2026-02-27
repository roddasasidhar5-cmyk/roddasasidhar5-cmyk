'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Timer, ChevronRight, CheckCircle2, Brain, Code, Sparkles, AlertCircle, RefreshCcw } from 'lucide-react';

export default function AssessmentPage() {
    const [step, setStep] = useState('selection'); // selection, quiz, result
    const [category, setCategory] = useState('aptitude');
    const [isAI, setIsAI] = useState(false);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [score, setScore] = useState<any>(null);

    const categories = [
        { id: 'aptitude', name: 'Aptitude', icon: GraduationCap },
        { id: 'verbal', name: 'Verbal', icon: CheckCircle2 },
        { id: 'logical', name: 'Logical', icon: Brain },
        { id: 'coding', name: 'Coding', icon: Code },
    ];

    const startQuiz = async () => {
        setLoading(true);
        try {
            let res;
            if (isAI) {
                res = await fetch('http://localhost:5001/api/ai/quiz/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ category }),
                });
            } else {
                res = await fetch(`http://localhost:5001/api/assessments/${category}`);
            }
            
            const data = await res.json();
            if (res.ok) {
                setQuestions(data);
                setAnswers(new Array(data.length).fill(-1));
                setStep('quiz');
                setCurrentIndex(0);
            } else {
                alert('Failed to load quiz');
            }
        } catch (err) {
            console.error(err);
            alert('Connection error');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = async () => {
        setLoading(true);
        try {
            // If it's AI generated, we calculate locally to save a request, 
            // or we could have a submission endpoint for AI as well.
            // But let's use the backend for both for consistency if possible.
            const res = await fetch('http://localhost:5001/api/assessments/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, answers, questions: isAI ? questions : undefined }),
            });
            
            // NOTE: assessmentController.submitQuiz currently expects questions to be in QUIZ_DATA.
            // For AI quizzes, we'll calculate result here to simplify.
            if (isAI) {
                let s = 0;
                questions.forEach((q, i) => {
                    if (answers[i] === q.correct) s++;
                });
                setScore({ score: s, total: questions.length, percentage: Math.round((s / questions.length) * 100) });
                setStep('result');
            } else {
                const data = await res.json();
                setScore(data);
                setStep('result');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (step === 'selection') {
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white mb-2">Skill Assessments</h1>
                        <p className="text-slate-400">Validate your knowledge with industry-standard tests.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${category === cat.id
                                    ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10'
                                    : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-white/20'
                                }`}
                        >
                            <cat.icon className="w-8 h-8" />
                            <span className="font-bold">{cat.name}</span>
                        </button>
                    ))}
                </div>

                <div className="glass p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                         <div className="flex items-center gap-2 bg-indigo-500/20 px-4 py-2 rounded-full border border-indigo-500/30">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-tighter">NVIDIA Powered</span>
                         </div>
                    </div>

                    <div className="max-w-2xl space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-white uppercase">{category} Assessment</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Ready to test your skills? Choose between our standard curated exam or a dynamic AI-generated test.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => { setIsAI(false); startQuiz(); }}
                                disabled={loading}
                                className="flex-1 px-8 py-5 rounded-2xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all border border-white/5 flex items-center justify-center gap-3"
                            >
                                <Timer className="w-5 h-5 text-slate-400" />
                                Standard Test
                            </button>
                            <button
                                onClick={() => { setIsAI(true); startQuiz(); }}
                                disabled={loading}
                                className="flex-1 px-8 py-5 rounded-2xl primary-gradient text-white font-bold hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-3"
                            >
                                <Sparkles className="w-5 h-5" />
                                {loading ? 'Generating...' : 'AI-Dynamic Test'}
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                             <div className="text-center">
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Questions</p>
                                <p className="text-white font-bold">{isAI ? '5 (Dynamic)' : '15 (Curated)'}</p>
                             </div>
                             <div className="text-center border-x border-white/5">
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Time Limit</p>
                                <p className="text-white font-bold">10-20 Mins</p>
                             </div>
                             <div className="text-center">
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Passing</p>
                                <p className="text-white font-bold">60% Score</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'quiz') {
        const q = questions[currentIndex];
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-10 duration-500">
                <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl primary-gradient flex items-center justify-center text-white font-bold shadow-lg">
                           {currentIndex + 1}
                        </div>
                        <div>
                            <h3 className="font-bold text-white uppercase text-sm tracking-widest">{category} Assessment</h3>
                            <p className="text-xs text-slate-500">Question {currentIndex + 1} of {questions.length}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {questions.map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i <= currentIndex ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                        ))}
                    </div>
                </div>

                <div className="glass p-10 rounded-[2.5rem] border border-white/10 space-y-8 min-h-[400px] flex flex-col justify-between">
                    <div className="space-y-10">
                        <h2 className="text-2xl font-semibold text-white leading-relaxed">
                            {q?.q}
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {q?.options.map((opt: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    className={`group p-6 rounded-2xl border text-left transition-all flex items-center justify-between ${answers[currentIndex] === i
                                            ? 'border-indigo-500 bg-indigo-500/10 text-white'
                                            : 'border-white/5 bg-slate-950/30 text-slate-400 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                                            answers[currentIndex] === i ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'
                                        }`}>
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <span>{opt}</span>
                                    </div>
                                    {answers[currentIndex] === i && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between pt-8">
                        <button
                            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentIndex === 0}
                            className="px-6 py-3 rounded-xl text-slate-400 font-bold hover:text-white disabled:opacity-0 transition-all"
                        >
                            Previous Question
                        </button>
                        <button
                            onClick={nextQuestion}
                            disabled={answers[currentIndex] === -1}
                            className="px-10 py-4 rounded-2xl primary-gradient text-white font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20"
                        >
                            {currentIndex === questions.length - 1 ? 'Finish & Submit' : 'Save & Next'}
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'result') {
        return (
            <div className="max-w-2xl mx-auto text-center space-y-10 animate-in zoom-in-95 duration-700 pt-10">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] -z-10" />
                    <div className="w-40 h-40 rounded-[3rem] primary-gradient flex items-center justify-center text-white mx-auto shadow-2xl relative">
                        <div className="text-center">
                            <p className="text-5xl font-black mb-1">{score?.percentage}%</p>
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Score</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-white">Assessment Complete!</h1>
                    <p className="text-slate-400 text-lg">
                        You scored <span className="text-white font-bold">{score?.score} out of {score?.total}</span> correct answers in the {category} module.
                    </p>
                </div>

                <div className="glass p-8 rounded-[2rem] border border-white/10 grid grid-cols-2 gap-6">
                     <div className="space-y-1">
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Time Spent</p>
                        <p className="text-white font-bold text-xl">04:22</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Accuracy</p>
                        <p className="text-white font-bold text-xl">{score?.percentage}%</p>
                     </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => setStep('selection')}
                        className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Try Another Module
                    </button>
                    <button
                        className="flex-1 py-5 rounded-2xl primary-gradient text-white font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all"
                    >
                        View Solutions
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
