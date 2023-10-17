import { useEffect } from "react";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import {useBuildingContext} from "@/lib/context/building";
import { apiCall } from "@/lib/game";
import ShopTopBar from "@/components/game/shop/TopBar";
import ShopLeftPanel from "@/components/game/shop/LeftPanel";
import ShopMainPanel from "@/components/game/shop/MainPanel";
import ItemTable from "@/components/game/ItemTable";

export default function Healer() {
  const { user } = useUserContext();
  const { player } = usePlayerContext();
  const { setItems, items, building, exitBuilding, buy, sell, identify, selected, setSelected, transType, setTransType } = useBuildingContext();
  
  const rest = (t: string) => {
  
  };
  
  const heal = (t: string) => {
  
  };
  
  const tithe = () => {
  
  };
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#00c79f", padding: "0.8em", fontSize: "0.8em"}}>
    
      <ShopTopBar title="Elden Bishop's Temple of Brotherly Sharing">
        <></>
      </ShopTopBar>
      
      <div className="grid grid-cols-12 gap-8">
        <ShopLeftPanel>
          <></>
        </ShopLeftPanel>
        <ShopMainPanel>
          <div className="flex flex-col w-4/6">
            <button
              className="btn btn-xs btn-secondary"
              onClick={() => rest("healer")}
            >
              Rest [1]
            </button>
                
            <button
              className="btn btn-xs btn-secondary"
              onClick={() => heal("heal")}
            >
              Heal $6
            </button>
                
            <button
              className="btn btn-xs btn-secondary"
              onClick={() => heal("cure")}
            >
              Cure $10
            </button>
                
            <button
              className="btn btn-xs btn-secondary"
              onClick={() => tithe()}
            >
              Tithe $1000
            </button>
          </div>
        </ShopMainPanel>
      </div>
    </div>
  );
}