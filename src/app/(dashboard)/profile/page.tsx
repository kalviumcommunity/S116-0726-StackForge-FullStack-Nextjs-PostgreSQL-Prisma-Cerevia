'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Trophy, Flame, Star, BookOpen, Mail, Calendar, User as UserIcon, Loader2, Award, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import api from '@/services/api';
import Image from 'next/image';

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
    { label: 'Total Experience', value: `${profile?.totalXP || 0} XP`, icon: Star, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    { label: 'Current Streak', value: `${profile?.currentStreak || 0} Days`, icon: Flame, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
    { label: 'Completed Modules', value: stats ? `${stats.completedCount} / ${stats.totalCount}` : '...', icon: BookOpen, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    { label: 'Syllabus Level', value: `Level ${xpData?.levelInfo?.level || 1}`, icon: Trophy, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  ];

  if (loading) {
    return (
      <PageContainer className="bg-slate-50/60 min-h-screen">
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="bg-slate-50/60 min-h-screen">
      <PageHeader
        title="Student Credentials & Profile"
        description="View your academic record, verified specialization certificates, and syllabus progress."
      />

      <ContentWrapper className="space-y-6">
        
        {/* Profile Card Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-xs">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative h-20 w-20 rounded-full border-2 border-blue-600 bg-slate-100 overflow-hidden shrink-0 shadow-sm">
              {profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.fullName || 'Student'}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <UserIcon className="h-10 w-10 text-slate-400 m-auto mt-5" />
              )}
            </div>

            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 className="text-2xl font-black text-slate-900">{profile?.fullName || 'Student'}</h2>
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-blue-600" /> {profile?.email || 'student@cerevia.edu'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-600" /> Scholar since {joinedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
              Verified Student Account
            </span>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{st.label}</span>
                  <div className={`p-2 rounded-xl ${st.bg}`}>
                    <Icon className={`h-4 w-4 ${st.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900">{st.value}</p>
              </div>
            );
          })}
        </div>

        {/* Coursera-Style Verified Certificate Showcase */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                <Award className="h-3.5 w-3.5 text-blue-600" />
                <span>Verified Credentials</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Cerevia Specialization Certificate
              </h3>
            </div>

            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs">
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="rounded-2xl border-2 border-blue-100 bg-blue-50/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-700 bg-white px-2.5 py-1 rounded-md border border-blue-200">
                Official Credential #8942-VERIFIED
              </span>
              <h4 className="text-lg font-black text-slate-900">
                Full-Stack Distributed Engineering Specialization
              </h4>
              <p className="text-xs text-slate-600 max-w-xl">
                Demonstrated mastery in Next.js 15 App Router, Prisma ORM Relational Schema Design, PostgreSQL Query Tuning, and Redis Caching.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-bold pt-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Issued by Cerevia Academic Board • Grade: 98.4%</span>
              </div>
            </div>

            <div className="relative h-20 w-20 rounded-2xl bg-white border border-blue-200 p-2 flex items-center justify-center shrink-0 shadow-sm">
              <Award className="h-10 w-10 text-amber-500" />
            </div>
          </div>
        </div>

      </ContentWrapper>
    </PageContainer>
  );
}
