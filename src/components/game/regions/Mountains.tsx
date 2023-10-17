import Image from "next/image";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useRegionContext } from "@/lib/context/region";
import { useBuildingContext } from "@/lib/context/building";

import MountainsToForest from "../../../../public/images/game/regions/mountains_to_forest.png";
import Mine from "../../../../public/images/game/mountains_mine.png";
import MountainsExit from "../../../../public/images/game/mountains_exit.png";
import Gem from "../../../../public/images/game/shops/gem.png";
import MountainsQuest from "../../../../public/images/game/mountains_quest.png";
import Magic from "../../../../public/images/game/shops/magic.png";

export default function Mountains() {
  const { user } = useUserContext();
  const {player} = usePlayerContext();
  const { enterBuilding } = useBuildingContext();
  const { action } = useRegionContext();
  
  const exitGame = () =>{
  
  };
  return (
    <div className="flex flex-col" style={{backgroundColor: "#999999", padding: "0.8em", fontSize: "0.8em"}}>
      <h2>High Crags of the Fenris Mountains</h2>
      <div className="flex flex-row justify-between">
      
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("magic")}>
          <Image className="image" alt="region node" src={Magic} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Djinnis Magic
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("quest", "mountains")}>
          <Image className="image" alt="region node" src={MountainsQuest} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Quest (1)
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("gem")}>
          <Image className="image" alt="region node" src={Gem} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Gem Exchange
          </div>
        </div>
        
      </div>
      <div className="flex flex-row justify-between">
        
        <div className=" flex flex-col text-center" onClick={() => exitGame()}>
          <Image className="image" alt="region node" src={MountainsExit} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Leave Game
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("quest", "mine")}>
          <Image className="image" alt="region node" src={Mine} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Abandoned Mine (1)
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("region", "forest")}>
          <Image className="image" alt="region node" src={MountainsToForest} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Forest Trail [1]
          </div>
        </div>
        
      </div>
    </div>
  );
}