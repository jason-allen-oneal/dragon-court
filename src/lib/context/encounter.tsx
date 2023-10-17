import { createContext, useContext, useState, PropsWithChildren } from 'react';
import { apiCall, percent, roll, contest, getRandomText } from "@/lib/game";
import {WEIGHTS} from "@/lib/constants";
import {useModalContext} from "@/lib/context/modal";
import { usePlayerContext } from "@/lib/context/player";
import { useInventoryContext } from "@/lib/context/inventory";
import Monster from "@/lib/models/Monster";
import Battle from "@/lib/battle";
import strings from "@/lib/strings";

type encounterContextType = {
  inEncounter: boolean;
  setInEncounter: (e: boolean) => void;
  inOutcome: boolean;
  setInOutcome: (o: boolean) => void;
  outcome: string;
  setOutcome: (o: string) => void;
  outcomeCb: () => void;
  setOutcomeCb: (cb: () => void) => void;
  monster: MonsterType;
  setMonster: (m: MonsterType) => void;
  enterEncounter: (r: string) => void;
  exitEncounter: () => void;
  attack: () => void;
  flee: () => void;
  trade: () => void;
  help: () => void;
  pay: () => void;
  feed: () => void;
  answer: () => void;
  seduce: () => void;
};

const encounterContextDefault: encounterContextType = {
  inEncounter: false,
  setInEncounter: (e: boolean) => {},
  inOutcome: false,
  setInOutcome: (io: boolean) => {},
  outcome: "",
  setOutcome: (o: string) => {},
  outcomeCb: () => {},
  setOutcomeCb: (cb: () => void) => {},
  monster: {
    id: 0,
    name: "",
    region: "",
    guts: 0,
    wits: 0,
    charm: 0,
    attack: 0,
    defend: 0,
    skill: 0,
    pack: [],
    gear: [],
    temp: [],
    opts: [],
    text: {},
    fight: 0,
    magic: 0,
    trader: 0,
    actions: 1,
    fame: 0,
    exp: 0,
    temperment: "",
  },
  setMonster: (m: MonsterType) => {},
  enterEncounter: (r: string) => {},
  exitEncounter: () => {},
  attack: () => {},
  flee: () => {},
  trade: () => {},
  help: () => {},
  pay: () => {},
  feed: () => {},
  answer: () => {},
  seduce: () => {},
};

export const EncounterContext = createContext(encounterContextDefault);

export function EncounterProvider(props: PropsWithChildren) {
  const { openModal } = useModalContext();
  const { setPlayerData, setPlayer, player, playerFleeWits, playerSeduceCharm, getPlayerPower } = usePlayerContext();
  const { inventory, equipment } = useInventoryContext();
  const [monster, setMonster] = useState(encounterContextDefault.monster);
  const [inEncounter, setInEncounter] = useState(false);
  const [inOutcome, setInOutcome] = useState(false);
  const [outcome, setOutcome] = useState<string>("");
  const [outcomeCb, setOutcomeCb] = useState<any>();
  const [weight, setWeight] = useState<number>(0);
  let cb: () => void | null = null;
  console.log('encounter player', JSON.stringify(player))
  const gainExp = (exp: number) => {
    if (exp >= 1) {
      setPlayerData("experience", player.experience + exp);
      return `\nThis encounter has left you wiser +${exp}xp\n`;
    }
  };
  
  const gainGuts = (weight: number): string => {
    if (roll(player.guts) <= weight) {
      setPlayerData("guts", player.guts + 1);
      return "\n*** You grow Stronger  +1 Guts! ***\n";
    }
  };
  
  const gainWits = (weight: number): string => {
    if (roll(player.wits) <= weight) {
      setPlayerData("wits", player.wits + 1);
      return "\n*** You grow Smarter  +1 Wits! ***\n";
    }
  };
  
  const gainCharm = (weight: number): string => {
    if (roll(player.charm) <= weight) {
      setPlayerData("charm", player.charm + 1);
      return "\n*** You grow Happier  +1 Charm! ***\n";
    }
  };
  
  const enterEncounter = async (region: string, wgt: number) => {
    let fairy = false;
    let total = 0;
    if (percent(1)) {
      fairy = true;
    }
    
    let idx = 0;
    let weights = [];
    let mids = [];
    if (!fairy) {
      if (player.region === "Fields") {
        mids = [5,6,7,8,9,10,11];
        if (player.level < 3) {
          weights = [12, 10, 6, 10, 2, 1, 0];
        } else {
          weights = [8, 6, 4, 5, 2, 5, 2];
        }
        setWeight(wgt);
      }
      
      if(player.region === "Forest"){
        weights = [10, 9, 8, 6, 4, 3];
      }
      
      for (const i of weights) {
        total += i;
      }
      let total2 = roll(total);
      for (let ix = 0; ix < weights.length; ix++) {
        total2 -= weight[ix];
        if (total2 < 0) {
          idx = ix;
        }
      }
    }
    
    const response = await apiCall('encounter/start', {
      m: mids[idx],
    });
    
    const m =  Monster.init(response.result.monster);
    m.setup(player.level, weight, getPlayerPower());
    setMonster(m);
    setInEncounter(true);
  }
  
  const exitEncounter = () => {
    setInEncounter(false);
  };
  
  const attack = (action: string) => {
    Battle.initialize(player, inventory, equipment, monster, "player");
    let msg2 = Battle.doAction(action);
    console.log("msg2", msg2);
    setOutcome(msg2);
    setInOutcome(true);
  };
  
  const flee = () => {
    const exp = monster.exp + Math.floor(monster.wits / 5);
    const tf = monster.trader;
    
    let msg = "";
    
    if (monster.stance < 3) {
      //this.hero.subFatigue(1);

      msg += `\tYou run like the wind.  Fear lending flight to thy heels.\n` +
        `\tThe ${monster.name} makes no effort to pursue.\n`;
    } else if (monster.stance == 3) {
      msg += `\tYou run like the wind.  Fear lending flight to thy heels.\n` +
        `\tThe ${this.mob.getName()} chases you for a while just to make sure you aren't coming back\n`;
        
      if (tf >= 2) {
        if (!contest(player.charm, monster.charm)) {
          msg += "";
          //this.hero.subFatigue(1);
        }else{
          msg += `\nYour 'merchant' training comes in handy. You duck into cover and the ${monster.name} passes by.\n`;
        }
      }
    } else {
      let hs = playerFleeWits();
      
      let ms = (monster.wits * (10 + monster.trader)) / 10;
      
      if (!contest(hs, ms)) {
        msg += `\tYou run like the wind.  Fear lending flight to thy heels.\n` +
          `\tBut the ${monster.name} proves to be swifter!\n`;
        
        setOutcome(msg);
        setOutcomeCb(() => {
          Battle.initialize(player, inventory, equipment, monster, "player");
          let msg2 = Battle.doAction("flee");
          setOutcome(msg2);
          setOutcomeCb(() => {
            setInOutcome(false);
          });
        });
        setInOutcome(true);
        return;
      } else {
        msg = `\tThe ${monster.name} is left behind, panting. ` +
          `Your fleet feet have just saved your skin.\n`;
        
        if (tf >= 3) {
          if (!contest(player.charm, monster.charm)) {
            msg += "";
            //this.hero.subFatigue(1);
          }else{
            msg += `\nYour 'merchant' training comes in handy. You duck into cover and the ${monster.name} passes by.\n`;
          }
        }
      }
    }
    
    msg += gainExp(exp);
    msg += gainWits(weight);
    
    setOutcome(msg);
    setOutcomeCb(() => {
      setInOutcome(false);
      setInEncounter(false);
    });
    setInOutcome(true);
  };
  
  const trade = () => {
    let msg = "";
    const exp: number = monster.exp;
    const cost: number = weight * (monster.charm + monster.wits);
    
    if(player.cash - cost > 0){
      setPlayerData("cash", player.cash - cost);
    } else if(player.cash - cost < 0) {
      setPlayerData("cash", 0);
    }

    if (contest(playerTradeCharm(), monster.charm)) {
      const item = monster.pack[Math.floor(Math.random()*monster.pack.length)];
      msg += 'You flash your marks at it until an agreeable price is reached...\n';
      
      msg += `\nYou spend ${cost} marks.\nYou Receive: ${item.name}`;
      msg += gainExp(exp);
      msg += gainCharm(weight);
      
      // add item to inventory
    } else if (monster.stance == 3) {
      msg += `The ${monster.name} takes ${cost} marks, then attacks!\n`;
      setOutcome(msg);
        setOutcomeCb(() => {
          Battle.initialize(player, inventory, equipment, monster, "player");
      let msg2 = Battle.doAction("attack");
          setOutcome(msg2);
          setOutcomeCb(() => {
            setInOutcome(false);
          });
        });
        setInOutcome(true);
        return;
    } else if (monster.stance == 4) {
      msg += `It steals ${cost} marks!\n`;
      setOutcome(msg);
      setOutcome(msg);
      setOutcomeCb(() => {
        setInOutcome(false);
      });
      return;
    } else {
      setPlayerData("cash", player.cash + cost);
      msg += `The ${monster.name} shows no interest in trading...\n`;
      setOutcome(msg);
      setOutcomeCb(() => {
        setInOutcome(false);
      });
      return;
    }
    
    setOutcomeCb(() => {
        setInOutcome(false);
      });
    setOutcome(msg);
    setInOutcome(true);
    return;
  };
  
  const help = () => {
    let msg: string = "";
    const exp: number = monster.exp;

    if (contest(player.wits, monster.wits)) {
      msg += `\tYou manage to fix the problem!\n\n\tThe ${monster.name} is indebted to you for your kind assistance...\n`;

      for(const packItm of monster.pack){
        if(packItm.qty > 1){
          const amt = roll(1 + packItm.qty);
          packItm.qty -= amt;
          if(packItm.qty <= 0){
            monster.pack = monster.pack.filter(function(obj) {
              return obj.name !== packItm.name;
            });
          }
        }
      }
      
      msg += "\nYou Recieve: ";
      for(const rewardItm of monster.pack) {
        msg += "\n"+rewardItm.qty+" "+rewardItm.name;
      }
      // add items to inventory
      
      setPlayerData("fame", player.fame * weight);
      msg += gainExp(exp);
      msg += gainWits(weight);
    } else if (monster.stance == 3) {
      msg += `The ${monster.name} attacks while you're busy!\n`;
      setOutcome(msg);
        setOutcomeCb(() => {
          Battle.initialize(player, inventory, equipment, monster, "player");
      let msg2 = Battle.doAction("attack");
          setOutcome(msg2);
          setOutcomeCb(() => {
            setInOutcome(false);
          });
        });
        setInOutcome(true);
        return;
    } else {
      if (monster.stance == 4) {
        msg += `\tYou can't seem to solve the problem...\n\tThe ${monster.name} calls you a worthless loser!\n`;
        setOutcome(msg);
        setOutcomeCb(() => {
          setInOutcome(false);
        });
        return;
      } else {
        msg += `\tYou can't seem to solve the problem...\n\tThe ${monster.name} thanks you for your efforts.\n`;
        setOutcome(msg);
        setOutcomeCb(() => {
          setInOutcome(false);
        });
        return;
      }
    }
    
    setOutcomeCb(() => {
        setInOutcome(false);
      });
    setOutcome(msg);
    setInOutcome(true);
  };
  
  const pay = () => {
    let msg: string = "";
    const exp: number = monster.exp;
    const cost: number = (weight * (monster.guts + monster.wits)) / 2;

    if (contest(playerBribeCharm(), monster.charm)) {
      if(player.cash - cost > 0){
        setPlayerData("cash", player.cash - cost);
      }else if(player.cash - cost < 0){
        setPlayerData("cash", 0);
      }
      
      msg += `You have averted conflict by paying the ${monster.name} ${cost} marks...\n`;
      
      msg += gainEp(exp);
      msg += gainCharm(weight);
    } else if (monster.stance == 3) {
      msg += `The ${monster.name} takes ${cost} marks, then attacks!\n`;
      setOutcome(msg);
      setOutcomeCb(() => {
        Battle.initialize(player, inventory, equipment, monster, "player");
      let msg2 = Battle.doAction("attack");
        setOutcome(msg2);
        setOutcomeCb(() => {
          setInOutcome(false);
        });
      });
      setInOutcome(true);
      return;
    } else {
      if (monster.stance == 4) {
        msg += `The ${monster.name} takes ${cost} marks, then laughs at you!`;
        setOutcome(msg);
        setOutcomeCb(() => {
          setInOutcome(false);
        });
        return;
      } else {
        setPlayerData("cash", player.cash + cost);
        msg += `The ${monster.name} refuses your money...`;
        setOutcome(msg);
        setOutcomeCb(() => {
          setInOutcome(false);
        });
        return;
      }
    }
    
    setOutcomeCb(() => {
        setInOutcome(false);
      });
    setOutcome(msg);
    setInOutcome(true);
  };
  
  const feed = () => {
    let msg: string = "";
    const exp: number = monster.exp;
    const cost: number = (monster.guts + 4) / 5;
    // check if player has food and deduct cost
    
    if (contest(playerFeedCharm(), monster.charm)) {
      msg += `The ${monster} chows down on ${cost} Food, then waddles away with satisfaction...\n`;
      msg += gainExp(exp);
      msg += gainCharm(weight);
    } else if (monster.stance == 3) {
      msg += `The ${monster.name} eats your Food...then it attacks!\n`;
      setOutcome(msg);
      setOutcomeCb(() => {
        Battle.initialize(player, inventory, equipment, monster, "player");
      let msg2 = Battle.doAction("attack");
        setOutcome(msg2);
        setOutcomeCb(() => {
          setInOutcome(false);
        });
      });
      setInOutcome(true);
      return;
    } else {
      if (monster.stance == 4) {
        msg += `The ${monster.name} eats ${cost} Food...then blocks your path!\n`;
        setOutcome(msg);
        setOutcomeCb(() => {
          setInOutcome(false);
        });
        return;
      } else {
        // food back to inventory
        
        msg += `The ${monster.name} turns up its nose at your Food...\n`;
        setOutcome(msg);
        setOutcomeCb(() => {
          setInOutcome(false);
        });
        return;
      }
    }
    
    setOutcomeCb(() => {
      setInOutcome(false);
    });
    setOutcome(msg);
    setInOutcome(true);
  };
  
  const answer = () => {
    const exp = monster.exp;
    let msg = getRandomText("encounter.riddle") + "\n\n\t";

    if (!contest(player.wits, monster.wits)) {
      msg += getRandomText("encounter.guess")
      
      if (monster.stance == 3 || monster.stance == 4) {
        msg += `\n\tWRONG!! SCREEEEECH!!!\n`;
      }
      
      msg += `\n\tThe ${monster.name} shakes its head.\n`;
      setOutcome(msg);
      setOutcomeCb(() => {
        setInOutcome(false);
      });
      return;
    }else{
      const id = strings.encounter.riddle.indexOf(msg);
      const answer = strings.encounter.answer[id];
      msg += `${answer}\n\n\tGARRGH! THAT'S RIGHT!!\n`;
      
      for(const packItm of monster.pack){
        if(packItm.qty > 1){
          const amt = roll(1 + packItm.qty);
          packItm.qty -= amt;
          if(packItm.qty <= 0){
            monster.pack = monster.pack.filter(function(obj) {
              return obj.name !== packItm.name;
            });
          }
        }
      }
      
      msg += "\nYou Recieve: ";
      for(const rewardItm of monster.pack) {
        msg += "\n"+rewardItm.qty+" "+rewardItm.name;
      }
      
      // add reward to inventory
      
      msg += gainExp(exp);
      msg += gainWits(weight);
      
      setPlayerData("fame", weight);
    }
    
    setOutcomeCb(() => {
      setInOutcome(false);
    });
    setOutcome(msg);
    setInOutcome(true);
  };
  
  const seduce = () => {
    const exp = monster.exp;
    let msg = `\tYou waggle your eyebrows and make kissing noises towards ${monster.name}.\n`;
    
    if (contest(playerSeduceCharm(), monster.charm)) {
      const seduces = getRandomText("encounter.seduces");
      msg += `\tIt smiles and slinks on over. ${seduces}\n\tAfterwards, ${monster.name} gives you a small token of affection\n`;

      for(const packItm of monster.pack){
        if(packItm.qty > 1){
          const amt = roll(1 + packItm.qty);
          packItm.qty -= amt;
          if(packItm.qty <= 0){
            monster.pack = monster.pack.filter(function(obj) {
              return obj.name !== packItm.name;
            });
          }
        }
      }
      
      msg += "\nYou Recieve: ";
      for(const rewardItm of monster.pack) {
        msg += "\n"+rewardItm.qty+" "+rewardItm.name;
      }
      
      // add reward to inventory
      
      setPlayerData("fame", player.fame + weight);
      msg += gainExp(exp);
      msg += gainCharm(weight);
    } else if (monster.stance != 0 && monster.stance != 1) {
      msg += `\tIt shrieks with fury at your shallow lies and attacks!\n`;
      setOutcome(msg);
      setOutcomeCb(() => {
        Battle.initialize(player, inventory, equipment, monster, "player");
      let msg2 = Battle.doAction("attack");
        setOutcome(msg2);
        setOutcomeCb(() => {
          setInOutcome(false);
        });
      });
      setInOutcome(true);
      return;
    } else {
      msg += `\tIt shrieks and runs away, giggling.\n`;
      
      setOutcome(msg);
      setOutcomeCb(() => {
        setInOutcome(false);
      });
      return;
    }
    
    setOutcomeCb(() => {
        setInOutcome(false);
      });
    setOutcome(msg);
    setInOutcome(true);
  };
  
  return (
    <EncounterContext.Provider value={{
      monster,
      setMonster,
      inEncounter,
      setInEncounter,
      inOutcome,
      setInOutcome,
      outcome,
      setOutcome,
      setOutcomeCb,
      outcomeCb,
      enterEncounter,
      exitEncounter,
      attack,
      flee,
      trade,
      help,
      pay,
      feed,
      answer,
      seduce,
    }}>
      {props.children}
    </EncounterContext.Provider>
  );
}

export function useEncounterContext() {
  return useContext(EncounterContext);
}