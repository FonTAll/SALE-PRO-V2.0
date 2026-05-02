import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from '../../components/shared/LucideIcon';
import { GuideTrigger } from '../../components/shared/GuideTrigger';
import { ModuleKpiCard as KpiCard } from '../../components/shared/ModuleKpiCard';
import { PdfPreviewer } from '../../components/shared/PdfPreviewer';
import Swal from 'sweetalert2';

function ConfigGuidePanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (typeof document === 'undefined') return null;
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[650] flex justify-end pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="absolute inset-0 bg-[#003049]/20 backdrop-blur-sm pointer-events-auto" 
                        onClick={onClose}
                    />
                    <motion.div 
                        initial={{ x: '100%' }} 
                        animate={{ x: 0 }} 
                        exit={{ x: '100%' }} 
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="w-96 bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.08)] flex flex-col h-full pointer-events-auto relative z-10"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-[#bcc4cf] bg-[#f7f3ee] text-primary shrink-0">
                            <h3 className="font-extrabold flex items-center gap-2 uppercase tracking-tight font-mono text-[14px]">
                                <Icons.Settings2 size={18} className="text-[#5686bb]"/> CONFIG GUIDE
                            </h3>
                            <button onClick={onClose} className="p-1.5 text-[#7188a2] hover:text-[#c1121f] rounded-full transition-colors"><Icons.X size={20}/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6 text-[#7188a2] leading-relaxed text-[12px]">
                            <section>
                                <h4 className="text-sm font-black text-primary mb-3 uppercase flex items-center gap-2 border-b border-[#bcc4cf] pb-2 font-mono">
                                    <Icons.Database size={16} className="text-[#c1121f]"/> 1. Master Data
                                </h4>
                                <p className="text-[#2e2d2e]">หน้าจอนี้ใช้สำหรับตั้งค่าข้อมูลหลัก (Master Data) ที่จะถูกนำไปใช้งานเป็นตัวเลือก (Dropdown) ในหน้าต่างต่างๆ ของระบบ เช่น แผนก หมวดหมู่ แบรนด์ ลูกค้า หรือเทมเพลตสำหรับฟอร์ม PDF</p>
                            </section>
                            <section>
                                <h4 className="text-sm font-black text-primary mb-3 uppercase flex items-center gap-2 border-b border-[#bcc4cf] pb-2 font-mono">
                                    <Icons.Barcode size={16} className="text-[#c1121f]"/> 2. ID Formats
                                </h4>
                                <p className="text-[#2e2d2e]">ตั้งค่ารูปแบบการรันรหัสอัตโนมัติ (Auto-Generate ID) สำหรับแต่ละหน้าจอ เช่น รูปแบบของ Plan ID, SO Number, หรือ Problem ID โดยสามารถกำหนด Prefix, ตัวเลขรัน Sequence และรอบการ Reset (เช่น รีเซ็ตทุกวัน)</p>
                            </section>
                            <section>
                                <h4 className="text-sm font-black text-primary mb-3 uppercase flex items-center gap-2 border-b border-[#bcc4cf] pb-2 font-mono">
                                    <Icons.AlertTriangle size={16} className="text-[#c1121f]"/> 3. System Impact
                                </h4>
                                <p className="text-[#2e2d2e]">การแก้ไขหรือลบข้อมูลในส่วนนี้ อาจส่งผลกระทบต่อระบบงาน (Transactions) ที่ดึงข้อมูลเหล่านี้ไปใช้งานแล้ว ควรระมัดระวังในการลบข้อมูลหลักครับ</p>
                            </section>
                        </div>
                        <div className="p-6 bg-[#e9e4dc]/50 border-t border-[#bcc4cf] flex justify-end shadow-inner">
                            <button onClick={onClose} className="px-8 py-3 bg-[#5686bb] text-white font-black rounded-lg uppercase font-mono text-[11px] hover:bg-primary transition-all shadow-sm">เข้าใจแล้ว (Got it)</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>, document.body
    );
}

const INITIAL_DATA = {
  departments: [
    { id: 1, name: 'Management', code: 'MGT' },
    { id: 2, name: 'Human Resources', code: 'HR' },
    { id: 3, name: 'Information Technology', code: 'IT' },
    { id: 4, name: 'Production', code: 'PROD' },
    { id: 5, name: 'Quality Assurance', code: 'QA' },
    { id: 6, name: 'Quality Control', code: 'QC' },
    { id: 7, name: 'Warehouse', code: 'WH' },
  ],
  categories: [
    { id: 1, name: 'Sausage' },
    { id: 2, name: 'Meatball' },
    { id: 3, name: 'Bologna' },
    { id: 4, name: 'Ham' },
    { id: 5, name: 'Sliced' },
    { id: 6, name: 'Loaf' },
    { id: 7, name: 'Batter' },
    { id: 8, name: 'SFG' },
    { id: 9, name: 'NPD' },
  ],
  brands: [
    { id: 1, name: 'AFM' },
    { id: 2, name: 'CJ' },
    { id: 3, name: 'ARO' },
    { id: 4, name: 'MAKRO' },
    { id: 5, name: 'Betagro' },
    { id: 6, name: 'Generic' },
    { id: 7, name: 'No Brand' },
    { id: 8, name: 'Internal' },
    { id: 9, name: 'Test' },
  ],
  customers: [
    { id: 1, name: 'Makro' },
    { id: 2, name: 'CP All' },
    { id: 3, name: 'Lotus' },
    { id: 4, name: 'Big C' },
    { id: 5, name: 'Tops' },
    { id: 6, name: 'Foodland' },
    { id: 7, name: 'MaxValu' },
    { id: 8, name: 'CJ Express' },
  ],
  pdfTemplates: [
    { id: 1, name: 'DAR FORM', dept: 'DC CENTER', code: 'FM-DC01-01', revision: 'REV. 02' },
    { id: 2, name: 'DESTRUCTION REPORT', dept: 'DC CENTER', code: 'FM-DC03-01', revision: 'REV. 01' },
    { id: 3, name: 'DISTRIBUTION REPORT', dept: 'DC CENTER', code: 'FM-DC04-01', revision: 'REV. 01' },
  ],
  idFormats: [
    {
      id: 1,
      pages: ['Plan from Planning', 'Production Planning'],
      prefix: 'PL',
      format: 'YYMMDD',
      sequenceDigit: 3,
      reset: 'Daily',
      note: 'Replacement format: PLYYMMDD/R.1'
    },
    {
      id: 2,
      pages: ['Daily Problem'],
      prefix: 'DF',
      format: 'YYMMDD',
      sequenceDigit: 3,
      reset: 'Daily',
      note: ''
    }
  ]
};

const TABS = [
  { id: 'departments', label: 'Departments', icon: 'building-2', title: 'Departments', desc: 'Manage department list and codes used across the system.' },
  { id: 'categories', label: 'Category & Sub-Cat', icon: 'layers', title: 'Categories', desc: 'Manage product categories and sub-categories.' },
  { id: 'brands', label: 'Brand', icon: 'tag', title: 'Brands', desc: 'Manage product brands and OEM partners.' },
  { id: 'customers', label: 'Customer', icon: 'users', title: 'Customers', desc: 'Manage customer and client list.' },
  { id: 'pdfTemplates', label: 'PDF Templates', icon: 'printer', title: 'PDF FORM TEMPLATES', desc: 'Manage header details, codes, and revisions for system-generated PDF forms.' },
  { id: 'idFormats', label: 'ID Formats', icon: 'barcode', title: 'ID FORMAT CONFIGURATION', desc: 'Configure system-wide ID generation formats.' }
];

const AVAILABLE_PAGES = ['Plan from Planning', 'Production Planning', 'Daily Problem', 'Master Item', 'Equipment Registry', 'STD Process'];

export default function SettingConfig() {
  const [activeTab, setActiveTab] = useState('departments'); 
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [data, setData] = useState<any>(INITIAL_DATA);
  const [search, setSearch] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null); 
  const [pdfPreview, setPdfPreview] = useState({ isOpen: false, title: '', content: '' });
  const nodeRef = useRef(null);
  const [formData, setFormData] = useState<any>({ 
      name: '', code: '', dept: '', revision: '', 
      pages: [], prefix: '', format: 'YYMMDD', sequenceDigit: 3, reset: 'Daily', note: '' 
  });

  const handlePreviewPdf = (item: any) => {
    setPdfPreview({
      isOpen: true,
      title: item.name,
      content: `
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-8 border-b pb-8">
            <div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Standard Report Form</div>
              <div class="text-sm font-black text-[#003049] uppercase">FOR: ${item.dept}</div>
            </div>
            <div class="text-right">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Form Control No.</div>
              <div class="text-sm font-black text-[#003049] uppercase font-mono">${item.code}</div>
            </div>
          </div>
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-slate-50">
                <th class="border p-2 text-left">SUBJECT / PARAMETER</th>
                <th class="border p-2 text-center">VALUE</th>
                <th class="border p-2 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border p-2 text-left">Warehouse Capacity Usage</td><td class="border p-2 text-center">85%</td><td class="border p-2 text-center">NORMAL</td></tr>
              <tr><td class="border p-2 text-left">Daily SO Processed</td><td class="border p-2 text-center">245 Units</td><td class="border p-2 text-center">STABLE</td></tr>
              <tr><td class="border p-2 text-left">Pending Problem Reports</td><td class="border p-2 text-center">3 Items</td><td class="border p-2 text-center text-red-600 font-bold">ATTENTION</td></tr>
            </tbody>
          </table>
          <div class="grid grid-cols-3 gap-8 mt-12">
            <div class="text-center pt-4 border-t border-dashed">
                <div class="h-10"></div>
                <div class="text-[9px] font-bold text-slate-400 uppercase">PREPARED BY</div>
            </div>
            <div class="text-center pt-4 border-t border-dashed">
                <div class="h-10"></div>
                <div class="text-[9px] font-bold text-slate-400 uppercase">VERIFIED BY</div>
            </div>
            <div class="text-center pt-4 border-t border-dashed">
                <div class="h-10"></div>
                <div class="text-[9px] font-bold text-slate-400 uppercase">APPROVED BY (DCC)</div>
            </div>
          </div>
        </div>
      `
    });
  };

  const activeTabData = TABS.find(t => t.id === activeTab) || TABS[0];
  const currentList = data[activeTab] || [];

  const filteredList = useMemo(() => {
      return currentList.filter((item: any) => {
          const s = search.toLowerCase();
          if (activeTab === 'idFormats') {
              return (item.prefix?.toLowerCase().includes(s) || 
                      item.pages?.join(',').toLowerCase().includes(s));
          }
          return (item.name?.toLowerCase().includes(s) || 
                  item.code?.toLowerCase().includes(s) || 
                  item.dept?.toLowerCase().includes(s));
      });
  }, [currentList, search, activeTab]);

  const paginatedData = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  useEffect(() => { setCurrentPage(1); setSearch(''); }, [activeTab]);

  const handleOpenModal = (item: any = null) => {
    setEditingItem(item);
    setFormData(item ? { 
      name: item.name || '', code: item.code || '', dept: item.dept || '', revision: item.revision || '',
      pages: item.pages || [], prefix: item.prefix || '', format: item.format || 'YYMMDD',
      sequenceDigit: item.sequenceDigit || 3, reset: item.reset || 'Daily', note: item.note || ''
    } : { 
      name: '', code: '', dept: '', revision: '',
      pages: [], prefix: '', format: 'YYMMDD', sequenceDigit: 3, reset: 'Daily', note: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData((prev: any) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((item: any) => 
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      }));
      Swal.fire({icon: 'success', title: 'Updated Successfully', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500});
    } else {
      const newId = currentList.length > 0 ? Math.max(...currentList.map((i: any) => i.id)) + 1 : 1;
      setData((prev: any) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], { id: newId, ...formData }]
      }));
      Swal.fire({icon: 'success', title: 'Added Successfully', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500});
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = () => {
        setData((prev: any) => ({
            ...prev,
            [activeTab]: prev[activeTab].filter((item: any) => item.id !== id)
        }));
    };

    Swal.fire({
        title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
        showCancelButton: true, confirmButtonColor: '#c1121f', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            confirmDelete();
            Swal.fire({icon: 'success', title: 'Deleted!', text: 'Record has been deleted.', timer: 1500, showConfirmButton: false});
        }
    });
  };

  const togglePageSelection = (page: string) => {
      setFormData((prev: any) => {
          const pages = prev.pages || [];
          if (pages.includes(page)) return { ...prev, pages: pages.filter((p: string) => p !== page) };
          return { ...prev, pages: [...pages, page] };
      });
  };

  return (
      <div className="flex flex-col flex-1 min-h-0 w-full text-[#2e2d2e] relative font-sans animate-fadeIn pt-8">
        
        <GuideTrigger onClick={() => setIsGuideOpen(true)} />

        {/* Header Bar */}
        <header className="px-0 py-4 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 shrink-0 z-10">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 bg-white flex items-center justify-center shadow-[0_4px_15px_rgba(86,134,187,0.3)] border border-[#a0b1dd] rounded-xl text-[#5686bb]">
              <Icons.Settings2 size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <h1 className="text-2xl font-black tracking-tight uppercase flex gap-2">
                <span className="text-primary">SYSTEM</span>
                <span className="text-[#669bbc]">CONFIG</span>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-1.5 text-[#7188a2]">System Master Data Configuration</p>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full px-0 pb-10 flex flex-col gap-6 min-h-0 overflow-y-auto custom-scrollbar">
          
          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0 mb-2">
            <KpiCard label="Total Records" value={filteredList.length} icon="list" colorAccent="#5686bb" colorValue="#003049" desc={`In ${activeTabData.label}`} />
            <KpiCard label="System Categories" value={TABS.length} icon="layout-grid" colorAccent="#c1121f" colorValue="#003049" desc="Configuration Areas" />
            <KpiCard label="Recently Updated" value={new Date().toLocaleDateString('en-GB')} icon="clock" colorAccent="#f2b33d" colorValue="#ae1f23" desc="Latest Action" />
            <KpiCard label="Database Status" value="SYNCED" icon="check-circle" colorAccent="#849e51" colorValue="#849e51" desc="Real-time Active" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
            {/* Left Sidebar for Tabs */}
            <div className="w-full lg:w-72 shrink-0 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2 h-fit max-h-full">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#bcc4cf] p-5">
                    <h3 className="text-[12px] font-black text-[#003049] uppercase tracking-widest mb-5 px-2 border-b border-[#e9e4dc] pb-3">Registry Categories</h3>
                    <div className="flex flex-col gap-2">
                        {TABS.map(tab => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-left ${
                                        isActive 
                                        ? 'bg-primary text-white shadow-[0_4px_15px_rgba(0,48,73,0.2)]' 
                                        : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50 hover:border-blue-200 hover:text-primary'
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/10 text-accent' : 'bg-slate-50 border border-slate-100 text-blue-500'}`}>
                                        <LucideIcon name={tab.icon} size={16} />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="font-bold text-[12px] uppercase tracking-widest leading-none mb-1.5 truncate">{tab.label}</div>
                                        <div className={`text-[9px] font-mono truncate ${isActive ? 'text-slate-200' : 'text-slate-400'}`}>
                                            {data[tab.id]?.length || 0} Records
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#bcc4cf] flex flex-col flex-1 min-w-0 min-h-[400px]">
                
                {/* TOOLBAR */}
                <div className="px-6 py-5 border-b border-[#bcc4cf] flex flex-col md:flex-row justify-between items-center bg-[#f7f3ee] shrink-0 gap-4 rounded-t-2xl">
                  <div className="flex items-center gap-2 text-[14px] font-black text-primary uppercase tracking-widest">
                      <LucideIcon name={activeTabData.icon} size={18} className="text-[#c1121f]"/>
                      <span>{activeTabData.title} LIST</span>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                     <div className="relative w-full md:w-64 max-w-[300px]">
                        <Icons.Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5686bb]" />
                        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={`Search ${activeTabData.label}...`} className="w-full pl-11 pr-4 py-2 text-[12px] border border-[#a0b1dd] rounded-full font-bold outline-none focus:border-primary bg-white shadow-sm text-primary h-11" />
                     </div>
                     <button onClick={() => handleOpenModal()} className="bg-primary hover:bg-[#5686bb] text-white px-6 py-2.5 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-[0_4px_12px_rgba(86,134,187,0.3)] flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0 h-11">
                        <Icons.Plus size={16}/> ADD NEW
                     </button>
                  </div>
                </div>

                <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar bg-transparent flex flex-col">
                    {activeTab === 'idFormats' ? (
                      <table className="w-full text-left font-sans min-w-[900px] border-collapse relative">
                        <thead className="bg-primary border-b-[3px] border-[#c6a75e] sticky top-0 z-10 text-white font-mono uppercase tracking-wider text-[11px] font-black">
                          <tr>
                            <th className="py-4 px-6 pl-8 w-[25%] whitespace-nowrap">Pages</th>
                            <th className="py-4 px-6 text-center w-[15%] whitespace-nowrap">Prefix</th>
                            <th className="py-4 px-6 text-center w-[15%] whitespace-nowrap">Format</th>
                            <th className="py-4 px-6 text-center w-[15%] whitespace-nowrap">Digit & Reset</th>
                            <th className="py-4 px-6 w-[20%] whitespace-nowrap">Note</th>
                            <th className="py-4 px-6 pr-8 text-center w-[10%] whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {paginatedData.length > 0 ? paginatedData.map((item: any) => (
                            <tr key={item.id} className="hover:bg-[#f7f3ee]/80 transition-colors border-b border-[#e9e4dc] group h-[68px]">
                              <td className="py-3 px-6 pl-8 align-middle whitespace-nowrap">
                                <div className="flex flex-wrap gap-2">
                                    {item.pages?.map((p: string, i: number) => (
                                        <span key={i} className="bg-[#f7f3ee] text-[#003049] border border-[#bcc4cf] px-2.5 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-widest">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                              </td>
                              <td className="py-3 px-6 align-middle text-center whitespace-nowrap">
                                <span className="font-mono font-black text-[#c1121f] text-[13px]">{item.prefix}</span>
                              </td>
                              <td className="py-3 px-6 align-middle text-center whitespace-nowrap">
                                <span className="bg-[#f7f3ee] text-[#5686bb] px-3 py-1 rounded-md font-mono font-black text-[12px] uppercase tracking-widest border border-[#bcc4cf] shadow-sm">{item.format}</span>
                              </td>
                              <td className="py-3 px-6 align-middle text-center whitespace-nowrap">
                                <div className="flex flex-col items-center">
                                    <span className="font-black text-[#003049] text-[12px]">{item.sequenceDigit} Digits</span>
                                    <span className="text-[10px] text-[#7188a2] font-bold uppercase tracking-widest">Reset: {item.reset}</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 align-middle whitespace-nowrap">
                                <span className="text-[#7188a2] text-[12px] font-medium truncate max-w-[200px] inline-block" title={item.note}>{item.note || '-'}</span>
                              </td>
                              <td className="py-2.5 px-6 pr-8 align-middle text-center whitespace-nowrap">
                                <div className="flex justify-center items-center gap-0.5">
                                  <button onClick={() => handleOpenModal(item)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc4cf] text-[#5686bb] hover:border-[#a0b1dd] hover:text-[#003049] hover:bg-[#e9e4dc] transition-colors shadow-sm bg-[#f7f3ee]" title="Edit">
                                    <Icons.Pencil size={14} />
                                  </button>
                                  <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc4cf] text-[#c1121f] hover:border-[#c1121f] hover:bg-[#c1121f]/10 transition-colors shadow-sm bg-[#f7f3ee]" title="Delete">
                                    <Icons.Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={6} className="py-16 text-center text-[#7188a2] font-bold uppercase tracking-widest text-[12px] opacity-50">No records found. Click "Add New" to create one.</td></tr>
                          )}
                        </tbody>
                      </table>
                    ) : activeTab === 'pdfTemplates' ? (
                      <table className="w-full text-left font-sans min-w-[800px] border-collapse relative">
                        <thead className="bg-primary border-b-[3px] border-[#c6a75e] sticky top-0 z-10 text-white font-mono uppercase tracking-wider text-[11px] font-black">
                          <tr>
                            <th className="py-4 px-6 pl-8 w-[35%] whitespace-nowrap">Form Name</th>
                            <th className="py-4 px-6 text-center w-[20%] whitespace-nowrap">Department</th>
                            <th className="py-4 px-6 text-center w-[20%] whitespace-nowrap">Form Code</th>
                            <th className="py-4 px-6 text-center w-[15%] whitespace-nowrap">Revision</th>
                            <th className="py-4 px-6 text-center w-[10%] pr-8 whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {paginatedData.length > 0 ? paginatedData.map((item: any) => (
                            <tr key={item.id} className="hover:bg-[#f7f3ee]/80 transition-colors border-b border-[#e9e4dc] group h-[68px]">
                              <td className="py-3 px-6 pl-8 align-middle whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-[#5686bb]"></div>
                                  <span className="font-bold text-[#003049] text-[13px] uppercase">{item.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 align-middle text-center whitespace-nowrap">
                                <span className="font-bold text-[#5686bb] text-[12px] uppercase">{item.dept}</span>
                              </td>
                              <td className="py-3 px-6 align-middle text-center whitespace-nowrap">
                                <span className="bg-[#f7f3ee] text-[#003049] px-3 py-1 rounded-md font-mono font-black text-[12px] uppercase tracking-widest border border-[#bcc4cf] shadow-sm">{item.code}</span>
                              </td>
                              <td className="py-3 px-6 align-middle text-center whitespace-nowrap">
                                <span className="font-black text-[#c1121f] text-[12px] font-mono">{item.revision}</span>
                              </td>
                              <td className="py-2.5 px-6 pr-8 align-middle text-center whitespace-nowrap">
                                <div className="flex justify-center items-center gap-0.5">
                                  <button onClick={() => handlePreviewPdf(item)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc4cf] text-[#db9e32] hover:border-[#db9e32] hover:bg-[#db9e32]/10 transition-colors shadow-sm bg-[#f7f3ee]" title="Preview PDF">
                                    <Icons.Eye size={14} />
                                  </button>
                                  <button onClick={() => handleOpenModal(item)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc4cf] text-[#5686bb] hover:border-[#a0b1dd] hover:text-[#003049] hover:bg-[#e9e4dc] transition-colors shadow-sm bg-[#f7f3ee]" title="Edit">
                                    <Icons.Pencil size={14} />
                                  </button>
                                  <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc4cf] text-[#c1121f] hover:border-[#c1121f] hover:bg-[#c1121f]/10 transition-colors shadow-sm bg-[#f7f3ee]" title="Delete">
                                    <Icons.Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={5} className="py-16 text-center text-[#7188a2] font-bold uppercase tracking-widest text-[12px] opacity-50">No records found. Click "Add New" to create one.</td></tr>
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <table className="w-full text-left font-sans min-w-[600px] border-collapse relative">
                        <thead className="bg-primary border-b-[3px] border-[#c6a75e] sticky top-0 z-10 text-white font-mono uppercase tracking-wider text-[11px] font-black">
                          <tr>
                            <th className="py-4 px-6 pl-8 w-[50%] whitespace-nowrap">Name</th>
                            {activeTab === 'departments' && <th className="py-4 px-6 text-center w-[25%] whitespace-nowrap">Code</th>}
                            <th className="py-4 px-6 pr-8 text-center w-[25%] whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {paginatedData.length > 0 ? paginatedData.map((item: any) => (
                            <tr key={item.id} className="hover:bg-[#f7f3ee]/80 transition-colors border-b border-[#e9e4dc] group h-[68px]">
                              <td className="py-3 px-6 pl-8 align-middle whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-[#5686bb]"></div>
                                  <span className="font-bold text-[#003049] text-[13px] uppercase">{item.name}</span>
                                </div>
                              </td>
                              {activeTab === 'departments' && (
                                <td className="py-3 px-6 align-middle text-center whitespace-nowrap">
                                  <span className="bg-[#f7f3ee] text-[#003049] px-3 py-1 rounded-md font-mono font-black text-[12px] uppercase tracking-widest border border-[#bcc4cf] shadow-sm">{item.code}</span>
                                </td>
                              )}
                              <td className="py-2.5 px-6 pr-8 align-middle text-center whitespace-nowrap">
                                <div className="flex justify-center items-center gap-0.5">
                                  <button onClick={() => handleOpenModal(item)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc4cf] text-[#5686bb] hover:border-[#a0b1dd] hover:text-[#003049] hover:bg-[#e9e4dc] transition-colors shadow-sm bg-[#f7f3ee]" title="Edit">
                                    <Icons.Pencil size={14} />
                                  </button>
                                  <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bcc4cf] text-[#c1121f] hover:border-[#c1121f] hover:bg-[#c1121f]/10 transition-colors shadow-sm bg-[#f7f3ee]" title="Delete">
                                    <Icons.Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={activeTab === 'departments' ? 3 : 2} className="py-16 text-center text-[#7188a2] font-bold uppercase tracking-widest text-[12px] opacity-50">No records found. Click "Add New" to create one.</td></tr>
                          )}
                        </tbody>
                      </table>
                    )}
                </div>
                
                {/* Pagination */}
                <div className="p-4 bg-[#f7f3ee] border-t border-[#bcc4cf] flex justify-between items-center font-bold text-[#7188a2] uppercase tracking-widest shrink-0 font-mono text-[10px] rounded-b-2xl">
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
                        <div>TOTAL {filteredList.length} ITEMS</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-2 border border-[#bcc4cf] bg-white rounded-lg transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#e9e4dc] text-[#003049] shadow-sm'}`}><Icons.ChevronLeft size={16}/></button>
                        <div className="bg-white border border-[#bcc4cf] px-5 py-2.5 rounded-lg shadow-sm text-[#003049] font-black min-w-[120px] text-center uppercase tracking-widest">PAGE {currentPage} OF {totalPages || 1}</div>
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className={`p-2 border border-[#bcc4cf] bg-white rounded-lg transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#e9e4dc] text-[#003049] shadow-sm'}`}><Icons.ChevronRight size={16}/></button>
                    </div>
                </div>
            </div>
          </div>
        </main>

        {/* --- Add/Edit Modal --- */}
        {isModalOpen && createPortal(
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={()=>setIsModalOpen(false)} />
            <Draggable nodeRef={nodeRef} handle=".modal-drag-handle">
              <div ref={nodeRef} className="bg-[#f7f3ee] rounded-2xl shadow-2xl w-full max-w-[600px] flex flex-col overflow-hidden relative border border-[#bcc4cf] max-h-[85vh] animate-fadeIn pointer-events-auto">
                 
                 {/* Modal Header */}
                 <div className="modal-drag-handle cursor-move px-5 py-3 flex justify-between items-center shrink-0 border-b border-[#bcc4cf] bg-white">
                    <div className="flex items-center gap-4 pointer-events-none">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#a0b1dd] text-[#c1121f] flex items-center justify-center shadow-sm">
                            <Icons.Settings2 size={20} />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-black text-primary uppercase tracking-widest leading-none">{editingItem ? `EDIT ITEM` : `NEW ITEM`}</h3>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1.5">{activeTabData.title}</p>
                        </div>
                    </div>
                    <button onClick={()=>setIsModalOpen(false)} className="w-8 h-8 rounded-xl bg-[#f7f3ee] border border-[#bcc4cf] text-[#7188a2] flex items-center justify-center hover:bg-[#c1121f] hover:text-white hover:border-[#c1121f] transition-all"><Icons.X size={16} /></button>
                 </div>
                 
                 {/* Modal Body */}
               <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#f7f3ee]">
                  <form id="configForm" onSubmit={handleSave} className="bg-white p-6 rounded-[16px] border border-[#bcc4cf] shadow-sm grid grid-cols-2 gap-x-6 gap-y-4">
                    <div className="col-span-2 border-b border-[#e9e4dc] pb-2 mb-1">
                        <h4 className="text-[12px] font-black text-primary uppercase tracking-widest">General Information</h4>
                    </div>

                    {activeTab === 'idFormats' ? (
                      <>
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">APPLICABLE PAGES <span className="text-[#c1121f]">*</span></label>
                          <div className="grid grid-cols-2 gap-2 bg-[#f7f3ee] p-4 rounded-xl border border-[#bcc4cf]">
                              {AVAILABLE_PAGES.map(page => (
                                  <label key={page} className="flex items-center gap-3 cursor-pointer">
                                      <input 
                                        type="checkbox" 
                                        checked={formData.pages.includes(page)} 
                                        onChange={() => togglePageSelection(page)}
                                        className="w-4 h-4 rounded border-[#a0b1dd] text-[#c1121f] focus:ring-[#c1121f]"
                                      />
                                      <span className="text-[11px] font-bold text-[#003049]">{page}</span>
                                  </label>
                              ))}
                          </div>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">PREFIX <span className="text-[#c1121f]">*</span></label>
                          <input 
                            type="text" required value={formData.prefix} onChange={(e) => setFormData({...formData, prefix: e.target.value.toUpperCase()})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] font-mono outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd] uppercase"
                            placeholder="e.g. PL, DF"
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">FORMAT <span className="text-[#c1121f]">*</span></label>
                          <select 
                            required value={formData.format} onChange={(e) => setFormData({...formData, format: e.target.value})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] font-mono outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd] uppercase cursor-pointer"
                          >
                              <option value="YYMMDD">YYMMDD</option>
                              <option value="YYYYMMDD">YYYYMMDD</option>
                              <option value="YYMM">YYMM</option>
                              <option value="YYYYMM">YYYYMM</option>
                          </select>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">SEQUENCE DIGITS <span className="text-[#c1121f]">*</span></label>
                          <select 
                            required value={formData.sequenceDigit} onChange={(e) => setFormData({...formData, sequenceDigit: Number(e.target.value)})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd] cursor-pointer"
                          >
                              <option value={2}>2 Digits (01, 02...)</option>
                              <option value={3}>3 Digits (001, 002...)</option>
                              <option value={4}>4 Digits (0001, 0002...)</option>
                              <option value={5}>5 Digits (00001...)</option>
                          </select>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">RESET FREQUENCY <span className="text-[#c1121f]">*</span></label>
                          <select 
                            required value={formData.reset} onChange={(e) => setFormData({...formData, reset: e.target.value})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd] cursor-pointer"
                          >
                              <option value="Daily">Daily</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                              <option value="Never">Never</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">NOTE / SPECIAL RULES</label>
                          <input 
                            type="text" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd]"
                            placeholder="e.g. Replacement format: PLYYMMDD/R.1"
                          />
                        </div>
                      </>
                    ) : activeTab === 'pdfTemplates' ? (
                      <>
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">FORM NAME <span className="text-[#c1121f]">*</span></label>
                          <input 
                            type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd]"
                            placeholder="e.g. DAR FORM..."
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">DEPARTMENT NAME <span className="text-[#c1121f]">*</span></label>
                          <input 
                            type="text" required value={formData.dept} onChange={(e) => setFormData({...formData, dept: e.target.value})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd] uppercase"
                            placeholder="e.g. DC CENTER..."
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">FORM CODE <span className="text-[#c1121f]">*</span></label>
                          <input 
                            type="text" required value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] font-mono outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd] uppercase"
                            placeholder="e.g. FM-DC01-01"
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">REVISION <span className="text-[#c1121f]">*</span></label>
                          <input 
                            type="text" required value={formData.revision} onChange={(e) => setFormData({...formData, revision: e.target.value})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] font-mono outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd] uppercase"
                            placeholder="e.g. REV. 02"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">NAME <span className="text-[#c1121f]">*</span></label>
                          <input 
                            type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd]"
                            placeholder="Enter name..."
                          />
                        </div>
                        {activeTab === 'departments' && (
                          <div className="col-span-2">
                            <label className="text-[10px] font-black text-[#7188a2] uppercase tracking-widest block mb-2">CODE <span className="text-[#c1121f]">*</span></label>
                            <input 
                              type="text" required value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} 
                              className="w-full h-[40px] border border-[#bcc4cf] bg-[#f7f3ee] rounded-xl px-4 text-[12px] font-bold text-[#003049] font-mono outline-none focus:border-[#5686bb] focus:bg-white transition-all hover:border-[#a0b1dd] uppercase"
                              placeholder="e.g. MGT, HR, IT..."
                            />
                          </div>
                        )}
                      </>
                    )}
                  </form>
               </div>

               {/* Modal Footer */}
               <div className="p-5 bg-white border-t border-[#bcc4cf] flex justify-end gap-3 shrink-0 shadow-[0_-4px_15px_rgba(0,0,0,0.02)] z-20">
                  <button type="button" onClick={()=>setIsModalOpen(false)} className="px-5 py-2 text-[#7188a2] hover:text-[#003049] font-black text-[10px] uppercase tracking-widest transition-colors border border-transparent rounded-xl bg-white hover:bg-[#f7f3ee]">CANCEL</button>
                  <button type="submit" form="configForm" className="px-6 py-2 bg-[#003049] hover:bg-[#2e395f] text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-[0_4px_12px_rgba(0,48,73,0.3)] transition-all active:scale-95 flex items-center gap-2"><Icons.Save size={14}/> SAVE RECORD</button>
               </div>
              </div>
            </Draggable>
          </div>,
          document.body
        )}
        {/* --- PDF Preview Modal --- */}
        <PdfPreviewer 
          isOpen={pdfPreview.isOpen} 
          onClose={() => setPdfPreview({ ...pdfPreview, isOpen: false })} 
          title={pdfPreview.title} 
          htmlContent={pdfPreview.content} 
        />
      </div>
  );
}
