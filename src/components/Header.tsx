import React, { useState, useEffect } from 'react';
import { Globe, Clock, Bell } from 'lucide-react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
        <header className="h-20 px-6 flex items-center justify-between z-10 shrink-0 bg-transparent">
            <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center group cursor-default">
                    {/* เอฟเฟกต์แสงฟุ้ง (Glow) ด้านหลังไอคอน */}
                    <div className="absolute inset-0 bg-[#5686bb] blur-[15px] opacity-40 rounded-full group-hover:opacity-60 transition-all duration-700"></div>
                    {/* ไอคอนล้วน */}
                    <Globe size={32} strokeWidth={1.5} className="text-[#5686bb] relative z-10 drop-shadow-[0_0_8px_rgba(86,134,187,0.6)] filter transition-transform duration-500 hover:rotate-[15deg]" />
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-lg md:text-xl font-black text-primary uppercase tracking-wide leading-none font-mono">
                        GLOBAL <span className="text-[#669bbc]">SALES</span> NETWORK
                    </h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-[#7188a2] tracking-[0.3em] font-mono mt-1 uppercase">
                        UNIFIED REVENUE MANAGEMENT
                    </p>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3 bg-white rounded-full pl-5 pr-1.5 py-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-[#bcc4cf]/50">
                    <div className="flex flex-col items-end leading-none font-mono justify-center">
                        <span className="text-[9px] font-bold text-[#7188a2] uppercase tracking-widest">{currentTime.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                        <span className="text-[10px] font-bold text-[#003049] mt-0.5">{currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#003049] text-white px-4 py-2 rounded-full text-[11px] shadow-inner tracking-widest font-bold font-mono">
                        <Clock size={12} className="animate-pulse text-[#669bbc]"/>
                        {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </div>
                </div>
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#bcc4cf]/50 text-[#003049] shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:bg-[#f7f3ee] transition-all">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#c1121f] rounded-full border border-white"></span>
                </button>
            </div>
        </header>
  );
}
