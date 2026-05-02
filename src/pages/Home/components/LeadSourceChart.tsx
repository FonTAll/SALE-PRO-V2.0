import React from 'react';
import { Target, PieChart } from 'lucide-react';

const data = [
  { name: "Organic Search", expect: 40, actual: 45, color: '#5686bb' },
  { name: "Paid Ads (PPC)", expect: 30, actual: 28, color: '#4e888a' },
  { name: "Referrals", expect: 15, actual: 18, color: '#849e51' },
  { name: "Cold Outreach", expect: 15, actual: 9, color: '#f2b33d' },
];

export function LeadSourceChart() {
  return (
    <div className="sys-card-base lg:col-span-2 relative overflow-hidden group bg-white border-[#bcc4cf]/50 p-6 md:p-8 rounded-[1.5rem]">
      <div className="absolute -bottom-10 -right-10 text-[#5686bb] opacity-[0.03] transform -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <PieChart size={240} />
      </div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-xl font-bold text-[#003049] flex items-center gap-3 uppercase font-mono tracking-tight">
          <Target size={20} className="text-[#5686bb]" /> 
          LEAD SOURCE ACQUISITION
        </h2>
        <span className="text-[10px] text-[#003049] font-bold bg-[#cfe0e7] px-4 py-1.5 rounded-full uppercase tracking-tighter border border-[#5686bb]/20">
          MONTHLY ANALYSIS
        </span>
      </div>

      <div className="space-y-5 relative z-10">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-5 group/bar relative">
            <div className="w-32 text-[11px] font-bold text-[#2e2d2e] uppercase truncate">{item.name}</div>
            
            <div className="flex-1 h-5 rounded-full relative flex items-center bg-[#e9e4dc] shadow-inner border border-[#bcc4cf] overflow-hidden">
              {/* Target Line with Tooltip */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-[#003049] z-20 opacity-30 group-hover/bar:opacity-100 transition-opacity" 
                style={{ left: `${item.expect}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-[#003049] text-white text-[9px] font-bold rounded shadow-lg opacity-0 group-hover/bar:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                  Target: {item.expect}%
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-[#003049]"></div>
                </div>
              </div>

              {/* Actual Bar */}
              <div 
                className="h-full transition-all duration-1000 relative z-10 rounded-full"
                style={{ width: `${item.actual}%`, background: item.color }}
              ></div>
            </div>

            <div className="w-10 text-right">
              <span className="text-xs font-bold text-[#003049]">{item.actual}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
