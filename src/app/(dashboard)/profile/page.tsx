'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/AuthProvider';
import { Trophy, Flame, Star, BookOpen, Mail, Calendar, User as UserIcon, Loader2, Sparkles, Activity } from 'lucide-react';
import api from '@/services/api';
import Link from 'next/link';

interface ActivityItem {
  id: string;
  xpEarned: number;
  reason: string;
  timestamp: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  
  const [profile, setProfile] = useState<any>(null);
  const [xpData, setXpData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        const [profileRes, xpRes, progressRes] = await Promise.all([
          api.get<any>('/api/user/profile'),
          api.get<any>('/api/user/xp?limit=5'),
          api.get<any>('/api/lessons/progress'),
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
    { label: 'Total Experience', value: `${profile?.totalXP || 0} XP`, icon: Star, color: 'text-cyan-400', bg: 'bg-cyan-950/45 border border-cyan-500/20' },
    { label: 'Current Streak', value: `${profile?.currentStreak || 0} Days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-950/45 border border-orange-500/20' },
    { label: 'Completed Modules', value: stats ? `${stats.completedCount} / ${stats.totalCount}` : '...', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-950/45 border border-emerald-500/20' },
    { label: 'Syllabus Level', value: `Level ${xpData?.levelInfo?.level || 1}`, icon: Trophy, color: 'text-purple-400', bg: 'bg-purple-950/45 border border-purple-500/20' },
  ];

  if (loading) {
    return (
      <PageContainer>
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
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
          <Card className="rounded-2xl border border-gray-900 bg-gray-950/40 overflow-hidden shadow-lg backdrop-blur-sm">
            <div className="h-32 bg-gradient-to-r from-cyan-950/60 to-purple-950/60 relative border-b border-gray-900" />
            
            <div className="px-6 pb-6 relative">
              <div className="flex justify-between items-end -mt-12 mb-4">
                <div className="h-24 w-24 rounded-2xl border-4 border-gray-950 bg-gray-900 flex items-center justify-center overflow-hidden relative shadow-md">
                  {profile?.avatar ? (
                    <img src={profile.avatar} alt={profile.fullName || 'User'} className="h-full w-full object-cover" />
                  ) : (
                    <UserIcon className="h-10 w-10 text-gray-500" />
                  )}
                </div>
                <Link href="/settings">
                  <Button variant="outline" size="sm" className="mb-2 font-bold text-xs border-gray-800 text-gray-400 hover:text-white">
                    Edit Profile
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight">{profile?.fullName || 'Anonymous Student'}</h2>
                  <p className="text-xs text-gray-400 flex items-center mt-1.5 font-medium">
                    <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                    {profile?.email}
                  </p>
                </div>
                
                <p className="text-xs text-gray-400 leading-relaxed font-normal bg-gray-900/20 border border-gray-900/60 rounded-xl p-3">
                  {profile?.bio || "No professional bio set. Go to settings to edit your public profile."}
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-gray-900/60 text-xs text-gray-500 font-medium">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5 text-gray-600" />
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
          <Card className="rounded-2xl border border-gray-900 bg-gray-950/40 p-6 shadow-lg backdrop-blur-sm">
            <h3 className="font-bold text-base text-white tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Learning Credentials</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statItems.map((stat, i) => (
                <div key={i} className="rounded-xl border border-gray-900 bg-gray-900/10 p-4 flex items-center gap-4 hover:bg-gray-900/20 transition-colors">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">{stat.label}</p>
                    <p className="text-lg font-bold text-white tracking-tight mt-0.5">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* XP History logs */}
          <Card className="rounded-2xl border border-gray-900 bg-gray-950/40 p-6 shadow-lg backdrop-blur-sm">
            <h3 className="font-bold text-base text-white tracking-tight mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span>Recent Experience Log</span>
            </h3>
            
            <div className="space-y-4">
              {xpData?.history && xpData.history.length > 0 ? (
                xpData.history.map((item: ActivityItem) => (
                  <div key={item.id} className="flex justify-between items-center py-2.5 border-b border-gray-900/60 last:border-0">
                    <div>
                      <p className="text-xs font-semibold text-white">{item.reason}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-cyan-400">+{item.xpEarned} XP</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-gray-500 font-medium">
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
