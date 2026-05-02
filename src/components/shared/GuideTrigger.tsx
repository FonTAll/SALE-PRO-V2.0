import React from 'react';
import { LucideIcon } from './LucideIcon';

interface GuideTriggerProps {
  onClick: () => void;
}

export const GuideTrigger: React.FC<GuideTriggerProps> = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="fixed right-0 top-32 bg-[#5686bb] text-white py-4 px-2 rounded-l-xl shadow-[-4px_0_15px_rgba(86,134,187,0.15)] hover:bg-[#c1121f] transition-colors duration-300 z-[100] flex flex-col items-center gap-3 group border border-r-0 border-white/20"
  >
    <LucideIcon name="help-circle" size={18} className="shrink-0 group-hover:scale-110 transition-transform" />
    <span className="font-extrabold tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap uppercase font-mono text-xs">
      USER GUIDE
    </span>
  </button>
);
