/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BottomPlayer } from './components/BottomPlayer';
import { DeviceModal } from './components/DeviceModal';
import { ResonateModal } from './components/ResonateModal';
import { NotificationsModal } from './components/NotificationsModal';
import { SettingsModal } from './components/SettingsModal';
import { BadgesModal } from './components/BadgesModal';
import { FullscreenAura } from './components/FullscreenAura';

import { NowPlayingView } from './views/NowPlayingView';
import { AuraSessionsView } from './views/AuraSessionsView';
import { MoodProfileView } from './views/MoodProfileView';
import { ExploreMatrixView } from './views/ExploreMatrixView';
import { HomeView } from './views/HomeView';

import { TRACKS } from './data/auraData';
import { Track, PlaylistCapsule } from './types/aura';
import { soundscape } from './services/soundscapeEngine';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('now-playing');
  const [currentTrack, setCurrentTrack] = useState<Track>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressSec, setProgressSec] = useState<number>(102); // 01:42 matching screenshot
  const [selectedDevice, setSelectedDevice] = useState<string>('Living Room Studio Monitors');
  const [activeMood, setActiveMood] = useState<string>('melancholic');
  const [currentVibe, setCurrentVibe] = useState<string>('Dreamy 🌙');

  // Soundscape levels
  const [musicVol, setMusicVol] = useState<number>(80);
  const [rainVol, setRainVol] = useState<number>(35);
  const [vinylVol, setVinylVol] = useState<number>(15);
  const [frequency432Hz, setFrequency432Hz] = useState<boolean>(true);
  const [auraMode, setAuraMode] = useState<boolean>(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState<boolean>(false);
  const [isResonateModalOpen, setIsResonateModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState<boolean>(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false);

  // Timer ticker for song progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= currentTrack.durationSec) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack]);

  // Sync soundscape audio engine
  useEffect(() => {
    soundscape.setPlaybackState(isPlaying);
    soundscape.setMusicVolume(musicVol);
    soundscape.setRainVolume(rainVol);
    soundscape.setVinylVolume(vinylVol);
  }, [isPlaying, musicVol, rainVol, vinylVol]);

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    soundscape.setPlaybackState(nextState);
  };

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setProgressSec(0);
    setIsPlaying(true);
    soundscape.setPlaybackState(true);
  };

  const handleNextTrack = () => {
    const currentIndex = TRACKS.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % TRACKS.length;
    handlePlayTrack(TRACKS[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    handlePlayTrack(TRACKS[prevIndex]);
  };

  const handleResetMix = () => {
    setMusicVol(80);
    setRainVol(35);
    setVinylVol(15);
  };

  const handleApplyResonance = (vibe: string) => {
    setCurrentVibe(vibe);
    if (vibe.includes('Dreamy')) {
      setActiveMood('dreamy');
      setRainVol(45);
    } else if (vibe.includes('Focus')) {
      setActiveMood('focused');
      setRainVol(20);
    } else if (vibe.includes('Melancholic')) {
      setActiveMood('melancholic');
      setRainVol(50);
      setVinylVol(30);
    } else if (vibe.includes('Euphoria')) {
      setActiveMood('energetic');
      setRainVol(0);
    }
  };

  // Filtered tracks if search active
  const filteredTracks = searchQuery.trim()
    ? TRACKS.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.moodTags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : null;

  return (
    <div className="bg-[#121318] text-[#e3e1e9] font-['Plus_Jakarta_Sans'] min-h-screen relative selection:bg-[#d0bcff] selection:text-[#3c0091] overflow-x-hidden">
      {/* Background radial glow fields */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[400px] bg-[#a078ff]/15 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-[#03b5d3]/10 rounded-full blur-[150px]"></div>
        <div className="absolute -bottom-20 left-10 w-[550px] h-[450px] bg-[#6d3bd7]/10 rounded-full blur-[140px]"></div>
      </div>

      {/* Persistent Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentVibe={currentVibe}
        onOpenVibePicker={() => setIsResonateModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Top Header & Main Content Area */}
      <div className="pl-64 flex flex-col min-h-screen relative z-10">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenResonate={() => setIsResonateModalOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onNavigateToProfile={() => setCurrentTab('mood-profile')}
        />

        {/* Main View Container */}
        <main className="w-full pt-20 pb-32 px-8 relative bg-transparent max-w-7xl mx-auto">
          {/* If Search is Active */}
          {filteredTracks ? (
            <div className="flex flex-col gap-6 text-left">
              <div className="flex items-center justify-between">
                <h2 className="font-['Syne'] text-2xl font-bold text-[#e3e1e9]">
                  Search Results for "{searchQuery}"
                </h2>
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-['JetBrains_Mono'] text-xs text-[#4cd7f6] hover:underline"
                >
                  Clear search
                </button>
              </div>

              {filteredTracks.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#1e1f25]/50 border border-white/5 text-center text-[#cbc3d7]">
                  No sonic frequencies matched your query. Try searching "Dreamy", "Beach House", or "Melancholic".
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTracks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        handlePlayTrack(t);
                        setCurrentTab('now-playing');
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-[#1e1f25]/70 hover:bg-[#292a2f] border border-white/5 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        <img src={t.coverUrl} alt={t.title} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-['Syne'] text-base font-semibold text-[#e3e1e9]">
                            {t.title}
                          </h4>
                          <p className="text-xs text-[#cbc3d7]">{t.artist} • {t.album}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#121318] text-xs font-['JetBrains_Mono'] text-[#4cd7f6]">
                        {t.moodTags[0]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {currentTab === 'now-playing' && (
                <NowPlayingView
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onTogglePlay={handleTogglePlay}
                  selectedDevice={selectedDevice}
                  onOpenDeviceModal={() => setIsDeviceModalOpen(true)}
                  activeMood={activeMood}
                  onSelectMood={(mood) => {
                    setActiveMood(mood);
                    if (mood === 'calm') setCurrentVibe('Calm 🍃');
                    else if (mood === 'energetic') setCurrentVibe('Energetic ⚡');
                    else if (mood === 'melancholic') setCurrentVibe('Melancholic 🌧️');
                    else if (mood === 'confident') setCurrentVibe('Confident 🔥');
                    else if (mood === 'happy') setCurrentVibe('Happy ☀️');
                  }}
                  musicVol={musicVol}
                  onChangeMusicVol={setMusicVol}
                  rainVol={rainVol}
                  onChangeRainVol={setRainVol}
                  vinylVol={vinylVol}
                  onChangeVinylVol={setVinylVol}
                  onResetMix={handleResetMix}
                  frequency432Hz={frequency432Hz}
                  onToggle432Hz={() => setFrequency432Hz(!frequency432Hz)}
                  currentProgressSec={progressSec}
                  onSeek={setProgressSec}
                />
              )}

              {currentTab === 'aura-sessions' && (
                <AuraSessionsView
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onPlayTrack={handlePlayTrack}
                  onTogglePlay={handleTogglePlay}
                  onOpenExploreMatrix={() => setCurrentTab('explore-matrix')}
                  onOpenResonate={() => setIsResonateModalOpen(true)}
                />
              )}

              {currentTab === 'mood-profile' && (
                <MoodProfileView
                  onSelectCapsule={(capsule: PlaylistCapsule) => {
                    handlePlayTrack(TRACKS[0]);
                    setCurrentTab('aura-sessions');
                  }}
                  onOpenBadgesModal={() => setIsBadgesModalOpen(true)}
                />
              )}

              {currentTab === 'explore-matrix' && (
                <ExploreMatrixView
                  onPlayTrack={handlePlayTrack}
                  onNavigateToSessions={() => setCurrentTab('aura-sessions')}
                />
              )}

              {currentTab === 'home' && (
                <HomeView
                  onPlayTrack={handlePlayTrack}
                  onNavigateToTab={setCurrentTab}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Persistent Bottom Audio Player Console */}
      <BottomPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        progressSec={progressSec}
        onSeek={setProgressSec}
        rainVolume={rainVol}
        onChangeRainVolume={setRainVol}
        vinylVolume={vinylVol}
        onChangeVinylVolume={setVinylVol}
        masterVolume={musicVol}
        onChangeMasterVolume={setMusicVol}
        auraMode={auraMode}
        onToggleAuraMode={() => setAuraMode(!auraMode)}
        onToggleFullscreen={() => setIsFullscreenOpen(true)}
      />

      {/* Modals */}
      <DeviceModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
        selectedDevice={selectedDevice}
        onSelectDevice={setSelectedDevice}
      />

      <ResonateModal
        isOpen={isResonateModalOpen}
        onClose={() => setIsResonateModalOpen(false)}
        currentVibe={currentVibe}
        onApplyResonance={handleApplyResonance}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        frequency432Hz={frequency432Hz}
        onToggle432Hz={() => setFrequency432Hz(!frequency432Hz)}
      />

      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
      />

      <FullscreenAura
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        activeMood={activeMood}
        rainVol={rainVol}
        onChangeRainVol={setRainVol}
      />
    </div>
  );
}
