import { createContext, useContext, useState, PropsWithChildren } from 'react';
import {usePlayerContext} from "@/lib/context/player";
import {useEncounterContext} from "@/lib/context/encounter";
import {useModalContext} from "@/lib/context/modal";
import { roll, contest, getText, regionBlurb } from "@/lib/game";

type regionContextType = {
  region: string;
  setRegion: (r: string) => void;
  action: (a: string, b: string | null) => void;
  travel: () => void;
  search: () => void;
  regionChange: (l: string) => void;
  performQuest: (a?: string) => void;
};

const regionContextDefault: regionContextType = {
  region: "",
  setRegion: (r: string) => {},
  action: (a: string, b: string | null) => {},
  travel: () => {},
  search: () => {},
  regionChange: (l: string) => {},
  performQuest: (a?: string) => {},
};

export const RegionContext = createContext(regionContextDefault);

export function RegionProvider(props: PropsWithChildren) {
  const {player, setPlayer, playerHasTrait, playerUpdate} = usePlayerContext();
  const { enterEncounter } = useEncounterContext();
  const { openModal } = useModalContext();
  const [region, setRegion] = useState(regionContextDefault.region);
  
  const weight = {
    Fields: 1,
    Forest: 2,
    Mounds: 3,
    Mountains: 3,
    Sea: 2,
    Brasil: 3,
    Shangala: 4,
    Dungeon: 4,
  };
  
  const action = async (a: string, b: string = null) => {
    if(a === "quest"){
      
      if(b !== null){
        performQuest(weight[region], b);
      }else{
        performQuest(weight[region]);
      }
    }
    if(a === "region"){
      await regionChange(b);
    }
  };
  
  const travel = (): void =>  {
    if (playerHasTrait("Gypsy")) {
      if(roll(10) < 6) {
        player.quests--;
      }
    } else {
      player.quests--;
    }
  };
  
  const search = (): void =>  {
    if (playerHasTrait("Ranger")) {
      if(roll(10) < 6) {
        player.quests--;
      }
    } else {
      player.quests--;
    }
  };
  
  const regionChange = async (r: string) => {
    let p = player;
    if(p.quests < 1) {
      openModal('', getText("noQuests"));
      return;
    }
    
    switch (r) {
      case "castle":
        p.quests--;
        break;

      case "forest":
        if(!p.foundForest){
          if (!contest(p.wits, 40)) {
            openModal('',  getText("regions.forest.searchFail"));
            enterEncounter("fields");
            return;
          }
          
          openModal('', "You trudge along the dusty trail and occasion to wonder why you haven't seen any other travellers.\n" + regionBlurb(region)+"\n"+"You Enter the Forest...");
          p.foundForest = true;
          search();
        }else{
          travel();
          
        }
        break;

      case "mounds":
        p.quests--;
        break;

      case "mountains":
        p.quests--;
        break;

      case "Fields":
        openModal('', regionBlurb('fields'));
        p.quests--;
        break;

      case "sea":
        p.quests--;
        break;
    }

    p.region = r;
    setPlayer(p);
    setRegion(r);
    playerUpdate();
  };
  
  const performQuest = (weight: number, a?: string) => {
    let p = player;
    let actual = "";
    if(a !== undefined){
      actual = a;
    }
    
    p.quests--;
    setPlayer(p);
    const selected = (actual === "") ? p.region : actual;
    enterEncounter(selected, weight);
  };
  
  return (
    <RegionContext.Provider value={{
      region,
      setRegion,
      action,
      travel,
      search,
      regionChange,
      performQuest,
    }}>
      {props.children}
    </RegionContext.Provider>
  );
}

export function useRegionContext() {
  return useContext(RegionContext);
}