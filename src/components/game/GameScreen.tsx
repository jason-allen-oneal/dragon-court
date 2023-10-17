import { useState } from "react";
import Region from "@/components/game/Region";
import StatBar from "@/components/game/StatBar";
import Building from "@/components/game/Building";
import Character from "@/components/game/Character";
import Encounter from "@/components/game/Encounter";
import BattleOutcome from "@/components/game/BattleOutcome";
import {GAME_WIDTH, GAME_HEIGHT} from "@/lib/constants";

import {useBuildingContext} from "@/lib/context/building";
import {useEncounterContext} from "@/lib/context/encounter";
import {useCharacterContext} from "@/lib/context/character";

export default function GameScreen() {
  const { inBuilding } = useBuildingContext();
  const { inEncounter, inOutcome } = useEncounterContext();
  const { inCharacter } = useCharacterContext();
  
  const renderGameScreen = () => {
    if (inBuilding) {
      return (
        <Building />
      );
    } else if (inCharacter) {
      return (
        <Character />
      );
    } else if (inEncounter) {
      if(inOutcome){
        return <BattleOutcome />;
      }else{
        return <Encounter />;
      }
    } else if (
      !inBuilding &&
      !inEncounter &&
      !inCharacter
    ) {
      return (
        <Region />
      );
    }
  }
  
  return (
    <div className="border border-black">
      <div className={`w-[${GAME_WIDTH}px] h-[${GAME_HEIGHT}px] m-auto`}>{renderGameScreen()}</div>
      {!inCharacter && (
      <div>
        <StatBar />
      </div>
      )}
    </div>
  );
}