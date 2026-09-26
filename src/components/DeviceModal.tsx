import React from 'react';
import { AUDIO_DEVICES } from '../data/auraData';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDevice: string;
  onSelectDevice: (device: string) => void;
}

export const DeviceModal: React.FC<DeviceModalProps> = ({
  isOpen,
  onClose,
  selectedDevice,
  onSelectDevice,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0e13]/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-2xl bg-[#292a2f] p-5 shadow-2xl border border-white/10 flex flex-col gap-4 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1 border-b border-white/5">
          <h3 className="font-['Syne'] text-lg font-semibold text-[#e3e1e9] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-xl">cast</span>
            Select Cast Destination
          </h3>
          <button
            onClick={onClose}
            className="text-[#cbc3d7] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {AUDIO_DEVICES.map((device) => {
            const isSelected = selectedDevice === device.name;
            return (
              <button
                key={device.id}
                onClick={() => {
                  onSelectDevice(device.name);
                  onClose();
                }}
                className={`flex items-center justify-between rounded-xl p-3.5 transition-all text-left border ${
                  isSelected
                    ? 'bg-[#a078ff] text-[#340080] border-[#a078ff] shadow-[0_0_15px_rgba(160,120,255,0.35)]'
                    : 'bg-[#1e1f25] text-[#e3e1e9] border-white/5 hover:bg-[#34343a] hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-2xl ${isSelected ? 'text-[#340080]' : 'text-[#4cd7f6]'}`}>
                    {device.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-['Syne'] text-[15px] font-semibold leading-tight">
                      {device.name}
                    </span>
                    <span className={`font-['JetBrains_Mono'] text-xs mt-0.5 ${isSelected ? 'text-[#340080]/80' : 'text-[#cbc3d7]'}`}>
                      {device.status}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <span className="material-symbols-outlined font-bold">check</span>
                ) : (
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#cbc3d7]/60">Pair</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 text-center text-xs text-[#cbc3d7]/70 font-['JetBrains_Mono']">
          Binaural spatial stream active at 48kHz / 24-bit bit-depth
        </div>
      </div>
    </div>
  );
};
