import Image from "next/image";
import { useState } from "react";
import { apiCall } from "@/lib/game";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useInventoryContext } from "@/lib/context/inventory";
import { useCharacterContext } from "@/lib/context/character";
import Exit from "../../../public/images/game/exit.png";
import Player from "../../../public/images/game/player.png";

export default function Character() {
  const { setInCharacter } = useCharacterContext();
  const { user } = useUserContext();
  const { player } = usePlayerContext();
  const { equipment, inventory, setEquipment, setInventory } = useInventoryContext();
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(0);
  
  const quests = player.quests < player.maxQuests ? `${player.quests}/${player.maxQuests}` : player.quests;
  const guts = player.guts < player.maxGuts ? `${player.guts}/${player.maxGuts}` : player.guts;
  const wits = player.wits < player.maxWits ? `${player.wits}/${player.maxWits}` : player.wits;
  const charm = player.charm < player.maxCharm ? `${player.charm}/${player.maxCharm}` : player.charm;
  
  const weaponString = equipment.equipped.right === null ? "None" : equipment.equipped.right.name;
  const armorString = equipment.equipped.body === null ? "None" : equipment.equipped.body.name;
  
  const nextLvlExp = Math.round(50 * Math.pow(1.3999999761581421, player.level - 1));
  const expProgress = Math.round((player.experience / nextLvlExp) * 100);
  
  const inventoryClick = async (id: number) => {
    setSelectedInventoryItem(id);
  };
  
  const useItem = async () => {
    const response = apiCall('inventory/use', {
      id: selectedInventoryItem
    });
  };
  
  const peerClick = () => {
    
  };
  
  const inventoryUseClick = () => {
    
  };
  
  const infoClick = (i: any) => {
  
  };
  
  const dumpItem = (i: any) => {
  
  };
  
  const undoDumpItem = () => {
  
  };
  
  return (
    <div className="flex flex-col" style={{backgroundColor: "#AD3D09"}}>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <strong>{player.rankString}{" "}{user.name}</strong>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <strong>Level:</strong> {player.level}
              </div>
              <div>
                <strong>Rank:</strong> {player.rankString}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <strong>Guts:</strong> {guts}
              </div>
              <div>
                <strong>Attack:</strong> {player.attack}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <strong>Wits:</strong> {wits}
              </div>
              <div>
                <strong>Defend:</strong> {player.defend}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <strong>Charm:</strong> {charm}
              </div>
              <div>
                <strong>Skill:</strong> {player.skill}
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <strong>Quests:</strong> {quests}
              </div>
              <div>
                <div>
                  <strong>Exp:</strong>
                </div>
                <progress className="progress progress-accent w-56" value={expProgress} max="100"></progress>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <Image alt="" src={Player} />
          <Image
            className=""
            alt="Leave Character"
            src={Exit}
            onClick={() => setInCharacter(false)}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="h-36">
              <strong>Inventory</strong>
              <div className='overflow-x'>
                <table className='table-auto overflow-scroll w-full'>
                  <tbody className="bg-gray-100">
                  {inventory && inventory.map((invItem: any, i: any) => {
                    if(invItem.equipped){
                      return null;
                    }else{
                      return (
                        <tr key={i}>
                          <td onClick={() => inventoryClick(invItem.id)}>
                            {invItem.name}
                          </td>
                        </tr>
                      );
                    }
                  })}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              Backpack: {player.storage}/{player.maxStorage}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div>
                H: {equipment.equipped.head === null ? "None" : equipment.equipped.head.name}
              </div>
              <div>B: {equipment.equipped.body === null ? "None" : equipment.equipped.body.name}</div>
              <div>F: {equipment.equipped.feet === null ? "None" : equipment.equipped.feet.name}</div>
              <div>R: {equipment.equipped.right === null ? "None" : equipment.equipped.right.name}</div>
              <div>L: {equipment.equipped.left === null ? "None" : equipment.equipped.left.name}</div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <button onClick={() => inventoryUseClick()} className="btn btn-sm btn-secondary">Use</button>
                <button onClick={() => infoClick(selectedInventoryItem)} className="btn btn-sm btn-secondary">Info</button>
                <button onClick={() => peerClick()} className="btn btn-sm btn-secondary">Peer</button>
              </div>
              <div className="flex flex-row justify-between">
                <button onClick={() => dumpItem(selectedInventoryItem)} className="btn btn-sm btn-secondary">Dump</button>
                <button onClick={() => undoDumpItem()} className="btn btn-sm btn-secondary">Ooops</button>
                <button  className="btn btn-sm btn-secondary">Exit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}