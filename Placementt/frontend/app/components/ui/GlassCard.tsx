import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`glass rounded-[2.5rem] border border-white/10 overflow-hidden transition-all duration-300 ${hoverEffect ? 'hover:bg-white/5 hover:border-primary/30' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
