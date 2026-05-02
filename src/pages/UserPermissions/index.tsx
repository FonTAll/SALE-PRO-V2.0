import React, { useState, useEffect, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { LucideIcon } from '../../components/shared/LucideIcon';
import { GuideTrigger } from '../../components/shared/GuideTrigger';
import { ModuleKpiCard as KpiCard } from '../../components/shared/ModuleKpiCard';
import { EditUserModal } from './components/EditUserModal';
import { UserGuidePanel } from './components/UserGuidePanel';

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

export default function UserPermission() {
  const [activeTab, setActiveTab] = useState('registry'); 
  const [viewMode, setViewMode] = useState('list'); 
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [editModal, setEditModal] = useState({ isOpen: false, user: null });
  const [confidentialityMap, setConfidentialityMap] = useState<any>({'settings': true, 'financials': true, 'master_data': true});

  const [users, setUsers] = useState([
    { id: 1, name: 'SOMCHAI JAIDEE', position: 'SALES DIRECTOR', email: 'somchai@salepro.com', avatar: 'https://i.pravatar.cc/150?img=11', isDev: false, permissions: { dashboard: [1, 2, 3, 4], operations: [1, 2, 4], analytics: [1, 2] } },
    { id: 2, name: 'SUDA RAKDEE', position: 'MARKETING MANAGER', email: 'suda@salepro.com', avatar: 'https://i.pravatar.cc/150?img=5', isDev: false, permissions: { dashboard: [1], marketing: [1, 2, 3, 4], crm: [1, 2] } },
    { id: 3, name: 'T-DCC ADMIN', position: 'SYSTEM ADMIN', email: 'dcc@tallintel.com', avatar: 'https://i.pravatar.cc/150?img=12', isDev: true, permissions: { '*': [1, 2, 3, 4] } },
    { id: 4, name: 'SARAH JENKINS', position: 'VP OF SALES', email: 'sarah.j@salepro.com', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', isDev: false, permissions: { dashboard: [1], crm: [1, 2, 3, 4] } }
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.position.toLowerCase().includes(search.toLowerCase()));
  }, [users, search]);

  const currentData = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const toggleConfidentiality = (id: string) => setConfidentialityMap((prev: any) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => { setCurrentPage(1); setSearch(''); }, [activeTab]);

  const saveUserPermissions = (userId: number, newPermissions: any) => {
      setUsers(users.map(u => u.id === userId ? { ...u, permissions: newPermissions } : u));
  };

  return (
      <div className="flex flex-col flex-1 w-full text-[#2e2d2e] relative font-sans animate-fadeIn pt-8">
        
        <GuideTrigger onClick={() => setIsGuideOpen(true)} />
        <UserGuidePanel isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        <EditUserModal isOpen={editModal.isOpen} onClose={() => setEditModal({isOpen: false, user: null})} user={editModal.user} onSave={saveUserPermissions} />

        {/* Header Bar Synced with Theme - Fixed Layout to be on same row */}
        <header className="px-0 py-4 flex flex-row justify-between items-center gap-6 shrink-0 z-10">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 bg-white flex items-center justify-center shadow-[0_4px_15px_rgba(86,134,187,0.3)] border border-[#a0b1dd] rounded-xl text-[#5686bb]">
              <Icons.Shield size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <h1 className="text-2xl font-black tracking-tight uppercase flex gap-2">
                <span className="text-[#003049]">USER</span>
                <span className="text-[#669bbc]">PERMISSIONS</span>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-1.5 text-[#7188a2]">Security Control & Access Authorization</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 max-w-full overflow-x-auto no-scrollbar justify-end flex-nowrap">
            <div className="bg-white/60 p-1.5 rounded-[24px] inline-flex items-center shadow-sm border border-[#bcc4cf] backdrop-blur-md h-[46px] shrink-0">
              <button onClick={() => setActiveTab('registry')} className={`px-5 h-full rounded-[16px] text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'registry' ? 'bg-[#003049] text-white shadow-[0_4px_10px_rgba(0,48,73,0.3)]' : 'text-[#7188a2] hover:text-[#003049] hover:bg-white/80'}`}>
                <Icons.Database size={14} className={activeTab === 'registry' ? 'text-[#f2b33d]' : ''} /> MODULE REGISTRY
              </button>
              <button onClick={() => setActiveTab('staff')} className={`px-5 h-full rounded-[16px] text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'staff' ? 'bg-[#003049] text-white shadow-[0_4px_10px_rgba(0,48,73,0.3)]' : 'text-[#7188a2] hover:text-[#003049] hover:bg-white/80'}`}>
                <Icons.Users size={14} className={activeTab === 'staff' ? 'text-[#669bbc]' : ''} /> STAFF ACCESS
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full px-0 pb-10 flex flex-col gap-6 min-h-0 overflow-y-auto custom-scrollbar">
          {/* KPI Row - Fixed Missing Variables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0 mb-2">
            <KpiCard label="Active Users" value={users.length} icon="users" colorAccent="#5686bb" colorValue="#003049" desc="Total Staffs" />
            <KpiCard label="System Modules" value={SYSTEM_MODULES.length} icon="layout-grid" colorAccent="#c1121f" colorValue="#003049" desc="Tracked Nodes" />
            <KpiCard label="Restricted Zones" value={Object.values(confidentialityMap).filter(v=>v).length} icon="lock" colorAccent="#f2b33d" colorValue="#ae1f23" desc="Locked Config" />
            <KpiCard label="Security Status" value="VERIFIED" icon="shield-check" colorAccent="#849e51" colorValue="#849e51" desc="System Audited" />
          </div>

          {activeTab === 'registry' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-4 space-y-6 flex flex-col">
                 <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#bcc4cf] flex flex-col gap-6 shrink-0">
                    <h3 className="text-[14px] font-black text-[#003049] uppercase tracking-widest flex items-center gap-2 border-b-2 border-[#e9e4dc] pb-3"><Icons.Lock size={18} className="text-[#c1121f]" /> CONFIDENTIALITY REGISTRY</h3>
                    <div className="p-5 bg-[#5686bb]/10 border border-[#5686bb]/20 rounded-xl">
                       <div className="flex items-center gap-2 text-[#5686bb] font-black text-[11px] uppercase tracking-widest mb-2"><Icons.Eye size={16}/> Public Access</div>
                       <p className="text-[12px] text-[#003049] font-bold leading-relaxed">เมนูทั่วไป: พนักงานทุกคนจะได้รับสิทธิ์ "Viewer" ทันทีที่เข้าสู่ระบบ</p>
                    </div>
                    <div className="p-5 bg-[#c1121f]/10 border border-[#c1121f]/20 rounded-xl">
                       <div className="flex items-center gap-2 text-[#c1121f] font-black text-[11px] uppercase tracking-widest mb-2"><Icons.Lock size={16}/> Confidential Area</div>
                       <p className="text-[12px] text-[#003049] font-bold leading-relaxed">พื้นที่จำกัด: จะถูกปิดกั้นสิทธิ์ "Viewer" พื้นฐาน ต้องระบุสิทธิ์เป็นรายบุคคลเท่านั้นจึงจะใช้งานได้</p>
                    </div>
                 </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#bcc4cf] flex flex-col flex-1 min-h-[500px]">
                <div className="p-6 border-b border-[#bcc4cf] bg-[#f7f3ee] shrink-0 rounded-t-2xl">
                    <h4 className="text-[14px] font-black uppercase text-[#003049] tracking-widest flex items-center gap-2"><Icons.List size={18} className="text-[#c1121f]"/> MASTER MODULE REGISTRY</h4>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                   {SYSTEM_MODULES.map(mod => (
                     <div key={mod.id} className="space-y-2">
                        <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${confidentialityMap[mod.id] ? 'bg-[#c1121f]/5 border-[#c1121f]/30 shadow-sm' : 'bg-white border-[#bcc4cf] hover:border-[#a0b1dd] shadow-[0_2px_10px_rgba(0,0,0,0.02)]'}`}>
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${confidentialityMap[mod.id] ? 'bg-[#c1121f] text-white' : 'bg-[#f7f3ee] text-[#5686bb] border border-[#e9e4dc]'}`}><LucideIcon name={mod.icon} size={18}/></div>
                              <div>
                                 <div className="font-black text-[#003049] text-[13px] uppercase tracking-tight flex items-center gap-2 leading-none">
                                    {mod.label} 
                                    {confidentialityMap[mod.id] && <Icons.Lock size={12} className="text-[#c1121f]"/>}
                                 </div>
                                 <div className="text-[9px] text-[#7188a2] font-bold uppercase tracking-widest mt-1.5">{confidentialityMap[mod.id] ? 'Restricted Access' : 'Public Access'}</div>
                              </div>
                           </div>
                           <button onClick={()=>toggleConfidentiality(mod.id)} className={`p-2.5 rounded-xl transition-all shadow-sm ${confidentialityMap[mod.id] ? 'bg-[#c1121f] text-white border-transparent' : 'bg-white text-[#7188a2] border border-[#bcc4cf] hover:text-[#003049] hover:bg-[#f7f3ee]'}`}>
                              {confidentialityMap[mod.id] ? <Icons.Lock size={16}/> : <Icons.Eye size={16}/>}
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#bcc4cf] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col flex-1 min-h-[500px] animate-fadeIn">
              
              {/* TOOLBAR */}
              <div className="px-6 py-5 border-b border-[#bcc4cf] flex flex-col xl:flex-row justify-between items-center bg-[#f7f3ee] shrink-0 gap-4">
                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <div className="flex bg-white border border-[#bcc4cf] p-1.5 rounded-xl shadow-sm h-11 shrink-0">
                      <button onClick={()=>setViewMode('list')} className={`px-5 h-full text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 ${viewMode==='list'?'bg-[#003049] text-white shadow-[0_2px_8px_rgba(0,48,73,0.3)]':'text-[#7188a2] hover:bg-[#f7f3ee]'}`}>
                          <Icons.List size={14}/> List View
                      </button>
                      <button onClick={()=>setViewMode('matrix')} className={`px-5 h-full text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 ${viewMode==='matrix'?'bg-[#003049] text-white shadow-[0_2px_8px_rgba(0,48,73,0.3)]':'text-[#7188a2] hover:bg-[#f7f3ee]'}`}>
                          <Icons.Grid size={14}/> Summary Matrix
                      </button>
                    </div>
                </div>
                <div className="relative w-full xl:w-[320px]">
                   <Icons.Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5686bb]" />
                   <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search personnel..." className="w-full pl-11 pr-4 py-2 text-[12px] border border-[#a0b1dd] rounded-full font-bold outline-none focus:border-[#003049] bg-white shadow-sm text-[#003049] h-11" />
                </div>
              </div>

              <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar bg-transparent">
                 {viewMode === 'list' ? (
                   <table className="w-full text-left font-sans min-w-[1000px] border-collapse relative">
                      <thead className="bg-[#003049] border-b-[3px] border-[#c6a75e] sticky top-0 z-10 text-white font-mono uppercase tracking-wider text-[11px] font-black">
                        <tr>
                          <th className="py-4 px-6 pl-8 whitespace-nowrap w-[25%]">Personnel Identity</th>
                          <th className="py-4 px-6 whitespace-nowrap w-[25%]">Position / Dept</th>
                          <th className="py-4 px-6 whitespace-nowrap w-[25%]">Email ID</th>
                          <th className="py-4 px-6 text-center whitespace-nowrap w-[15%]">Type</th>
                          <th className="py-4 px-6 text-center whitespace-nowrap w-[10%] pr-8">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {currentData.map(user => (
                          <tr key={user.id} className="hover:bg-[#f7f3ee]/80 transition-colors border-b border-[#e9e4dc] group h-[68px]">
                            <td className="py-3 px-6 pl-8 align-middle whitespace-nowrap">
                               <div className="flex items-center gap-4">
                                 <img src={user.avatar} className="w-10 h-10 rounded-xl border border-[#bcc4cf] object-cover shadow-sm" />
                                 <span className="font-black text-[#003049] text-[13px] uppercase">{user.name}</span>
                               </div>
                            </td>
                            <td className="py-3 px-6 align-middle font-bold text-[#5686bb] text-[12px] uppercase whitespace-nowrap">{user.position}</td>
                            <td className="py-3 px-6 align-middle font-mono font-bold text-[#7188a2] text-[12px] whitespace-nowrap">{user.email}</td>
                            <td className="py-3 px-6 align-middle text-center whitespace-nowrap">
                               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm inline-block ${user.isDev ? 'bg-[#f2b33d]/10 text-[#ae1f23] border-[#f2b33d]/50' : 'bg-[#f7f3ee] text-[#7188a2] border-[#bcc4cf]'}`}>
                                 {user.isDev ? 'DEVELOPER' : 'GENERAL STAFF'}
                               </span>
                            </td>
                            <td className="py-3 px-6 pr-8 align-middle whitespace-nowrap">
                               <div className="flex justify-center">
                                   <button onClick={()=>{setEditModal({isOpen: true, user: user as any});}} className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#bcc4cf] text-[#5686bb] hover:border-[#a0b1dd] hover:text-[#003049] hover:bg-white transition-colors shadow-sm bg-[#f7f3ee]" title="Edit Permissions">
                                       <Icons.UserCog size={16}/>
                                   </button>
                               </div>
                            </td>
                          </tr>
                        ))}
                        {currentData.length === 0 && (
                          <tr><td colSpan={5} className="py-16 text-center text-[#7188a2] font-bold uppercase tracking-widest text-[12px] opacity-50">No users found</td></tr>
                        )}
                      </tbody>
                   </table>
                 ) : (
                   /* 🌟 SUMMARY MATRIX VIEW 🌟 */
                   <table className="w-full text-left font-sans min-w-[1200px] border-collapse relative">
                      <thead className="bg-[#003049] border-b-[3px] border-[#c6a75e] sticky top-0 z-40 text-white font-mono uppercase tracking-wider text-[11px] font-black">
                         <tr>
                            <th className="py-4 px-6 sticky left-0 z-50 border-r border-white/20 min-w-[280px] bg-[#003049] whitespace-nowrap">Module / Sub-Module</th>
                            {users.map(u => (
                               <th key={u.id} className="py-3 px-4 text-center border-l border-white/20 whitespace-nowrap min-w-[120px]">
                                  <div className="flex flex-col items-center gap-2 justify-center">
                                     <img src={u.avatar} className="w-10 h-10 rounded-xl border border-[#5686bb] object-cover shadow-sm" />
                                     <span className="font-black leading-none text-[11px] text-[#e9e4dc] tracking-widest">{u.name.split(' ')[0]}</span>
                                  </div>
                               </th>
                            ))}
                         </tr>
                      </thead>
                      <tbody className="bg-white text-[12px]">
                         {SYSTEM_MODULES.map(mod => {
                            return (
                               <React.Fragment key={mod.id}>
                                  <tr className="hover:bg-[#f7f3ee] transition-colors border-b border-[#bcc4cf]">
                                     <td className="py-3 px-6 font-black text-[#003049] uppercase tracking-tight flex items-center gap-3 sticky left-0 z-20 border-r border-[#bcc4cf] bg-[#f7f3ee] shadow-[2px_0_5px_rgba(0,0,0,0.02)] h-[52px]">
                                        <div className="flex items-center gap-2">
                                            <LucideIcon name={mod.icon} size={18} className="text-[#c1121f]"/> 
                                            {mod.label}
                                        </div>
                                        {confidentialityMap[mod.id] && <Icons.Lock size={14} className="text-[#7188a2] ml-auto"/>}
                                     </td>
                                     {users.map(u => {
                                        const uPerms = u.permissions?.[mod.id as keyof typeof u.permissions] || [];
                                        const hasAccess = u.isDev || uPerms.length > 0 || (u.permissions as any)?.['*'];
                                        return (
                                           <td key={u.id} className="py-3 px-4 text-center border-l border-[#e9e4dc] align-middle h-[52px]">
                                              <div className="flex justify-center gap-1.5">
                                                 {u.isDev || (u.permissions as any)?.['*'] ? (
                                                    [1,2,3,4].map(lvl => <div key={lvl} className="w-6 h-6 rounded-lg flex items-center justify-center shadow-sm border" style={{backgroundColor: PERMISSION_LEVELS[lvl].bg, borderColor: `${PERMISSION_LEVELS[lvl].color}30`}} title={PERMISSION_LEVELS[lvl].label}><Icons.Check size={12} style={{color: PERMISSION_LEVELS[lvl].color}}/></div>)
                                                 ) : hasAccess ? (
                                                    uPerms.map(lvl => {
                                                       const p = PERMISSION_LEVELS.find(pl => pl.level === lvl);
                                                       if (!p) return null;
                                                       return <div key={lvl} className="w-5 h-5 rounded-md flex items-center justify-center shadow-sm border" style={{backgroundColor: p.bg, borderColor: `${p.color}30`}} title={p.label}><LucideIcon name={p.icon} size={11} style={{color: p.color}}/></div>;
                                                    })
                                                 ) : <span className="text-[#bcc4cf] font-mono text-[14px]">-</span>}
                                              </div>
                                           </td>
                                        )
                                     })}
                                  </tr>
                               </React.Fragment>
                            );
                         })}
                      </tbody>
                   </table>
                 )}
              </div>
              
              {/* Pagination */}
              {viewMode === 'list' && (
                <div className="p-4 bg-[#f7f3ee] border-t border-[#bcc4cf] flex justify-between items-center font-bold text-[#7188a2] uppercase tracking-widest shrink-0 font-mono text-[10px]">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span>SHOW:</span>
                            <select 
                                value={itemsPerPage} 
                                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} 
                                className="bg-white border border-[#bcc4cf] rounded-md px-2 py-1 outline-none focus:border-[#003049] text-[#003049] cursor-pointer"
                            >
                                {[5, 10, 20, 50].map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div>TOTAL {filteredUsers.length} ITEMS</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-2 border border-[#bcc4cf] bg-white rounded-lg transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#e9e4dc] text-[#003049] shadow-sm'}`}><Icons.ChevronLeft size={16}/></button>
                        <div className="bg-white border border-[#bcc4cf] px-5 py-2.5 rounded-lg shadow-sm text-[#003049] font-black min-w-[120px] text-center uppercase tracking-widest">PAGE {currentPage} OF {totalPages || 1}</div>
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className={`p-2 border border-[#bcc4cf] bg-white rounded-lg transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#e9e4dc] text-[#003049] shadow-sm'}`}><Icons.ChevronRight size={16}/></button>
                    </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
  );
}
