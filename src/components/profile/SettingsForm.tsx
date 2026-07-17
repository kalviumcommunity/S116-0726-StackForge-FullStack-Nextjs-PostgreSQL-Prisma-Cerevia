'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react';
import api from '@/services/api';

export function SettingsForm() {
  const { refreshUser } = useAuth();
  
  const [fullName, setFullName] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get<any>('/api/user/profile');
        if (res.success && res.data) {
          setFullName(res.data.fullName || '');
          setAvatar(res.data.avatar || '');
          setBio(res.data.bio || '');
          setEmail(res.data.email || '');
        }
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);
    
    try {
      const payload: any = {
        fullName,
        avatar: avatar || null,
        bio: bio || null,
      };

      const res = await api.put<any>('/api/user/profile', payload);
      if (res.success) {
        setSuccess(true);
        await refreshUser();
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(res.error?.message || 'Failed to update profile settings.');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during submission.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">Public Profile Details</h3>
        <p className="text-xs text-gray-400 font-normal leading-relaxed">
          Configure how your credentials and public information look on the Cerevia platform.
        </p>
        
        {error && (
          <div className="bg-red-950/45 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="fullName" className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Full Name</label>
            <input 
              id="fullName" 
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Hardi Kaurani"
              className="flex h-10 w-full rounded-xl border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Account Email (Read-Only)</label>
            <input 
              id="email" 
              type="email"
              value={email}
              disabled
              className="flex h-10 w-full rounded-xl border border-gray-900 bg-gray-950/40 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="avatar" className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Avatar Image URL</label>
            <input 
              id="avatar" 
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="e.g. https://example.com/avatar.png"
              className="flex h-10 w-full rounded-xl border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="bio" className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Short Biography</label>
            <textarea 
              id="bio" 
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other engineers about yourself..."
              className="flex w-full rounded-xl border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900/60 pt-6 flex items-center justify-end gap-4">
        {success && <span className="text-xs text-emerald-400 font-bold">Profile configuration updated!</span>}
        <Button type="submit" disabled={isSaving} className="font-bold text-xs bg-cyan-500 text-white hover:bg-cyan-400 px-4 py-2 rounded-xl transition-all shadow-md shadow-cyan-500/10">
          {isSaving ? 'Updating...' : 'Save Configuration'}
        </Button>
      </div>
    </form>
  );
}
