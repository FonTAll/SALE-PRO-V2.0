import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface KpiCardProps {
  key?: React.Key | null;
  label: string;
  value: string | number;
  subLabel?: string;
  icon: any;
  color?: string;
  bg?: string;
  trend?: string;
  trendColor?: string;
  className?: string;
}

export function KpiCard({
  label,
  value,
  subLabel,
  icon: Icon,
  color = '#111f42',
  bg = 'bg-slate-50',
  trend,
  trendColor = 'text-emerald-500',
  className
}: KpiCardProps) {
  return (
    <div className={clsx(
      "sys-card-base flex flex-col justify-between min-h-[140px] hover:-translate-y-1 hover:shadow-md transition-all relative overflow-hidden group bg-white border-[#bcc4cf]/50 p-6 md:p-8 rounded-[1.5rem]",
      className
    )}>
      <div 
        className="absolute -right-6 -bottom-6 opacity-[0.08] pointer-events-none transform rotate-12 group-hover:scale-110 transition-all duration-700 z-0"
        style={{ color }}
      >
        <Icon size={120} strokeWidth={1.5} />
      </div>
      
      <div className="flex justify-between items-start relative z-10">
        <h3 className="w-full text-[10px] md:text-[11px] font-bold text-[#7188a2] font-mono tracking-widest break-words truncate">
          {label}
        </h3>
        <div className="p-2.5 rounded-[14px] shadow-sm border border-white backdrop-blur-md shrink-0 ml-2" style={{ color: color, backgroundColor: color + '15' }}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
      </div>
      
      <div className="relative z-10 mt-4">
        <div className="flex items-baseline gap-2">
          <div className="text-[2rem] md:text-[2.5rem] leading-none font-black text-[#003049] font-mono tracking-tighter">
            {value}
          </div>
          {trend && (
            <span className={clsx("text-[10px] font-bold font-mono", trendColor)}>
              {trend}
            </span>
          )}
        </div>
        {subLabel && (
          <p className="mt-2 text-[10px] text-[#537179] font-medium flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: color}}></span>
            {subLabel}
          </p>
        )}
      </div>
    </div>
  );
}
