import Image from "next/image";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useRegionContext } from "@/lib/context/region";
import { useBuildingContext } from "@/lib/context/building";

import Tavern from "../../../../public/images/game/shops/tavern.png";
import MarketLane from "../../../../public/images/game/regions/market_lane.png";
import Castle from "../../../../public/images/game/regions/castle_gate.png";
import Weapons from "../../../../public/images/game/shops/weapons.png";
import Trade from "../../../../public/images/game/shops/trade.png";
import ToFields from "../../../../public/images/game/regions/town_to_fields.png";

export default function Town() {
  const { user } = useUserContext();
  const {player} = usePlayerContext();
  const { enterBuilding } = useBuildingContext();
  const { action } = useRegionContext();
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#00c79f", padding: "0.8em", fontSize: "0.8em"}}>
      <h2>Main Street in Salamander Township</h2>
      <div className="flex flex-row justify-between">
      
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("tavern")}>
          <Image className="image" alt="region node" src={Tavern} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Keepers Tavern
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("region", "Market")}>
          <Image className="image" alt="region node" src={MarketLane} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Market Lane
          </div>
        </div>
        
        {player.level > 5 && (
        <div className=" flex flex-col text-center" onClick={() => action("region", "Castle")}>
          <Image className="image" alt="region node" src={Castle} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Castle Gate [1]
          </div>
        </div>
        )}
        
      </div>
      <div className="flex flex-row justify-between">
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("weapons")}>
          <Image className="image" alt="region node" src={Weapons} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Smiths Weapons
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("trade")}>
          <Image className="image" alt="region node" src={Trade} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Trade Shoppe
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("region", "Fields")}>
          <Image className="image" alt="region node" src={ToFields} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Leave Town [1]
          </div>
        </div>
        
      </div>
    </div>
  );
}