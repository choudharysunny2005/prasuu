/**
 * Modular Music Configuration
 * 
 * To change or replace the song:
 * 1. Place your audio file in `public/music/` (e.g. `public/music/tareefan.mp3`)
 * 2. Update the `src` and metadata fields below.
 */

export interface MusicTrackConfig {
  id: string;
  title: string;
  artist: string;
  src: string;
  defaultLabel: string;
  playingLabel: string;
  defaultVolume: number;
}

export const BACKGROUND_MUSIC: MusicTrackConfig = {
  id: "our-song",
  title: "Tareefan",
  artist: "Harnoor",
  src: "/music/tareefan.mp3",
  defaultLabel: "♫ Our song",
  playingLabel: "♫ Tareefan",
  defaultVolume: 0.65,
};
