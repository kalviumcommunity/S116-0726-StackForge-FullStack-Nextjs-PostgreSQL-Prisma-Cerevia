import { Metadata } from 'next';
import { SettingsForm } from '@/components/profile/SettingsForm';

export const metadata: Metadata = {
  title: 'Settings | Cerevia',
  description: 'Manage your account settings and preferences.',
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-3xl font-serif font-light tracking-wide text-foreground mb-2">Settings</h1>
        <p className="text-[11px] font-sans uppercase tracking-[0.18em] text-muted-foreground/60">Manage your account settings and preferences.</p>
      </div>

      <div className="rounded-none border border-border/10 bg-[#090909] p-8 md:p-10 shadow-none">
        <SettingsForm />
      </div>
    </div>
  );
}
