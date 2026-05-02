import React from 'react';
import { LucideIcon } from './LucideIcon';

interface ModuleKpiCardProps {
  icon: string;
  value: string | number;
  label: string;
  colorAccent: string;
  colorValue: string;
  desc: string;
}

export const ModuleKpiCard: React.FC<ModuleKpiCardProps> = ({ icon, value, label, colorAccent, colorValue, desc }) => (
    <div className="bg-white px-6 py-6 rounded-[20px] border border-[#bcc4cf] shadow-[0_4px_15px_rgba(86,134,187,0.05)] flex-1 min-w-[200px] relative overflow-hidden group hover:border-[#a0b1dd] transition-all min-h-[120px] flex flex-col justify-between">
        <div className="absolute -right-4 -bottom-6 opacity-[0.05] transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <LucideIcon name={icon} size={110} color={colorAccent} />
        </div>
        
        <div className="relative z-10 flex justify-between items-start w-full">
            <p className="text-[11px] font-black text-[#7188a2] uppercase tracking-[0.1em] drop-shadow-sm">{label}</p>
            <div className={`w-10 h-10 rounded-[10px] border flex items-center justify-center shrink-0 shadow-sm`} style={{backgroundColor: `${colorAccent}10`, borderColor: `${colorAccent}20`, color: colorAccent}}>
                <LucideIcon name={icon} size={20} />
            </div>
        </div>

        <div className="relative z-10 mt-2 flex items-end justify-between">
            <p className="text-[30px] font-black leading-none font-mono" style={{color: colorValue}}>
                {value}
            </p>
            <span className="text-[10px] font-bold text-[#5686bb] uppercase tracking-widest">{desc}</span>
        </div>
    </div>
);
