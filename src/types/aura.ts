export type MoodType = 'dreamy' | 'focused' | 'melancholic' | 'calm' | 'energetic' | 'confident' | 'happy';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSec: number;
  coverUrl: string;
  moodTags: string[];
  bpm: number;
  key: string;
  resonance: number;
  year?: string;
  dominantColor?: string;
  lyrics?: {
    timeSec: number;
    text: string;
    isPeak?: boolean;
    note?: string;
  }[];
}

export interface PlaylistCapsule {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  songCount: number;
  duration: string;
  coverGradient: string;
  accentColor: string;
  coverImage?: string;
  isLiked?: boolean;
  category: 'vault' | 'curated' | 'recent';
}

export interface TopArtist {
  rank: string;
  name: string;
  hours: number;
  matchPct: number;
  vibe: string;
  color: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  color: string;
}

export interface HeatmapCell {
  day: string;
  hour: number;
  mood: 'dreamy' | 'focus' | 'melancholy' | 'energetic' | 'none';
  intensity: number;
  tracksPlayed: number;
}

export interface SoundscapeLevels {
  musicVol: number;
  rainVol: number;
  vinylVol: number;
  cityHumVol: number;
  tapeFlutters: boolean;
  frequency432Hz: boolean;
  binauralCoherence: number;
}
