'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react';
import api from '@/services/api';

interface ProfileResponse {
  fullName?: string;
  avatar?: string;
  bio?: string;
  email?: string;
}

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
        const res = await api.get<ProfileResponse>('/api/user/profile');
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
      const payload = {
        fullName,
        avatar: avatar || null,
        bio: bio || null,
      };

      const res = await api.put<ProfileResponse>('/api/user/profile', payload);
      if (res.success) {
        setSuccess(true);
        await refreshUser();
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(res.error?.message || 'Failed to update profile settings.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during submission.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-base font-serif font-light text-white tracking-wide">Public Profile Details</h3>
        <p className="text-xs text-muted-foreground/60 font-sans font-light leading-relaxed">
          Configure how your credentials and public information look on the Cerevia platform.
        </p>
        
        {error && (
          <div className="bg-red-950/20 border border-red-500/30 text-red-400 p-4 rounded-none text-xs font-sans font-medium uppercase tracking-wide">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="fullName" className="text-[10px] font-sans uppercase tracking-[0.15em] text-muted-foreground/50">Full Name</label>
            <input 
              id="fullName" 
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Hardi Kaurani"
              className="flex h-10 w-full rounded-none border border-border/10 bg-black px-4 py-2 text-sm text-white placeholder-muted-foreground/30 focus:outline-none focus:border-primary/45 transition-colors font-sans font-light"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="email" className="text-[10px] font-sans uppercase tracking-[0.15em] text-muted-foreground/50">Account Email (Read-Only)</label>
            <input 
              id="email" 
              type="email"
              value={email}
              disabled
              className="flex h-10 w-full rounded-none border border-border/10 bg-black/40 px-4 py-2 text-sm text-muted-foreground/45 cursor-not-allowed font-sans font-light"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="avatar" className="text-[10px] font-sans uppercase tracking-[0.15em] text-muted-foreground/50">Avatar Image URL</label>
            <input 
              id="avatar" 
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="e.g. https://example.com/avatar.png"
              className="flex h-10 w-full rounded-none border border-border/10 bg-black px-4 py-2 text-sm text-white placeholder-muted-foreground/30 focus:outline-none focus:border-primary/45 transition-colors font-sans font-light"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="bio" className="text-[10px] font-sans uppercase tracking-[0.15em] text-muted-foreground/50">Short Biography</label>
            <textarea 
              id="bio" 
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other engineers about yourself..."
              className="flex w-full rounded-none border border-border/10 bg-black px-4 py-3 text-sm text-white placeholder-muted-foreground/30 focus:outline-none focus:border-primary/45 transition-colors resize-none font-sans font-light"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border/10 pt-6 flex items-center justify-end gap-4">
        {success && <span className="text-xs font-sans uppercase tracking-wider font-medium text-primary">Profile configuration updated!</span>}
        <Button type="submit" disabled={isSaving} className="rounded-none bg-primary text-black hover:bg-primary/95 text-xs font-sans uppercase tracking-[0.18em] py-2 px-6">
          {isSaving ? 'Updating...' : 'Save Configuration'}
        </Button>
      </div>
    </form>
  );
}
