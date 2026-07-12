export default function Loading() {
  return (
    <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border">
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <div className="h-7 w-48 bg-secondary rounded-lg" />
          <div className="h-4 w-72 bg-secondary rounded-md" />
        </div>
        <div className="h-10 w-28 bg-secondary rounded-lg mt-4 sm:mt-0 shrink-0" />
      </div>

      {/* Content grid skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 bg-secondary rounded" />
            <div className="h-5 w-5 bg-secondary rounded-full" />
          </div>
          <div className="h-8 w-16 bg-secondary rounded-lg" />
          <div className="h-3 w-36 bg-secondary rounded" />
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 bg-secondary rounded" />
            <div className="h-5 w-5 bg-secondary rounded-full" />
          </div>
          <div className="h-8 w-24 bg-secondary rounded-lg" />
          <div className="h-3 w-40 bg-secondary rounded" />
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-border p-6 space-y-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 bg-secondary rounded" />
            <div className="h-5 w-5 bg-secondary rounded-full" />
          </div>
          <div className="h-8 w-12 bg-secondary rounded-lg" />
          <div className="h-3 w-28 bg-secondary rounded" />
        </div>
      </div>

      {/* Large table area skeleton */}
      <div className="flex-1 border border-border rounded-xl p-6 space-y-4">
        <div className="h-5 w-32 bg-secondary rounded" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-2">
              <div className="h-8 w-8 bg-secondary rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-secondary rounded" />
                <div className="h-3 w-1/4 bg-secondary rounded" />
              </div>
              <div className="h-6 w-12 bg-secondary rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
