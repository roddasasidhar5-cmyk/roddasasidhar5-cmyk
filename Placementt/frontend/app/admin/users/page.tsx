'use client';

import { useState, useEffect } from 'react';
import { Users, Trash2, Search, RefreshCcw, GraduationCap, Building, Hash } from 'lucide-react';
import API_BASE_URL from '../../config/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/auth/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
      else console.error('Failed to fetch users:', data.message);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/auth/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchUsers();
    } catch (err) { console.error(err); }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-5 border-b border-white/10 pb-8">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-xl">
          <Users className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">User Management</h1>
          <p className="text-slate-400 mt-1">Audit and manage all registered users in the placement portal.</p>
        </div>
        <div className="ml-auto flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-11 pr-6 py-3 bg-slate-900 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 w-64 transition-all"
            />
          </div>
          <button onClick={fetchUsers} className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="glass p-5 rounded-2xl border border-white/10">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Users</p>
          <p className="text-3xl font-extrabold text-white">{users.length}</p>
        </div>
        <div className="glass p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Students</p>
          <p className="text-3xl font-extrabold text-emerald-400">{users.filter(u => u.role === 'user').length}</p>
        </div>
        <div className="glass p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Admins</p>
          <p className="text-3xl font-extrabold text-rose-400">{users.filter(u => u.role === 'admin').length}</p>
        </div>
        <div className="glass p-5 rounded-2xl border border-sky-500/20 bg-sky-500/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Colleges</p>
          <p className="text-3xl font-extrabold text-sky-400">{new Set(users.map(u => u.collegeName).filter(Boolean)).size}</p>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">User</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">College</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Roll No</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Year</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Role</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={7} className="px-8 py-20 text-center text-slate-500 font-bold">Loading users...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan={7} className="px-8 py-20 text-center text-slate-500 font-bold">No users found.</td></tr>
            ) : filteredUsers.map(user => (
              <tr key={user._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold group-hover:scale-110 transition-transform">
                      {user.name?.[0] || 'U'}
                    </div>
                    <span className="font-bold text-white text-sm">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400 text-xs">{user.email}</td>
                <td className="px-6 py-4 text-slate-300 text-xs font-medium">{user.collegeName || '—'}</td>
                <td className="px-6 py-4 text-slate-300 text-xs font-mono">{user.rollNumber || '—'}</td>
                <td className="px-6 py-4 text-slate-300 text-xs">{user.passedOutYear || '—'}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(user._id)}
                    className="p-2 text-slate-600 hover:text-rose-500 transition-colors"
                    title="Delete User"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
