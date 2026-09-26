import React, { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  frequency432Hz: boolean;
  onToggle432Hz: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  frequency432Hz,
  onToggle432Hz,
}) => {
  const [losslessAtmos, setLosslessAtmos] = useState(true);
  const [binauralAudio, setBinauralAudio] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0e13]/80 p-4 backdrop-blur-md">
      <div 
        className="w-full max-w-md rounded-2xl bg-[#1e1f25] p-6 shadow-2xl border border-white/10 flex flex-col gap-5 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <h3 className="font-['Syne'] text-lg font-bold text-[#e3e1e9] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-xl">tune</span>
            Audio & Psychoacoustic Engine
          </h3>
          <button onClick={onClose} className="text-[#cbc3d7] hover:text-white p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 font-['Plus_Jakarta_Sans'] text-sm">
          {/* 432Hz Mode */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#121318]/60 border border-white/5">
            <div className="flex flex-col">
              <span className="font-semibold text-[#e3e1e9]">432Hz Harmonic Tuning</span>
              <span className="text-xs text-[#cbc3d7]">Aligns master frequencies with natural acoustic ratios</span>
            </div>
            <button
              type="button"
              onClick={onToggle432Hz}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                frequency432Hz ? 'bg-[#a078ff]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  frequency432Hz ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Lossless Atmos */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#121318]/60 border border-white/5">
            <div className="flex flex-col">
              <span className="font-semibold text-[#e3e1e9]">Hi-Res 24-bit/96kHz Master</span>
              <span className="text-xs text-[#cbc3d7]">Studio uncompressed dynamic headroom</span>
            </div>
            <button
              type="button"
              onClick={() => setLosslessAtmos(!losslessAtmos)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                losslessAtmos ? 'bg-[#a078ff]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  losslessAtmos ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Binaural Spatial */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#121318]/60 border border-white/5">
            <div className="flex flex-col">
              <span className="font-semibold text-[#e3e1e9]">Spatial Soundfield Virtualizer</span>
              <span className="text-xs text-[#cbc3d7]">Convolution reverb room emulation</span>
            </div>
            <button
              type="button"
              onClick={() => setBinauralAudio(!binauralAudio)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                binauralAudio ? 'bg-[#a078ff]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  binauralAudio ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Haptic Waveforms */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#121318]/60 border border-white/5">
            <div className="flex flex-col">
              <span className="font-semibold text-[#e3e1e9]">Animated Spectral Sine Wave</span>
              <span className="text-xs text-[#cbc3d7]">Real-time canvas harmonic interpolation</span>
            </div>
            <button
              type="button"
              onClick={() => setHapticFeedback(!hapticFeedback)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                hapticFeedback ? 'bg-[#a078ff]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  hapticFeedback ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="text-center font-['JetBrains_Mono'] text-xs text-[#cbc3d7]/60 pt-1">
          AURA v2.4.9 • DSP Engine Active
        </div>
      </div>
    </div>
  );
};
