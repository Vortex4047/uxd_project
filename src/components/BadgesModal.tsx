import React from 'react';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const allBadges = [
    { id: '1', title: 'Night Owl Aura', desc: 'Logged 200+ hours between 1:00 AM & 5:00 AM', icon: 'dark_mode', unlocked: true, color: '#d0bcff' },
    { id: '2', title: 'Deep Diver', desc: 'Completed a continuous 6-hour unbroken session', icon: 'waves', unlocked: true, color: '#4cd7f6' },
    { id: '3', title: 'Sonic Chameleon', desc: 'Navigated through 5 distinct emotional zones in one day', icon: 'bubble_chart', unlocked: true, color: '#ffb2b7' },
    { id: '4', title: 'Harmonic Hermit', desc: '82% progress • Reach 100 hours of 432Hz ambient tuning', icon: 'self_improvement', unlocked: false, color: '#d0bcff' },
    { id: '5', title: 'Velvet Noir', desc: 'Curate 10 slowcore midnight capsules', icon: 'bedtime', unlocked: false, color: '#a078ff' },
    { id: '6', title: 'Binaural Synchronizer', desc: 'Maintain >95% psychoacoustic coherence for 3 days', icon: 'graphic_eq', unlocked: false, color: '#4cd7f6' },
    { id: '7', title: 'Analog Tape Purist', desc: 'Listen to 50 albums with vinyl and tape flutter active', icon: 'album', unlocked: false, color: '#ffb2b7' },
    { id: '8', title: 'Dawn Architect', desc: 'Begin 10 morning focus sessions before 6:30 AM', icon: 'wb_sunny', unlocked: false, color: '#acedff' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0e13]/85 p-4 backdrop-blur-md">
      <div 
        className="w-full max-w-lg rounded-2xl bg-[#1e1f25] p-6 shadow-2xl border border-white/10 flex flex-col gap-4 text-left max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div>
            <h3 className="font-['Syne'] text-lg font-bold text-[#e3e1e9]">
              Emotional Milestones & Trophies
            </h3>
            <p className="font-['JetBrains_Mono'] text-xs text-[#cbc3d7]">
              3 of 16 Badges Unlocked • Level 4 Synesthete
            </p>
          </div>
          <button onClick={onClose} className="text-[#cbc3d7] hover:text-white p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allBadges.map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-all ${
                b.unlocked
                  ? 'bg-[#121318]/70 border-white/10 shadow-sm'
                  : 'bg-[#121318]/40 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${b.color}25`, color: b.color }}
                >
                  <span className="material-symbols-outlined text-lg">{b.icon}</span>
                </div>
                {b.unlocked ? (
                  <span className="text-[#4cd7f6] text-xs font-['JetBrains_Mono'] flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span> Unlocked
                  </span>
                ) : (
                  <span className="text-[#cbc3d7]/50 text-xs font-['JetBrains_Mono']">Locked</span>
                )}
              </div>
              <div className="font-['Syne'] text-sm font-semibold text-[#e3e1e9]">
                {b.title}
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
