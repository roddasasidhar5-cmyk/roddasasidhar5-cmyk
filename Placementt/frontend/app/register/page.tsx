'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to user, admin available for testing
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Registration successful. Backend returns { token, user }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations matching primary-gradient and UI tone */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>

      <div className="glass max-w-lg w-full rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 border border-white/5 my-8">
        <div className="text-center mb-8">
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

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition-all ${role === 'user' ? 'border-[#6366f1] bg-[#6366f1]/10 text-white' : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-white/20'}`}>
                <input type="radio" name="role" value="user" checked={role === 'user'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
                <span className="font-medium">User</span>
                <span className="text-xs mt-1 opacity-70">Job Seeker</span>
              </label>
              
              <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition-all ${role === 'admin' ? 'border-[#6366f1] bg-[#6366f1]/10 text-white' : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-white/20'}`}>
                <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
                <span className="font-medium">Admin</span>
                <span className="text-xs mt-1 opacity-70">Administrator</span>
              </label>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-center">*Admin selection is currently exposed for testing and demo purposes.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold primary-gradient hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#0a0a0b] transition-all transform hover:-translate-y-0.5 active:translate-y-0 mt-4 ${
              loading ? 'opacity-75 cursor-not-allowed scale-100 translate-y-0' : ''
            }`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-[#6366f1] hover:text-white transition-colors">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
