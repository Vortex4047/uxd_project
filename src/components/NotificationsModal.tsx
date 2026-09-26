import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Circadian Vibe Shift Detected',
      time: '12m ago',
      desc: 'Ambient resonance shifted from Focused to Dreamy (Shoegaze drift activated).',
      icon: 'bedtime',
      color: '#d0bcff',
    },
    {
      id: '2',
      title: 'Milestone Unlocked: Night Owl Aura',
      time: '1h ago',
      desc: 'You logged 200+ hours between 1:00 AM & 5:00 AM.',
      icon: 'military_tech',
      color: '#4cd7f6',
    },
    {
      id: '3',
      title: 'Live Session Started',
      time: '3h ago',
      desc: 'Beach House session #409 reached 98.4% harmonic alignment with your profile.',
      icon: 'graphic_eq',
      color: '#ffb2b7',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0e13]/80 p-4 backdrop-blur-md">
      <div 
        className="w-full max-w-md rounded-2xl bg-[#1e1f25] p-5 shadow-2xl border border-white/10 flex flex-col gap-4 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <h3 className="font-['Syne'] text-base font-bold text-[#e3e1e9] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-xl">notifications</span>
            Sonic Notifications
          </h3>
          <button onClick={onClose} className="text-[#cbc3d7] hover:text-white p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-[#121318]/70 border border-white/5 hover:border-white/10 transition-all"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${n.color}20`, color: n.color }}
              >
                <span className="material-symbols-outlined text-lg">{n.icon}</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-['Syne'] text-sm font-semibold text-[#e3e1e9] truncate">
                    {n.title}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#cbc3d7]/60 shrink-0">
                    {n.time}
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbc3d7] mt-1 leading-relaxed">
                  {n.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
