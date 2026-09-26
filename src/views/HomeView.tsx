import React from 'react';
import { Track } from '../types/aura';
import { TRACKS, SAVED_CAPSULES, USER_PROFILE } from '../data/auraData';

interface HomeViewProps {
  onPlayTrack: (track: Track) => void;
  onNavigateToTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onPlayTrack,
  onNavigateToTab,
}) => {
  return (
    <div className="flex flex-col gap-8 text-left pb-12">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171329] via-[#101726] to-[#0e111a] p-8 border border-white/10 shadow-2xl">
        <div className="pointer-events-none absolute -top-24 right-1/4 w-[450px] h-[300px] bg-[#a078ff]/20 rounded-full blur-[140px]"></div>
        <div className="pointer-events-none absolute bottom-0 right-10 w-[350px] h-[250px] bg-[#4cd7f6]/15 rounded-full blur-[120px]"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6] uppercase tracking-wider">
                Acoustic Circadian Forecast • 01:57 AM
              </span>
            </div>

            <h1 className="font-['Syne'] text-4xl md:text-5xl font-extrabold text-[#e3e1e9] leading-tight">
              Good Evening, <span className="text-[#d0bcff]">{USER_PROFILE.name.split(' ')[0]}</span>.
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-sm md:text-base text-[#cbc3d7] leading-relaxed">
              Your biometrics and listening history indicate a shift toward <strong>Dreamy Shoegaze Drift</strong>. Frequency 432Hz is calibrated and spatial tape saturation is primed.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onPlayTrack(TRACKS[0]);
                  onNavigateToTab('now-playing');
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#d0bcff] hover:bg-[#e9ddff] text-[#3c0091] font-['Syne'] font-bold text-sm shadow-[0_0_20px_rgba(208,188,255,0.45)] transition-all hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined text-lg fill-1">play_arrow</span>
                <span>Resume Session #409</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('aura-sessions')}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1e1f25]/80 hover:bg-[#292a2f] border border-white/10 text-[#e3e1e9] font-['Syne'] font-medium text-sm transition-all"
              >
                <span>Aura Sessions</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Quick Resonant Dial Preview */}
          <div 
            onClick={() => onNavigateToTab('mood-profile')}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#1e1f25]/70 border border-white/10 backdrop-blur-xl shrink-0 cursor-pointer hover:border-[#d0bcff]/40 transition-all group"
          >
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#4cd7f6] uppercase tracking-widest">
              Harmonic Resonance
            </span>
            <div className="font-['Syne'] text-4xl font-extrabold text-[#d0bcff] my-1 group-hover:scale-110 transition-transform">
              98.4%
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7]">
              Beach House • Space Song
            </span>
            <span className="text-[11px] font-['JetBrains_Mono'] text-[#4cd7f6] mt-2 underline">
              View Mood Profile →
            </span>
          </div>
        </div>
      </div>

      {/* Featured Quick Start Channels */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-widest text-[#4cd7f6]">
              PSYCHOACOUSTIC STATIONS
            </span>
            <h2 className="font-['Syne'] text-2xl font-bold text-[#e3e1e9]">
              Live Mood Channels
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTab('aura-sessions')}
            className="text-xs font-['JetBrains_Mono'] text-[#d0bcff] hover:underline"
          >
            Explore All Sessions →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SAVED_CAPSULES.map((capsule) => (
            <div
              key={capsule.id}
              onClick={() => {
                onPlayTrack(TRACKS[0]);
                onNavigateToTab('aura-sessions');
              }}
              className="group flex flex-col justify-between rounded-2xl bg-[#1e1f25]/70 p-4 border border-white/5 hover:border-white/15 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className={`relative aspect-[16/10] w-full rounded-xl bg-gradient-to-br ${capsule.coverGradient} p-4 flex flex-col justify-between overflow-hidden border border-white/10 group-hover:scale-[1.02] transition-transform`}>
                <div className="flex items-center justify-between relative z-10">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-['JetBrains_Mono'] text-white">
                    {capsule.tags[0]}
                  </span>
                  <span className="material-symbols-outlined text-white/70">play_circle</span>
                </div>
                <div className="relative z-10 font-['Syne'] text-sm font-bold text-white">
                  {capsule.title}
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <span className="font-['Syne'] text-sm font-semibold text-[#e3e1e9]">
                  {capsule.title}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] line-clamp-1">
                  {capsule.subtitle}
                </span>
              </div>

              <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#cbc3d7]">
                <span>{capsule.songCount} songs</span>
                <span className="text-[#4cd7f6]">{capsule.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Resonance Tracks */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-widest text-[#4cd7f6]">
            CURATED FREQUENCIES
          </span>
          <h2 className="font-['Syne'] text-2xl font-bold text-[#e3e1e9]">
            Recent Resonances
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRACKS.slice(0, 4).map((t) => (
            <div
              key={t.id}
              onClick={() => {
                onPlayTrack(t);
                onNavigateToTab('now-playing');
              }}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1e1f25]/70 hover:bg-[#292a2f] border border-white/5 hover:border-white/15 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img src={t.coverUrl} alt={t.title} className="w-12 h-12 rounded-xl object-cover shadow-md" />
                <div className="flex flex-col min-w-0">
                  <span className="font-['Syne'] text-base font-semibold text-[#e3e1e9] group-hover:text-[#d0bcff] truncate">
                    {t.title}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] truncate">
                    {t.artist} • {t.album}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-2.5 py-0.5 rounded-full bg-[#121318] text-[#4cd7f6] font-['JetBrains_Mono'] text-xs border border-white/5">
                  {t.resonance}%
                </span>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-[#d0bcff]/10 hover:bg-[#d0bcff] text-[#d0bcff] hover:text-[#3c0091] flex items-center justify-center transition-all"
                >
                  <span className="material-symbols-outlined text-lg fill-1">play_arrow</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
