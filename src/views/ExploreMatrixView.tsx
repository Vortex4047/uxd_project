import React, { useState } from 'react';
import { Track } from '../types/aura';
import { TRACKS } from '../data/auraData';

interface ExploreMatrixViewProps {
  onPlayTrack: (track: Track) => void;
  onNavigateToSessions: () => void;
}

export const ExploreMatrixView: React.FC<ExploreMatrixViewProps> = ({
  onPlayTrack,
  onNavigateToSessions,
}) => {
  // 2D position in percent: X = Valence (Melancholy to Euphoric), Y = Energy (Stillness to Kinetic)
  const [point, setPoint] = useState({ x: 38, y: 72 });
  const [selectedQuadrant, setSelectedQuadrant] = useState('Dreamy Shoegaze Drift');

  const handleMatrixClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(5, Math.min(95, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
    setPoint({ x, y });

    // Determine quadrant descriptor
    if (x < 50 && y < 50) setSelectedQuadrant('Nocturnal Ambient Stillness');
    else if (x >= 50 && y < 50) setSelectedQuadrant('Euphoric High-Energy Synth');
    else if (x < 50 && y >= 50) setSelectedQuadrant('Dreamy Shoegaze Drift');
    else setSelectedQuadrant('Warm Radiant Acoustic Sun');
  };

  return (
    <div className="flex flex-col gap-8 text-left pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-widest text-[#4cd7f6]">
            SPATIAL MOOD ENGINE
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#a078ff]/20 text-[#d0bcff] font-['JetBrains_Mono'] text-[10px] font-semibold">
            2D Quadrant Audio Matrix
          </span>
        </div>
        <h1 className="font-['Syne'] text-3xl md:text-5xl font-bold text-[#e3e1e9]">
          Explore Resonance Matrix
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#cbc3d7] max-w-2xl">
          Click or drag across the emotional continuum. Aura synthesizes real-time soundscapes, psychoacoustic frequencies, and harmonic playlists matched to the coordinate.
        </p>
      </div>

      {/* Main Matrix Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* The 2D Interactive Board */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div
            onClick={handleMatrixClick}
            className="relative aspect-[16/10] w-full rounded-3xl bg-[#0d0e13] border border-white/10 p-6 flex flex-col justify-between overflow-hidden cursor-crosshair shadow-2xl group select-none"
          >
            {/* Ambient Multi-chromatic gradients */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#4cd7f6]/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#ff516a]/15 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#a078ff]/15 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#d0bcff]/15 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Grid Lines */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-full h-px bg-white/10"></div>
              <div className="h-full w-px bg-white/10 absolute"></div>
            </div>

            {/* Quadrant Labels */}
            <div className="flex justify-between font-['JetBrains_Mono'] text-xs text-[#958ea0] relative z-10">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
                Quiet Melancholy / Deep Drone
              </span>
              <span className="flex items-center gap-1.5">
                Kinetic Euphoria / 120BPM
                <span className="w-2 h-2 rounded-full bg-[#ff516a]"></span>
              </span>
            </div>

            {/* Draggable / Clickable Resonance Pin */}
            <div
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <div className="relative flex items-center justify-center">
                {/* Ripple ring */}
                <div className="w-16 h-16 rounded-full bg-[#4cd7f6]/25 animate-ping absolute"></div>
                <div className="w-10 h-10 rounded-full bg-[#d0bcff]/30 blur-sm absolute"></div>
                <div className="w-6 h-6 rounded-full bg-[#d0bcff] shadow-[0_0_20px_#d0bcff] flex items-center justify-center text-[#340080]">
                  <span className="material-symbols-outlined text-sm font-bold">blur_on</span>
                </div>
              </div>

              {/* Float readout tag */}
              <div className="absolute left-1/2 -top-9 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-[#121318]/90 border border-[#d0bcff]/40 shadow-xl font-['JetBrains_Mono'] text-[11px] text-[#e3e1e9]">
                Valence: {point.x}% • Energy: {100 - point.y}%
              </div>
            </div>

            {/* Bottom Labels */}
            <div className="flex justify-between font-['JetBrains_Mono'] text-xs text-[#958ea0] relative z-10">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#a078ff]"></span>
                Shoegaze & Velvet Reverbs
              </span>
              <span className="flex items-center gap-1.5">
                Warm Acoustic Solitude
                <span className="w-2 h-2 rounded-full bg-[#d0bcff]"></span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#cbc3d7]/70 px-2">
            <span>Coordinate: X: {point.x}% | Y: {point.y}%</span>
            <span>Click any coordinate to recalculate psychoacoustic spectrum</span>
          </div>
        </div>

        {/* Right Info Panel */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="flex flex-col gap-4 rounded-3xl bg-[#1e1f25]/80 p-6 backdrop-blur-xl border border-white/5 shadow-xl">
            <div>
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4cd7f6]">
                ACTIVE NODE
              </span>
              <h3 className="font-['Syne'] text-xl font-bold text-[#e3e1e9] mt-1">
                {selectedQuadrant}
              </h3>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] leading-relaxed">
              Resonance profile dynamically tuned to your coordinates. Audio feeds 432Hz binaural drift with tape warmth.
            </p>

            {/* Matched Tracks */}
            <div className="flex flex-col gap-2">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#958ea0] uppercase tracking-wider">
                Closest Harmonic Matches
              </span>
              {TRACKS.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  onClick={() => onPlayTrack(t)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#121318]/60 hover:bg-[#292a2f] border border-white/5 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={t.coverUrl} alt={t.title} className="w-8 h-8 rounded-lg object-cover" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-['Syne'] text-xs font-semibold text-[#e3e1e9] truncate group-hover:text-[#d0bcff]">
                        {t.title}
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#cbc3d7] truncate">
                        {t.artist}
                      </span>
                    </div>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#4cd7f6]">
                    {t.resonance}%
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={onNavigateToSessions}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#d0bcff] hover:bg-[#e9ddff] text-[#3c0091] font-['Syne'] font-bold text-xs shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all"
            >
              <span>Launch Dynamic Aura Session</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
