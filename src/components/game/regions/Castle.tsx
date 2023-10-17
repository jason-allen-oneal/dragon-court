import Image from "next/image";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useRegionContext } from "@/lib/context/region";
import { useBuildingContext } from "@/lib/context/building";

import Town from "../../../../public/images/game/regions/main_street.png";
import Court from "../../../../public/images/game/shops/court.png";
import Guard from "../../../../public/images/game/shops/guard.png";
import Clan from "../../../../public/images/game/shops/clan.png";
import PostOffice from "../../../../public/images/game/shops/post_office.png";
import Dunjeon from "../../../../public/images/game/dunjeon.png";

export default function Market() {
  const { user } = useUserContext();
  const player = usePlayerContext();
  const { enterBuilding } = useBuildingContext();
  const { action } = useRegionContext();
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#f3a1bc", padding: "0.8em", fontSize: "0.8em"}}>
      <h2>The Central Courtyard of Draken Keep</h2>
      <div className="flex flex-row justify-between">
      
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("clan")}>
          <Image className="image" alt="region node" src={Clan} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Clan Hall
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("court")}>
          <Image className="image" alt="region node" src={Court} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Royal Court
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("guard")}>
          <Image className="image" alt="region node" src={Guard} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Dragon Guard
          </div>
        </div>
        
      </div>
      <div className="flex flex-row justify-between">
        
        <div className=" flex flex-col text-center" onClick={() => action("region", "town")}>
          <Image className="image" alt="region node" src={Town} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Towne Gate
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("post")}>
          <Image className="image" alt="region node" src={PostOffice} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Post Office
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("quest", "dungeon")}>
          <Image className="image" alt="region node" src={Dunjeon} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Dunjeons (1)
          </div>
        </div>
        
      </div>
    </div>
  );
}