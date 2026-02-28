import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = (s: string) => {
    const s_lower = s.toLowerCase();
    switch (s_lower) {
      case 'pending':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'accepted':
      case 'success':
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'rejected':
      case 'error':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'reviewed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-white/5';
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(status)} ${className}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
