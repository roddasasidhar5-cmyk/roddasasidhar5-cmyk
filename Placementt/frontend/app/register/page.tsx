'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API_BASE_URL from '../config/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [passedOutYear, setPassedOutYear] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, collegeName, rollNumber, passedOutYear }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>

      <div className="glass max-w-lg w-full rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 border border-white/5 my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="text-center mb-6">
          <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
            P
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Create an Account
          </h2>
          <p className="text-slate-400 text-sm">
            Join PlaceAI to start your placement journey
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name *</label>
            <input type="text" required className={inputClass} placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address *</label>
            <input type="email" required className={inputClass} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password *</label>
            <input type="password" required minLength={6} className={inputClass} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">College Name *</label>
              <input type="text" required className={inputClass} placeholder="e.g. JNTUH" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Roll Number *</label>
              <input type="text" required className={inputClass} placeholder="e.g. 21A91A05F7" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Passed Out Year *</label>
            <select required className={inputClass} value={passedOutYear} onChange={(e) => setPassedOutYear(e.target.value)}>
              <option value="">Select Year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Account Type</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center transition-all ${role === 'user' ? 'border-[#6366f1] bg-[#6366f1]/10 text-white' : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-white/20'}`}>
                <input type="radio" name="role" value="user" checked={role === 'user'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
                <span className="font-medium text-sm">User</span>
                <span className="text-[10px] mt-0.5 opacity-70">Job Seeker</span>
              </label>
              <label className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center transition-all ${role === 'admin' ? 'border-[#6366f1] bg-[#6366f1]/10 text-white' : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-white/20'}`}>
                <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
                <span className="font-medium text-sm">Admin</span>
                <span className="text-[10px] mt-0.5 opacity-70">Administrator</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold primary-gradient hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#0a0a0b] transition-all transform hover:-translate-y-0.5 active:translate-y-0 mt-2 ${
              loading ? 'opacity-75 cursor-not-allowed scale-100 translate-y-0' : ''
            }`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-[#6366f1] hover:text-white transition-colors">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
