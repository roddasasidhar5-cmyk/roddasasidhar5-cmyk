import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className={`animate-pulse bg-slate-800/50 rounded-xl ${className}`} 
        />
      ))}
    </>
  );
};

export default Skeleton;
