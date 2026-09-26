import React, { useState, useEffect, useRef } from 'react';
import { Track } from '../types/aura';

interface NowPlayingViewProps {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  selectedDevice: string;
  onOpenDeviceModal: () => void;
  activeMood: string;
  onSelectMood: (mood: string) => void;
  musicVol: number;
  onChangeMusicVol: (v: number) => void;
  rainVol: number;
  onChangeRainVol: (v: number) => void;
  vinylVol: number;
  onChangeVinylVol: (v: number) => void;
  onResetMix: () => void;
  frequency432Hz: boolean;
  onToggle432Hz: () => void;
  currentProgressSec: number;
  onSeek: (secs: number) => void;
}

export const NowPlayingView: React.FC<NowPlayingViewProps> = ({
  currentTrack,
  isPlaying,
  selectedDevice,
  onOpenDeviceModal,
  activeMood,
  onSelectMood,
  musicVol,
  onChangeMusicVol,
  rainVol,
  onChangeRainVol,
  vinylVol,
  onChangeVinylVol,
  onResetMix,
  frequency432Hz,
  onToggle432Hz,
  currentProgressSec,
  onSeek,
}) => {
  const [isLiked, setIsLiked] = useState(true);
  const [activeLyricIndex, setActiveLyricIndex] = useState(2);
  const waveRef = useRef<SVGPathElement | null>(null);

  // Animate the audio frequency spectrum wave smoothly
  useEffect(() => {
    let animId: number;
    let phase = 0;

    const animate = () => {
      phase += isPlaying ? 0.05 : 0.01;
      if (waveRef.current) {
        const p1 = Math.sin(phase) * 12 + 50;
        const p2 = Math.cos(phase * 1.2) * 15 + 30;
        const p3 = Math.sin(phase * 0.9) * 18 + 65;
        const p4 = Math.cos(phase * 1.5) * 14 + 20;
        const d = `M0,50 Q40,${p1} 80,50 T160,50 T240,${p2} T320,${p3} T400,${p4} T480,70 T560,40 T640,60 T720,25 T760,50`;
        waveRef.current.setAttribute('d', d);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const moods = [
    { id: 'calm', label: '🌿 Calm', desc: 'Ambient Lo-Fi & Pads' },
    { id: 'energetic', label: '⚡ Energetic', desc: 'Analog Synths 120BPM' },
    { id: 'melancholic', label: '🌧️ Melancholic', desc: 'Active Resonance Base' },
    { id: 'confident', label: '🔥 Confident', desc: 'Deep Bass & Punch' },
    { id: 'happy', label: '☀️ Happy', desc: 'Warm Acoustic Chords' },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#0d0e13]/90 px-6 py-8 shadow-2xl border border-white/5">
      {/* Dynamic blurred radial glows */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full bg-[#a078ff]/15 blur-[140px]"></div>
      <div className="pointer-events-none absolute top-1/2 -right-24 h-[440px] w-[440px] rounded-full bg-[#03b5d3]/12 blur-[160px]"></div>
      <div className="pointer-events-none absolute -bottom-36 left-12 h-[480px] w-[480px] rounded-full bg-[#ff516a]/12 blur-[170px]"></div>

      <div className="relative z-10 flex flex-col gap-8 text-left">
        {/* Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1e1f25]/80 border border-white/5 px-3 py-1 font-['JetBrains_Mono'] text-xs text-[#4cd7f6] shadow-sm">
              <span className="material-symbols-outlined text-sm animate-pulse">graphic_eq</span>
              LIVE SESSION #409
            </span>
            <span className="rounded-full bg-[#292a2f]/70 border border-white/5 px-3 py-1 font-['JetBrains_Mono'] text-xs text-[#cbc3d7]">
              Aura Resonance {currentTrack.resonance}%
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-[#1e1f25]/80 border border-white/5 px-3 py-1 text-[#e3e1e9] shadow-sm">
              <span className="material-symbols-outlined text-[#4cd7f6] text-sm">spatial_audio_off</span>
              <span className="font-['JetBrains_Mono'] text-xs">Hi-Res 24-bit/96kHz Spatial Audio</span>
            </div>

            <button
              onClick={onOpenDeviceModal}
              type="button"
              className="group flex items-center gap-2 rounded-full bg-[#292a2f]/80 hover:bg-[#34343a] border border-white/10 px-3 py-1 font-['JetBrains_Mono'] text-xs text-[#e3e1e9] transition-all"
            >
              <span className="material-symbols-outlined text-[#4cd7f6] text-sm">speaker_group</span>
              <span>{selectedDevice}</span>
              <span className="material-symbols-outlined text-xs text-[#cbc3d7] group-hover:translate-y-0.5 transition-transform">
                expand_more
              </span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Artwork + Track Meta + Frequency Spectrum */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="relative flex flex-col items-center">
              {/* Artwork */}
              <div className="relative aspect-square w-full max-w-[460px] overflow-hidden rounded-2xl bg-[#292a2f] shadow-2xl border border-white/10 group">
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13]/80 via-transparent to-transparent"></div>

                {/* Top Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <span className="flex items-center gap-1.5 rounded-full bg-[#0d0e13]/80 border border-white/10 px-3 py-1 font-['JetBrains_Mono'] text-[11px] text-[#e3e1e9] backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#ff516a] animate-pulse"></span>
                    ANALOG TAPE RIG
                  </span>
                </div>

                {/* Bottom Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#d0bcff]/20 border border-[#d0bcff]/30 px-3 py-1 font-['JetBrains_Mono'] text-[11px] text-[#d0bcff] backdrop-blur-md">
                    {currentTrack.album} ({currentTrack.year || '2015'})
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#cbc3d7] bg-[#0d0e13]/70 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                    BPM {currentTrack.bpm} • Key {currentTrack.key}
                  </span>
                </div>
              </div>

              {/* Title & Tags */}
              <div className="mt-4 flex w-full max-w-[460px] flex-col gap-1.5 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-['Syne'] text-3xl md:text-4xl font-bold text-[#e3e1e9] tracking-tight leading-tight">
                      {currentTrack.title}
                    </h1>
                    <p className="font-['Plus_Jakarta_Sans'] text-lg text-[#4cd7f6] font-medium">
                      {currentTrack.artist}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1e1f25]/80 border border-white/10 text-[#ff516a] shadow-sm hover:scale-110 active:scale-95 transition-all"
                  >
                    <span className={`material-symbols-outlined text-2xl ${isLiked ? 'fill-1' : ''}`}>
                      favorite
                    </span>
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="rounded-full bg-[#a078ff] px-3 py-1 font-['JetBrains_Mono'] text-xs font-semibold text-[#340080] shadow-[0_0_12px_rgba(160,120,255,0.4)]">
                    {currentTrack.moodTags[0]}
                  </span>
                  {currentTrack.moodTags.slice(1).map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-[#1e1f25]/80 border border-white/5 px-3 py-1 font-['JetBrains_Mono'] text-xs text-[#cbc3d7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Frequency Spectrum Card */}
            <div className="flex flex-col gap-2 rounded-2xl bg-[#1e1f25]/60 p-4 backdrop-blur-md border border-white/5 shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-xs text-[#cbc3d7] flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-sm">equalizer</span>
                  AUDIO FREQUENCY SPECTRUM & SINE FIELD
                </span>
                <button
                  type="button"
                  onClick={onToggle432Hz}
                  className={`font-['JetBrains_Mono'] text-xs px-2.5 py-0.5 rounded-full transition-all border ${
                    frequency432Hz
                      ? 'bg-[#4cd7f6]/10 border-[#4cd7f6]/40 text-[#4cd7f6]'
                      : 'bg-white/5 border-white/10 text-[#cbc3d7]'
                  }`}
                >
                  {frequency432Hz ? '432Hz Mode Active' : 'Standard 440Hz'}
                </button>
              </div>

              <div className="relative h-24 w-full overflow-hidden rounded-xl bg-[#0d0e13]/80 p-2 border border-white/5">
                <svg className="h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 760 100">
                  <defs>
                    <linearGradient id="spectrumGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#d0bcff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#ffb2b7" stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="sineFill" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#a078ff" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#121318" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,50 Q40,15 80,50 T160,50 T240,30 T320,65 T400,20 T480,70 T560,40 T640,60 T720,25 T760,50 L760,100 L0,100 Z"
                    fill="url(#sineFill)"
                  />
                  <path
                    ref={waveRef}
                    d="M0,50 Q40,15 80,50 T160,50 T240,30 T320,65 T400,20 T480,70 T560,40 T640,60 T720,25 T760,50"
                    stroke="url(#spectrumGradient)"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0,52 Q40,75 80,52 T160,52 T240,70 T320,35 T400,80 T480,30 T560,60 T640,40 T720,75 T760,52"
                    stroke="#4cd7f6"
                    strokeDasharray="4 4"
                    strokeOpacity="0.4"
                    strokeWidth="1.2"
                  />
                </svg>

                <div className="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-between px-3 font-['JetBrains_Mono'] text-[11px] text-[#958ea0]">
                  <span>32 Hz</span>
                  <span>250 Hz</span>
                  <span>1 kHz</span>
                  <span>4 kHz</span>
                  <span>16 kHz</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Synchronized Narrative + Soundscape Mixer */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Synchronized Emotional Narrative */}
            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[#1e1f25]/60 p-5 backdrop-blur-xl border border-white/5 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#e3e1e9] font-medium">
                  <span className="material-symbols-outlined text-[#d0bcff] text-base">lyrics</span>
                  <span>SYNCHRONIZED EMOTIONAL NARRATIVE</span>
                </div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6]">
                  Line 0{activeLyricIndex + 1} / 0{currentTrack.lyrics?.length || 6}
                </span>
              </div>

              <div className="flex flex-col gap-3.5 py-1">
                {currentTrack.lyrics?.map((lyric, idx) => {
                  const isCurrent = idx === activeLyricIndex;
                  return isCurrent ? (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveLyricIndex(idx);
                        onSeek(lyric.timeSec);
                      }}
                      className="relative rounded-xl bg-[#292a2f]/90 p-4 border border-[#d0bcff]/30 shadow-lg cursor-pointer transform scale-[1.02] transition-all"
                    >
                      <p className="font-['Syne'] text-xl font-bold text-[#e3e1e9] drop-shadow-sm leading-snug">
                        {lyric.text}
                      </p>
                      {lyric.note && (
                        <span className="mt-1.5 block font-['JetBrains_Mono'] text-xs text-[#4cd7f6]">
                          {lyric.note}
                        </span>
                      )}
                    </div>
                  ) : (
                    <p
                      key={idx}
                      onClick={() => {
                        setActiveLyricIndex(idx);
                        onSeek(lyric.timeSec);
                      }}
                      className="font-['Syne'] text-base md:text-lg text-[#cbc3d7]/50 hover:text-[#e3e1e9] cursor-pointer transition-colors"
                    >
                      {lyric.text}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Atmospheric Soundscape Mixer */}
            <div className="flex flex-col gap-4 rounded-2xl bg-[#1e1f25]/60 p-5 backdrop-blur-xl border border-white/5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-xs text-[#e3e1e9] flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-sm">tune</span>
                  ATMOSPHERIC SOUNDSCAPE MIXER
                </span>
                <button
                  onClick={onResetMix}
                  type="button"
                  className="font-['JetBrains_Mono'] text-xs text-[#d0bcff] hover:underline"
                >
                  Reset Baseline
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Music Master Volume */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-['JetBrains_Mono'] text-xs">
                    <span className="text-[#e3e1e9] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#d0bcff]">music_note</span>
                      Music Master Volume
                    </span>
                    <span className="text-[#4cd7f6] font-medium">{musicVol}%</span>
                  </div>
                  <div
                    className="relative h-2 w-full rounded-full bg-[#34343a] cursor-pointer overflow-hidden group"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const val = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
                      onChangeMusicVol(val);
                    }}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff] transition-all"
                      style={{ width: `${musicVol}%` }}
                    ></div>
                  </div>
                </div>

                {/* Rain */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-['JetBrains_Mono'] text-xs">
                    <span className="text-[#e3e1e9] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#4cd7f6]">thunderstorm</span>
                      Ambient Rain & Thunder
                    </span>
                    <span className="text-[#4cd7f6] font-medium">{rainVol}%</span>
                  </div>
                  <div
                    className="relative h-2 w-full rounded-full bg-[#34343a] cursor-pointer overflow-hidden group"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const val = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
                      onChangeRainVol(val);
                    }}
                  >
                    <div
                      className="h-full rounded-full bg-[#4cd7f6] transition-all"
                      style={{ width: `${rainVol}%` }}
                    ></div>
                  </div>
                </div>

                {/* Vinyl */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-['JetBrains_Mono'] text-xs">
                    <span className="text-[#e3e1e9] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#ffb2b7]">grain</span>
                      Vinyl Warmth & Crackle
                    </span>
                    <span className="text-[#ffb2b7] font-medium">{vinylVol}%</span>
                  </div>
                  <div
                    className="relative h-2 w-full rounded-full bg-[#34343a] cursor-pointer overflow-hidden group"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const val = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
                      onChangeVinylVol(val);
                    }}
                  >
                    <div
                      className="h-full rounded-full bg-[#ffb2b7] transition-all"
                      style={{ width: `${vinylVol}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Shift Mood Harmonizer */}
        <div className="flex flex-col gap-3 rounded-2xl bg-[#1e1f25]/70 p-5 backdrop-blur-xl border border-white/5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#e3e1e9] font-medium">
              <span className="material-symbols-outlined text-[#4cd7f6] text-sm">auto_mode</span>
              <span>SHIFT MOOD • REAL-TIME CROSSFADE HARMONIZER</span>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#cbc3d7]">
              Smooth 4-beat harmonic transition
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {moods.map((m) => {
              const isSelected = activeMood.toLowerCase() === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMood(m.id)}
                  type="button"
                  className={`group flex flex-col items-start gap-1 rounded-xl p-3 text-left transition-all border ${
                    isSelected
                      ? 'bg-[#a078ff] text-[#340080] border-[#a078ff] shadow-[0_0_15px_rgba(160,120,255,0.4)]'
                      : 'bg-[#292a2f]/60 text-[#e3e1e9] border-white/5 hover:bg-[#34343a] hover:border-white/10'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-['Syne'] text-sm font-semibold">{m.label}</span>
                    <span
                      className={`material-symbols-outlined text-sm ${
                        isSelected ? 'text-[#340080]' : 'text-[#4cd7f6] opacity-0 group-hover:opacity-100'
                      } transition-opacity`}
                    >
                      {isSelected ? 'check_circle' : 'arrow_forward'}
                    </span>
                  </div>
                  <span
                    className={`font-['JetBrains_Mono'] text-[11px] ${
                      isSelected ? 'text-[#340080]/80 font-medium' : 'text-[#cbc3d7]'
                    }`}
                  >
                    {m.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
