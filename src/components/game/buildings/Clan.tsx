import { useEffect, useState } from "react";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import {useBuildingContext} from "@/lib/context/building";
import { apiCall } from "@/lib/game";
import ShopTopBar from "@/components/game/shop/TopBar";
import ShopLeftPanel from "@/components/game/shop/LeftPanel";
import ShopMainPanel from "@/components/game/shop/MainPanel";
import ItemTable from "@/components/game/ItemTable";

type GuildType = {
  id: number;
  name: string;
  creator: string;
  time: any;
  abilities: string;
  members: number;
  power: number;
}

export default function Clan() {
  const { user } = useUserContext();
  const { player } = usePlayerContext();
  const { setItems, items, building, exitBuilding, buy, sell, identify, selected, setSelected, transType, setTransType } = useBuildingContext();
  const [guildName, setGuildName] = useState('');
  const [guildData, setGuildData] = useState<GuildType | string | null>(null)
  
  const handleGuildName = (e: any) => {
    setGuildName(e.target.current);
  };
  
  const handleGuildGet = async (e: any) => {
    if(guildName !== ""){
      const response = await apiCall("guild/get", {
        name: guildName,
      });
      
      if(response.result.guild === "???"){
        setGuildData("Not Found");
      }else{
        setGuildData(response.result.guild);
      }
    }else{
      alert("Enter A Guild Name");
    }
  };
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#00c79f", padding: "0.8em", fontSize: "0.8em"}}>
    
      <ShopTopBar title="Servile Krymps Clan Gathering">
        <></>
      </ShopTopBar>
      
      <div className="grid grid-cols-12 gap-8">
        <ShopLeftPanel>
          <></>
        </ShopLeftPanel>
        <ShopMainPanel>
          <div className="flex flex-col">
            <div>
              <input type="text" onChange={handleGuildName} />
              <button onClick={handleGuildGet}>Find</button>
            </div>
            <div>
            
            </div>
            <div>
              <button className="btn btn-secondary btn-sm">Petition to Join $1000</button>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <input type="radio" name="action" className="radio" /> Quit
              </div>
              <div>
                <input type="radio" name="action" className="radio" checked /> Join
              </div>
            </div>
          </div>
        </ShopMainPanel>
      </div>
    </div>
  );
}