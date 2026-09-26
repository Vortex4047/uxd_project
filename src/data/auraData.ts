import { Track, PlaylistCapsule, TopArtist, Milestone, HeatmapCell } from '../types/aura';

export const USER_PROFILE = {
  name: 'Maya Lin',
  username: '@mayalin_vibe',
  badge: 'PRO LISTENER',
  joinDate: 'Nov 2023',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyx0moXPsFo-ixQRsQZu4dh1Bg7YIWn3zTvszaBF1QuSIEbuLmlpPU2auCjr61vaslLXi_95_anOlxdAbThMhRUh4XoaMsFzVmjXk68gVVUjkseZjiEUq1F3klrYMVEMvdgK8bUjpC9eAJhQrik0jPmHVbpsMVT73stVPr6Ke_Y7M4Y1gNNnuTANRH-cF1jIXZRlCNuWNbrHfd3j65K5M7z7WibHuCWiXDSdN4v1fOs30Q04-8aQPhbA',
  bio: 'Curating spectral frequencies between twilight and dawn. Synesthetic auditor exploring ambient shoegaze & modular synth dreamscapes.',
  hoursListened: '1,248',
  moodSessionsCreated: '84',
  topEmotionalState: 'Dreamy 🌙',
  dominantHarmonicKey: 'D-Flat Major (432Hz)',
};

export const TRACKS: Track[] = [
  {
    id: 'space-song',
    title: 'Space Song',
    artist: 'Beach House',
    album: 'Depression Cherry',
    year: '2015',
    duration: '05:21',
    durationSec: 321,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhbxa355PdrmLv5wYYUFEyu2BU3APXXR3zrFW5ffti9uzTae05tEjeuwidiKSnRiWPOyVDlkNzhGFVht_kcZNPfsxqveIHDyi-5gyqtVx1D_-RB3kUA9ppRyivCZmeBQaUDC4gwTIgHcin0TIKOXeQpVmpbsIpTX7rI-GHytJrkPR6-5RQHO1lm1-Kh4iSRq9zEsD896eSaUlaJ_6-H_npCyBVBHUBQ8CgaBps7wpfCp-b8-47r6Ilw',
    moodTags: ['🌙 Dreamy • Ethereal', 'Shoegaze Drift', 'Slowcore Pulse'],
    bpm: 74,
    key: 'F# Major',
    resonance: 98.4,
    dominantColor: '#a078ff',
    lyrics: [
      { timeSec: 25, text: 'It was late at night' },
      { timeSec: 42, text: 'You held on tight' },
      {
        timeSec: 72,
        text: 'What will make you smile?',
        isPeak: true,
        note: '✦ Melodic peak resonance • Vocals bloom in wide stereo'
      },
      { timeSec: 102, text: 'Tender is the night...' },
      { timeSec: 135, text: "For a girl who's everywhere" },
      { timeSec: 168, text: 'It falls apart, it falls apart' }
    ]
  },
  {
    id: 'apocalypse',
    title: 'Apocalypse',
    artist: 'Cigarettes After Sex',
    album: 'Cigarettes After Sex',
    year: '2017',
    duration: '04:50',
    durationSec: 290,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhbxa355PdrmLv5wYYUFEyu2BU3APXXR3zrFW5ffti9uzTae05tEjeuwidiKSnRiWPOyVDlkNzhGFVht_kcZNPfsxqveIHDyi-5gyqtVx1D_-RB3kUA9ppRyivCZmeBQaUDC4gwTIgHcin0TIKOXeQpVmpbsIpTX7rI-GHytJrkPR6-5RQHO1lm1-Kh4iSRq9zEsD896eSaUlaJ_6-H_npCyBVBHUBQ8CgaBps7wpfCp-b8-47r6Ilw',
    moodTags: ['Romantic / Dreamy', 'Velvet Noir', 'Slow Reverb'],
    bpm: 68,
    key: 'C Major',
    resonance: 96.2,
    dominantColor: '#4cd7f6',
    lyrics: [
      { timeSec: 20, text: 'You leapt from crumbling bridges' },
      { timeSec: 48, text: 'Watching city clocks unwind' },
      { timeSec: 80, text: "Got the music in you baby, tell me why", isPeak: true, note: '✦ Sub-bass swell • 432Hz harmonic warmth' },
      { timeSec: 120, text: 'Your lips my poetries divine' }
    ]
  },
  {
    id: 'sunset-lover',
    title: 'Sunset Lover',
    artist: 'Petit Biscuit',
    album: 'Presence',
    year: '2015',
    duration: '03:57',
    durationSec: 237,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhbxa355PdrmLv5wYYUFEyu2BU3APXXR3zrFW5ffti9uzTae05tEjeuwidiKSnRiWPOyVDlkNzhGFVht_kcZNPfsxqveIHDyi-5gyqtVx1D_-RB3kUA9ppRyivCZmeBQaUDC4gwTIgHcin0TIKOXeQpVmpbsIpTX7rI-GHytJrkPR6-5RQHO1lm1-Kh4iSRq9zEsD896eSaUlaJ_6-H_npCyBVBHUBQ8CgaBps7wpfCp-b8-47r6Ilw',
    moodTags: ['Nostalgic / Warm', 'Golden Chill', 'Vocal Chop Euphoria'],
    bpm: 91,
    key: 'A Major',
    resonance: 94.8,
    dominantColor: '#ffb2b7',
    lyrics: [
      { timeSec: 18, text: '[Melodic vocal textures blooming across stereo field]' },
      { timeSec: 45, text: '[Warm analog filter opens up into sunset panorama]' },
      { timeSec: 85, text: 'Golden light reflects on the receding tide', isPeak: true, note: '✦ Binaural warmth peak' }
    ]
  },
  {
    id: 'after-dark',
    title: 'After Dark',
    artist: 'Mr.Kitty',
    album: 'Time',
    year: '2014',
    duration: '04:19',
    durationSec: 259,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhbxa355PdrmLv5wYYUFEyu2BU3APXXR3zrFW5ffti9uzTae05tEjeuwidiKSnRiWPOyVDlkNzhGFVht_kcZNPfsxqveIHDyi-5gyqtVx1D_-RB3kUA9ppRyivCZmeBQaUDC4gwTIgHcin0TIKOXeQpVmpbsIpTX7rI-GHytJrkPR6-5RQHO1lm1-Kh4iSRq9zEsD896eSaUlaJ_6-H_npCyBVBHUBQ8CgaBps7wpfCp-b8-47r6Ilw',
    moodTags: ['Dark Dreamy', 'Synthwave Drift', 'Coldwave Echo'],
    bpm: 110,
    key: 'D Minor',
    resonance: 95.1,
    dominantColor: '#a078ff',
    lyrics: [
      { timeSec: 22, text: 'I see you walking alone' },
      { timeSec: 50, text: 'Through the neon rain beneath the underpass' },
      { timeSec: 90, text: 'As the hours pass, I will let you know', isPeak: true, note: '✦ Analog oscillator harmonic resonance' }
    ]
  },
  {
    id: 'resonance',
    title: 'Resonance',
    artist: 'HOME',
    album: 'Odyssey',
    year: '2014',
    duration: '03:32',
    durationSec: 212,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhbxa355PdrmLv5wYYUFEyu2BU3APXXR3zrFW5ffti9uzTae05tEjeuwidiKSnRiWPOyVDlkNzhGFVht_kcZNPfsxqveIHDyi-5gyqtVx1D_-RB3kUA9ppRyivCZmeBQaUDC4gwTIgHcin0TIKOXeQpVmpbsIpTX7rI-GHytJrkPR6-5RQHO1lm1-Kh4iSRq9zEsD896eSaUlaJ_6-H_npCyBVBHUBQ8CgaBps7wpfCp-b8-47r6Ilw',
    moodTags: ['Nostalgic / Vapor', 'Analog Chillwave', 'Summer Dusk'],
    bpm: 85,
    key: 'E-Flat Major',
    resonance: 97.6,
    dominantColor: '#4cd7f6',
    lyrics: [
      { timeSec: 15, text: '[Vintage Juno-106 analog synth chords swell]' },
      { timeSec: 45, text: '[Tape saturated drum fills echo into twilight]' },
      { timeSec: 80, text: '[Deep warm resonance frequency sweep across 432Hz]', isPeak: true, note: '✦ Pure harmonic alignment' }
    ]
  },
  {
    id: 'fade-into-you',
    title: 'Fade Into You',
    artist: 'Mazzy Star',
    album: 'So Tonight That I Might See',
    year: '1993',
    duration: '04:55',
    durationSec: 295,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhbxa355PdrmLv5wYYUFEyu2BU3APXXR3zrFW5ffti9uzTae05tEjeuwidiKSnRiWPOyVDlkNzhGFVht_kcZNPfsxqveIHDyi-5gyqtVx1D_-RB3kUA9ppRyivCZmeBQaUDC4gwTIgHcin0TIKOXeQpVmpbsIpTX7rI-GHytJrkPR6-5RQHO1lm1-Kh4iSRq9zEsD896eSaUlaJ_6-H_npCyBVBHUBQ8CgaBps7wpfCp-b8-47r6Ilw',
    moodTags: ['Melancholic / Ethereal', 'Acoustic Shoegaze', 'Midnight Haze'],
    bpm: 78,
    key: 'A Major',
    resonance: 93.9,
    dominantColor: '#ffb2b7',
    lyrics: [
      { timeSec: 25, text: 'I want to hold the hand inside you' },
      { timeSec: 55, text: 'I want to take a breath that\'s true' },
      { timeSec: 95, text: 'I look to you and I see nothing, I look to you to see the truth', isPeak: true, note: '✦ Intimate acoustic bloom' }
    ]
  },
  {
    id: 'midnight-city',
    title: 'Midnight City',
    artist: 'M83',
    album: "Hurry Up, We're Dreaming",
    year: '2011',
    duration: '04:03',
    durationSec: 243,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhbxa355PdrmLv5wYYUFEyu2BU3APXXR3zrFW5ffti9uzTae05tEjeuwidiKSnRiWPOyVDlkNzhGFVht_kcZNPfsxqveIHDyi-5gyqtVx1D_-RB3kUA9ppRyivCZmeBQaUDC4gwTIgHcin0TIKOXeQpVmpbsIpTX7rI-GHytJrkPR6-5RQHO1lm1-Kh4iSRq9zEsD896eSaUlaJ_6-H_npCyBVBHUBQ8CgaBps7wpfCp-b8-47r6Ilw',
    moodTags: ['Euphoric Dream', 'Cinematic Electro', 'Nocturnal Sky'],
    bpm: 105,
    key: 'B Minor',
    resonance: 92.4,
    dominantColor: '#d0bcff',
    lyrics: [
      { timeSec: 20, text: 'Waiting in a car, waiting for a ride in the dark' },
      { timeSec: 45, text: 'The city is my church, it wraps me in the blinding twilight' },
      { timeSec: 85, text: 'The city is my church, into the night', isPeak: true, note: '✦ Saxophone crescendo & vocal pulse' }
    ]
  },
  {
    id: 'chamber-of-reflection',
    title: 'Chamber of Reflection',
    artist: 'Mac DeMarco',
    album: 'Salad Days',
    year: '2014',
    duration: '03:51',
    durationSec: 231,
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhbxa355PdrmLv5wYYUFEyu2BU3APXXR3zrFW5ffti9uzTae05tEjeuwidiKSnRiWPOyVDlkNzhGFVht_kcZNPfsxqveIHDyi-5gyqtVx1D_-RB3kUA9ppRyivCZmeBQaUDC4gwTIgHcin0TIKOXeQpVmpbsIpTX7rI-GHytJrkPR6-5RQHO1lm1-Kh4iSRq9zEsD896eSaUlaJ_6-H_npCyBVBHUBQ8CgaBps7wpfCp-b8-47r6Ilw',
    moodTags: ['Introspective', 'Detuned Synth', 'Lo-Fi Melancholy'],
    bpm: 66,
    key: 'C Minor',
    resonance: 95.8,
    dominantColor: '#4cd7f6',
    lyrics: [
      { timeSec: 30, text: 'Spend some time alone' },
      { timeSec: 65, text: 'Understand that soon you\'ll run' },
      { timeSec: 100, text: 'Alone again, alone again, alone again', isPeak: true, note: '✦ Wow & flutter analog drift' }
    ]
  }
];

export const UP_NEXT_TRACKS = [
  {
    id: 'up-1',
    title: 'Intro',
    artist: 'The xx',
    predictedShift: '+12% Calm',
    eta: 'In 3m 39s',
    coverGradient: 'from-indigo-950 via-purple-900 to-black',
  },
  {
    id: 'up-2',
    title: 'Myth',
    artist: 'Beach House',
    predictedShift: '+8% Ethereal',
    eta: 'In 8m 01s',
    coverGradient: 'from-violet-950 via-blue-900 to-black',
  },
  {
    id: 'up-3',
    title: 'Wait',
    artist: 'M83',
    predictedShift: 'Deep Peak',
    eta: 'In 12m 45s',
    coverGradient: 'from-cyan-950 via-slate-900 to-black',
  }
];

export const SAVED_CAPSULES: PlaylistCapsule[] = [
  {
    id: 'coding-reverie',
    title: 'Late Night Coding Reverie',
    subtitle: 'Modular synth pulses and deep ambient textures for deep work.',
    tags: ['FOCUSED', 'DREAMY'],
    songCount: 38,
    duration: '2h 45m',
    coverGradient: 'from-[#1a1138] via-[#0d1f3d] to-[#080d19]',
    accentColor: '#4cd7f6',
    category: 'vault'
  },
  {
    id: 'rainy-sunday',
    title: 'Rainy Sunday Nostalgia',
    subtitle: 'Warm tape hiss, muted guitars, and introspective shoegaze.',
    tags: ['MELANCHOLIC', 'NOSTALGIC'],
    songCount: 24,
    duration: '1h 38m',
    coverGradient: 'from-[#141b2b] via-[#241a35] to-[#0b0f1a]',
    accentColor: '#a078ff',
    category: 'vault'
  },
  {
    id: 'golden-hour',
    title: 'Golden Hour Euphoria',
    subtitle: 'Uplifting nu-disco and sun-drenched acoustic chillout.',
    tags: ['HAPPY', 'ENERGETIC'],
    songCount: 19,
    duration: '1h 12m',
    coverGradient: 'from-[#421b18] via-[#5c301d] to-[#120a1c]',
    accentColor: '#ffb2b7',
    category: 'vault'
  },
  {
    id: 'deep-sleep',
    title: 'Deep Sleep Frequency',
    subtitle: 'Delta-wave drones and sub-bass binaural harmonic beds.',
    tags: ['CALM', 'AMBIENT'],
    songCount: 52,
    duration: '4h 10m',
    coverGradient: 'from-[#071926] via-[#101430] to-[#070912]',
    accentColor: '#4cd7f6',
    category: 'vault'
  }
];

export const TOP_ARTISTS: TopArtist[] = [
  {
    rank: '01',
    name: 'Beach House',
    hours: 142,
    matchPct: 98,
    vibe: 'Dreamy Vibe',
    color: '#d0bcff'
  },
  {
    rank: '02',
    name: 'Tycho',
    hours: 96,
    matchPct: 96,
    vibe: 'Focus Vibe',
    color: '#4cd7f6'
  },
  {
    rank: '03',
    name: 'Cigarettes After Sex',
    hours: 88,
    matchPct: 94,
    vibe: 'Melancholic Vibe',
    color: '#ffb2b7'
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: 'night-owl',
    title: 'Night Owl Aura',
    description: 'Logged 200+ hours between 1:00 AM & 5:00 AM',
    icon: 'dark_mode',
    unlocked: true,
    color: '#d0bcff'
  },
  {
    id: 'deep-diver',
    title: 'Deep Diver',
    description: 'Completed a continuous 6-hour unbroken session',
    icon: 'waves',
    unlocked: true,
    color: '#4cd7f6'
  },
  {
    id: 'sonic-chameleon',
    title: 'Sonic Chameleon',
    description: 'Navigated through 5 distinct emotional zones in one day',
    icon: 'bubble_chart',
    unlocked: true,
    color: '#ffb2b7'
  }
];

// Heatmap generator for the 7 days x 12 intervals
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const HOURS = ['02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'];

export const HEATMAP_DATA: HeatmapCell[][] = [
  // Mon
  [
    { day: 'Mon', hour: 2, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Mon', hour: 4, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Mon', hour: 6, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Mon', hour: 8, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Mon', hour: 10, mood: 'focus', intensity: 2, tracksPlayed: 4 },
    { day: 'Mon', hour: 12, mood: 'focus', intensity: 3, tracksPlayed: 8 },
    { day: 'Mon', hour: 14, mood: 'focus', intensity: 3, tracksPlayed: 9 },
    { day: 'Mon', hour: 16, mood: 'energetic', intensity: 2, tracksPlayed: 6 },
    { day: 'Mon', hour: 18, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Mon', hour: 20, mood: 'dreamy', intensity: 2, tracksPlayed: 5 },
    { day: 'Mon', hour: 22, mood: 'dreamy', intensity: 3, tracksPlayed: 11 },
    { day: 'Mon', hour: 24, mood: 'melancholy', intensity: 2, tracksPlayed: 7 },
  ],
  // Tue
  [
    { day: 'Tue', hour: 2, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Tue', hour: 4, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Tue', hour: 6, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Tue', hour: 8, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Tue', hour: 10, mood: 'focus', intensity: 3, tracksPlayed: 10 },
    { day: 'Tue', hour: 12, mood: 'focus', intensity: 3, tracksPlayed: 12 },
    { day: 'Tue', hour: 14, mood: 'focus', intensity: 2, tracksPlayed: 6 },
    { day: 'Tue', hour: 16, mood: 'focus', intensity: 2, tracksPlayed: 5 },
    { day: 'Tue', hour: 18, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Tue', hour: 20, mood: 'melancholy', intensity: 2, tracksPlayed: 6 },
    { day: 'Tue', hour: 22, mood: 'melancholy', intensity: 3, tracksPlayed: 9 },
    { day: 'Tue', hour: 24, mood: 'dreamy', intensity: 3, tracksPlayed: 10 },
  ],
  // Wed
  [
    { day: 'Wed', hour: 2, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Wed', hour: 4, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Wed', hour: 6, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Wed', hour: 8, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Wed', hour: 10, mood: 'focus', intensity: 2, tracksPlayed: 5 },
    { day: 'Wed', hour: 12, mood: 'focus', intensity: 2, tracksPlayed: 6 },
    { day: 'Wed', hour: 14, mood: 'energetic', intensity: 3, tracksPlayed: 8 },
    { day: 'Wed', hour: 16, mood: 'focus', intensity: 3, tracksPlayed: 7 },
    { day: 'Wed', hour: 18, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Wed', hour: 20, mood: 'dreamy', intensity: 2, tracksPlayed: 6 },
    { day: 'Wed', hour: 22, mood: 'dreamy', intensity: 3, tracksPlayed: 9 },
    { day: 'Wed', hour: 24, mood: 'dreamy', intensity: 3, tracksPlayed: 12 },
  ],
  // Thu
  [
    { day: 'Thu', hour: 2, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Thu', hour: 4, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Thu', hour: 6, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Thu', hour: 8, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Thu', hour: 10, mood: 'focus', intensity: 3, tracksPlayed: 8 },
    { day: 'Thu', hour: 12, mood: 'focus', intensity: 3, tracksPlayed: 11 },
    { day: 'Thu', hour: 14, mood: 'focus', intensity: 2, tracksPlayed: 6 },
    { day: 'Thu', hour: 16, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Thu', hour: 18, mood: 'energetic', intensity: 2, tracksPlayed: 4 },
    { day: 'Thu', hour: 20, mood: 'melancholy', intensity: 2, tracksPlayed: 7 },
    { day: 'Thu', hour: 22, mood: 'melancholy', intensity: 3, tracksPlayed: 10 },
    { day: 'Thu', hour: 24, mood: 'melancholy', intensity: 3, tracksPlayed: 13 },
  ],
  // Fri
  [
    { day: 'Fri', hour: 2, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Fri', hour: 4, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Fri', hour: 6, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Fri', hour: 8, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Fri', hour: 10, mood: 'focus', intensity: 3, tracksPlayed: 9 },
    { day: 'Fri', hour: 12, mood: 'focus', intensity: 3, tracksPlayed: 10 },
    { day: 'Fri', hour: 14, mood: 'energetic', intensity: 3, tracksPlayed: 7 },
    { day: 'Fri', hour: 16, mood: 'focus', intensity: 2, tracksPlayed: 5 },
    { day: 'Fri', hour: 18, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Fri', hour: 20, mood: 'dreamy', intensity: 2, tracksPlayed: 6 },
    { day: 'Fri', hour: 22, mood: 'dreamy', intensity: 3, tracksPlayed: 11 },
    { day: 'Fri', hour: 24, mood: 'dreamy', intensity: 3, tracksPlayed: 14 },
  ],
  // Sat
  [
    { day: 'Sat', hour: 2, mood: 'dreamy', intensity: 2, tracksPlayed: 5 },
    { day: 'Sat', hour: 4, mood: 'dreamy', intensity: 1, tracksPlayed: 3 },
    { day: 'Sat', hour: 6, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Sat', hour: 8, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Sat', hour: 10, mood: 'focus', intensity: 2, tracksPlayed: 4 },
    { day: 'Sat', hour: 12, mood: 'melancholy', intensity: 2, tracksPlayed: 5 },
    { day: 'Sat', hour: 14, mood: 'melancholy', intensity: 2, tracksPlayed: 6 },
    { day: 'Sat', hour: 16, mood: 'energetic', intensity: 3, tracksPlayed: 9 },
    { day: 'Sat', hour: 18, mood: 'melancholy', intensity: 2, tracksPlayed: 6 },
    { day: 'Sat', hour: 20, mood: 'melancholy', intensity: 3, tracksPlayed: 8 },
    { day: 'Sat', hour: 22, mood: 'dreamy', intensity: 3, tracksPlayed: 12 },
    { day: 'Sat', hour: 24, mood: 'dreamy', intensity: 3, tracksPlayed: 15 },
  ],
  // Sun
  [
    { day: 'Sun', hour: 2, mood: 'dreamy', intensity: 2, tracksPlayed: 4 },
    { day: 'Sun', hour: 4, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Sun', hour: 6, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Sun', hour: 8, mood: 'none', intensity: 0, tracksPlayed: 0 },
    { day: 'Sun', hour: 10, mood: 'focus', intensity: 3, tracksPlayed: 8 },
    { day: 'Sun', hour: 12, mood: 'focus', intensity: 3, tracksPlayed: 11 },
    { day: 'Sun', hour: 14, mood: 'melancholy', intensity: 2, tracksPlayed: 7 },
    { day: 'Sun', hour: 16, mood: 'melancholy', intensity: 3, tracksPlayed: 9 },
    { day: 'Sun', hour: 18, mood: 'melancholy', intensity: 3, tracksPlayed: 10 },
    { day: 'Sun', hour: 20, mood: 'dreamy', intensity: 3, tracksPlayed: 12 },
    { day: 'Sun', hour: 22, mood: 'dreamy', intensity: 4, tracksPlayed: 18 }, // Peak!
    { day: 'Sun', hour: 24, mood: 'dreamy', intensity: 3, tracksPlayed: 14 },
  ],
];

export const MOOD_BREAKDOWN = [
  { name: 'Dreamy', icon: '🌙', pct: 42, color: '#d0bcff', desc: 'Your primary state of mind' },
  { name: 'Focused', icon: '🔮', pct: 28, color: '#4cd7f6', desc: 'Late afternoon deep work' },
  { name: 'Melancholic', icon: '💔', pct: 18, color: '#a078ff', desc: 'Quiet midnight listening' },
  { name: 'Calm', icon: '🍃', pct: 8, color: '#4cd7f6', desc: 'Morning meditations' },
  { name: 'Energetic', icon: '⚡', pct: 4, color: '#ffb2b7', desc: 'Workout bursts' },
];

export const AUDIO_DEVICES = [
  {
    id: 'living-room',
    name: 'Living Room Studio Monitors',
    status: 'Lossless 24-bit/96kHz • Connected',
    icon: 'speaker_group',
    connected: true,
  },
  {
    id: 'sennheiser',
    name: 'Sennheiser HD 800S (DAC)',
    status: 'Balanced XLR DAC • Ready',
    icon: 'headphones',
    connected: false,
  },
  {
    id: 'studio-desk',
    name: 'Studio Master Desk B',
    status: 'Optical AirPlay • Standby',
    icon: 'desktop_windows',
    connected: false,
  },
];
