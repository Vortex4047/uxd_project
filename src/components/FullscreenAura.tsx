import React from 'react';
import { Track } from '../types/aura';

interface FullscreenAuraProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  activeMood: string;
  rainVol: number;
  onChangeRainVol: (v: number) => void;
}

export const FullscreenAura: React.FC<FullscreenAuraProps> = ({
  isOpen,
  onClose,
  currentTrack,
  isPlaying,
  onTogglePlay,
  activeMood,
  rainVol,
  onChangeRainVol,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#090a0f] flex flex-col justify-between p-8 md:p-12 animate-in fade-in duration-300 overflow-hidden select-none text-left">
      {/* Dynamic blurred radial glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[700px] h-[500px] bg-[#a078ff]/25 rounded-full blur-[160px] animate-pulse"></div>
      <div className="pointer-events-none absolute bottom-0 right-10 w-[600px] h-[500px] bg-[#4cd7f6]/20 rounded-full blur-[170px]"></div>

      {/* Top bar */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6] animate-ping"></span>
          <span className="font-['Syne'] text-lg font-bold text-[#e3e1e9]">
            AURA IMMERSION
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-['JetBrains_Mono'] text-xs text-[#d0bcff]">
            {activeMood.toUpperCase()} RESONANCE
          </span>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#e3e1e9] flex items-center justify-center transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close_fullscreen</span>
        </button>
      </div>

      {/* Centerpiece: Floating Glowing Artwork & Lyrics */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto w-full my-auto">
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(160,120,255,0.35)] border border-white/20 group">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <span className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6]">
              {currentTrack.album}
            </span>
            <h2 className="font-['Syne'] text-2xl font-bold text-white">
              {currentTrack.title}
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#cbc3d7]">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Big Synced Lyrics */}
        <div className="flex flex-col gap-4 text-center md:text-left max-w-lg">
          <span className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6] tracking-widest uppercase">
            Synchronized Emotional State
          </span>
          <h1 className="font-['Syne'] text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
            "What will make you smile?"
          </h1>
          <p className="font-['Plus_Jakarta_Sans'] text-base text-[#d0bcff] font-medium">
            ✦ Melodic peak resonance • Vocals bloom in wide stereo
          </p>
          <p className="font-['Syne'] text-xl text-[#cbc3d7]/60 italic">
            Tender is the night...
          </p>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              type="button"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#d0bcff] hover:bg-white text-[#3c0091] font-['Syne'] font-bold text-sm shadow-[0_0_30px_rgba(208,188,255,0.6)] transition-all"
            >
              <span className="material-symbols-outlined text-2xl fill-1">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isPlaying ? 'Pause Experience' : 'Resume Flow'}</span>
            </button>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-xs font-['JetBrains_Mono'] text-[#cbc3d7]">
              <span className="material-symbols-outlined text-sm text-[#4cd7f6]">rainy</span>
              <span>Rain: {rainVol}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={rainVol}
                onChange={(e) => onChangeRainVol(Number(e.target.value))}
                className="w-20 accent-[#4cd7f6] h-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#cbc3d7]/60">
        <span>BINAURAL COHERENCE: 98.4%</span>
        <span>PRESS ESC OR CLICK ICON TO EXIT</span>
      </div>
    </div>
  );
};
