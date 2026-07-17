'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trophy, Flame, Star, BookOpen, Mail, Calendar, User as UserIcon, Loader2, Sparkles, Activity } from 'lucide-react';
import api from '@/services/api';
import Link from 'next/link';

interface ActivityItem {
  id: string;
  xpEarned: number;
  reason: string;
  timestamp: string;
}

interface ProfileData {
  createdAt?: string;
  totalXP?: number;
  currentStreak?: number;
  fullName?: string;
  avatar?: string;
  bio?: string;
  email?: string;
}

interface XpData {
  levelInfo?: {
    level: number;
  };
  history?: ActivityItem[];
}

interface LessonProgressResponse {
  totalCompleted: number;
  remainingLessons: { id: string }[];
}

interface UserStats {
  completedCount: number;
  totalCount: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [xpData, setXpData] = useState<XpData | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        const [profileRes, xpRes, progressRes] = await Promise.all([
          api.get<ProfileData>('/api/user/profile'),
          api.get<XpData>('/api/user/xp?limit=5'),
          api.get<LessonProgressResponse>('/api/lessons/progress'),
        ]);

        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
        }
        if (xpRes.success && xpRes.data) {
          setXpData(xpRes.data);
        }
        if (progressRes.success && progressRes.data) {
          setStats({
            completedCount: progressRes.data.totalCompleted,
            totalCount: progressRes.data.totalCompleted + progressRes.data.remainingLessons.length,
          });
        }
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfileData();
  }, []);

  const joinedDate = profile?.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown';

  const statItems = [
    { label: 'Total Experience', value: `${profile?.totalXP || 0} XP`, icon: Star, color: 'text-primary', bg: 'bg-primary/10 border border-primary/20' },
    { label: 'Current Streak', value: `${profile?.currentStreak || 0} Days`, icon: Flame, color: 'text-primary', bg: 'bg-primary/10 border border-primary/20' },
    { label: 'Completed Modules', value: stats ? `${stats.completedCount} / ${stats.totalCount}` : '...', icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10 border border-primary/20' },
    { label: 'Syllabus Level', value: `Level ${xpData?.levelInfo?.level || 1}`, icon: Trophy, color: 'text-primary', bg: 'bg-primary/10 border border-primary/20' },
  ];

  if (loading) {
    return (
      <PageContainer>
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Student Profile"
        description="Review your backend credentials, level stats, and syllabus progress."
      />

      <ContentWrapper className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar & Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-none border border-border/10 bg-[#090909] overflow-hidden shadow-none">
            <div className="h-24 bg-gradient-to-r from-[#111] to-[#181818] relative border-b border-border/10" />
            
            <div className="px-6 pb-6 relative">
              <div className="flex justify-between items-end -mt-12 mb-4">
                <div className="h-24 w-24 rounded-none border border-primary/20 bg-black flex items-center justify-center overflow-hidden relative">
                  {profile?.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.avatar} alt={profile.fullName || 'User'} className="h-full w-full object-cover" />
                  ) : (
                    <UserIcon className="h-10 w-10 text-primary/70" />
                  )}
                </div>
                <Link href="/settings">
                  <Button variant="outline" size="sm" className="mb-2 rounded-none border-border/10 text-muted-foreground hover:text-white hover:border-primary/25 bg-transparent font-sans uppercase tracking-[0.15em] text-[10px] duration-300">
                    Edit Profile
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-serif font-light text-white tracking-wide">{profile?.fullName || 'Anonymous Student'}</h2>
                  <p className="text-[11px] font-sans text-muted-foreground/60 flex items-center mt-1.5 font-light">
                    <Mail className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
                    {profile?.email}
                  </p>
                </div>
                
                <p className="text-xs text-muted-foreground/80 leading-relaxed font-sans font-light bg-black/40 border border-[#090909] rounded-none p-4 border-border/10">
                  {profile?.bio || "No professional bio set. Go to settings to edit your public profile."}
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-border/10 text-[10px] font-sans uppercase tracking-wider text-muted-foreground/45 font-light">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
                    Joined {joinedDate}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <Card className="rounded-none border border-border/10 bg-[#090909] p-8 shadow-none">
            <h3 className="font-serif font-medium text-base text-white tracking-wide mb-6 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Learning Credentials</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statItems.map((stat, i) => (
                <div key={i} className="rounded-none border border-border/10 bg-black/30 p-5 flex items-center gap-4 transition-all duration-300">
                  <div className={`h-12 w-12 rounded-none flex items-center justify-center shrink-0 ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-[9px] font-light text-muted-foreground/50 uppercase tracking-widest font-sans">{stat.label}</p>
                    <p className="text-base font-medium text-white font-sans uppercase tracking-wider mt-0.5">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* XP History logs */}
          <Card className="rounded-none border border-border/10 bg-[#090909] p-8 shadow-none">
            <h3 className="font-serif font-medium text-base text-white tracking-wide mb-6 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span>Recent Experience Log</span>
            </h3>
            
            <div className="space-y-4">
              {xpData?.history && xpData.history.length > 0 ? (
                xpData.history.map((item: ActivityItem) => (
                  <div key={item.id} className="flex justify-between items-center py-3.5 border-b border-border/10 last:border-0">
                    <div>
                      <p className="text-xs font-sans uppercase tracking-wider font-medium text-white">{item.reason}</p>
                      <p className="text-[9px] font-sans tracking-wide text-muted-foreground/45 uppercase mt-0.5">
                        {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <span className="text-xs font-sans font-medium text-primary tracking-wide">+{item.xpEarned} XP</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-[10px] font-sans uppercase tracking-wider font-light text-muted-foreground/40">
                  No experience activities recorded yet. Complete a lesson to view history logs here.
                </div>
              )}
            </div>
          </Card>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
