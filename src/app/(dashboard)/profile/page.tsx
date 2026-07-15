import { Metadata } from 'next';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { Trophy, Flame, Star, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Profile | Cerevia',
  description: 'View your Cerevia profile and learning statistics.',
};

export default function ProfilePage() {
  const user = {
    name: 'Hardi',
    email: 'hardi@example.com',
    joinedDate: 'September 2023',
    location: 'India',
    bio: 'Full Stack Developer learning Next.js App Router and loving the process of building scalable web applications.'
  };

  const stats = [
    { label: 'Total XP', value: '2,450', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Current Streak', value: '14 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Lessons Completed', value: '28', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Achievements', value: '12', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your public profile and view your learning statistics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileCard user={user} />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Learning Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="rounded-lg border border-border bg-secondary/50 p-4 flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Completed Lesson: Next.js Routing</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <span className="text-sm font-medium text-purple-500">+50 XP</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Earned Achievement: 7 Day Streak</p>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
                <span className="text-sm font-medium text-purple-500">+100 XP</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Completed Quiz: React Fundamentals</p>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
                <span className="text-sm font-medium text-purple-500">+30 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
