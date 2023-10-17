import { useState, useEffect } from "react";
import { getText, awakenText, apiCall } from "@/lib/game";
import {GAME_WIDTH, GAME_HEIGHT} from "@/lib/constants";
import {useUserContext} from "@/lib/context/user";
import {usePlayerContext} from "@/lib/context/player";
import {useInventoryContext} from "@/lib/context/inventory";
import {useRegionContext} from "@/lib/context/region";

import Welcome from "@/components/game/Welcome";
import GameScreen from "@/components/game/GameScreen";

export default function GameDisplay({user, p, i, e, clan}: {user: any, p: any, i: any[], e: any, clan: any}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { setUserData, setUser } = useUserContext();
  const { setPlayerData, setPlayer, player, playerSetup } = usePlayerContext();
  const { initializeEquipment, equipment, setInventory, inventory } = useInventoryContext();
  const { setRegion } = useRegionContext();
  const [inGame, setInGame] = useState(false);
  const [awakenData, setAwakenData] = useState<any>();
  
  useEffect(() => {
    try {
      setRegion(p.region);
      setUser(user);
      
      initializeEquipment(e);
      setInventory(i);
      
      p.gearSkill = equipment.skill;
      p.gearAttack = equipment.attack;
      p.gearDefend = equipment.defend
    
      let clanAbilities = [];
      if(clan) {
        clanAbilities = clan.abilities.split(",");
      }
      
      setPlayer(p);
      playerSetup(clanAbilities);
    } catch(e){
      console.log('error', JSON.stringify(e));
      setIsError(true);
    }
    setIsLoading(false);
  }, [user, p, i, e, equipment, clan, setRegion, setUser, initializeEquipment, setInventory, setPlayer, playerSetup]);
  
  useEffect(() => {
    if(!inGame) {
      if(player.firstPlay){
        const plyr = player;
        const awaken = awakenText(plyr);
        setPlayer(awaken.p);
        setAwakenData(awaken);
      }
    }
  }, [player, inGame, setPlayer, setAwakenData]);
  
  const start = async () => {
    if(user.firstRun) {
      setUserData('firstRun', false);
    }
    
    if(player.firstPlay) {
      setPlayerData('firstPlay', false);
    }
    
    setInGame(true);
  };
  
  let view: any;
  if(!inGame) {
    if (user.firstRun) {
      view = (
        <Welcome
          text={getText("awaken.first")}
          beginGame={start}
        />
      );
    } else if (player.firstPlay && awakenData) {
      view = (
        <Welcome
          text={awakenData.text}
          beginGame={start}
        />
      );
    } else {
      view = <GameScreen />;
    }
  } else {
    view = <GameScreen />;
  }
  
  if(isLoading && !player){
    return (
      <h2>Loading...</h2>
    )
  }
  
  if(!isLoading && isError){
     return (
       <h2>Something went wrong</h2>
     )
   }
  
  return (
    <div className={`w-[${GAME_WIDTH}px] h-[${GAME_HEIGHT}px] m-auto`}>
      {view}
    </div>
  );
}