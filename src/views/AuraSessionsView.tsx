import React, { useState } from 'react';
import { Track } from '../types/aura';
import { TRACKS, UP_NEXT_TRACKS } from '../data/auraData';

interface AuraSessionsViewProps {
  currentTrack: Track;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onTogglePlay: () => void;
  onOpenExploreMatrix: () => void;
  onOpenResonate: () => void;
}

export const AuraSessionsView: React.FC<AuraSessionsViewProps> = ({
  currentTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  onOpenExploreMatrix,
  onOpenResonate,
}) => {
  const [gentleRain, setGentleRain] = useState(45);
  const [cityHum, setCityHum] = useState(20);
  const [tapeFlutters, setTapeFlutters] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Top Notification Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-[#a078ff]/15 border border-[#a078ff]/30 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d0bcff] animate-ping"></span>
          <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#e3e1e9]">
            <strong className="text-[#d0bcff] font-semibold">You chose: Dreamy 🌙</strong> — Aura calibrated your atmosphere and psychoacoustic profile.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-['JetBrains_Mono']">
          <span className="flex items-center gap-1.5 text-[#4cd7f6]">
            <span className="material-symbols-outlined text-sm">graphic_eq</span>
            Binaural Coherence 94%
          </span>
          <button
            onClick={onOpenResonate}
            type="button"
            className="flex items-center gap-1 text-[#d0bcff] hover:underline cursor-pointer"
          >
            <span>Tune Spectrum</span>
            <span className="material-symbols-outlined text-xs">tune</span>
          </button>
        </div>
      </div>

      {/* Aura Curated Playlist Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1a1333] via-[#121626] to-[#0e111a] p-8 border border-white/10 shadow-2xl">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -top-24 right-1/4 w-[400px] h-[300px] bg-[#a078ff]/25 rounded-full blur-[120px]"></div>
        <div className="pointer-events-none absolute bottom-0 right-10 w-[350px] h-[250px] bg-[#4cd7f6]/15 rounded-full blur-[100px]"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Left Album Cover Art */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shrink-0 shadow-2xl border border-white/15 group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b4e] via-[#151c38] to-[#090b14] flex flex-col items-center justify-center p-6 text-center">
              {/* Stylized generative nebula */}
              <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-[#a078ff]/40 via-[#4cd7f6]/30 to-[#ffb2b7]/20 blur-xl absolute"></div>
              <div className="relative z-10 flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-[#d0bcff] mb-2 opacity-80">
                  grain
                </span>
                <span className="font-['Syne'] text-xl font-extrabold text-white tracking-wide">
                  Dreamy Nights
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#4cd7f6] uppercase tracking-widest mt-1">
                  Ethereal Ambient Collection
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-['JetBrains_Mono'] text-[10px] text-[#4cd7f6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              LOSSLESS ATMOS
            </div>

            {/* Floating Play Button */}
            <button
              onClick={() => {
                if (currentTrack.id !== TRACKS[0].id) {
                  onPlayTrack(TRACKS[0]);
                } else {
                  onTogglePlay();
                }
              }}
              type="button"
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#d0bcff] hover:bg-[#e9ddff] text-[#3c0091] flex items-center justify-center shadow-[0_0_20px_rgba(208,188,255,0.6)] hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-2xl fill-1">
                {isPlaying && currentTrack.id === TRACKS[0].id ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          {/* Right Header Metadata */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a078ff]/30 text-[#d0bcff] border border-[#a078ff]/40 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider">
                AURA CURATED PLAYLIST
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#cbc3d7] flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-[#4cd7f6]">verified</span>
                Dynamic Session
              </span>
            </div>

            <h1 className="font-['Syne'] text-4xl md:text-6xl font-extrabold text-[#e3e1e9] tracking-tight leading-none">
              Dreamy Nights
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-base text-[#cbc3d7] max-w-2xl leading-relaxed">
              Suspended in time. Weightless dreampop, hazy shoegaze, and velvet electronic echoes for twilight contemplation.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-['JetBrains_Mono'] text-[#cbc3d7]">
              <span className="flex items-center gap-1.5 font-medium text-[#e3e1e9]">
                <span className="material-symbols-outlined text-sm text-[#d0bcff]">queue_music</span>
                24 songs
              </span>
              <span>/</span>
              <span>1h 42m total</span>
              <span>/</span>
              <span className="flex items-center gap-1.5 text-[#4cd7f6]">
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                14,820 people listening now
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onPlayTrack(TRACKS[0]);
                }}
                type="button"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#d0bcff] hover:bg-[#e9ddff] text-[#3c0091] font-['Syne'] font-bold text-sm shadow-[0_0_24px_rgba(208,188,255,0.45)] hover:scale-105 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-xl fill-1">play_arrow</span>
                <span>Play Mood Flow</span>
              </button>

              <button
                onClick={() => {
                  const randomIdx = Math.floor(Math.random() * TRACKS.length);
                  onPlayTrack(TRACKS[randomIdx]);
                }}
                type="button"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1e1f25]/80 hover:bg-[#292a2f] border border-white/10 text-[#e3e1e9] font-['Syne'] font-medium text-sm transition-all"
              >
                <span className="material-symbols-outlined text-base">shuffle</span>
                <span>Shuffle Vibe</span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                type="button"
                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all text-sm font-['Syne'] font-medium ${
                  isSaved
                    ? 'bg-[#ff516a]/20 border-[#ff516a] text-[#ffb2b7]'
                    : 'bg-[#1e1f25]/80 hover:bg-[#292a2f] border-white/10 text-[#e3e1e9]'
                }`}
              >
                <span className={`material-symbols-outlined text-base ${isSaved ? 'fill-1' : ''}`}>
                  {isSaved ? 'favorite' : 'bookmark_add'}
                </span>
                <span>{isSaved ? 'Saved in Vault' : 'Save to Mood Library'}</span>
              </button>

              <button
                onClick={onOpenResonate}
                type="button"
                className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-[#4cd7f6]/10 hover:bg-[#4cd7f6]/20 border border-[#4cd7f6]/30 text-[#4cd7f6] font-['JetBrains_Mono'] text-xs font-medium transition-all"
              >
                <span className="material-symbols-outlined text-sm">waves</span>
                <span>Atmospheric Layers</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (lg:col-span-8): Soundscape Ambience + Session Tracklist */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          {/* Live Soundscape Ambience Box */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#1e1f25]/70 p-5 backdrop-blur-xl border border-white/5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-xl">equalizer</span>
                <h3 className="font-['Syne'] text-base font-bold text-[#e3e1e9]">
                  Live Soundscape Ambience
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#03b5d3]/20 text-[#4cd7f6] font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider">
                  ACTIVE MIXER
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#cbc3d7]/70">
                48kHz Spatial Real-time
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Gentle Rain */}
              <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#121318]/60 border border-white/5">
                <div className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                  <span className="text-[#e3e1e9] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#4cd7f6]">water_drop</span>
                    Gentle Rain
                  </span>
                  <span className="text-[#4cd7f6] font-medium">{gentleRain}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gentleRain}
                  onChange={(e) => setGentleRain(Number(e.target.value))}
                  className="accent-[#4cd7f6] h-1.5 bg-[#292a2f] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#cbc3d7]/60">
                  <span>Soft Drizzle</span>
                  <span>Downpour</span>
                </div>
              </div>

              {/* Night City Hum */}
              <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#121318]/60 border border-white/5">
                <div className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                  <span className="text-[#e3e1e9] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#d0bcff]">apartment</span>
                    Night City Hum
                  </span>
                  <span className="text-[#d0bcff] font-medium">{cityHum}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cityHum}
                  onChange={(e) => setCityHum(Number(e.target.value))}
                  className="accent-[#d0bcff] h-1.5 bg-[#292a2f] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#cbc3d7]/60">
                  <span>Subtle Echo</span>
                  <span>Metropolis</span>
                </div>
              </div>

              {/* Tape Flutters Toggle */}
              <div className="flex flex-col justify-between p-3.5 rounded-xl bg-[#121318]/60 border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-['JetBrains_Mono'] text-[#e3e1e9] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#ffb2b7]">audio_file</span>
                    Tape Flutters
                  </span>
                  <button
                    type="button"
                    onClick={() => setTapeFlutters(!tapeFlutters)}
                    className={`px-2 py-0.5 rounded-full font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider transition-all ${
                      tapeFlutters
                        ? 'bg-[#a078ff] text-[#340080]'
                        : 'bg-[#292a2f] text-[#cbc3d7]'
                    }`}
                  >
                    {tapeFlutters ? 'ON' : 'OFF'}
                  </button>
                </div>
                <p className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#cbc3d7] mt-1">
                  Lo-fi wow & flutter warm saturation
                </p>
                <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#cbc3d7]/60 mt-1">
                  <span>Analog warmth</span>
                  <span>15 IPS Studio</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Tracklist */}
          <div className="flex flex-col gap-3 rounded-2xl bg-[#1e1f25]/70 p-5 backdrop-blur-xl border border-white/5 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <h3 className="font-['Syne'] text-base font-bold text-[#e3e1e9]">
                  Session Tracklist
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#121318] text-[#cbc3d7] font-['JetBrains_Mono'] text-[11px] border border-white/5">
                  Resonance Sequenced
                </span>
              </div>

              <div className="flex items-center gap-1 bg-[#121318] p-1 rounded-lg border border-white/5">
                <button
                  type="button"
                  onClick={() => setViewMode('detailed')}
                  className={`p-1.5 rounded transition-all ${
                    viewMode === 'detailed' ? 'bg-[#292a2f] text-[#4cd7f6]' : 'text-[#cbc3d7] hover:text-white'
                  }`}
                  title="Detailed View"
                >
                  <span className="material-symbols-outlined text-sm">view_agenda</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={`p-1.5 rounded transition-all ${
                    viewMode === 'compact' ? 'bg-[#292a2f] text-[#4cd7f6]' : 'text-[#cbc3d7] hover:text-white'
                  }`}
                  title="Compact View"
                >
                  <span className="material-symbols-outlined text-sm">view_list</span>
                </button>
              </div>
            </div>

            {/* Tracklist Table */}
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-12 px-3 py-2 text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#958ea0]">
                <div className="col-span-1">#</div>
                <div className="col-span-5 md:col-span-4">Title & Artist</div>
                <div className="hidden md:block md:col-span-4">Album</div>
                <div className="col-span-6 md:col-span-3 text-right md:text-left">Mood Tag</div>
              </div>

              {TRACKS.map((t, idx) => {
                const isCurrentPlaying = currentTrack.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      if (isCurrentPlaying) {
                        onTogglePlay();
                      } else {
                        onPlayTrack(t);
                      }
                    }}
                    className={`grid grid-cols-12 items-center px-3 py-2.5 rounded-xl cursor-pointer transition-all border ${
                      isCurrentPlaying
                        ? 'bg-[#a078ff]/15 border-[#a078ff]/40 shadow-sm'
                        : 'bg-transparent hover:bg-white/5 border-transparent'
                    }`}
                  >
                    {/* Index / Audio wave */}
                    <div className="col-span-1 font-['JetBrains_Mono'] text-xs">
                      {isCurrentPlaying && isPlaying ? (
                        <span className="material-symbols-outlined text-[#4cd7f6] text-base animate-pulse">
                          volume_up
                        </span>
                      ) : (
                        <span className="text-[#958ea0]">{idx + 1}</span>
                      )}
                    </div>

                    {/* Track info with thumbnail */}
                    <div className="col-span-5 md:col-span-4 flex items-center gap-3 min-w-0 pr-2">
                      <div className="relative w-9 h-9 rounded-lg bg-[#292a2f] overflow-hidden shrink-0">
                        <img src={t.coverUrl} alt={t.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`font-['Syne'] text-sm font-semibold truncate ${
                          isCurrentPlaying ? 'text-[#d0bcff]' : 'text-[#e3e1e9]'
                        }`}>
                          {t.title}
                        </span>
                        <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] truncate">
                          {t.artist}
                        </span>
                      </div>
                    </div>

                    {/* Album */}
                    <div className="hidden md:block md:col-span-4 font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] truncate pr-2">
                      {t.album}
                    </div>

                    {/* Mood tag badge */}
                    <div className="col-span-6 md:col-span-3 flex justify-end md:justify-start">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#121318] border border-white/5 font-['JetBrains_Mono'] text-[11px] text-[#4cd7f6] truncate">
                        {t.moodTags[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-4): Up Next Predictive AI + Vibe Matrix */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          {/* Up Next in This Aura */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#1e1f25]/70 p-5 backdrop-blur-xl border border-white/5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d0bcff] text-xl">psychology</span>
                <h3 className="font-['Syne'] text-base font-bold text-[#e3e1e9]">
                  Up Next in This Aura
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#a078ff]/20 text-[#d0bcff] font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider">
                Predictive AI
              </span>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] leading-relaxed">
              Aura monitors your listening state and seamlessly steers tracks toward deeper nocturnal calmness.
            </p>

            <div className="flex flex-col gap-2.5">
              {UP_NEXT_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#121318]/60 border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${track.coverGradient} flex items-center justify-center shrink-0 border border-white/10`}>
                      <span className="material-symbols-outlined text-sm text-[#4cd7f6]">music_note</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-['Syne'] text-sm font-semibold text-[#e3e1e9] truncate">
                        {track.title}
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] truncate">
                        {track.artist}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 pl-2">
                    <span className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6] font-medium">
                      {track.predictedShift}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#cbc3d7]/60">
                      {track.eta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Atmosphere Trajectory Bar */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5">
              <div className="flex justify-between text-xs font-['JetBrains_Mono']">
                <span className="text-[#cbc3d7]">Atmosphere Trajectory</span>
                <span className="text-[#d0bcff] font-semibold">Dreamy → Deep Slumber</span>
              </div>
              <div className="h-1.5 w-full bg-[#34343a] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#4cd7f6] via-[#a078ff] to-[#ff516a] rounded-full w-[68%]"></div>
              </div>
            </div>
          </div>

          {/* Vibe Matrix Quadrant Box */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#1e1f25]/70 p-5 backdrop-blur-xl border border-white/5 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-['Syne'] text-base font-bold text-[#e3e1e9]">
                Vibe Matrix
              </h3>
              <span className="material-symbols-outlined text-[#4cd7f6] text-lg">grain</span>
            </div>

            {/* Matrix Visual Graphic */}
            <div className="relative h-44 w-full rounded-xl bg-[#0d0e13]/90 border border-white/5 p-3 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#958ea0]">
                <span>High Energy</span>
                <span>Intense</span>
              </div>

              {/* Glowing Mountain Wave Graphic */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="vibeFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a078ff" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#4cd7f6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#121318" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,110 Q50,90 100,95 T180,60 T230,30 T280,75 L300,100 L300,120 L0,120 Z"
                    fill="url(#vibeFill)"
                  />
                  <path
                    d="M0,110 Q50,90 100,95 T180,60 T230,30 T280,75 L300,100"
                    fill="none"
                    stroke="#4cd7f6"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Current Anchor Badge */}
              <div className="relative z-10 self-center">
                <span className="px-3 py-1 rounded-full bg-[#d0bcff] text-[#340080] font-['JetBrains_Mono'] text-xs font-bold shadow-[0_0_15px_rgba(208,188,255,0.6)] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#340080] animate-ping"></span>
                  Current: Melodic Stargazing
                </span>
              </div>

              <div className="flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#958ea0] relative z-10">
                <span>Deep Stillness</span>
                <span>Velvet Warmth</span>
              </div>
            </div>

            <button
              onClick={onOpenExploreMatrix}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#121318]/70 hover:bg-[#292a2f] border border-white/5 font-['JetBrains_Mono'] text-xs text-[#cbc3d7] hover:text-[#e3e1e9] transition-all"
            >
              <span>Aura Mode: <strong>Synchronized</strong></span>
              <span className="text-[#4cd7f6] flex items-center gap-1">
                Expand Space <span className="material-symbols-outlined text-sm">open_in_full</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
