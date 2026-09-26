import React from 'react';
import { USER_PROFILE } from '../data/auraData';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenResonate: () => void;
  onOpenNotifications: () => void;
  onNavigateToProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenResonate,
  onOpenNotifications,
  onNavigateToProfile,
}) => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#0d0e13]/70 backdrop-blur-xl z-30 flex items-center justify-between px-6 border-b border-white/5 shadow-[0_1px_12px_rgba(0,0,0,0.2)]">
      {/* Search Input */}
      <div className="relative w-96 max-w-md">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbc3d7] text-lg pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by mood, feeling, or soundscape..."
          className="w-full bg-[#1e1f25]/70 text-[#e3e1e9] placeholder:text-[#cbc3d7]/60 text-sm font-['Plus_Jakarta_Sans'] rounded-full pl-10 pr-9 py-2 outline-none border border-white/5 focus:border-[#d0bcff]/40 focus:bg-[#292a2f] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#cbc3d7] hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Resonate Button */}
        <button
          onClick={onOpenResonate}
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1f25]/80 hover:bg-[#292a2f] border border-[#d0bcff]/20 text-[#e3e1e9] hover:border-[#d0bcff]/60 transition-all font-['JetBrains_Mono'] text-xs font-medium shadow-sm hover:shadow-[0_0_15px_rgba(208,188,255,0.25)] active:scale-95"
        >
          <span className="material-symbols-outlined text-sm text-[#4cd7f6] animate-pulse">
            auto_awesome
          </span>
          <span>Resonate</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          type="button"
          className="relative w-9 h-9 flex items-center justify-center rounded-full bg-[#1e1f25]/70 text-[#cbc3d7] hover:text-[#e3e1e9] hover:bg-[#292a2f] transition-all border border-white/5"
          title="Sonic Notifications"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ffb2b7] ring-2 ring-[#0d0e13]"></span>
        </button>

        {/* Profile Avatar */}
        <button
          onClick={onNavigateToProfile}
          type="button"
          className="group relative"
          title="Open Mood Profile"
        >
          <img
            alt={USER_PROFILE.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20 group-hover:ring-[#d0bcff] transition-all"
            src={USER_PROFILE.avatarUrl}
          />
        </button>
      </div>
    </header>
  );
};
