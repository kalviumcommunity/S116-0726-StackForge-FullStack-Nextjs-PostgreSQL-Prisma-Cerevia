'use client';

import Image from 'next/image';
import { Download, FileText, Github, ExternalLink, BookOpen, Layers } from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  type: 'PDF' | 'Slides' | 'GitHub' | 'Docs';
  size: string;
  description: string;
  image: string;
  link: string;
}

export function ResourcesDrawer() {
  const resources: ResourceItem[] = [
    {
      id: '1',
      title: 'Full-Stack Next.js 15 Cheat Sheet',
      type: 'PDF',
      size: '2.4 MB',
      description: 'Quick reference guide covering Server Actions, App Router structure, and Prisma queries.',
      image: '/images/resources/cheatsheet.webp',
      link: '#',
    },
    {
      id: '2',
      title: 'Lecture Slides & Architecture Diagrams',
      type: 'Slides',
      size: '5.1 MB',
      description: 'High-resolution PDF presentation deck covering relational database scaling patterns.',
      image: '/images/resources/slides.webp',
      link: '#',
    },
    {
      id: '3',
      title: 'Cerevia Sandbox GitHub Starter Code',
      type: 'GitHub',
      size: 'Repo',
      description: 'Fork the official starter repository with pre-configured Tailwind, Prisma, and ESLint.',
      image: '/images/courses/system-design.webp',
      link: 'https://github.com/kalviumcommunity',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
          <Layers className="h-3.5 w-3.5" />
          <span>Supplemental Materials</span>
        </div>
        <h3 className="text-xl font-extrabold text-white tracking-tight">
          Downloadable Resources & Code Repos
        </h3>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {resources.map((res) => (
          <div
            key={res.id}
            className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 space-y-4 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 shadow-xl group"
          >
            <div className="space-y-3">
              <div className="relative h-28 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80">
                <Image
                  src={res.image}
                  alt={res.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                <span className="absolute top-2.5 left-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800 px-2 py-0.5 text-[10px] font-bold text-amber-400 backdrop-blur-md">
                  {res.type}
                </span>

                <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-zinc-400">
                  {res.size}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  {res.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal line-clamp-2">
                  {res.description}
                </p>
              </div>
            </div>

            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-10 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all"
            >
              {res.type === 'GitHub' ? <Github className="h-4 w-4" /> : <Download className="h-4 w-4" />}
              <span>{res.type === 'GitHub' ? 'Open Repository' : 'Download File'}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
