export {};

declare global {
  export type APIResponse = {
    status: string;
    result: any;
  };
  
  export type Callback = () => void;
  
  export type PlayerType = {
    id: number;
    rankString?: string;
    owner: number;
    region: string;
    charClass: string;
    background: string;
    clanId: number;
    effects: string;
    abilities: string;
    nextExpThreshold: number;
    guts: number;
    maxGuts: number;
    wits: number;
    maxWits: number;
    charm: number;
    maxCharm: number;
    attack: number;
    defend: number;
    skill: number;
    skillFighter: number;
    skillFighterMax: number;
    skillMagic: number;
    skillMagicMax: number;
    skillTrader: number;
    skillTraderMax: number;
    level: number;
    experience: number;
    quests: number;
    maxQuests: number;
    cash: number;
    rank: number;
    storage: number;
    maxStorage: number;
    fame: number;
    favor: number;
    cashToday?: number;
    gutsToday?: number;
    witsToday?: number;
    charmToday?: number;
    skillToday?: number;
    levelsToday?: number;
    fameToday?: number;
    questsToday?: number;
    disease?: number;
    inventory?: any[];
    equipment?: any;
    gearAttack?: number;
    gearDefend?: number;
    gearSkill?: number;
    allTraits?: string[];
  };

  export type MonsterType = {
    id: number;
    name: string;
    region: string;
    guts: number;
    wits: number;
    charm: number;
    attack: number;
    defend: number;
    skill: number;
    pack: any;
    gear: any;
    temp: any;
    opts: any;
    text: any;
    temperment: string;
    fight?: number;
    magic?: number;
    trader?: number;
    actions?: number;
    fame?: number;
    exp?: number;
  };
  
  export type ItemType = {
    id: number;
    itemId: number;
    name: string;
    attack: number;
    defend: number;
    skill: number;
    location: string;
    traits: string[];
    equippable: boolean;
    type: number;
    cost: number;
    playerId: number;
    qty: number;
    equipped: number;
    identified: number;
    enchants: number;
    stored: number;
  };
  
  type EquipmentSetType = {
    head: ItemType | null;
    body: ItemType | null;
    feet: ItemType | null;
    right: ItemType | null;
    left: ItemType | null;
  };
  
  type EquipmentType = {
    equipped: EquipmentSetType;
    attack?: number;
    defend?: number;
    skill?: number;
    traits?: string[];
  };
}