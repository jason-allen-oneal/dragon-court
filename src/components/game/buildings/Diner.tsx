import { useEffect } from "react";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import {useBuildingContext} from "@/lib/context/building";
import { apiCall } from "@/lib/game";
import ShopTopBar from "@/components/game/shop/TopBar";
import ShopLeftPanel from "@/components/game/shop/LeftPanel";
import ShopMainPanel from "@/components/game/shop/MainPanel";
import ItemTable from "@/components/game/ItemTable";

export default function Diner() {
  const { user } = useUserContext();
  const { player } = usePlayerContext();
  const { setItems, items, building, exitBuilding, buy, sell, identify, selected, setSelected, transType, setTransType } = useBuildingContext();
  
  useEffect(() => {
    setTransType("inn");
  }, [setTransType]);
  
  useEffect(() => {
    async function getItems() {
      const response = await apiCall("shop/items", {
        region: "sea",
        building: "diner"
      });
      
      setItems(response.result.items);
    }
    getItems();
  }, [setItems]);
  
  const itemClick = (id: number) => {
    setSelected(id);
  };
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#00c79f", padding: "0.8em", fontSize: "0.8em"}}>
    
      <ShopTopBar>
        <div>
          <span className="align-middle">Inn</span>&nbsp;
          <input
            onChange={() => toggleTransType()}
            checked={transType === "shop"}
            type="checkbox"
            className="toggle align-middle"
          />&nbsp;
          <span className="align-middle">Shop</span>
        </div>
      </ShopTopBar>
      
      <div className="grid grid-cols-12 gap-8">
        <ShopLeftPanel>
          <></>
        </ShopLeftPanel>
        <ShopMainPanel>
          <div className="flex flex-col">
          
          </div>
        </ShopMainPanel>
      </div>
    </div>
  );
}