import { createContext, PropsWithChildren, useContext, useState } from "react";

type inventoryContextType = {
  equipment: EquipmentType;
  setEquipment: (e: EquipmentType) => void;
  inventory: ItemType[];
  setInventory: (i: ItemType[]) => void;
  useInvItem: (id: number) => void;
  infoItem: (id: number) => void;
  dumpItem: (id: number) => void;
  undoDumpItem: () => void;
  addItem: (i: ItemType) => void;
  removeItem: (i: ItemType) => void;
  hasItem: (i: ItemType | number) => boolean;
  initializeEquipment: (e: any[]) => void;
};

const inventoryContextDefault: inventoryContextType = {
  equipment: {
    equipped: {
      head: null,
      body: null,
      feet: null,
      right: null,
      left: null,
    },
    attack: 0,
    defend: 0,
    skill: 0,
  },
  setEquipment: (e: EquipmentType) => {},
  inventory: [],
  setInventory: (i: ItemType[]) => {},
  useInvItem: (id: number) => {},
  infoItem: (id: number) => {},
  dumpItem: (id: number) => {},
  undoDumpItem: () => {},
  addItem: (item: ItemType) => {return false},
  removeItem: (item: ItemType) => {},
  hasItem: (i: ItemType | number) => {return false},
  initializeEquipment: (e: any[]) => {},
};

export const InventoryContext =
  createContext(inventoryContextDefault);

export const InventoryProvider = (props: PropsWithChildren) => {
  const [equipment, setEquipment] = useState(inventoryContextDefault.equipment);
  const [inventory, setInventory] = useState(inventoryContextDefault.inventory);
  
  const useInvItem = async (id: number) => {
  
  };
  
  const infoItem = async (id: number) => {
  
  };
  
  const dumpItem = async (id: number) => {
  
  };
  
  const undoDumpItem = async () => {
  
  };
  
  const hasItem = (id: ItemType | number): boolean => {
    return false;
  };
  
  const addItem = (i: ItemType) => {
    let stateItems = inventory;
    const objectToReplace = stateItems.find(arrayItem => arrayItem.id === i.id);
    Object.assign(objectToReplace, i);
    setInventory(stateItems);
  };
  
  const removeItem = (i: ItemType) => {
    let stateItems = inventory;
    const objectToReplace = stateItems.find(arrayItem => arrayItem.id === i.id);
    Object.assign(objectToReplace, i);
    setInventory(stateItems);
  };
  
  const initializeEquipment = (e: any) => {
    setEquipment(e);
  };
  
  return (
    <InventoryContext.Provider
      value={{
        equipment,
        setEquipment,
        inventory,
        setInventory,
        useInvItem,
        infoItem,
        dumpItem,
        undoDumpItem,
        addItem,
        removeItem,
        hasItem,
        initializeEquipment,
      }}
    >
      {props.children}
    </InventoryContext.Provider>
  );
};

export function useInventoryContext() {
  return useContext(InventoryContext);
}