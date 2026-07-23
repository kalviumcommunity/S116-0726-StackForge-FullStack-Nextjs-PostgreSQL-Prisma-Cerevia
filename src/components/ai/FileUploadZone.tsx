'use client';

import { UploadCloud, FileText } from 'lucide-react';
import { useState } from 'react';

export function FileUploadZone() {
  const [files] = useState([
    { name: 'Distributed_Systems_Lecture_Notes.pdf', size: '2.4 MB' },
    { name: 'Prisma_Schema_Queries.ts', size: '14 KB' },
  ]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
          <UploadCloud className="h-3.5 w-3.5 text-blue-600" />
          <span>Multimodal Document Ingestion</span>
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
          AI Document Analysis
        </h3>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 text-center space-y-2 hover:border-blue-300 transition-colors cursor-pointer">
        <UploadCloud className="h-8 w-8 text-blue-600 m-auto" />
        <div>
          <p className="text-xs font-bold text-slate-900">Drag & Drop PDFs, Notes, or Code Files</p>
          <p className="text-[10px] text-slate-400 font-mono">Supports PDF, TXT, TS, JS, PY, PNG (Max 25MB)</p>
        </div>
      </div>

      <div className="space-y-2">
        {files.map((f, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-700">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>{f.name}</span>
            </span>
            <span className="text-[10px] text-slate-400">{f.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
