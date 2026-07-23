'use client';

import { UploadCloud, FileText, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function FileUploadZone() {
  const [files, setFiles] = useState([
    { name: 'Distributed_Systems_Lecture_Notes.pdf', size: '2.4 MB' },
    { name: 'Prisma_Schema_Queries.ts', size: '14 KB' },
  ]);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
          <UploadCloud className="h-3.5 w-3.5" />
          <span>Multimodal Document Ingestion</span>
        </div>
        <h3 className="text-xl font-extrabold text-white tracking-tight">
          AI Document & File Analysis
        </h3>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/40 p-8 text-center space-y-3 hover:border-blue-500/50 transition-colors cursor-pointer">
        <UploadCloud className="h-10 w-10 text-blue-400 m-auto" />
        <div>
          <p className="text-xs sm:text-sm font-bold text-white">Drag & Drop PDFs, Notes, or Code Files</p>
          <p className="text-[10px] text-zinc-500 font-mono">Supports PDF, TXT, TS, JS, PY, PNG (Max 25MB)</p>
        </div>
      </div>

      <div className="space-y-2">
        {files.map((f, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span>{f.name}</span>
            </span>
            <span className="text-[10px] text-zinc-500">{f.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
