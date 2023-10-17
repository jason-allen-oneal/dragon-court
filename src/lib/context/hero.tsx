import { createContext, PropsWithChildren, useContext, useState } from "react";
import { apiCall, percent, roll, spread, scale, contest, format, getText, regionBlurb } from "@/lib/game";
import {useInventoryContext} from "@/lib/context/inventory";
import {useModalContext} from "@/lib/context/modal";
import {COOKING_GEAR, SLEEPING_BAG, CAMP_TENT} from "@/lib/constants";

type playerContextType = {
  player: any;
  setPlayer: (p: any) => void;
  setup: (c: string[]) => void;
  calculate: () => void;
  hasTrait: (t: string) => boolean;
  getPower: () => number;
  runWits: () => number;
  bribeCharm: () => number;
  tradeCharm: () => number;
  feedCharm: () => number;
  seduceCharm: () => number;
  getSkill: () => number;
  tryLevelUp: () => void;
  getRankString: (r: number) => string;
  update: () => any;
  exitGame: (dead: boolean) => void;
};

const playerContextDefault: playerContextType = {
  player: {
    id: 0,
    rankString: "",
    owner: 0,
    region: "Town",
    charClass: "",
    background: "",
    clanId: 0,
    effects: [],
    abilities: [],
    level: 1,
    nextExpThreshold: 0,
    guts: 0,
    maxGuts: 0,
    wits: 0,
    maxWits: 0,
    charm: 0,
    maxCharm: 0,
    attack: 0,
    defend: 0,
    skill: 0,
    skillFighter: 0,
    skillFighterMax: 0,
    skillMagic: 0,
    skillMagicMax: 0,
    skillTrader: 0,
    skillTraderMax: 0,
    experience: 0,
    quests: 0,
    maxQuests: 0,
    cash: 0,
    rank: 0,
    storage: 0,
    maxStorage: 0,
    fame: 0,
    favor: 0,
    cashToday: 0,
    gutsToday: 0,
    witsToday: 0,
    charmToday: 0,
    skillToday: 0,
    levelsToday: 0,
    fameToday: 0,
    questsToday: 0,
    disease: 0,
    inventory: [],
    equipment: {},
    gearAttack: 0,
    gearDefend: 0,
    gearSkill: 0,
    allTraits: [],
    foundForest: false,
  },
  setPlayer: (p: any) => {},
  setup: (c: string[]) => {},
  calculate: () => {},
  hasTrait: (t: string) => {},
  getPower: () => {},
  runWits: () => {},
  bribeCharm: () => {},
  tradeCharm: () => {},
  feedCharm: () => {},
  seduceCharm: () => {},
  getSkill: () => {},
  tryLevelUp: () => {},
  getRankString: (r: number) => {},
  update: () => {},
  exitGame: (d: boolean) => {},
};

export const PlayerContext =
  createContext(playerContextDefault);

export const PlayerProvider = (props: PropsWithChildren) => {
  const { openModal } = useModalContext();
  const { hasItem, inventory, equipment } = useInventoryContext();
  const [player, setPlayer] = useState(playerContextDefault.player);
  
  const setup = (clanAbilities: string[]) => {
    let p = player;
    for(let ability of clanAbilities){
      if(!hasTrait(ability)){
        p.allTraits.push(ability);
      }
    }
    
    for(let ability of equipment.traits){
      if(!hasTrait(ability)){
        p.allTraits.push(ability);
      }
    }
    
    for(let ability in p.abilities){
      if(!hasTrait(ability)){
        p.allTraits.push(ability);
      }
    }
    
    if (hasTrait("Bezerk")) {
      p.skillFighterMax = Math.floor(p.skillFighterMax + Math.floor((p.level + 7) / 8));
      p.skillFighter = p.skillFighterMax;
    }
    
    if (hasTrait("Mystic")) {
      p.skillMagicMax = p.skillMagicMax + Math.floor((p.level + 7) / 8);
      p.skillMagic = p.skillMagicMax;
    }
    
    if (hasTrait("Trader")) {
      p.skillTraderMax = p.skillTraderMax + Math.floor((p.level + 7) / 8);
      p.skillTrader = p.skillTraderMax;
    }
    
    setPlayer(p);
    calculate();
  }
  
  const calculate = () => {
    let p = player;
    let num = Math.floor((p.wits * 2 + p.charm + 2) / 3 + p.skill + p.skillMagicMax + p.gearSkill);
    if (num < 1) {
      num = 1;
    }
    if (hasTrait("Agile")) {
      num += Math.floor((num + 9) / 10);
    }
    p.skill = Math.floor(num);

    let num2 = p.attack + p.skillFighterMax + p.gearAttack;
    if (hasTrait("Strong")) {
      num2 += Math.floor((num2 + 9) / 10);
    }
    p.attack = Math.floor(num2);
    
    let num3 = p.defend + p.skillTraderMax + p.gearDefend;
    if (hasTrait("Sturdy")) {
      num3 += Math.floor((num3 + 9) / 10);
    }
    
    p.defend = Math.floor(num3);
    
    setPlayer(p);
  };
  
  const hasTrait = (t: string) => {
    return player.allTraits.includes(t);
  };
  
  const getPower = (): number => {
    return (
      0 +
      player.attack * 4 +
      player.defend * 4 +
      player.skill +
      player.guts * 2 +
      player.wits +
      player.charm +
      scale(player.skillFighter, 12) +
      scale(player.skillMagic, 16) +
      scale(player.skillTrader, 8)
    );
  };
 
  const runWits = (): number => {
    let val = (player.wits * (10 + player.skillTrader)) / 10;
    return hasTrait("Swift") ? val + 30 : val;
  };

  const bribeCharm = (): number => {
    return hasTrait("Sincere") ? player.charm + 30 : player.charm;
  };

  const tradeCharm = (): number => {
    return hasTrait("Tricky") ? player.charm + 30 : player.charm;
  };

  const feedCharm = (): number => {
    return hasTrait("Empathic") ? player.charm + 50 : player.charm;
  };

  const seduceCharm = (): number => {
    return hasTrait("Sexy") ? player.charm + 50 : player.charm;
  };
  
  const getSkill = (): number => {
    let num = player.skill - player.disease;
    if (num < 1) {
      return 1;
    }
    return num;
  };
  
  const tryLevelUp = async () => {
    let p = player;
    if(p.experience >= p.nextExpThreshold) {
      p.level++;
      p.levelsToday = p.levelsToday + 1;
      p.nextExpThreshold = Math.floor(50 * Math.pow(1.5, (p.level + 1) - 1));
      p.maxGuts = p.maxGuts + 2;
      p.guts = p.maxGuts;
      p.gutsToday = p.gutsToday + 2;
      p.maxWits = p.maxWits + 2;
      p.wits = p.maxWits;
      p.witsToday = p.witsToday + 2;
      p.maxCharm = p.maxCharm + 2;
      p.charm = p.maxCharm;
      p.charmToday = p.charmToday + 2;
      p.fame = p.fame + p.level;
      p.fameToday = p.fameToday + p.level;
      p.maxQuests = p.maxQuests + 3;
      p.quests = p.maxQuests;
      p.questsToday = p.questsToday + 3;
      
      await update();
      
      const msg = `CONGRATULATIONS!!!!
        Your hours and minutes of sweat and suffering have finally been rewarded by an epiphany of understanding.
        +++ You Have Gained A Level - Level ${p.level} +++
        *** You Have Grown Stronger  +2 Guts ***
        *** You Have Grown Smarter  +2 Wits ***
        *** You Have Grown Happier  +2 Charm ***
        +++ You Have Grown Tougher  +3 Quests +++`;
      
      openModal('', msg);
      setPlayer(p);
    }
  };
  
  const getRankString = (): string => {
    let title = "";
    
    switch (player.rank) {
      default:
      case 0:
        title = "Peasant";
        break;
      case 1:
        title = "Squire";
        break;
      case 2:
        title = "Knight";
        break;
      case 3:
        title = "Captain";
        break;
      case 4:
        title = "Baron";
        break;
      case 5:
        title = "Count";
        break;
      case 6:
        title = "Viscount";
        break;
      case 7:
        title = "Marquis";
        break;
      case 8:
        title = "Earl";
        break;
      case 9:
        title = "Duke";
        break;
      case 10:
        title = "Prince";
        break;
      case 11:
        title = "Viceroy";
        break;
      case 12:
        title = "Regent";
        break;
      case 13:
        title = "Seneschal";
        break;
    }

    return title;
  };
  
  
  const update = async () => {
    const result = await apiCall("player/update", {i: inventory, id: player.id, p: {
      region: player.region,
      charClass: player.charClass,
      background: player.background,
      clanId: player.clanId,
      effects: player.effects,
      nextExpThreshold: player.nextExpThreshold,
      guts: player.guts,
      maxGuts: player.maxGuts,
      wits: player.wits,
      maxWits: player.maxWits,
      charm: player.charm,
      maxCharm: player.maxCharm,
      attack: player.attack,
      defend: player.defend,
      skill: player.skill,
      skillFighter: player.skillFighter,
      skillFighterMax: player.skillFighterMax,
      skillMagic: player.skillMagic,
      skillMagicMax: player.skillMagicMax,
      skillTrader: player.skillTrader,
      skillTraderMax: player.skillTraderMax,
      level: player.level,
      experience: player.experience,
      quests: player.quests,
      maxQuests: player.maxQuests,
      cash: player.cash,
      rank: player.rank,
      storage: player.storage,
      maxStorage: player.maxStorage,
      fame: player.fame,
      favor: player.favor,
    }});

    if (result.status === 201) {
      return result;
    } else {
      console.log("error", result.message);
      return false;
    }
  };
  
  const exitGame = (dead: boolean) => {
    if(dead) {
      openModal('', format(getText("death"), player.region));
    }else{
      const key = "sleep." + player.place + (player.place === undefined || player.place === '') ? "." + player.place : "";
      let msg = getText(key);
      if(hasItem(COOKING_GEAR)) {
        msg += "\n"+getText("dinner");
      }
      if(hasItem(CAMP_TENT)){
        msg += "\n"+getText("tent");
      }
      if(hasItem(SLEEPING_BAG)){
        msg += "\n"+getText("sleepingBag");
      }
      
      msg += (player.quests > 0) ? `\n\n\t${player.quests} Quests Remain for Today...\n` : "\n\n\tReturn Tomorrow for Further Quests...\n";
      openModal('', msg);
    }
    
    //exit screen
  };
  
  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        setup,
        calculate,
        hasTrait,
        getPower,
        runWits,
        bribeCharm,
        tradeCharm,
        feedCharm,
        seduceCharm,
        getSkill,
        tryLevelUp,
        getRankString,
        update,
        exitGame,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export function usePlayerContext() {
  return useContext(PlayerContext);
}
