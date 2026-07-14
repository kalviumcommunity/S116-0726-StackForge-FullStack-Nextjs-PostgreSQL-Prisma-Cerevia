import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { User, Shield } from 'lucide-react';

export default function ProfilePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Student Profile"
        description="View your learning stats, edit profile details, and manage configuration."
      />

      <ContentWrapper className="grid gap-6 md:grid-cols-3">
        {/* Left side card: Profile preview */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar fallback="Amit Sharma" size="lg" className="h-20 w-20 border-2 border-primary" />
            <h3 className="text-base font-bold text-foreground mt-3">Amit Sharma</h3>
            <p className="text-xs text-muted-foreground">student@byjus.com</p>

            <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t border-border/40 text-xs">
              <div className="flex flex-col items-center p-3 rounded-lg bg-muted/10">
                <span className="text-muted-foreground mb-0.5">Total XP</span>
                <span className="font-bold text-orange-500 text-sm">2,450 XP</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-lg bg-muted/10">
                <span className="text-muted-foreground mb-0.5">Current Streak</span>
                <span className="font-bold text-orange-500 text-sm">12 Days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right side card: Details editor */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span>Personal Details</span>
            </CardTitle>
            <CardDescription>
              Provide your details so classmates can identify you on the weekly leaderboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First Name" defaultValue="Amit" placeholder="First Name" />
              <Input label="Last Name" defaultValue="Sharma" placeholder="Last Name" />
            </div>
            <Input label="Email Address" defaultValue="student@byjus.com" disabled />
          </CardContent>
          <CardFooter className="justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Strict Mode Security Active</span>
            </div>
            <Button variant="primary" size="sm">
              <span>Save Changes</span>
            </Button>
          </CardFooter>
        </Card>
      </ContentWrapper>
    </PageContainer>
  );
}
