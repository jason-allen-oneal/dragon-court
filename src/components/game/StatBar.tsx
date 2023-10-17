import Image from "next/image";
import {useEffect,useState} from "react";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useInventoryContext } from "@/lib/context/inventory";
import { useBuildingContext } from "@/lib/context/building";
import { useCharacterContext } from "@/lib/context/character";
import Character from "../../../public/images/dragon-head-small.png";

export default function StatBar() {
  const { user } = useUserContext();
  const {player, getPlayerRankString} = usePlayerContext();
  const { equipment } = useInventoryContext();
  const { setInCharacter } = useCharacterContext();
  
  const [experience, setExperience] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);
  const [quests, setQuests] = useState<string>('');
  const [guts, setGuts] = useState<number | string>();
  const [wits, setWits] = useState<number | string>(0);
  const [charm, setCharm] = useState<number | string>(0);
  const [weapon, setWeapon] = useState<string>("Fists");
  const [armor, setArmor] = useState<string>("Skin");
  
  useEffect(() => {
    const q = player.quests < player.maxQuests ? `${player.quests}/${player.maxQuests}` : `${player.quests}`;
    setQuests(q);
    const g = player.guts < player.maxGuts ? `${player.guts}/${player.maxGuts}` : player.guts;
    setGuts(g);
    const w = player.wits < player.maxWits ? `${player.wits}/${player.maxWits}` : player.wits;
    setWits(w);
    const c = player.charm < player.maxCharm ? `${player.charm}/${player.maxCharm}` : player.charm;
    setCharm(c);
    setExperience(player.experience);
    setCash(player.cash);
  }, [player]);
  
  useEffect(() => {
    const weaponString = (equipment.equipped.right !== null) ? equipment.equipped.right.name : "Fists";
    setWeapon(weaponString);
    
    const armorString = (equipment.equipped.body !== null) ? equipment.equipped.body.name : "Skin";
    setArmor(armorString);
  }, [equipment]);
  
  return (
    <div className="border-t border-black grid grid-cols-6" style={{padding: "0.6em", fontSize: "0.8em"}}>
      <div className="col-span-5">
        <div className="flex flex-row justify-between">
              <div>
                {getPlayerRankString()+' '+user.name}
              </div>
              <div>
                XP: {player.experience}
              </div>
              <div>
                Cash: {"$"}{player.cash}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                Guts: {guts}
              </div>
              <div>
                Wits: {wits}
              </div>
              <div>
                Charm: {charm}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                Quests: {quests}
              </div>
              <div>
                Lvl: {player.level}
              </div>
              <div>
                {weapon + " & " + armor}
              </div>
            </div>
      </div>
      <div className="m-auto">
        <button className="btn btn-primary btn-xs btn-square" onClick={() => setInCharacter(true)}>
          <Image src={Character} sizes="100vw" style={{ width: '100%', height: 'auto'}} alt="Character" />
        </button>
      </div>
    </div>
  );
}