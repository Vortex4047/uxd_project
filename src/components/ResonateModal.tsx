import React, { useState } from 'react';

interface ResonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVibe: string;
  onApplyResonance: (vibe: string, details: { valence: number; energy: number; depth: number }) => void;
}

export const ResonateModal: React.FC<ResonateModalProps> = ({
  isOpen,
  onClose,
  currentVibe,
  onApplyResonance,
}) => {
  const [targetVibe, setTargetVibe] = useState(currentVibe);
  const [valence, setValence] = useState(65);
  const [energy, setEnergy] = useState(42);
  const [spatialDepth, setSpatialDepth] = useState(88);
  const [calibrating, setCalibrating] = useState(false);

  if (!isOpen) return null;

  const vibes = [
    { label: 'Dreamy 🌙', desc: 'Shoegaze, hazy reverbs & lush pads' },
    { label: 'Deep Focus 🔮', desc: 'Minimal techno, ambient modular synthesis' },
    { label: 'Melancholic 🌧️', desc: 'Quiet midnight noir & tape saturation' },
    { label: 'Warm Glow ☀️', desc: 'Acoustic fingerpicking & soft jazz' },
    { label: 'Sonic Euphoria ⚡', desc: 'Nu-disco, uplifting synth pulse' },
  ];

  const handleCalibrate = () => {
    setCalibrating(true);
    setTimeout(() => {
      setCalibrating(false);
      onApplyResonance(targetVibe, { valence, energy, depth: spatialDepth });
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0e13]/85 p-4 backdrop-blur-md">
      <div 
        className="w-full max-w-lg rounded-2xl bg-[#1e1f25] p-6 shadow-2xl border border-white/10 flex flex-col gap-5 text-left relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow decoration */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#a078ff]/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#4cd7f6]/15 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex items-center justify-between pb-2 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">auto_awesome</span>
            <div>
              <h3 className="font-['Syne'] text-lg font-bold text-[#e3e1e9]">
                Aura Resonator
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#cbc3d7]">
                Psychoacoustic Neural Alignment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#cbc3d7] hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Vibe Selection */}
        <div className="flex flex-col gap-2 relative z-10">
          <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#d0bcff]">
            Select Target Mood Matrix
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {vibes.map((v) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setTargetVibe(v.label)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  targetVibe === v.label
                    ? 'bg-[#a078ff]/20 border-[#a078ff] shadow-[0_0_12px_rgba(160,120,255,0.25)]'
                    : 'bg-[#121318]/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="font-['Syne'] text-sm font-semibold text-[#e3e1e9]">{v.label}</div>
                <div className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] mt-0.5">{v.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="flex flex-col gap-3.5 bg-[#121318]/60 p-4 rounded-xl border border-white/5 relative z-10">
          {/* Valence */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs font-['JetBrains_Mono']">
              <span className="text-[#e3e1e9]">Emotional Valence (Somatic Weight)</span>
              <span className="text-[#4cd7f6]">{valence}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={valence}
              onChange={(e) => setValence(Number(e.target.value))}
              className="accent-[#4cd7f6] h-1.5 bg-[#292a2f] rounded-lg cursor-pointer"
            />
          </div>

          {/* Energy */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs font-['JetBrains_Mono']">
              <span className="text-[#e3e1e9]">Acoustic Energy & Harmonic Density</span>
              <span className="text-[#ffb2b7]">{energy}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="accent-[#ffb2b7] h-1.5 bg-[#292a2f] rounded-lg cursor-pointer"
            />
          </div>

          {/* Spatial Depth */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs font-['JetBrains_Mono']">
              <span className="text-[#e3e1e9]">Binaural Spatial Reverb Field</span>
              <span className="text-[#d0bcff]">{spatialDepth}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={spatialDepth}
              onChange={(e) => setSpatialDepth(Number(e.target.value))}
              className="accent-[#d0bcff] h-1.5 bg-[#292a2f] rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 relative z-10">
          <span className="font-['JetBrains_Mono'] text-xs text-[#cbc3d7]">
            Recalibrates current soundscape
          </span>
          <button
            onClick={handleCalibrate}
            disabled={calibrating}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d0bcff] hover:bg-[#e9ddff] text-[#3c0091] font-['Syne'] font-semibold text-sm shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all active:scale-95 disabled:opacity-60"
          >
            {calibrating ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                <span>Calibrating...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">tune</span>
                <span>Calibrate Resonance</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
