import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import { X, Printer, Download, Eye } from 'lucide-react';

interface PdfPreviewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  htmlContent: string;
}

export function PdfPreviewer({ isOpen, onClose, title, htmlContent }: PdfPreviewerProps) {
  const nodeRef = useRef(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    const windowPrint = window.open('', '', 'width=900,height=650');
    if (!windowPrint) return;
    windowPrint.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #111f42; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #111f42; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-weight: 900; font-size: 24px; color: #c1121f; }
            .title { font-weight: 900; font-size: 18px; text-transform: uppercase; letter-spacing: 2px; }
            .date { font-size: 12px; color: #64748b; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #f8fafc; text-align: left; padding: 12px; font-size: 10px; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
            td { padding: 12px; font-size: 12px; border-bottom: 1px solid #f1f5f9; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">WMS MASTER</div>
            <div>
              <div class="title">${title}</div>
              <div class="date">Printed on: ${new Date().toLocaleString()}</div>
            </div>
          </div>
          ${htmlContent}
        </body>
      </html>
    `);
    windowPrint.document.close();
    windowPrint.focus();
    setTimeout(() => {
      windowPrint.print();
      windowPrint.close();
    }, 500);
  };

  return createPortal(
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <Draggable nodeRef={nodeRef} handle=".pdf-drag-handle">
        <div 
          ref={nodeRef} 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden relative border border-slate-200 pointer-events-auto"
        >
          {/* Header */}
          <div className="pdf-drag-handle cursor-move bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <Printer size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#003049] uppercase tracking-widest leading-none">
                  PDF PREVIEW: {title}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                  Standardized Document View
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handlePrint} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 group" title="Print">
                <Printer size={18} />
              </button>
              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600" title="Download">
                <Download size={18} />
              </button>
              <div className="w-px h-6 bg-slate-200 mx-1" />
              <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-slate-400">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* PDF Viewport */}
          <div className="flex-1 bg-slate-100 p-8 overflow-auto flex justify-center">
             <div className="bg-white w-[210mm] min-h-[297mm] shadow-[0_0_50px_rgba(0,0,0,0.1)] p-[20mm] font-serif text-[#111f42]">
                <div className="flex justify-between items-center border-b-2 border-[#111f42] pb-6 mb-8">
                  <div className="text-2xl font-black text-[#c1121f] italic tracking-tighter">WMS MASTER</div>
                  <div className="text-right">
                    <div className="text-lg font-black uppercase tracking-widest">{title}</div>
                    <div className="text-[10px] text-slate-500 font-sans tracking-widest mt-1 italic">T ALL INTELLIGENCE SYSTEM GENERATED</div>
                  </div>
                </div>
                
                <div className="font-sans" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                
                <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-end italic text-[10px] text-slate-400 font-sans">
                  <div>Document Revision: REV.02 | FM-SYS-001</div>
                  <div>Page 1 of 1</div>
                </div>
             </div>
          </div>
        </div>
      </Draggable>
    </div>,
    document.body
  );
}
