export const GAME_WIDTH = 400;
export const GAME_HEIGHT = 300;
export const SUITE_DECAY = 6;
export const ROOM_DECAY = 5;
export const FLOOR_DECAY = 4;
export const TOWN_DECAY = 3;
export const FIELDS_DECAY = 3;
export const FOREST_DECAY = 2;
export const MOUNDS_DECAY = 2;
export const COT_DECAY = 3;
export const MOUNTAINS_DECAY = 2;
export const SEA_DECAY = 2;
export const DUNGEON_DECAY = 2;
export const COOKING_GEAR = 5;
export const CAMP_TENT = 6;
export const SLEEPING_BAG = 4;
export const WEIGHTS = {
  Fields: {
    lo: [12, 10, 6, 10, 2, 1, 0],
    hi: [8, 6, 4, 5, 2, 5, 2],
  },
  Forest: [10, 9, 8, 6, 4, 3],
  Mounds: [
    [5, 7, 3, 8, 4],
    [5, 5, 5, 7, 3],
    [5, 5, 5, 4, 2]
  ],
  Mountains: [7, 5, 5, 4, 3, 3],
  Castle: [
    [1],
    [7, 6, 5, 4, 3, 2],
    [5, 3, 2],
    [6, 5, 4, 3, 2],
    [6, 7, 2, 6, 5, 3, 2]
  ]
};
export const ITEM_TRASH = 0;
export const ITEM_PASSIVE = 1;
export const ITEM_CAMP = 2;
export const ITEM_CONSUMABLE = 3;
export const ITEM_TRADE = 4;
export const ITEM_GEM = 5;
export const ITEM_MAGIC = 6;
export const ITEM_SCROLL = 7;
export const ITEM_MISC = 8;
export const ITEM_MARKS = 9;
export const ITEM_ARMS = 10;

export const REGIONS = [ "Town", "Fields", "Forest", "Mounds", "Mountains", "Dungeon", "Sea"];

export const VALUED_TRAITS = [ 'Glows',
  'Flame', 'Bless', 'Lucky', 'Disease', 'Blind', 'Panic', 'Blast', 'Enchant' ];
export const TRAIT_VALUES = [ 200, 800, 300, 250, 1500, 4000, 3000, 2000, 100 ];