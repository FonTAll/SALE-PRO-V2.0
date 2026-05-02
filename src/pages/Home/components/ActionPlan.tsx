import React from 'react';
import { AlertCircle, PhoneCall, FileText, Mail, Calendar } from 'lucide-react';

const tasks = [
  { title: "Call TechCorp for Q4 Renewal", type: "High Value Deal", icon: PhoneCall, urgent: true, color: 'text-[#c1121f]', bg: 'bg-[#c1121f]/10' },
  { title: "Review 'Summer Sale' Ad Copy", type: "Marketing", icon: FileText, urgent: false, color: 'text-[#5686bb]', bg: 'bg-[#5686bb]/10' },
  { title: "Send Proposal to Alpha Group", type: "Sales Pipeline", icon: Mail, urgent: true, color: 'text-[#db9e32]', bg: 'bg-[#db9e32]/15' },
];

export function ActionPlan() {
  return (
    <div className="sys-card-base bg-white border-[#bcc4cf]/50 relative overflow-hidden group p-6 md:p-8 rounded-[1.5rem]">
      <div className="absolute -bottom-6 -right-6 text-[#5686bb] opacity-[0.03] transform -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <PhoneCall size={120} />
      </div>
      <h2 className="text-xl font-bold text-[#003049] mb-4 flex items-center gap-3 uppercase relative z-10 font-mono tracking-tight">
        <AlertCircle size={20} className="text-[#c1121f]" />
        URGENT FOLLOW-UPS
      </h2>
      
      <div className="space-y-3 relative z-10">
        {tasks.map((task, i) => (
          <div key={i} className="p-3 bg-white/90 rounded-xl border border-[#bcc4cf]/40 flex gap-3 items-start hover:bg-white transition-all shadow-sm group/task cursor-pointer">
            <div className={`p-2 rounded-lg shadow-sm ${task.bg} ${task.color}`}>
              <task.icon size={14}/>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-[#003049] group-hover/task:text-[#5686bb] transition-colors">{task.title}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[10px] text-[#7188a2] font-medium">{task.type}</p>
                {task.urgent && <span className="text-[9px] font-black text-[#c1121f] uppercase animate-pulse">Action Req.</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-[#5686bb] to-[#2e395f] text-white text-[10px] font-bold uppercase rounded-xl shadow-[0_4px_15px_rgba(86,134,187,0.3)] hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
        <Calendar size={12} /> View Complete Schedule
      </button>
    </div>
  );
}
