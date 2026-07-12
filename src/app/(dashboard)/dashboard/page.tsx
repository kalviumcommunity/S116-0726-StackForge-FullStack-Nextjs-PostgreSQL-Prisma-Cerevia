import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Sparkles } from 'lucide-react';

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard Overview"
        description="Monitor your learning momentum, consecutive active days, and competitive standing."
        actions={
          <div className="flex items-center gap-2 text-xs font-medium text-orange-500 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full select-none">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Streaks Active</span>
          </div>
        }
      />

      <ContentWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Information Card 1 */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-2">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Daily Streak System
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Complete at least one lesson every 24 hours to keep your learning streak alive. Streaks are automatically incremented and saved upon lesson completion.
            </p>
          </div>

          {/* Information Card 2 */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-2">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Weekly Leaderboards
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Earn score multipliers by answering correctly and competing against classmates. The public ranking is cached dynamically to minimize database overhead.
            </p>
          </div>

          {/* Information Card 3 */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-2 md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Progress Indicators
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Unlock unique milestone badges as your learning consistency grows. Check your rank and lessons page using the left navigation menu.
            </p>
          </div>
        </div>

        {/* Empty State placeholder layout */}
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border rounded-xl p-12 text-center bg-muted/5 min-h-[300px]">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-4">
            <Sparkles className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">
            Active Learning Panel
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-6">
            Dashboard visual controls, streak metrics, and weekly leaderboard scores will populate this section in the next development phase.
          </p>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
