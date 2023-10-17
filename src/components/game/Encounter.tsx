import Image from "next/image";
import { useUserContext } from "@/lib/context/user";
import { usePlayerContext } from "@/lib/context/player";
import { useRegionContext } from "@/lib/context/region";
import { useEncounterContext } from "@/lib/context/encounter";
import { encounterBlurb, format, replaceBulk } from "@/lib/game";

export default function Encounter() {
  const { user } = useUserContext();
  const { player } = usePlayerContext();
  const { region } = useRegionContext();
  const { monster, attack } = useEncounterContext();
  
  const options = monster.opts;
  const { mainBlurb, attackBlurb, fleeBlurb } = encounterBlurb();
  
  let textStr = monster.text.string;
  
  const replacementKeys = [];
  const replacementValues = [];
  
  for(const replacement of monster.text.replacements){
    replacement.name = replacement.name.replaceAll('"', "");
    replacementKeys.push(replacement.name);
    
    const str = replacement.values[Math.floor(Math.random()*replacement.values.length)];
    replacementValues.push(str);
  }
  
  const description = replaceBulk(textStr, replacementKeys, replacementValues);
  
  const creatureNameLower = monster.name.toLowerCase();
  const creatureImage = creatureNameLower.replace(" ", "_");
  const image = "/images/game/monsters/" + creatureImage + ".jpg";
  
  return (
    <div className="flex flex-col text-white" style={{backgroundColor: "#0a2200", padding: "0.8em", fontSize: "0.8em"}}>
      <div className="flex flex-col justify-center text-center">
        <h4>{player.region} Quest</h4>
      </div>
      <div className="flex flex-row justify-center">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 justify-start">
            <img alt="encounter monster" src={image} />
          </div>
          <div className="col-span-8">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between pt-6">
                <div>
                  {monster.gear[0].name}
                </div>
                <div className="justify-end">
                  Guts:{" "}{monster.guts}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  {monster.gear[1].name}
                </div>
                <div>
                  Wits:{" "}{monster.wits}
                </div>
              </div>
              
              <div className="divider divider-horizontal pb-6"></div>
              
              <div className="pb-1">
                <button onClick={() => attack("attack")} className="btn btn-secondary btn-sm">{attackBlurb}</button>
              </div>
              <div className="pb-1">
                <button onClick={() => flee()} className="btn btn-secondary btn-sm">{fleeBlurb}</button>
              </div>
              {options.includes("trade") && (
              <div className="pb-1">
                <button onClick={() => trade()} className="btn btn-secondary btn-sm">Trade</button>
              </div>
              )}
              {options.includes("bribe") && (
              <div className="pb-1">
                <button onClick={() => pay()} className="btn btn-secondary btn-sm">Pay</button>
              </div>
              )}
              {options.includes("help") && (
              <div className="pb-1">
                <button onClick={() => help()} className="btn btn-secondary btn-sm">Help</button>
              </div>
              )}
              {options.includes("feed") && (
              <div className="pb-1">
                <button onClick={() => feed()} className="btn btn-secondary btn-sm">Feed</button>
              </div>
              )}
              {options.includes("riddle") && (
              <div className="pb-1">
                <button onClick={() => answer()} className="btn btn-secondary btn-sm">Answer</button>
              </div>
              )}
              {options.includes("seduce") && (
              <div className="pb-1">
                <button onClick={() => seduce()} className="btn btn-secondary btn-sm">Seduce</button>
              </div>
              )}
              
              {player.skillFighter > 0 && (
                <div className="pb-1">
                  <button onClick={() => attack("berzerk")} className="btn btn-secondary btn-sm">F: Berzerk[{player.skillFighter}]</button>
                </div>
              )}
              
              {player.skillMagic > 0 && options.includes("control") && (
                <div className="pb-1">
                  <button onClick={() => attack("hypnotize")} className="btn btn-secondary btn-sm">M: Hypnotize[{player.skillMagic}]</button>
                </div>
              )}
              
              {player.skillTrader > 0 && options.includes("swindle") && (
                <div className="pb-1">
                  <button onClick={() => attack("swindle")} className="btn btn-secondary btn-sm">T: Swindle[{player.skillTrader}]</button>
                </div>
              )}
              
              {player.skillTrader > 0 && (
                <div className="pb-1">
                  <button onClick={() => attack("backstab")} className="btn btn-secondary btn-sm">T: Backstab[{player.skillTrader}]</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2">{description}</p>
    </div>
  );
}