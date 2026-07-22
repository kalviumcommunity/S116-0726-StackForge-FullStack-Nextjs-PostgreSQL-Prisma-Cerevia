'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#courses', label: 'Courses', id: 'courses' },
    { href: '#learning-paths', label: 'Learning Paths', id: 'learning-paths' },
    { href: '#leaderboard', label: 'Leaderboard', id: 'leaderboard' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-4 z-50 mx-auto w-[92%] max-w-7xl transition-all duration-300 ${
        isScrolled
          ? 'glass-header rounded-2xl shadow-xl shadow-black/5 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 py-2.5'
          : 'bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md rounded-2xl border border-zinc-200/50 py-3.5'
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="#home" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
          <Logo />
        </Link>

        {/* Floating Navigation Links - Desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          <div className="flex items-center gap-1 rounded-full bg-zinc-100/80 dark:bg-zinc-900/80 p-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-md'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Action Controls */}
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={logout}
                className="rounded-full border-zinc-300 dark:border-zinc-700 text-xs font-medium px-4"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors"
              >
                Login
              </Link>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => router.push('/register')}
                className="rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold px-5 py-2 shadow-lg shadow-zinc-950/10 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              >
                <span>Start Learning</span>
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-100 lg:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-3 px-4 pb-4 lg:hidden rounded-b-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile menu navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => {
                  setActiveSection(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors ${
                  activeSection === link.id
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-center text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300"
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
                  className="w-full rounded-xl text-xs font-semibold"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-center text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300"
                >
                  Login
                </Link>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/register');
                  }}
                  className="w-full rounded-xl bg-zinc-950 text-white text-xs font-semibold py-2.5 flex items-center justify-center gap-2"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
