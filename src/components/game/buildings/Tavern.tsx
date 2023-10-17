import { useEffect } from "react";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import {useBuildingContext} from "@/lib/context/building";
import { apiCall } from "@/lib/game";
import ShopTopBar from "@/components/game/shop/TopBar";
import ShopLeftPanel from "@/components/game/shop/LeftPanel";
import ShopMainPanel from "@/components/game/shop/MainPanel";
import ItemTable from "@/components/game/ItemTable";

export default function Tavern() {
  const { user } = useUserContext();
  const { player } = usePlayerContext();
  const { setItems, items, building, exitBuilding, buy, sell, identify, selected, setSelected, transType, setTransType } = useBuildingContext();
  
  const rest = (t: string) => {
  
  };
  
  const rumor = () => {
  
  };
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#00c79f", padding: "0.8em", fontSize: "0.8em"}}>
    
      <ShopTopBar title="Silas Keepers Bed & Breakfast">
        <></>
      </ShopTopBar>
      
      <div className="grid grid-cols-12 gap-8">
        <ShopLeftPanel>
          <></>
        </ShopLeftPanel>
        <ShopMainPanel>
          <div className="flex flex-col">
            <button
              onClick={() => rest("floor")}
            >
              Sleep on the Floor
            </button>
                
            <button
              onClick={() => rest("room")}
            >
              Rent a Room
            </button>
                
            <button
              onClick={() => rest("suite")}
            >
              Rent a Suite
            </button>
                
            <button
              onClick={() => rumor()}
            >
              Buy a Drink
            </button>
          </div>
        </ShopMainPanel>
      </div>
    </div>
  );
}