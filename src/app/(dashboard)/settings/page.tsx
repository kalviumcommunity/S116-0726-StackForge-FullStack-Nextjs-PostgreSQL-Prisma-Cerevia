import * as React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Monitor } from 'lucide-react';

export default function SettingsPage() {
  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header */}
        <div className="flex flex-col gap-1.5 pb-6 border-b border-border">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Account Settings</h1>
          <p className="text-xs text-muted-foreground">
            Manage your interface layout, streak freeze preferences, and account configuration.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Notification Settings */}
          <Section
            title="Notifications"
            description="Control how and when you receive streak reminder notifications."
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-foreground">Email Reminders</span>
                  <span className="text-[10px] text-muted-foreground">Receive email alerts 4 hours before streak expiration.</span>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input text-orange-500 focus:ring-orange-500" />
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-foreground">Weekly Progress Reports</span>
                  <span className="text-[10px] text-muted-foreground">Receive a weekly breakdown of XP logs and leaderboard standing.</span>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input text-orange-500 focus:ring-orange-500" />
              </div>
            </div>
          </Section>

          {/* Theme Preferences */}
          <Section
            title="Theme Preferences"
            description="Toggle your preferred dashboard theme."
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                    System Preferred
                  </span>
                  <span className="text-[10px] text-muted-foreground">Adapt theme dynamically based on system settings.</span>
                </div>
                <span className="text-xs font-semibold text-orange-500">Active</span>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm">Light Mode</Button>
                <Button variant="outline" size="sm">Dark Mode</Button>
              </div>
            </div>
          </Section>

          {/* Security & Access */}
          <Section
            title="Security"
            description="Manage authentication and password settings."
            className="md:col-span-2"
          >
            <div className="space-y-4 max-w-xl">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="pt-2">
                <Button variant="primary" size="sm">Update Password</Button>
              </div>
            </div>
          </Section>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
