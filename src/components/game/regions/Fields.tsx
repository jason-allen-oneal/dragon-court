import Image from "next/image";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useRegionContext } from "@/lib/context/region";
import { useBuildingContext } from "@/lib/context/building";

import ExitGame from "../../../../public/images/game/fields_exit.png";
import TownRoad from "../../../../public/images/game/regions/fields_to_town.png";
import FieldsQuest from "../../../../public/images/game/fields_quest.png";
import Mounds from "../../../../public/images/game/regions/fields_to_mounds.png";
import Forest from "../../../../public/images/game/regions/fields_to_forest.png";
import Healer from "../../../../public/images/game/shops/healer.png";

export default function Fields() {
  const { user } = useUserContext();
  const {player} = usePlayerContext();
  const { enterBuilding } = useBuildingContext();
  const { action } = useRegionContext();
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#fa898c", padding: "0.8em", fontSize: "0.8em"}}>
      <h2>The Fields Near Salamander Township</h2>
      <div className="flex flex-row justify-between">
      
        <div className=" flex flex-col text-center" onClick={() => action("region", "town")}>
          <Image className="image" alt="region node" src={TownRoad} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Towne Road
          </div>
        </div>
        
        {player.level > 12 ? (
        <div className=" flex flex-col text-center" onClick={() => action("region", "Mounds")}>
          <Image className="image" alt="region node" src={Mounds} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Goblin Mound (1)
          </div>
        </div>
        ) : null}
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("healer")}>
          <Image className="image" alt="region node" src={Healer} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Healers Tower
          </div>
        </div>
        
      </div>
      <div className="flex flex-row justify-between">
        
        
        {player.level > 8 ? (
        <div className=" flex flex-col text-center" onClick={() => action("region", "Forest")}>
          <Image className="image" alt="region node" src={Forest} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Forest Road [1]
          </div>
        </div>
        ) : null}
        
        <div className=" flex flex-col text-center" onClick={() => action("quest", "Fields")}>
          <Image className="image" alt="region node" src={FieldsQuest} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Quest (1)
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => player.exitGame()}>
          <Image className="image" alt="region node" src={ExitGame} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Leave Game
          </div>
        </div>
        
      </div>
    </div>
  );
}