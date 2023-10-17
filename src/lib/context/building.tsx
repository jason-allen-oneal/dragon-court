import { createContext, useContext, useState, PropsWithChildren } from 'react';
import { useInventoryContext } from "@/lib/context/inventory";
import { usePlayerContext } from "@/lib/context/player";
import { apiCall } from "@/lib/game";

type buildingContextType = {
  items: any[];
  setItems: (i: any[]) => void;
  building: string;
  setBuilding: (b: string) => void;
  inBuilding: boolean;
  setInBuilding: (b: boolean) => void;
  enterBuilding: (b: string) => void;
  exitBuilding: () => void;
  buy: () => void;
  sell: () => void;
  identify: () => void;
  polish: () => void;
  selected: number;
  setSelected: (i: number) => void;
  transType: string;
  setTransType: (t: string) => void;
};

const buildingContextDefault: buildingContextType = {
  items: [],
  setItems: (i: any[]) => {},
  building: "",
  setBuilding: (b: string) => {},
  inBuilding: false,
  setInBuilding: (b: boolean) => {},
  enterBuilding: (b: string) => {},
  exitBuilding: () => {},
  buy: () => {},
  sell: () => {},
  identify: () => {},
  polish: () => {},
  selected: 0,
  setSelected: (i: number) => {},
  transType: "buy",
  setTransType: (t: string) => {},
};

export const BuildingContext = createContext(buildingContextDefault);

export function BuildingProvider(props: PropsWithChildren) {
  const { addItem, removeItem } = useInventoryContext();
  const { player, setPlayer } = usePlayerContext();
  
  const [items, setItems] = useState([]);
  const [inBuilding, setInBuilding] = useState(false);
  const [building, setBuilding] = useState('');
  const [selected, setSelected] = useState(0);
  const [transType, setTransType] = useState("buy");
  
  const enterBuilding = (b: string) => {
    setBuilding(b);
    setInBuilding(true);
  };
  
  const exitBuilding = () => {
    setInBuilding(false);
  };
  
  const buy = async () => {
    console.log('buying '+selected);
    const data = await apiCall('shop/buy', {
      pid: player.id,
      item: selected,
      shop: building,
      region: player.region
    });
    
    setPlayer(data.result.player);
    addItem(data.result.item);
    alert(data.result.message);
  };
  
  const sell = async () => {
    console.log('selling '+selected);
    const data = await apiCall('shop/sell', {
      pid: player.id,
      item: selected,
      shop: building,
      region: player.region
    });
    
    setPlayer(data.result.player);
    removeItem(data.result.item);
    alert(data.result.message);
  };
  
  const identify = () => {
  
  };
  
  const polish = () => {
  
  };
  
  return (
    <BuildingContext.Provider value={{ items, setItems, building, setBuilding, inBuilding, setInBuilding, enterBuilding, exitBuilding, buy, sell, identify, polish, selected, setSelected, transType, setTransType }}>
      {props.children}
    </BuildingContext.Provider>
  );
}

export function useBuildingContext() {
  return useContext(BuildingContext);
}