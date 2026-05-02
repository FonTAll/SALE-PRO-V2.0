import React from 'react';
import { createPortal } from 'react-dom';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function UserGuidePanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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
                                <Icons.ShieldCheck size={18} className="text-[#5686bb]"/> PERMISSION GUIDE
                            </h3>
                            <button onClick={onClose} className="p-1.5 text-[#7188a2] hover:text-[#c1121f] rounded-full transition-colors"><Icons.X size={20}/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6 text-[#7188a2] leading-relaxed text-[12px]">
                            <section>
                                <h4 className="text-sm font-black text-primary mb-3 uppercase flex items-center gap-2 border-b border-[#bcc4cf] pb-2 font-mono">
                                    <Icons.LayoutGrid size={16} className="text-[#c1121f]"/> 1. Module Registry
                                </h4>
                                <p className="text-[#2e2d2e] mb-2">หน้านี้ใช้สำหรับตั้งค่าความปลอดภัยระดับเมนู (Module Confidentiality):</p>
                                <ul className="list-disc list-outside ml-4 space-y-2 text-[#2e2d2e]">
                                    <li><strong>Public Access (สีฟ้า):</strong> เมนูทั่วไป พนักงานจะได้รับสิทธิ์ขั้นต่ำ (Viewer) ทันทีเมื่อสร้างบัญชี</li>
                                    <li><strong>Restricted Access (สีแดง):</strong> เมนูความลับ (ถูกล็อก) ต้องมีการกำหนดสิทธิ์ให้พนักงานเป็นรายบุคคลเท่านั้น ถึงจะมองเห็นเมนูนี้ได้</li>
                                </ul>
                            </section>
                            <section>
                                <h4 className="text-sm font-black text-primary mb-3 uppercase flex items-center gap-2 border-b border-[#bcc4cf] pb-2 font-mono">
                                    <Icons.Users size={16} className="text-[#c1121f]"/> 2. Staff Access
                                </h4>
                                <p className="text-[#2e2d2e] mb-2">หน้าสำหรับตรวจสอบและกำหนดสิทธิ์ให้ผู้ใช้งาน:</p>
                                <ul className="list-decimal list-outside ml-4 space-y-2 text-[#2e2d2e]">
                                    <li><strong>Summary Matrix:</strong> ดูภาพรวมตารางไขว้ (Cross-tab) ว่าผู้ใช้คนไหนมีสิทธิ์ระดับใดในแต่ละโมดูล (อิงตามสีและไอคอน)</li>
                                    <li><strong>List View:</strong> ค้นหาและดูรายชื่อผู้ใช้งาน เมื่อกดที่ปุ่มฟันเฟืองจะสามารถแก้ไขสิทธิ์เชิงลึกได้</li>
                                    <li><strong>Permission Levels:</strong> แบ่งเป็น No Access (ปิดกั้น), Viewer (ดู), Editor (แก้ไข), Verifier (ตรวจสอบ), Approver (อนุมัติ)</li>
                                </ul>
                            </section>
                        </div>
                        <div className="p-6 bg-[#e9e4dc]/50 border-t border-[#bcc4cf] flex justify-end shadow-inner">
                            <button onClick={onClose} className="px-8 py-3 bg-[#5686bb] text-white font-black rounded-lg uppercase font-mono text-[11px] hover:bg-primary transition-all shadow-sm">เข้าใจแล้ว / ปิด</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>, document.body
    );
}
