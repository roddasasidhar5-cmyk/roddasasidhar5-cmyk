'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token globally
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/'); // Route them to root (dashboard) which now has the beautiful UI
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

      <div className="glass max-w-md w-full rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 border border-white/5">
        <div className="text-center mb-8">
          <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
            P
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-sm">
            Sign in to access your PlaceAI Assistant
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900/50 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 flex justify-between">
              <span>Password</span>
              <a href="#" className="font-medium text-[#6366f1] hover:text-[#8b5cf6] transition-colors text-xs">Forgot?</a>
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900/50 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold primary-gradient hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#0a0a0b] transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
              loading ? 'opacity-75 cursor-not-allowed scale-100 translate-y-0' : ''
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <a href="/register" className="font-semibold text-[#6366f1] hover:text-white transition-colors">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
