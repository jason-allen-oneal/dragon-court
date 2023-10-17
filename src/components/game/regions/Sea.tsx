import Image from "next/image";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useRegionContext } from "@/lib/context/region";
import { useBuildingContext } from "@/lib/context/building";

import VoyageHome from "../../../../public/images/game/regions/sea_to_town.png";
import SeaQuest from "../../../../public/images/game/sea_quest.png";
import Diner from "../../../../public/images/game/shops/diner.png";
import Brasil from "../../../../public/images/game/regions/brasil.png";
import Shangala from "../../../../public/images/game/regions/shangala.png";
import Azteca from "../../../../public/images/game/regions/azteca.png";

export default function Sea() {
  const { user } = useUserContext();
  const player = usePlayerContext();
  const { enterBuilding } = useBuildingContext();
  const { action } = useRegionContext();
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#c3e1e4", padding: "0.8em", fontSize: "0.8em"}}>
      <h2>The Sea of Tranquility</h2>
      <div className="flex flex-row justify-between">
      
        <div className=" flex flex-col text-center" onClick={() => action("quest", "brasil")}>
          <Image className="image" alt="region node" src={Brasil} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Hie Brasil (1)
          </div>
        </div>
        
        {/*
        <div className=" flex flex-col text-center" onClick={() => action("quest", "azteca")}>
          <Image className="image" alt="region node" src={Azteca} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Azteca (1)
          </div>
        </div>
        */}
        <div className=" flex flex-col text-center" onClick={() => action("quest", "shangala")}>
          <Image className="image" alt="region node" src={Shangala} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Shangala (1)
          </div>
        </div>
        
      </div>
      <div className="flex flex-row justify-between">
        
        <div className=" flex flex-col text-center" onClick={() => action("region", "market")}>
          <Image className="image" alt="region node" src={VoyageHome} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Voyage Home
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("quest", "sea")}>
          <Image className="image" alt="region node" src={SeaQuest} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Go Fish (1)
          </div>
        </div>
        {/*
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("diner")}>
          <Image className="image" alt="region node" src={Diner} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Seaside Diner
          </div>
        </div>
        */}
      </div>
    </div>
  );
}