import React from 'react';
import { HeroBanner } from './components/HeroBanner';
import { SalesKpis } from './components/SalesKpis';
import { LeadSourceChart } from './components/LeadSourceChart';
import { ActionPlan } from './components/ActionPlan';
import { Award, Users, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 pt-4">
      <div className="space-y-6 pb-4">
          {/* Greeting Section */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
              <div className="flex flex-col items-start">
                  <h1 className="text-3xl sm:text-4xl md:text-[38px] font-black text-[#003049] uppercase tracking-tighter font-mono leading-none">
                      GOOD MORNING, <span className="text-[#669bbc]">T-DCC DEVELOPER!</span>
                  </h1>
                  <div className="flex items-center mt-2.5">
                      <span className="text-[#7188a2] text-[11px] font-bold uppercase tracking-widest font-mono">Q3 SALES TARGET <span className="text-[#bcc4cf] mx-2">•</span> </span>
                      <span className="text-[#849e51] text-[11px] font-bold uppercase tracking-widest font-mono">ON TRACK (85%)</span>
                  </div>
              </div>
              <div className="flex flex-row gap-3 shrink-0 mt-2 xl:mt-0">
                  <button className="bg-white text-[#003049] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 border border-[#bcc4cf]">
                      <Users size={14} className="text-[#5686bb]" /> TEAM ACTIVITY
                  </button>
                  <button className="bg-[#5686bb] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-[#4674a6] transition-colors flex items-center justify-center gap-2">
                      <Target size={14} /> CREATE CAMPAIGN
                  </button>
              </div>
          </div>

          {/* Hero Banner Component */}
          <HeroBanner />

          {/* Metrics Grid */}
          <SalesKpis />

          {/* Charts & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <LeadSourceChart />
              <ActionPlan />
          </div>
      </div>
      
      {/* Footer from user's mock code */}
      <footer className="mt-auto pt-4 pb-0 text-center border-t border-[#bcc4cf]/50">
          <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-2">
                  <Award size={12} className="text-[#5686bb]" />
                  <span className="text-[10px] font-bold text-[#003049] uppercase tracking-[0.15em]">
                      SALE PRO • EMPOWERING BUSINESS GROWTH & CUSTOMER SUCCESS
                  </span>
              </div>
              <p className="text-[10px] text-[#7188a2] font-mono font-medium tracking-tight mt-1">
                  System powered by <span className="font-bold text-[#003049]">T All Intelligence</span> | 📞 082-5695654, 091-5165999 | 📧 tallintelligence.ho@gmail.com
              </p>
          </div>
      </footer>
    </div>
  );
}
