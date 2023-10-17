import Image from "next/image";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useRegionContext } from "@/lib/context/region";
import { useBuildingContext } from "@/lib/context/building";

import MoundsToFields from "../../../../public/images/game/regions/mounds_to_field.png";
import Vortex from "../../../../public/images/game/dark_vortex.png";
import Inn from "../../../../public/images/game/shops/inn.png";
import ThroneRoom from "../../../../public/images/game/throne_room.png";
import Warrens from "../../../../public/images/game/warrens.png";
import Treasury from "../../../../public/images/game/treasury.png";

export default function Mounds() {
  const { user } = useUserContext();
  const player = usePlayerContext();
  const { enterBuilding } = useBuildingContext();
  const { action } = useRegionContext();
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#935300", padding: "0.8em", fontSize: "0.8em"}}>
      <h2>The Bowels of the Goblin Mound</h2>
      <div className="flex flex-row justify-between">
      
        <div className=" flex flex-col text-center" onClick={() => action("region", "fields")}>
          <Image className="image" alt="region node" src={MoundsToFields} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            To Fields [1]
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("region", "vortex")}>
          <Image className="image" alt="region node" src={Vortex} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Dark Vortex
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("inn")}>
          <Image className="image" alt="region node" src={Inn} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Gobble Inn
          </div>
        </div>
        
      </div>
      <div className="flex flex-row justify-between">
        
        <div className=" flex flex-col text-center" onClick={() => action("quest", "throneroom")}>
          <Image className="image" alt="region node" src={ThroneRoom} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Throne Room
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("quest", "warrens")}>
          <Image className="image" alt="region node" src={Warrens} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Warrens
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("quest", "treasury")}>
          <Image className="image" alt="region node" src={Treasury} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Treasury
          </div>
        </div>
        
      </div>
    </div>
  );
}