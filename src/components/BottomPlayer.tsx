import React, { useState } from 'react';
import { Track } from '../types/aura';
import { soundscape } from '../services/soundscapeEngine';

interface BottomPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  progressSec: number;
  onSeek: (seconds: number) => void;
  rainVolume: number;
  onChangeRainVolume: (vol: number) => void;
  vinylVolume: number;
  onChangeVinylVolume: (vol: number) => void;
  masterVolume: number;
  onChangeMasterVolume: (vol: number) => void;
  auraMode: boolean;
  onToggleAuraMode: () => void;
  onToggleFullscreen: () => void;
}

export const BottomPlayer: React.FC<BottomPlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  progressSec,
  onSeek,
  rainVolume,
  onChangeRainVolume,
  vinylVolume,
  onChangeVinylVolume,
  masterVolume,
  onChangeMasterVolume,
  auraMode,
  onToggleAuraMode,
  onToggleFullscreen,
}) => {
  const [isLiked, setIsLiked] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const pct = Math.min(100, Math.max(0, (progressSec / currentTrack.durationSec) * 100));

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * currentTrack.durationSec);
  };

  const handleToggleMute = () => {
    const muted = soundscape.toggleMute();
    setIsMuted(muted);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-[#0d0e13]/92 backdrop-blur-2xl z-50 flex items-center justify-between px-6 border-t border-white/5 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] select-none">
      {/* Left: Track Information */}
      <div className="flex items-center gap-4 w-72 min-w-[240px]">
        <div className="relative w-12 h-12 rounded-lg bg-[#292a2f] overflow-hidden shrink-0 shadow-md border border-white/10 group">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-['Syne'] text-[15px] text-[#e3e1e9] font-semibold truncate hover:text-[#d0bcff] cursor-pointer">
            {currentTrack.title}
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] truncate">
            {currentTrack.artist}
          </span>
        </div>

        <button
          onClick={() => setIsLiked(!isLiked)}
          type="button"
          className={`p-1.5 transition-all hover:scale-110 active:scale-90 ${
            isLiked ? 'text-[#ff516a]' : 'text-[#cbc3d7] hover:text-[#ff516a]'
          }`}
          title={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className={`material-symbols-outlined text-xl ${isLiked ? 'fill-1' : ''}`}>
            favorite
          </span>
        </button>
      </div>

      {/* Center: Controls & Progress Bar */}
      <div className="flex flex-col items-center gap-2 max-w-xl w-full px-4">
        {/* Playback Buttons */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            type="button"
            className={`transition-colors ${
              isShuffle ? 'text-[#4cd7f6]' : 'text-[#cbc3d7] hover:text-[#e3e1e9]'
            }`}
            title="Shuffle"
          >
            <span className="material-symbols-outlined text-lg">shuffle</span>
          </button>

          <button
            onClick={onPrevTrack}
            type="button"
            className="text-[#cbc3d7] hover:text-[#e3e1e9] hover:scale-105 transition-all"
            title="Previous Track"
          >
            <span className="material-symbols-outlined text-xl">skip_previous</span>
          </button>

          <button
            onClick={onTogglePlay}
            type="button"
            className="w-10 h-10 rounded-full bg-[#d0bcff] hover:bg-[#e9ddff] flex items-center justify-center text-[#3c0091] shadow-[0_0_16px_rgba(208,188,255,0.45)] hover:scale-105 active:scale-95 transition-all"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <span className="material-symbols-outlined text-2xl fill-1">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={onNextTrack}
            type="button"
            className="text-[#cbc3d7] hover:text-[#e3e1e9] hover:scale-105 transition-all"
            title="Next Track"
          >
            <span className="material-symbols-outlined text-xl">skip_next</span>
          </button>

          <button
            onClick={() => setIsRepeat(!isRepeat)}
            type="button"
            className={`transition-colors ${
              isRepeat ? 'text-[#4cd7f6]' : 'text-[#cbc3d7] hover:text-[#e3e1e9]'
            }`}
            title="Repeat"
          >
            <span className="material-symbols-outlined text-lg">repeat</span>
          </button>
        </div>

        {/* Timeline Bar */}
        <div className="flex items-center gap-3 w-full">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#cbc3d7] tabular-nums w-10 text-right">
            {formatTime(progressSec)}
          </span>

          <div
            onClick={handleProgressBarClick}
            className="relative flex-1 h-1.5 bg-[#34343a] hover:h-2 rounded-full overflow-hidden cursor-pointer transition-all group"
          >
            <div
              className="h-full bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff] rounded-full relative"
              style={{ width: `${pct}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 shadow-[0_0_8px_white]"></div>
            </div>
          </div>

          <span className="font-['JetBrains_Mono'] text-[11px] text-[#cbc3d7] tabular-nums w-10">
            {currentTrack.duration}
          </span>
        </div>
      </div>

      {/* Right: Soundscape Mix & Volume Controls */}
      <div className="flex items-center justify-end gap-5 w-80">
        {/* Quick Atmospheric soundscape pill */}
        <div className="flex items-center gap-2.5 bg-[#1e1f25]/80 border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md">
          <span
            className="material-symbols-outlined text-[#4cd7f6] text-sm"
            title={`Ambient Rain: ${rainVolume}%`}
          >
            rainy
          </span>
          <div
            className="w-14 h-1 bg-[#34343a] rounded-full overflow-hidden cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const val = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
              onChangeRainVolume(val);
            }}
            title="Rain Intensity"
          >
            <div
              className="h-full bg-[#4cd7f6] rounded-full transition-all"
              style={{ width: `${rainVolume}%` }}
            ></div>
          </div>

          {/* Vinyl Warmth button */}
          <button
            onClick={() => onChangeVinylVolume(vinylVolume > 0 ? 0 : 25)}
            type="button"
            className={`p-0.5 rounded transition-colors text-xs flex items-center ${
              vinylVolume > 0 ? 'text-[#ffb2b7]' : 'text-[#cbc3d7] hover:text-[#ffb2b7]'
            }`}
            title={`Vinyl Texture (${vinylVolume}%): Click to toggle`}
          >
            <span className="material-symbols-outlined text-sm">grain</span>
          </button>

          {/* Aura Mode Toggle */}
          <button
            onClick={onToggleAuraMode}
            type="button"
            className={`px-2 py-0.5 rounded-full text-[10px] font-['JetBrains_Mono'] font-semibold uppercase tracking-wider transition-all ${
              auraMode
                ? 'bg-[#a078ff] text-[#340080] shadow-[0_0_12px_rgba(160,120,255,0.4)]'
                : 'bg-[#292a2f] text-[#cbc3d7] hover:text-white'
            }`}
            title="Aura Psychoacoustic Tuning"
          >
            AURA
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1.5 text-[#cbc3d7]">
          <button
            onClick={handleToggleMute}
            type="button"
            className="hover:text-[#e3e1e9] transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            <span className="material-symbols-outlined text-lg">
              {isMuted || masterVolume === 0
                ? 'volume_off'
                : masterVolume < 40
                ? 'volume_down'
                : 'volume_up'}
            </span>
          </button>

          <div
            className="w-16 h-1 bg-[#34343a] hover:h-1.5 rounded-full overflow-hidden cursor-pointer transition-all"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const val = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
              onChangeMasterVolume(val);
            }}
            title={`Volume: ${masterVolume}%`}
          >
            <div
              className="h-full bg-[#cbc3d7] hover:bg-[#d0bcff] rounded-full transition-all"
              style={{ width: `${isMuted ? 0 : masterVolume}%` }}
            ></div>
          </div>
        </div>

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          type="button"
          className="text-[#cbc3d7] hover:text-[#e3e1e9] hover:scale-110 transition-all p-1"
          title="Fullscreen Aura Immersion"
        >
          <span className="material-symbols-outlined text-xl">fullscreen</span>
        </button>
      </div>
    </footer>
  );
};
