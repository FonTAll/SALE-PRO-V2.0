import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';
import { LucideIcon } from '../../../components/shared/LucideIcon';
import Swal from 'sweetalert2';

// ... (rest of constants stays the same)
const SYSTEM_MODULES = [
  { id: 'dashboard', label: 'SALES DASHBOARD', icon: 'layout-dashboard' },
  { id: 'operations', label: 'OPERATIONS', icon: 'boxes' },
  { id: 'crm', label: 'CRM & LEADS', icon: 'users' },
  { id: 'marketing', label: 'MARKETING HUB', icon: 'megaphone' },
  { id: 'analytics', label: 'REPORTS & ANALYTICS', icon: 'bar-chart-2' },
  { id: 'performance', label: 'PERFORMANCE', icon: 'target' },
  { id: 'financials', label: 'FINANCIALS', icon: 'receipt' },
  { id: 'master_data', label: 'MASTER DATA', icon: 'database' },
  { id: 'settings', label: 'CONFIGURATION', icon: 'settings' }
];

const PERMISSION_LEVELS = [
  { level: 0, label: 'No Access', icon: 'ban', color: '#7188a2', bg: '#e9e4dc' },
  { level: 1, label: 'Viewer', icon: 'eye', color: '#5686bb', bg: '#cfe0e7' },
  { level: 2, label: 'Editor', icon: 'edit', color: '#db9e32', bg: '#f2b33d40' },
  { level: 3, label: 'Verifier', icon: 'check-square', color: '#003049', bg: '#a0b1dd' },
  { level: 4, label: 'Approver', icon: 'award', color: '#849e51', bg: '#597d4f40' },
];

export function EditUserModal({ isOpen, onClose, user, onSave }: any) {
    const [modalStep, setModalStep] = useState(1);
    const [tempPerms, setTempPerms] = useState<any>({});
    const nodeRef = useRef(null);

    useEffect(() => {
        if (isOpen && user) {
            setModalStep(1);
            setTempPerms(JSON.parse(JSON.stringify(user.permissions || {})));
        }
    }, [isOpen, user]);

    if (!isOpen || !user) return null;

    const handleTogglePerm = (moduleId: string, level: number) => {
        if (user.isDev) return; 
        
        setTempPerms((prev: any) => {
            const newPerms = { ...prev };
            if (!newPerms[moduleId]) newPerms[moduleId] = [];
            
            if (level === 0) {
                newPerms[moduleId] = [];
                return newPerms;
            }

            if (newPerms[moduleId].includes(level)) {
                newPerms[moduleId] = newPerms[moduleId].filter((l: number) => l !== level);
            } else {
                newPerms[moduleId] = [...newPerms[moduleId], level].sort();
            }
            return newPerms;
        });
    };

    const handleSave = () => {
        onSave(user.id, tempPerms);
        Swal.fire({ icon: 'success', title: 'Permissions Updated', text: `Rights for ${user.name} have been saved.`, timer: 1500, showConfirmButton: false });
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#003049]/40 backdrop-blur-sm" onClick={onClose} />
            <Draggable nodeRef={nodeRef} handle=".modal-drag-handle">
                <div ref={nodeRef} className="bg-[#f7f3ee] rounded-2xl shadow-2xl w-full max-w-[800px] flex flex-col overflow-hidden relative border border-[#bcc4cf] h-auto max-h-[85vh] animate-fadeIn pointer-events-auto">
                    
                    {/* Header - Drag Handle */}
                    <div className="modal-drag-handle cursor-move px-5 py-3 flex justify-between items-center shrink-0 border-b border-[#bcc4cf] bg-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-[#a0b1dd] flex items-center justify-center shadow-sm overflow-hidden p-0.5 pointer-events-none">
                                <img src={user.avatar} className="w-full h-full object-cover rounded-lg" alt={user.name} />
                            </div>
                            <div className="pointer-events-none">
                                <h3 className="text-[15px] font-black text-[#003049] uppercase tracking-widest leading-none">{user.name}</h3>
                                <p className="text-[10px] font-bold text-[#5686bb] uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                                    {user.isDev && <span className="bg-[#f2b33d] text-[#003049] px-1.5 py-0.5 rounded-[4px] text-[9px]">DEV</span>}
                                    {user.position}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="w-8 h-8 rounded-xl bg-[#f7f3ee] border border-[#bcc4cf] text-[#7188a2] flex items-center justify-center hover:bg-[#c1121f] hover:text-white hover:border-[#c1121f] transition-all"><Icons.X size={16} /></button>
                    </div>
                    
                    {/* Layout */}
                    <div className="flex-1 flex overflow-hidden bg-[#f7f3ee] flex-col md:flex-row">
                        {/* Tabs */}
                        <div className="w-full md:w-56 bg-white border-b md:border-b-0 md:border-r border-[#bcc4cf] flex flex-row md:flex-col shrink-0 overflow-y-auto shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-10">
                            <div className="hidden md:block px-5 py-4 text-[9px] font-black text-[#7188a2] uppercase tracking-widest border-b border-[#bcc4cf] bg-[#f7f3ee]">Configuration Steps</div>
                            <button onClick={()=>setModalStep(1)} className={`flex-1 md:flex-none flex items-center gap-2 px-4 py-3 text-left transition-all md:border-l-[4px] md:border-b-0 border-b-[4px] group ${modalStep===1?'border-[#c1121f] bg-[#f7f3ee] text-[#003049] shadow-[inset_0_-1px_0_#bcc4cf]':'border-transparent text-[#7188a2] hover:bg-[#f7f3ee]/50 hover:text-[#003049]'}`}>
                                <div className={`p-1.5 rounded-xl shrink-0 transition-colors ${modalStep===1?'bg-[#003049] text-white shadow-md':'bg-white border border-[#bcc4cf] group-hover:border-[#a0b1dd]'}`}><Icons.ShieldCheck size={14} /></div>
                                <span className={`text-[10px] uppercase tracking-widest ${modalStep===1?'font-black':'font-bold'}`}>1. Area Visibility</span>
                            </button>
                            <button onClick={()=>setModalStep(2)} className={`flex-1 md:flex-none flex items-center gap-2 px-4 py-3 text-left transition-all md:border-l-[4px] md:border-b-0 border-b-[4px] group ${modalStep===2?'border-[#c1121f] bg-[#f7f3ee] text-[#003049] shadow-[inset_0_-1px_0_#bcc4cf]':'border-transparent text-[#7188a2] hover:bg-[#f7f3ee]/50 hover:text-[#003049]'}`}>
                                <div className={`p-1.5 rounded-xl shrink-0 transition-colors ${modalStep===2?'bg-[#003049] text-white shadow-md':'bg-white border border-[#bcc4cf] group-hover:border-[#a0b1dd]'}`}><Icons.Settings2 size={14} /></div>
                                <span className={`text-[10px] uppercase tracking-widest ${modalStep===2?'font-black':'font-bold'}`}>2. Functional Rights</span>
                            </button>
                        </div>
                      
                        {/* Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 bg-[#f7f3ee]">
                            <div className="bg-white p-5 rounded-[16px] border border-[#bcc4cf] shadow-sm flex flex-col h-full animate-fadeIn">
                                <h4 className="text-[12px] font-black text-[#003049] uppercase tracking-widest mb-4 border-b-2 border-[#e9e4dc] pb-2">
                                    {modalStep===1 ? 'Step 1: Module Access Rules' : 'Step 2: Specific Permissions'}
                                </h4>

                                {user.isDev && (
                                    <div className="mb-4 p-3 bg-[#f2b33d]/10 border border-[#f2b33d]/30 rounded-xl flex items-center gap-2">
                                        <Icons.AlertTriangle size={16} className="text-[#db9e32] shrink-0"/>
                                        <p className="text-[10px] font-bold text-[#003049]">This user is a Developer (Super Admin). They inherently have full access to all modules and functions.</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-3 overflow-y-auto custom-scrollbar pr-2 pb-2">
                                    {SYSTEM_MODULES.map(mod => {
                                        const userHasMod = tempPerms[mod.id] && tempPerms[mod.id].length > 0;
                                        const isDev = user.isDev || tempPerms['*'];
                                        
                                        return (
                                            <div key={mod.id} className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${userHasMod || isDev ? 'bg-[#f7f3ee] border-[#bcc4cf] shadow-sm' : 'bg-white border-[#e9e4dc] hover:border-[#a0b1dd]'}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm shrink-0 ${userHasMod || isDev ? 'bg-[#003049] text-white border-[#003049]' : 'bg-white text-[#7188a2] border-[#bcc4cf]'}`}><LucideIcon name={mod.icon} size={16}/></div>
                                                    <span className="font-black text-[#003049] uppercase text-[11px] tracking-widest leading-none">{mod.label}</span>
                                                </div>
                                                <div className="flex gap-1.5 bg-white p-1 rounded-lg shadow-sm border border-[#bcc4cf] w-full sm:w-auto overflow-x-auto no-scrollbar">
                                                    {PERMISSION_LEVELS.filter(p => modalStep === 1 ? p.level <= 1 : p.level === 0 || p.level >= 2).map(p => {
                                                        const isSelected = isDev || (p.level === 0 && !userHasMod) || (tempPerms[mod.id] && tempPerms[mod.id].includes(p.level));
                                                        return (
                                                            <button 
                                                                key={p.level} 
                                                                onClick={() => handleTogglePerm(mod.id, p.level)}
                                                                disabled={user.isDev}
                                                                className={`h-8 px-2 rounded-md border flex items-center justify-center gap-1.5 transition-all min-w-[32px] ${isSelected ? 'bg-[#003049] border-[#003049] text-white shadow-md' : 'bg-white border-transparent text-[#7188a2] hover:bg-[#e9e4dc]'}`} 
                                                                title={p.label}
                                                            >
                                                                <LucideIcon name={p.icon} size={12} style={{color: isSelected ? p.bg : p.color}}/>
                                                                {isSelected && <span className="text-[9px] font-bold tracking-widest uppercase hidden lg:block">{p.label}</span>}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-5 bg-white border-t border-[#bcc4cf] flex justify-end gap-3 shrink-0 z-20">
                        <button onClick={onClose} className="px-5 py-2.5 text-[#7188a2] hover:text-[#003049] font-black text-[10px] uppercase tracking-widest transition-colors border border-transparent rounded-lg bg-white hover:bg-[#f7f3ee]">CANCEL</button>
                        <button onClick={handleSave} className="px-6 py-2.5 bg-[#003049] hover:bg-[#2e395f] text-white font-black text-[10px] uppercase tracking-widest rounded-lg shadow-[0_4px_12px_rgba(0,48,73,0.3)] transition-all active:scale-95 flex items-center gap-2"><Icons.Save size={14}/> SAVE</button>
                    </div>
                </div>
            </Draggable>
        </div>, document.body
    );
}

