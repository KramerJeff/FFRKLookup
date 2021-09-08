export const API_URL_BASE = 'https://ffrktoolkit.com/ffrk-api/api/v1.0';
export const SB_TIER = ["Unknown", "Default", "Shared", "RW", "SB", "SSB", "BSB", "OSB", "USB", "CSB", "Glint", "Glint+", "AOSB", "AASB", "SASB", "ADSB"];
export const REALMS = ["Unknown", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "FFT", "Beyond", "Type-0", "KH", "Core", "-", "DB Only"];
export const ELEMENTS = ["Unknown", "", "-", "Dark", "Earth", "Fire", "Holy", "Ice", "Lightning", "NE", "Poison", "Posion", "Water", "Wind", "Light.", "", "?"];
export const DAMAGE_TYPES = ['Unknown', 'None', 'Hybrid', 'Magical', 'Physical'];
export const TARGET_TYPES = ["Unknown", "-", "All allies", "All enemies", "Ally with status", "Another ally", "Lowest HP% ally", "Random ally", "Random enemies", "Random enemy", "Self", "Single", "Single ally", "Single enemy", "", "ALl enemies", "All Allies", "?"];
export const SCHOOLS = {
  0: "Unknown",
  2: "Bard",
  3: "Black Magic",
  4: "Celerity",
  5: "Combat",
  6: "Dancer",
  7: "Darkness",
  8: "Dragoon",
  9: "Heavy",
  10: "Knight",
  11: "Machinist",
  12: "Monk",
  13: "Ninja",
  14: "Samurai",
  15: "Sharpshooter",
  17: "Special",
  18: "Spellblade",
  19: "Summoning",
  20: "Support",
  21: "Thief",
  22: "White Magic",
  23: "Witch"
};

export const CHARACTER_ALIASES = {
  "aerith": "aeris",
  "alisaie": "ali",
  "alphinaud": "alph",
  "barbariccia": "barb",
  "cait sith": "cait",
  "cecil (dark knight)": ["decil", "dcecil", "dark knight cecil", "cecil dark knight"],
  "cecil (paladin)": ["pecil", "pcecil", "paladin cecil", "cecil paladin"],
  "cid raines": ["cid13", "raines"],
  "cid (iv)": ["cid iv", "cid4", "cid 4"],
  "cid (vii)": ["cid vii", "cid7", "cid 7"],
  "cid (xiv)": ["cid xiv", "cid 14", "cid14"],
  "cloud of darkness": "cod",
  "elarra": "urara",
  "enna kros": ["enna"],
  "gladiolus": "gladio",
  "gilgamesh": "greg",
  "gogo (v)": ["gogo v", "gogo5", "gogo 5"],
  "gogo (vi)": ["gogo vi", "gogo6", "gogo 6"],
  "haurchefant": ["horse"],
  "kelger": "kelgar",
  "lightning": "claire",
  "lunafreya": "luna",
  "meliadoul": "melia",
  "orlandeau": ["tg cid", "tgc"],
  "onion knight": ["ok", "onion knight", "onion"],
  "papalymo": ["papa"],
  "red xiii": ["red", "red13", "red 13", "nanaki"],
  "thief (i)": ["thief"],
  "sephiroth": "seph",
  "ultimecia": ["ulty"],
  "warrior of light": ["warrior"],
  "y'shtola": ["y'sh", "ysh", "yshtola"]
};

export const ABILITY_ALIASES = {
  "bahamut (v)": ["bahamut", "bahamut5", "bahamut v"],
  "bahamut (vi)": ["bahamut6", "bahamut vi"],
  "voltech": ["vortex"],
  "ripper plasma": ["ripping plasma"]
};

export const IGNORED_STATUSES = ["Remove", "Reraise", "Haste", "Burst Mode", "Imp", "Attach", "Blink"];
export const NIGHTMARE_SCHOOLS = ["Support", "Combat", "White Magic", "Celerity", "Black Magic", "Summoning"];
export const FIVE_STAR_BASE_URL = "https://vignette.wikia.nocookie.net/finalfantasy/images";
export const FIVE_STAR_MOTES = { "Dexterity": "3/3c/FFRK_Dexterity_Mote_5.png", "Vitality": "7/72/FFRK_Vitality_Mote_5.png", "Spirit": "e/e2/FFRK_Spirit_Mote_5.png", "Bravery": "c/c7/FFRK_Bravery_Mote_5.png", "Wisdom": "4/4f/FFRK_Wisdom_Mote_5.png" };
