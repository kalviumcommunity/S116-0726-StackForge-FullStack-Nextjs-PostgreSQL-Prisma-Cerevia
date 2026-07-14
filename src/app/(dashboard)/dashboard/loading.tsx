import { Skeleton } from '@/components/ui/Skeleton';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';

export default function DashboardLoading() {
  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2 pb-6 border-b border-border">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* Info Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Section key={i}>
              <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </Section>
          ))}
        </div>

        {/* Large Main Area Skeleton */}
        <Section>
          <div className="flex flex-col items-center justify-center p-12 text-center min-h-[300px] gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-9 w-28 rounded-lg mt-2" />
          </div>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
}
