import React from 'react';
import { TrendingUp } from 'lucide-react';

export function HeroBanner() {
  const bgImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015";
  
  return (
    <div className="relative w-full h-[220px] md:h-[260px] rounded-[2rem] overflow-hidden shadow-sm mb-6 group bg-[#003049]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 transform -scale-x-100">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60"
          style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center 40%' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#003049]/95 via-[#2e395f]/70 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-[#003049]/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-8 md:px-12 w-full md:w-3/4 lg:w-2/3">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider leading-tight mb-4 drop-shadow-md font-mono">
          ACCELERATE<br />GROWTH
        </h2>
        
        <div className="pl-4 border-l-4 border-[#f2b33d] mb-5">
          <p className="text-white/95 text-[13px] md:text-sm font-bold italic tracking-wide drop-shadow-sm max-w-xl font-mono">
            "Empowering our sales force with data-driven<br/>insights to close deals faster and build lasting<br/>customer relationships."
          </p>
        </div>

        <div>
          <button className="bg-[#c1121f] hover:bg-[#ae1f23] text-white px-5 py-2 rounded-[0.4rem] text-[10px] font-bold uppercase tracking-widest shadow-md transition-all flex items-center gap-2">
            <TrendingUp size={14} /> VIEW Q3 SALES FORECAST
          </button>
        </div>
      </div>
    </div>
  );
}
