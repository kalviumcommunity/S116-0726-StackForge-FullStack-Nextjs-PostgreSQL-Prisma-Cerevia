'use client';

import {
  Award,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export function CertificatePreview({ isCompleted }: { isCompleted: boolean }) {
  const { user } = useAuth();

  return (
    <div className="relative space-y-6 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              Verified Credential
            </span>
            <p className="text-xs font-bold text-white">
              Course Completion Certificate
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-zinc-400">
          {isCompleted ? 'Unlocked 🎓' : 'Locked 🔒'}
        </span>
      </div>

      {/* Certificate Graphic Box */}
      <div className="relative select-none space-y-4 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 text-center shadow-xl">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
            <ShieldCheck className="h-6 w-6 text-amber-400" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
            CERTIFICATE OF MASTERY
          </p>
          <h4 className="text-lg font-black text-white">
            {user?.fullName || 'Student Engineer'}
          </h4>
          <p className="text-xs text-zinc-400">
            Has successfully completed the Full-Stack Engineering &
            Microservices Syllabus in Cerevia.
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2 font-mono text-[10px] text-zinc-500">
          <span>ID: CER-2026-9842</span>
          <span>SHA-256 Verified</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-2">
        {isCompleted ? (
          <button className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 shadow-md transition-all hover:bg-amber-400">
            <ExternalLink className="h-4 w-4" />
            <span>Download Verified Certificate (PDF)</span>
          </button>
        ) : (
          <p className="text-xs italic text-zinc-500">
            Complete all lessons and pass the concept quiz to unlock your
            verifiable certificate.
          </p>
        )}
      </div>
    </div>
  );
}
