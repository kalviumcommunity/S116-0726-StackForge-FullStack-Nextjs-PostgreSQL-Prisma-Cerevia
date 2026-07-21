'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#benefits', label: 'Benefits' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/10 bg-background/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main landing navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
              >
                Dashboard
              </Link>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={logout}
                className="h-9 rounded-lg px-4 text-[10px] uppercase tracking-[0.2em]"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
              >
                Log In
              </Link>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => router.push('/register')}
                className="h-9 rounded-lg px-4 text-[10px] uppercase tracking-[0.2em]"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-border/10 bg-[#090909] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile landing navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-[#111] hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-border/10 pt-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-[#111] hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="h-10 rounded-lg text-[10px] uppercase tracking-[0.2em]"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-[#111] hover:text-foreground"
                >
                  Log In
                </Link>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/register');
                  }}
                  className="h-10 rounded-lg text-[10px] uppercase tracking-[0.2em]"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
