import React, { useState } from 'react';
import {
  USER_PROFILE,
  MOOD_BREAKDOWN,
  SAVED_CAPSULES,
  TOP_ARTISTS,
  MILESTONES,
  HEATMAP_DATA,
  HOURS,
  DAYS,
} from '../data/auraData';
import { PlaylistCapsule, HeatmapCell } from '../types/aura';

interface MoodProfileViewProps {
  onSelectCapsule: (capsule: PlaylistCapsule) => void;
  onOpenBadgesModal: () => void;
}

export const MoodProfileView: React.FC<MoodProfileViewProps> = ({
  onSelectCapsule,
  onOpenBadgesModal,
}) => {
  const [timeframe, setTimeframe] = useState<'week' | 'all'>('week');
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);
  const [savedVault, setSavedVault] = useState<PlaylistCapsule[]>(SAVED_CAPSULES);
  const [copiedTelemetry, setCopiedTelemetry] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedVault((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked: !(item.isLiked ?? true) } : item
      )
    );
  };

  const handleExportTelemetry = () => {
    const dataStr = JSON.stringify(
      {
        profile: USER_PROFILE.name,
        timestamp: new Date().toISOString(),
        dominantAura: 'Dreamy 🌙',
        weeklyStats: {
          hours: USER_PROFILE.hoursListened,
          sessions: USER_PROFILE.moodSessionsCreated,
          harmonicKey: USER_PROFILE.dominantHarmonicKey,
          breakdown: MOOD_BREAKDOWN,
        },
      },
      null,
      2
    );
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aura_Telemetry_MayaLin_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedTelemetry(true);
    setTimeout(() => setCopiedTelemetry(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 text-left pb-12">
      {/* 1. Header Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171329] via-[#121624] to-[#0e111a] p-8 border border-white/10 shadow-2xl">
        <div className="pointer-events-none absolute -top-24 left-1/4 w-[400px] h-[300px] bg-[#a078ff]/15 rounded-full blur-[120px]"></div>
        <div className="pointer-events-none absolute bottom-0 right-10 w-[350px] h-[250px] bg-[#4cd7f6]/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-[#4cd7f6]/30 shadow-xl">
              <img
                src={USER_PROFILE.avatarUrl}
                alt={USER_PROFILE.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#4cd7f6] flex items-center justify-center text-[#003640] ring-2 ring-[#0d0e13]">
                <span className="material-symbols-outlined text-sm font-bold">verified</span>
              </div>
            </div>

            {/* Name & Bio */}
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-['Syne'] text-3xl md:text-4xl font-extrabold text-[#e3e1e9]">
                  {USER_PROFILE.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#a078ff]/20 text-[#d0bcff] border border-[#a078ff]/40 font-['JetBrains_Mono'] text-xs font-semibold tracking-wider">
                  {USER_PROFILE.badge}
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#cbc3d7]/60">
                  {USER_PROFILE.joinDate}
                </span>
              </div>

              <span className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6]">
                {USER_PROFILE.username}
              </span>

              <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#cbc3d7] max-w-3xl leading-relaxed mt-1">
                {USER_PROFILE.bio}
              </p>
            </div>
          </div>

          {/* 3 Metric Stat Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1e1f25]/70 border border-white/5 backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl bg-[#a078ff]/20 text-[#d0bcff] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">schedule</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Syne'] text-2xl font-bold text-[#e3e1e9]">
                  {USER_PROFILE.hoursListened}
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#cbc3d7] uppercase tracking-wider">
                  Hours Listened
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1e1f25]/70 border border-white/5 backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl bg-[#4cd7f6]/20 text-[#4cd7f6] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">grid_view</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Syne'] text-2xl font-bold text-[#e3e1e9]">
                  {USER_PROFILE.moodSessionsCreated}
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#cbc3d7] uppercase tracking-wider">
                  Mood Sessions Created
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1e1f25]/70 border border-white/5 backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl bg-[#ff516a]/20 text-[#ffb2b7] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">bedtime</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Syne'] text-2xl font-bold text-[#e3e1e9]">
                  {USER_PROFILE.topEmotionalState}
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#cbc3d7] uppercase tracking-wider">
                  Top Emotional State
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Sonic Aura Breakdown & Emotional Heatmap Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sonic Aura Breakdown (Donut Graphic) */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#1e1f25]/70 p-6 backdrop-blur-xl border border-white/5 shadow-xl lg:col-span-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-widest text-[#4cd7f6]">
                  SPECTRUM ANALYSIS
                </span>
                <h2 className="font-['Syne'] text-2xl font-bold text-[#e3e1e9]">
                  Sonic Aura Breakdown
                </h2>
              </div>

              {/* Toggle Week / All */}
              <div className="flex items-center p-1 rounded-full bg-[#121318] border border-white/5 text-xs font-['JetBrains_Mono']">
                <button
                  type="button"
                  onClick={() => setTimeframe('week')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    timeframe === 'week'
                      ? 'bg-[#a078ff] text-[#340080] font-semibold shadow-sm'
                      : 'text-[#cbc3d7] hover:text-white'
                  }`}
                >
                  This Week
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe('all')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    timeframe === 'all'
                      ? 'bg-[#a078ff] text-[#340080] font-semibold shadow-sm'
                      : 'text-[#cbc3d7] hover:text-white'
                  }`}
                >
                  All-Time
                </button>
              </div>
            </div>

            {/* Circular Arc / Radial Spectrum Visualization */}
            <div className="relative flex items-center justify-center my-4">
              <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 160 160">
                {/* Background tracks */}
                <circle cx="80" cy="80" r="66" stroke="#292a2f" strokeWidth="9" fill="transparent" />
                <circle cx="80" cy="80" r="52" stroke="#292a2f" strokeWidth="7" fill="transparent" />
                <circle cx="80" cy="80" r="40" stroke="#292a2f" strokeWidth="5" fill="transparent" />

                {/* Outer Ring: Dreamy 42% */}
                <circle
                  cx="80"
                  cy="80"
                  r="66"
                  stroke="#d0bcff"
                  strokeWidth="9"
                  strokeDasharray="415"
                  strokeDashoffset={415 * (1 - 0.42)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000"
                />

                {/* Middle Ring: Focused 28% */}
                <circle
                  cx="80"
                  cy="80"
                  r="52"
                  stroke="#4cd7f6"
                  strokeWidth="7"
                  strokeDasharray="327"
                  strokeDashoffset={327 * (1 - 0.28)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000"
                />

                {/* Inner Ring: Melancholic 18% */}
                <circle
                  cx="80"
                  cy="80"
                  r="40"
                  stroke="#a078ff"
                  strokeWidth="5"
                  strokeDasharray="251"
                  strokeDashoffset={251 * (1 - 0.18)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000"
                />
              </svg>

              {/* Center Content */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-['Syne'] text-3xl font-extrabold text-[#e3e1e9]">
                  42%
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#d0bcff]">
                  DREAMY
                </span>
              </div>
            </div>

            {/* Breakdown rows */}
            <div className="flex flex-col gap-2.5">
              {MOOD_BREAKDOWN.map((m) => (
                <div key={m.name} className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }}></span>
                    <span className="font-['Syne'] font-semibold text-[#e3e1e9] text-sm">
                      {m.name} {m.icon}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7]/70 hidden sm:inline">
                      {m.desc}
                    </span>
                  </div>
                  <span className="font-semibold text-[#e3e1e9]">{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dominant Harmonic Key footer */}
          <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-['JetBrains_Mono']">
            <span className="text-[#cbc3d7]">Dominant Harmonic Key:</span>
            <span className="text-[#4cd7f6] font-semibold">{USER_PROFILE.dominantHarmonicKey}</span>
          </div>
        </div>

        {/* Right: Emotional Heatmap Matrix */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#1e1f25]/70 p-6 backdrop-blur-xl border border-white/5 shadow-xl lg:col-span-7">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-widest text-[#4cd7f6]">
                  CIRCADIAN RESONANCE
                </span>
                <h2 className="font-['Syne'] text-2xl font-bold text-[#e3e1e9]">
                  Emotional Heatmap Matrix
                </h2>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-['JetBrains_Mono'] text-[#cbc3d7]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#4cd7f6]"></span> Dreamy
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#a078ff]"></span> Focus
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#d0bcff]"></span> Melancholy
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#ffb2b7]"></span> Energetic
                </span>
              </div>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7]">
              24-hour emotional telemetry across the last 7 days. Hover blocks to audit resonant shifts.
            </p>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                {/* Column Headers (Hours) */}
                <div className="grid grid-cols-13 gap-1.5 text-center text-[10px] font-['JetBrains_Mono'] text-[#958ea0] mb-2">
                  <div className="w-8"></div>
                  {HOURS.map((hr) => (
                    <div key={hr} className="truncate">{hr}</div>
                  ))}
                </div>

                {/* Day Rows */}
                <div className="flex flex-col gap-1.5">
                  {HEATMAP_DATA.map((row, dayIdx) => (
                    <div key={DAYS[dayIdx]} className="grid grid-cols-13 gap-1.5 items-center">
                      <div className="w-8 text-[11px] font-['JetBrains_Mono'] text-[#cbc3d7] font-medium">
                        {DAYS[dayIdx]}
                      </div>
                      {row.map((cell, cellIdx) => {
                        // Choose background color based on mood
                        let bg = 'bg-[#181920]';
                        if (cell.mood === 'dreamy') {
                          bg = cell.intensity === 4 ? 'bg-[#d0bcff] shadow-[0_0_8px_#d0bcff]' : 'bg-[#4cd7f6]';
                        } else if (cell.mood === 'focus') {
                          bg = 'bg-[#03b5d3]';
                        } else if (cell.mood === 'melancholy') {
                          bg = 'bg-[#a078ff]';
                        } else if (cell.mood === 'energetic') {
                          bg = 'bg-[#ffb2b7]';
                        }

                        return (
                          <div
                            key={cellIdx}
                            onMouseEnter={() => setHoveredCell(cell)}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`h-5 rounded-md cursor-pointer transition-transform hover:scale-125 hover:z-20 ${bg}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hover Tooltip Details */}
            <div className="min-h-[24px] text-xs font-['JetBrains_Mono'] text-[#4cd7f6]">
              {hoveredCell && hoveredCell.mood !== 'none' ? (
                <span>
                  ✦ {hoveredCell.day} at {hoveredCell.hour}:00 — Dominant Mood: {hoveredCell.mood.toUpperCase()} ({hoveredCell.tracksPlayed} tracks logged)
                </span>
              ) : (
                <span className="text-[#cbc3d7]/50">Hover over any block to inspect circadian telemetry</span>
              )}
            </div>
          </div>

          {/* Peak resonance footer */}
          <div className="pt-4 mt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-['JetBrains_Mono']">
            <div className="flex items-center gap-2 text-[#e3e1e9]">
              <span className="material-symbols-outlined text-[#4cd7f6] text-base">insights</span>
              <span>
                Peak Emotional Resonance: <strong className="text-[#4cd7f6]">Sundays at 22:00</strong> (Dreamy + Melancholic convergence)
              </span>
            </div>

            <button
              onClick={handleExportTelemetry}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121318] hover:bg-[#292a2f] border border-white/10 text-[#e3e1e9] font-medium transition-all"
            >
              <span className="material-symbols-outlined text-sm text-[#d0bcff]">
                {copiedTelemetry ? 'check' : 'ios_share'}
              </span>
              <span>{copiedTelemetry ? 'Exported!' : 'Export Telemetry'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Saved Mood Capsules & Playlists */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-widest text-[#4cd7f6]">
            USER VAULT
          </span>
          <h2 className="font-['Syne'] text-2xl font-bold text-[#e3e1e9]">
            Saved Mood Capsules & Playlists
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {savedVault.map((capsule) => (
            <div
              key={capsule.id}
              onClick={() => onSelectCapsule(capsule)}
              className="group flex flex-col justify-between rounded-2xl bg-[#1e1f25]/70 p-4 border border-white/5 hover:border-white/15 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              {/* Cover Showcase */}
              <div className={`relative aspect-[16/10] w-full rounded-xl bg-gradient-to-br ${capsule.coverGradient} p-4 flex flex-col justify-between overflow-hidden border border-white/10 group-hover:scale-[1.02] transition-transform`}>
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-white/70 uppercase tracking-widest">
                    Aura Capsule
                  </span>
                  <span className="material-symbols-outlined text-white/50 text-base">album</span>
                </div>

                {/* Abstract Glowing Aura Shapes */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity">
                  <div
                    className="w-24 h-24 rounded-full blur-xl"
                    style={{ backgroundColor: capsule.accentColor }}
                  ></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-['JetBrains_Mono'] text-white">
                    432Hz Mode
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-col gap-1.5 mt-3">
                <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-[10px] text-[#4cd7f6] uppercase tracking-wider">
                  <span>{capsule.tags.join(' × ')}</span>
                </div>

                <h3 className="font-['Syne'] text-base font-bold text-[#e3e1e9] group-hover:text-[#d0bcff] transition-colors leading-snug">
                  {capsule.title}
                </h3>

                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] line-clamp-2 leading-relaxed">
                  {capsule.subtitle}
                </p>
              </div>

              {/* Bottom Details & Favorite */}
              <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#cbc3d7]">
                <span>{capsule.songCount} songs • {capsule.duration}</span>
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(capsule.id, e)}
                  className={`p-1 transition-transform hover:scale-125 ${
                    capsule.isLiked ? 'text-[#ff516a]' : 'text-[#cbc3d7] hover:text-[#ff516a]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-lg ${capsule.isLiked ? 'fill-1' : ''}`}>
                    favorite
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Row: Top Mood Artists & Emotional Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Top Mood Artists */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#1e1f25]/70 p-6 backdrop-blur-xl border border-white/5 shadow-xl lg:col-span-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-widest text-[#4cd7f6]">
                  HARMONIC KINSHIP
                </span>
                <h2 className="font-['Syne'] text-xl font-bold text-[#e3e1e9]">
                  Top Mood Artists
                </h2>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#cbc3d7]/60">
                Based on 6 months playback
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {TOP_ARTISTS.map((artist) => (
                <div
                  key={artist.rank}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#121318]/60 border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-['JetBrains_Mono'] text-xs text-[#958ea0] w-6">
                      {artist.rank}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#292a2f] flex items-center justify-center text-[#d0bcff] shrink-0">
                      <span className="material-symbols-outlined text-lg">album</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-['Syne'] text-sm font-semibold text-[#e3e1e9] truncate">
                        {artist.name}
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7]">
                        {artist.hours} hours listened
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0 pl-2">
                    <div className="flex items-center gap-1.5 text-xs font-['JetBrains_Mono']">
                      <span className="text-[#4cd7f6] font-medium">{artist.matchPct}% Match</span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#cbc3d7]/70">
                      {artist.vibe}
                    </span>
                    <div className="w-20 h-1 bg-[#34343a] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${artist.matchPct}%`,
                          backgroundColor: artist.color,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Emotional Milestones */}
        <div className="flex flex-col justify-between rounded-3xl bg-[#1e1f25]/70 p-6 backdrop-blur-xl border border-white/5 shadow-xl lg:col-span-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-widest text-[#4cd7f6]">
                  AURA TROPHIES
                </span>
                <h2 className="font-['Syne'] text-xl font-bold text-[#e3e1e9]">
                  Emotional Milestones
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/40 font-['JetBrains_Mono'] text-xs font-semibold">
                3 Unlocked
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {MILESTONES.map((m) => (
                <div
                  key={m.id}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#121318]/60 border border-white/5"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${m.color}20`, color: m.color }}
                  >
                    <span className="material-symbols-outlined text-xl">{m.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-['Syne'] text-sm font-semibold text-[#e3e1e9]">
                        {m.title}
                      </span>
                      <span className="material-symbols-outlined text-xs text-[#4cd7f6]">
                        verified
                      </span>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] mt-0.5 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer view all badges */}
          <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-['JetBrains_Mono']">
            <span className="text-[#cbc3d7]">
              Next Badge: <strong className="text-[#d0bcff]">Harmonic Hermit (82%)</strong>
            </span>
            <button
              onClick={onOpenBadgesModal}
              type="button"
              className="text-[#4cd7f6] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>View All 16 Badges</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
