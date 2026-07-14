import { Skeleton } from '@/components/ui/Skeleton';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';

export default function ProfileLoading() {
  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2 pb-6 border-b border-border">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left card skeleton */}
          <Section>
            <div className="flex flex-col items-center text-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
              <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-border/40">
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-4.5 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-4.5 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </Section>

          {/* Right form card skeleton */}
          <div className="md:col-span-2">
            <Section>
              <div className="space-y-6">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-4 w-64" />
                
                <div className="grid gap-4 sm:grid-cols-2 pt-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </Section>
          </div>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
