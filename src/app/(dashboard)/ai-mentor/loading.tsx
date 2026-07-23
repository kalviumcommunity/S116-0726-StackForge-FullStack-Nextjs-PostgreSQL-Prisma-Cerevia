import { Loader2 } from 'lucide-react';

export default function AIMentorLoading() {
  return (
    <div className="flex h-[500px] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
}
