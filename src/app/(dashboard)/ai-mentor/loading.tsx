import { Loader2 } from 'lucide-react';

export default function AIMentorLoading() {
  return (
    <div className="flex h-[500px] items-center justify-center bg-slate-50/60">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}
