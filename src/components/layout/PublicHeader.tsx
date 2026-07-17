'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '@/providers/AuthProvider';

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#benefits', label: 'Benefits' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main landing navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-sans uppercase tracking-[0.15em] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-[11px] font-sans uppercase tracking-[0.15em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-[11px] font-sans uppercase tracking-[0.15em] font-medium text-destructive hover:text-destructive/80 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[11px] font-sans uppercase tracking-[0.15em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="group inline-flex h-9 items-center justify-center gap-1.5 rounded-none bg-primary px-5 py-2 text-[10px] font-sans uppercase tracking-[0.15em] font-medium text-primary-foreground shadow-sm hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-none text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border/10 bg-[#090909] px-6 py-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3" aria-label="Mobile landing navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[11px] font-sans uppercase tracking-[0.15em] font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-none hover:bg-[#111]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-border/10 pt-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[11px] font-sans uppercase tracking-[0.15em] font-medium text-center text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-none hover:bg-[#111]"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-none border border-destructive/20 text-destructive text-[11px] font-sans uppercase tracking-[0.15em] font-medium hover:bg-destructive/10 focus-visible:outline-none cursor-pointer"
                >
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[11px] font-sans uppercase tracking-[0.15em] font-medium text-center text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-none hover:bg-[#111]"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-none bg-primary text-[11px] font-sans uppercase tracking-[0.15em] font-medium text-primary-foreground shadow-sm hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
