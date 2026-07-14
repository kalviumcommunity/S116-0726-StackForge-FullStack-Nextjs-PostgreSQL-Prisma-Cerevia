import { Skeleton } from '@/components/ui/Skeleton';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';

export default function SettingsLoading() {
  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2 pb-6 border-b border-border">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <Section>
            <div className="space-y-4">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-3 pt-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </Section>

          {/* Card 2 */}
          <Section>
            <div className="space-y-4">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-3 pt-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </Section>

          {/* Card 3 */}
          <div className="md:col-span-2">
            <Section>
              <div className="space-y-4">
                <Skeleton className="h-5 w-24" />
                <div className="space-y-3 pt-2 max-w-xl">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-28 rounded-lg" />
                </div>
              </div>
            </Section>
          </div>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
