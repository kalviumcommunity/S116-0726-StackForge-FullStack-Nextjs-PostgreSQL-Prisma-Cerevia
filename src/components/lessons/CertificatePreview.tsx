'use client';

import { Award, ShieldCheck, CheckCircle2, Lock, ExternalLink } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export function CertificatePreview({ isCompleted }: { isCompleted: boolean }) {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              Verified Credential
            </span>
            <p className="text-xs font-bold text-white">Course Completion Certificate</p>
          </div>
        </div>

        <span className="text-xs font-semibold text-zinc-400">
          {isCompleted ? 'Unlocked 🎓' : 'Locked 🔒'}
        </span>
      </div>

      {/* Certificate Graphic Box */}
      <div className="relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 space-y-4 text-center select-none shadow-xl">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <ShieldCheck className="h-6 w-6 text-amber-400" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">
            CERTIFICATE OF MASTERY
          </p>
          <h4 className="text-lg font-black text-white">
            {user?.fullName || 'Student Engineer'}
          </h4>
          <p className="text-xs text-zinc-400">
            Has successfully completed the Full-Stack Engineering & Microservices Syllabus in Cerevia.
          </p>
        </div>

        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
          <span>ID: CER-2026-9842</span>
          <span>SHA-256 Verified</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-end">
        {isCompleted ? (
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition-all shadow-md">
            <ExternalLink className="h-4 w-4" />
            <span>Download Verified Certificate (PDF)</span>
          </button>
        ) : (
          <p className="text-xs text-zinc-500 italic">
            Complete all lessons and pass the concept quiz to unlock your verifiable certificate.
          </p>
        )}
      </div>

    </div>
  );
}
