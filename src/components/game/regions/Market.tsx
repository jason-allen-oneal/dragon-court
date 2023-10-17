import Image from "next/image";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useRegionContext } from "@/lib/context/region";
import { useBuildingContext } from "@/lib/context/building";

import Town from "../../../../public/images/game/regions/main_street.png";
import Sea from "../../../../public/images/game/regions/town_to_sea.png";
import Armor from "../../../../public/images/game/shops/armor.png";
import Storage from "../../../../public/images/game/shops/storage.png";
import Den from "../../../../public/images/game/shops/den.png";

export default function Market() {
  const { user } = useUserContext();
  const player = usePlayerContext();
  const { enterBuilding } = useBuildingContext();
  const { action } = useRegionContext();
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#f3a1bc", padding: "0.8em", fontSize: "0.8em"}}>
      <h2>The Market Square of Salamander Keep</h2>
      <div className="flex flex-row justify-between">
      
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("armor")}>
          <Image className="image" alt="region node" src={Armor} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Suitors Armor
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("region", "sea")}>
          <Image className="image" alt="region node" src={Sea} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Hire Boat [1]
          </div>
        </div>
        {/*
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("den")}>
          <Image className="image" alt="region node" src={Den} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Slicks Den
          </div>
        </div>
        */}
      </div>
      <div className="flex flex-row justify-between">
        
        <div className=" flex flex-col text-center" onClick={() => enterBuilding("storage")}>
          <Image className="image" alt="region node" src={Storage} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Silvers Storage
          </div>
        </div>
        
        <div className=" flex flex-col text-center" onClick={() => action("regiin", "town")}>
          <Image className="image" alt="region node" src={Town} sizes="100vw" style={{ width: '100%', height: 'auto', }} />
          <div className="mt-1">
            Main Street
          </div>
        </div>
        
        
        
      </div>
    </div>
  );
}