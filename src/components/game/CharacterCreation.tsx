import { useState, useEffect } from "react";
import { generateBackstory } from "@/lib/game";

export default function CharacterCreation({uid, setUser, setPlayer}: {uid: number, setUser: (u: any) => void, setPlayer: (p: any) => void}) {
  const classCosts = {
    peasant: 0,
    warrior: 8,
    wizard: 9,
    trader: 10,
    noble: 12,
  };

  const [freePoints, setFreePoints] = useState(20);
  const [charClass, setCharClass] = useState("peasant");
  const [cash, setCash] = useState(25);
  const [guts, setGuts] = useState<number>(0);
  const [wits, setWits] = useState<number>(0);
  const [charm, setCharm] = useState<number>(0);
  const [lastPoints, setLastPoints] = useState<number>(0);
  const [bg, setBg] = useState<string>("");
  
  useEffect(() => {
    const background = generateBackstory();
    setBg(background);
  }, []);
  
  const reroll = () => {
    const background = generateBackstory();
    setBg(background);
  };
  
  const statClick = (stat: string, action: string) => {
  let cost = 1;
  let error = null,
    cause = null,
    effect = null,
    add = null,
    query = null;

  if (stat == "guts" || stat == "wits" || stat == "charm") {
    cost = 3;
  }
  
  if (action == "plus" || action == "add") {
    query = freePoints - cost < 0;
    error = "You do not have enough free points!";
    cause = freePoints - cost;
    if (stat == "cash") {
      add = 25;
    } else {
      add = 1;
    }
    
    switch(stat) {
      case 'guts':
        effect = guts + add;
      break;
      
      case 'wits':
        effect = wits + add;
      break;
      
      case 'charm':
        effect = charm + add;
      break;
      
      default:
      case 'cash':
        effect = cash + add;
      break;
    }
  } else {
    if (stat == "cash") {
      add = 25;
    } else {
      add = 1;
    }
    
    switch(stat) {
      case 'guts':
        query = guts - add < 0;
      break;
      
      case 'wits':
        query = wits - add < 0;
      break;
      
      case 'charm':
        query = charm - add < 0;
      break;
      
      default:
      case 'cash':
        query = cash - add < 0;
      break;
    }
    
    error = "You cannot reduce a stat below 0!";
    cause = freePoints + cost;
    
    switch(stat) {
      case 'guts':
        effect = guts - add;
      break;
      
      case 'wits':
        effect = wits - add;
      break;
      
      case 'charm':
        effect = charm - add;
      break;
      
      default:
      case 'cash':
        effect = cash - add;
      break;
    }
  }
    
  if (query) {
    // show error
  } else {
    setFreePoints(cause);
    
    if (stat == "guts") {
      setGuts(effect);
    } else if (stat == "wits") {
      setWits(effect);
    } else if (stat == "charm") {
      setCharm(effect);
    } else {
      setCash(effect);
    }
  }
};


  const classChange = (event: any) => {
    const selectedClass = event.target.value;
    
    // Calculate the cost of the new class
    const newClassCost = classCosts[selectedClass];
    
    // Calculate the new freePoints value
    const newFreePoints = freePoints + lastPoints - newClassCost;
    
    if (newFreePoints < 0) {
      // show error or handle insufficient points
    } else {
      // Update the class, lastPoints, and freePoints
      setCharClass(selectedClass);
      setLastPoints(newClassCost);
      setFreePoints(newFreePoints);
    }
  };
  
  const handleSubmit = async () => {
    if(freePoints > 0) {
      // show error
      
      return;
    }
    
    const obj = {
      owner: uid,
      guts: guts,
      wits: wits,
      charm: charm,
      cash: cash,
      charClass: charClass,
      bg: bg,
    };
    
    try {
      const request = await fetch("/api/player/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const response = await request.json();
      
      if (response.status == 201) {
        setUser(response.result.user);
        setPlayer(response.result.player);
      } else {
        //show error
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="flex flex-col m-6">
      <div className="flex flex-row justify-center">
        <h2 className="text-2xl mb-4">Character Creation</h2>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-center mb-2">{bg}</span>
        <button className="btn btn-secondary btn-xs" onClick={reroll}>
          Re-roll
        </button>
      </div>
      <div className="flex flex-row justify-center">
        <span className="mb-2">
          Free Points: <span className="text-xl">{freePoints}</span>
        </span>
      </div>
      <div className="flex flex-row justify-center">
        Cost: 3
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center">Guts</div>
          <div className="text-xl text-center">{guts}</div>
          <div className="flex flex-row justify-between text-center">
            <button className="btn btn-secondary btn-xs" onClick={() => statClick("guts", "add")}>+</button>
            <button className="btn btn-secondary btn-xs" onClick={() => statClick("guts", "minus")}>-</button>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center">Wits</div>
          <span className="text-xl text-center">{wits}</span>
          <div className="flex flex-row justify-between text-center">
            <button className="btn btn-secondary btn-xs" onClick={() => statClick("wits", "add")}>+</button>
            <button className="btn btn-secondary btn-xs" onClick={() => statClick("wits", "minus")}>-</button>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center">Charm</div>
          <div className="text-xl text-center">{charm}</div>
          <div className="flex flex-row justify-between text-center">
            <button className="btn btn-secondary btn-xs" onClick={() => statClick("charm", "add")}>+</button>
            <button className="btn btn-secondary btn-xs" onClick={() => statClick("charm", "minus")}>-</button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center justify-between mt-4">
        <div className="flex flex-col justify-between">
          <div className="text-center text-xl">Choose Class</div>
          <div className="flex flex-col" >
            <label>
              <input
                type="radio"
                value="peasant"
                checked={charClass === "peasant"}
                onChange={classChange}
              />
              Peasant 0p
            </label>
            <label>
              <input
                type="radio"
                value="warrior"
                checked={charClass === "warrior"}
                onChange={classChange}
              />
              Warrior 8p
            </label>
            <label>
              <input
                type="radio"
                value="wizard"
                checked={charClass === "wizard"}
                onChange={classChange}
              />
              Wizard 9p
            </label>
            <label>
              <input
                type="radio"
                value="trader"
                checked={charClass === "trader"}
                onChange={classChange}
              />
              Trader 10p
            </label>
            <label>
              <input
                type="radio"
                value="noble"
                checked={charClass === "noble"}
                onChange={classChange}
              />
              Noble 12p
            </label>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="text-center">
              <span className="text-xl">Starting Cash</span>
              <br />
              1p = $25
            </div>
            <div className="text-center">
              {cash}
            </div>
            <div className="flex flex-row justify-between text-center">
              <button className="btn btn-secondary btn-xs" onClick={() => statClick("cash", "add")}>+</button>
              <button className="btn btn-secondary btn-xs" onClick={() => statClick("cash", "minus")}>-</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-6">
        <button className="btn btn-primary" onClick={handleSubmit}>CREATE!</button>
      </div>
    </div>
  );
}