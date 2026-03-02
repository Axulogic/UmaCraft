export type UmaVoiceStatus = "downloaded" | "not-found";

export type UmaVoiceIndexEntry = {
  imageId: number;
  name: string;
  slug: string;
  apiUrl: string;
  voiceUrl: string | null;
  localPath: string | null;
  status: UmaVoiceStatus;
};

export const umaVoiceIndex: UmaVoiceIndexEntry[] = [
  {
    imageId: 1002,
    name: "Silence Suzuka",
    slug: "silencesuzuka",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/silencesuzuka",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167688/files/user/character/silencesuzuka/silencesuzuka_voice.mp3",
    localPath: "/assets/songs/umas/1002-silencesuzuka.mp3",
    status: "downloaded",
  },
  {
    imageId: 1003,
    name: "Tokai Teio",
    slug: "tokaiteio",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/tokaiteio",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167734/files/user/character/tokaiteio/tokaiteio_voice.mp3",
    localPath: "/assets/songs/umas/1003-tokaiteio.mp3",
    status: "downloaded",
  },
  {
    imageId: 1007,
    name: "Gold Ship",
    slug: "goldship",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/goldship",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167431/files/user/character/goldship/goldship_voice.mp3",
    localPath: "/assets/songs/umas/1007-goldship.mp3",
    status: "downloaded",
  },
  {
    imageId: 1008,
    name: "Vodka",
    slug: "vodka",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/vodka",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167748/files/user/character/vodka/vodka_voice.mp3",
    localPath: "/assets/songs/umas/1008-vodka.mp3",
    status: "downloaded",
  },
  {
    imageId: 1015,
    name: "TM. Opera O",
    slug: "tmoperao",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/tmoperao",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167730/files/user/character/tmoperao/tmoperao_voice.mp3",
    localPath: "/assets/songs/umas/1015-tmoperao.mp3",
    status: "downloaded",
  },
  {
    imageId: 1017,
    name: "Symboli Rudolf",
    slug: "symbolirudolf",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/symbolirudolf",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167716/files/user/character/symbolirudolf/symbolirudolf_voice.mp3",
    localPath: "/assets/songs/umas/1017-symbolirudolf.mp3",
    status: "downloaded",
  },
  {
    imageId: 1021,
    name: "Tamamo Cross",
    slug: "tamamocross",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/tamamocross",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167723/files/user/character/tamamocross/tamamocross_voice.mp3",
    localPath: "/assets/songs/umas/1021-tamamocross.mp3",
    status: "downloaded",
  },
  {
    imageId: 1024,
    name: "Mayano Top Gun",
    slug: "mayanotopgun",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/mayanotopgun",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167574/files/user/character/mayanotopgun/mayanotopgun_voice.mp3",
    localPath: "/assets/songs/umas/1024-mayanotopgun.mp3",
    status: "downloaded",
  },
  {
    imageId: 1025,
    name: "Manhattan Cafe",
    slug: "manhattancafe",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/manhattancafe",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167534/files/user/character/manhattancafe/manhattancafe_voice.mp3",
    localPath: "/assets/songs/umas/1025-manhattancafe.mp3",
    status: "downloaded",
  },
  {
    imageId: 1026,
    name: "Mihono Bourbon",
    slug: "mihonobourbon",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/mihonobourbon",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167620/files/user/character/mihonobourbon/mihonobourbon_voice.mp3",
    localPath: "/assets/songs/umas/1026-mihonobourbon.mp3",
    status: "downloaded",
  },
  {
    imageId: 1032,
    name: "Agnes Tachyon",
    slug: "agnestachyon",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/agnestachyon",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167206/files/user/character/agnestachyon/agnestachyon_voice.mp3",
    localPath: "/assets/songs/umas/1032-agnestachyon.mp3",
    status: "downloaded",
  },
  {
    imageId: 1038,
    name: "Curren Chan",
    slug: "currenchan",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/currenchan",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167363/files/user/character/currenchan/currenchan_voice.mp3",
    localPath: "/assets/songs/umas/1038-currenchan.mp3",
    status: "downloaded",
  },
  {
    imageId: 1049,
    name: "Nakayama Festa",
    slug: "nakayamafesta",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/nakayamafesta",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167625/files/user/character/nakayamafesta/nakayamafesta_voice.mp3",
    localPath: "/assets/songs/umas/1049-nakayamafesta.mp3",
    status: "downloaded",
  },
  {
    imageId: 1052,
    name: "Haru Urara",
    slug: "haruurara",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/haruurara",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167454/files/user/character/haruurara/haruurara_voice.mp3",
    localPath: "/assets/songs/umas/1052-haruurara.mp3",
    status: "downloaded",
  },
  {
    imageId: 1062,
    name: "Matikanetannhauser",
    slug: "matikanetannhauser",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/matikanetannhauser",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167567/files/user/character/matikanetannhauser/matikanetannhauser_voice.mp3",
    localPath: "/assets/songs/umas/1062-matikanetannhauser.mp3",
    status: "downloaded",
  },
  {
    imageId: 1065,
    name: "Daitaku Helios",
    slug: "daitakuhelios",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/daitakuhelios",
    voiceUrl: "https://en-portal.g.kuroco-img.app/v=1758167370/files/user/character/daitakuhelios/daitakuhelios_voice.mp3",
    localPath: "/assets/songs/umas/1065-daitakuhelios.mp3",
    status: "downloaded",
  },
  {
    imageId: 1097,
    name: "Still In Love",
    slug: "stillinlove",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/stillinlove",
    voiceUrl: null,
    localPath: "/assets/songs/umas/1097-stillinlove.mp3",
    status: "downloaded",
  },
  {
    imageId: 1119,
    name: "Dream Journey",
    slug: "dreamjourney",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/dreamjourney",
    voiceUrl: null,
    localPath: "/assets/songs/umas/1119-dreamjourney.mp3",
    status: "downloaded",
  },
  {
    imageId: 1135,
    name: "Stay Gold",
    slug: "staygold",
    apiUrl: "https://en-portal.g.kuroco.app/rcms-api/4/characters/staygold",
    voiceUrl: null,
    localPath: "/assets/songs/umas/1135-staygold.mp3",
    status: "downloaded",
  },
];

export const umaVoiceByImageId = umaVoiceIndex.reduce<Record<number, UmaVoiceIndexEntry>>(
  (acc, entry) => {
    acc[entry.imageId] = entry;
    return acc;
  },
  {},
);
