import { useEffect } from "react";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import {useBuildingContext} from "@/lib/context/building";
import { apiCall } from "@/lib/game";
import ShopTopBar from "@/components/game/shop/TopBar";
import ShopLeftPanel from "@/components/game/shop/LeftPanel";
import ShopMainPanel from "@/components/game/shop/MainPanel";
import ItemTable from "@/components/game/ItemTable";

export default function Magic() {
  const { user } = useUserContext();
  const { player } = usePlayerContext();
  const { setItems, items, building, exitBuilding, buy, sell, identify, selected, setSelected, transType, setTransType } = useBuildingContext();
  
  const stock = [
    134,
    135,
    123,
    124,
    129,
    125,
    128,
    136,
    137,
    139,
    138,
    133
  ];
  
  useEffect(() => {
    async function getItems() {
      const response = await apiCall("shop/items", {
        building: "magic",
        region: "mountains",
        stock: stock,
      });
      
      setItems(response.result.items);
    }
    getItems();
  });
  
  const itemClick = (id: number) => {
    setSelected(id);
  };
  
  const toggleTransType = () => {
    if(transType === "buy"){
      setTransType("sell");
    }else{
      setTransType("buy");
    }
  };
  
  const performTrade = () => {
    if(selected) {
      if(transType === "buy"){
        buy();
      }else{
        sell();
     }
    }else{
      alert('no selected');
    }
  };
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#00c79f", padding: "0.8em", fontSize: "0.8em"}}>
    
      <ShopTopBar title="Djinni's Ethereal Magic Shop">
        <button className="btn btn-outline btn-secondary btn-sm mx-2" onClick={() => performTrade()}>Trade</button>
        <div>
          <span className="align-middle">Buy</span>&nbsp;
          <input
            onChange={() => toggleTransType()}
            checked={transType === "sell"}
            type="checkbox"
            className="toggle align-middle"
          />&nbsp;
          <span className="align-middle">Sell</span>
        </div>
      </ShopTopBar>
      
      <div className="grid grid-cols-12 gap-8">
        <ShopLeftPanel>
          <></>
        </ShopLeftPanel>
        <ShopMainPanel>
          <ItemTable showCost={true}>
          {items.map((item: any) => (
            <tr
              onClick={() => itemClick(item.id)} key={item.id}
              className={item.id === selected ? "bg-white text-black" : null}
            >
              <td>{item.name}</td>
              <td>{`+${item.attack}a`}</td>
              <td>{`+${item.defend}d`}</td>
              <td className="text-right">{`${item.cost}`}</td>
            </tr>
          ))}
          </ItemTable>
        </ShopMainPanel>
      </div>
    </div>
  );
}