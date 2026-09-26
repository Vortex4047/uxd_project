import React from 'react';
import { USER_PROFILE } from '../data/auraData';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentVibe: string;
  onOpenVibePicker?: () => void;
  onOpenSettings?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentVibe,
  onOpenVibePicker,
  onOpenSettings,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'explore-matrix', label: 'Explore Matrix', icon: 'explore' },
    { id: 'aura-sessions', label: 'Aura Sessions', icon: 'graphic_eq' },
    { id: 'now-playing', label: 'Now Playing', icon: 'radio' },
    { id: 'mood-profile', label: 'Mood Profile', icon: 'blur_on' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0d0e13]/85 backdrop-blur-2xl z-40 flex flex-col justify-between p-4 border-r border-white/5 select-none">
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 px-1 cursor-pointer group"
        >
          <img
            alt="Aura Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XBPj6HBkwFz2e6vV5AnnCtPL5U3UAoNNDIx63ASGvLD3iiCpjk0uYu4PDQkPFPWslLPwhP0LvAefNl4A2qs9K-68a029juJ_nRYhpxm4YdJ0bA0RdJqixh80G0JUNW05O3XgjmhoiCL7AFqQ1CTsa7ZCS7R-8ZF-Zv769vXpWR7HYTQplRB1YtLJEaLRQbUOUkqi5iLbPOMXUSsAhKb6LiUjD-8qV6PPaietD2bg5wIw4D30dLlytlSK6Y"
          />
          <div className="flex flex-col">
            <span className="font-['Syne'] text-xl font-bold tracking-wider text-[#e3e1e9] leading-none">
              AURA
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] tracking-widest text-[#d0bcff] uppercase mt-0.5">
              Mood Discovery
            </span>
          </div>
        </div>

        {/* Current Vibe Pill */}
        <div className="px-1">
          <button
            onClick={onOpenVibePicker}
            type="button"
            className="w-full flex items-center gap-2.5 px-3 py-2 bg-[#1e1f25]/70 hover:bg-[#292a2f] border border-white/5 rounded-full backdrop-blur-md shadow-sm transition-all text-left"
            title="Click to shift current vibe"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4cd7f6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4cd7f6]"></span>
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#cbc3d7] flex-1 truncate">
              Current Vibe: <span className="text-[#4cd7f6] font-medium">{currentVibe}</span>
            </span>
            <span className="material-symbols-outlined text-xs text-[#958ea0]">tune</span>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 text-left font-medium ${
                  isActive
                    ? 'bg-[#a078ff] text-[#340080] font-semibold shadow-[0_0_20px_rgba(160,120,255,0.35)]'
                    : 'text-[#cbc3d7] hover:bg-[#292a2f]/80 hover:text-[#e3e1e9]'
                }`}
              >
                <span className={`material-symbols-outlined text-xl ${isActive ? 'fill-1' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-['Syne'] text-[15px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Mini Capsule at bottom */}
      <div className="pb-24 px-1">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1e1f25]/60 hover:bg-[#292a2f]/70 border border-white/5 backdrop-blur-lg transition-all">
          <img
            alt={USER_PROFILE.name}
            className="w-9 h-9 rounded-full object-cover ring-1 ring-[#4cd7f6]/40 cursor-pointer"
            src={USER_PROFILE.avatarUrl}
            onClick={() => onSelectTab('mood-profile')}
          />
          <div 
            className="flex flex-col min-w-0 flex-1 cursor-pointer"
            onClick={() => onSelectTab('mood-profile')}
          >
            <span className="font-['Syne'] text-sm text-[#e3e1e9] font-semibold truncate hover:text-[#d0bcff]">
              {USER_PROFILE.name}
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#4cd7f6] uppercase tracking-wider font-medium">
              {USER_PROFILE.badge}
            </span>
          </div>
          <button
            onClick={onOpenSettings}
            type="button"
            className="text-[#cbc3d7] hover:text-[#e3e1e9] transition-colors p-1"
            title="Preferences & Audio Settings"
          >
            <span className="material-symbols-outlined text-lg">settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
