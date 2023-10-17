import Image from "next/image";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useRegionContext } from "@/lib/context/region";
import { useBuildingContext } from "@/lib/context/building";

import ForestExit from "../../../../public/images/game/forest_exit.png";
import MountainTrail from "../../../../public/images/game/regions/forest_to_mountains.png";
import ForestQuest from "../../../../public/images/game/forest_quest.png";
import FieldsRoad from "../../../../public/images/game/regions/forest_to_fields.png";
import Smithy from "../../../../public/images/game/shops/smithy.png";
import Guild from "../../../../public/images/game/shops/guild.png";

export default function Forest() {
  const { user } = useUserContext();
  const player = usePlayerContext();
  const { enterBuilding } = useBuildingContext();
  const { action } = useRegionContext();
  
  const exitGame = () => {
  
  };
  return (
    <div className="flex flex-col" style={{backgroundColor: "#007c1f", padding: "0.8em", fontSize: "0.8em"}}>
      <h2>Depths of the Arcane Forest</h2>
      <div className="flex flex-row justify-between">
      
        <div className=" flex flex-col text-center" onClick={() => action("region", "mountains")}>
          <Image className="image" alt="region node" src={MountainTrail} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Mountain Trail [1]
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("quest", "forest")}>
          <Image className="image" alt="region node" src={ForestQuest} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Quest (1)
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("region", "fields")}>
          <Image className="image" alt="region node" src={FieldsRoad} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Fields Road [1]
          </div>
        </div>
        
      </div>
      <div className="flex flex-row justify-between">
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("smithy")}>
          <Image className="image" alt="region node" src={Smithy} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Shortlegs Smithy
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => exitGame()}>
          <Image className="image" alt="region node" src={ForestExit} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Leave Game
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("guild")}>
          <Image className="image" alt="region node" src={Guild} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            The Guild
          </div>
        </div>
        
      </div>
    </div>
  );
}