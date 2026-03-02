export type MascotId =
  | "Bakushin"
  | "Oguri"
  | "Pasa"
  | "RiceShower"
  | "Tachyon"
  | "Teio";

export const SPRITE_COLUMNS = 5;
export const MASTER_FRAME_MS = 30;

export interface SpriteSheetConfig {
  src: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export interface MascotSpriteConfig {
  frameWidth: number;
  frameHeight: number;
  introFrameCount: number;
  danceFrameCount: number;
  introSrc: string;
  danceSrc: string;
}

const MASCOT_SPRITES: Record<MascotId, MascotSpriteConfig> = {
  Bakushin: {
    frameWidth: 300,
    frameHeight: 300,
    introFrameCount: 58,
    danceFrameCount: 155,
    introSrc: "/assets/jukebox/Characters/Bakushin/intro.png",
    danceSrc: "/assets/jukebox/Characters/Bakushin/dance.png",
  },
  Oguri: {
    frameWidth: 300,
    frameHeight: 340,
    introFrameCount: 35,
    danceFrameCount: 53,
    introSrc: "/assets/jukebox/Characters/Oguri/intro.png",
    danceSrc: "/assets/jukebox/Characters/Oguri/dance.png",
  },
  Pasa: {
    frameWidth: 300,
    frameHeight: 300,
    introFrameCount: 47,
    danceFrameCount: 43,
    introSrc: "/assets/jukebox/Characters/Pasa/intro.png",
    danceSrc: "/assets/jukebox/Characters/Pasa/dance.png",
  },
  RiceShower: {
    frameWidth: 300,
    frameHeight: 300,
    introFrameCount: 44,
    danceFrameCount: 187,
    introSrc: "/assets/jukebox/Characters/RiceShower/intro.png",
    danceSrc: "/assets/jukebox/Characters/RiceShower/dance.png",
  },
  Tachyon: {
    frameWidth: 300,
    frameHeight: 300,
    introFrameCount: 61,
    danceFrameCount: 41,
    introSrc: "/assets/jukebox/Characters/Tachyon/intro.png",
    danceSrc: "/assets/jukebox/Characters/Tachyon/dance.png",
  },
  Teio: {
    frameWidth: 300,
    frameHeight: 300,
    introFrameCount: 49,
    danceFrameCount: 43,
    introSrc: "/assets/jukebox/Characters/Teio/intro.png",
    danceSrc: "/assets/jukebox/Characters/Teio/dance.png",
  },
};

export const JUKEBOX_INTRO_SPRITE: SpriteSheetConfig = {
  src: "/assets/jukebox/Jukebox/jukebox.png",
  frameWidth: 300,
  frameHeight: 450,
  frameCount: 22,
};

export const JUKEBOX_GOOFY_SPRITE: SpriteSheetConfig = {
  src: "/assets/jukebox/Jukebox/music_box_goofy.png",
  frameWidth: 300,
  frameHeight: 300,
  frameCount: 17,
};

export const MUSIC_NOTE_SPRITE: SpriteSheetConfig = {
  src: "/assets/jukebox/Jukebox/music_note.png",
  frameWidth: 300,
  frameHeight: 300,
  frameCount: 123,
};

const MASCOT_IDS = Object.freeze(Object.keys(MASCOT_SPRITES) as MascotId[]);

export function getMascotIds(): readonly MascotId[] {
  return MASCOT_IDS;
}

export function getMascotConfig(mascotId: MascotId): MascotSpriteConfig {
  return MASCOT_SPRITES[mascotId];
}

export function pickRandomMascot(randomSource: () => number = Math.random): MascotId {
  const mascotIds = getMascotIds();
  const index = Math.floor(randomSource() * mascotIds.length);
  return mascotIds[index] ?? mascotIds[0];
}
