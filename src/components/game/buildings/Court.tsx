import { useEffect } from "react";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import {useBuildingContext} from "@/lib/context/building";
import { apiCall } from "@/lib/game";
import ShopTopBar from "@/components/game/shop/TopBar";
import ShopLeftPanel from "@/components/game/shop/LeftPanel";
import ShopMainPanel from "@/components/game/shop/MainPanel";
import ItemTable from "@/components/game/ItemTable";
import Button from "@/components/game/Button";

export default function Clan() {
  const { user } = useUserContext();
  const { player } = usePlayerContext();
  const { setItems, items, building, exitBuilding, buy, sell, identify, selected, setSelected, transType, setTransType } = useBuildingContext();
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#00c79f", padding: "0.8em", fontSize: "0.8em"}}>
      <ShopTopBar title="Hallways &amp; Chambers of the Dragon Court">
        <></>
      </ShopTopBar>
      
      <div className="grid grid-cols-12 gap-8">
        <ShopLeftPanel>
          <></>
        </ShopLeftPanel>
        <ShopMainPanel>
          <div className="flex flex-col w-4/6">
            <div className="flex flex-row justify-center">
              <Button handler={() => console.log('dice')} text="Dice" />
              <Button text="Boast" handler={() => console.log("boast")} />
            </div>
            
            <div className="flex flex-row justify-center">
              <Button text="Mingle" handler={() => console.log("mingle")} />
              <Button text="Game" handler={() => console.log("game")} />
            </div>
            
            <div className="flex flex-row justify-center">
              <Button text="Invest $100k" handler={() => console.log('inveset')} />
            </div>
            
            <div className="flex flex-row justify-center">
              <Button text="Petition for next Rank $5000" handler={() => console.log("petition")} />
            </div>
          </div>
        </ShopMainPanel>
      </div>
    </div>
  );
}