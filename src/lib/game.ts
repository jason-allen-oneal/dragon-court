import strings from "@/lib/strings";
import {useRef, useEffect} from "react";

export function log(title: string, msg: string, data: any) {
  console.log(`[${title}] - ${msg}`, JSON.stringify(data));
}

export function replaceBulk(str, findArray, replaceArray) {
  let i, regex = [],
    map = {};
  
  for(i=0; i<findArray.length; i++){
    regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1'));
    
    map[findArray[i]] = replaceArray[i];
  }
  
  regex = regex.join('|');
  str = str.replace(new RegExp(regex, 'g'), function(matched){
    return map[matched];
  });
  
  return str;
}

export async function apiCall(path: string, data: any) {
  const request = await fetch("/api/"+path, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await request.json();
  
  let response: any = {};
  if (result.status === "ok") {
    response = {
      status: "ok",
      result: result.result
    };
  } else {
    console.log("error", JSON.stringify(result.result));
    response = {
      status: "error",
      error: result.result
    };
  }
    
  return response;
};

export function generateBackstory() {
  const r = strings.creation.race[Math.floor(Math.random() * strings.creation.race.length)],
    a = strings.creation.adj[Math.floor(Math.random() * strings.creation.adj.length)],
    l = strings.creation.loc[Math.floor(Math.random() * strings.creation.loc.length)],
    d = strings.creation.desc[Math.floor(Math.random() * strings.creation.desc.length)];

  return "You are a " + a + " " + r + " from " + l + ", who " + d + ".";
}

export function getText(path: string) {
  return path
    .replace(/\[([^[\]]*)]/g, ".$1.")
    .split(".")
    .filter((prop) => prop !== "")
    .reduce((prev: any, next) => (prev instanceof Object ? prev[next] : undefined), strings);
}

export function format(string, params) {
  return string.replace(/{(\d+)}/g, (match, index) => {
    return typeof params[index] !== 'undefined' ? params[index] : match;
  });
}

export function awakenText(player: any) {
  let text = "",
    stipend = false;
  
  if(player.region == "Mounds" || player.region == "Town"){
    switch (player.location) {
      case "floor":
        text += getText(`awaken.${player.region}.floor`);
        break;

      case "room":
        text += getText(`awaken.${player.region}.room`);
        break;

      case "suite":
        text += getText(`awaken.${player.region}.suite`);
        break;
      
      case "cot":
        text += getText(`awaken.${player.region}.cot`);
        break;
            
      case "outside":
      case "none":
      default:
        text += getText(`awaken.${player.region}.none`);
        break;
    }
  }else{
    text += getText(`awaken.${player.region}`);
  }
  
  if (player.rankString != "Peasant") {
    stipend = true;
  }

  if (stipend) {
    const base = 2048;
    const gain = Math.floor(base * player.rank * (player.level / 2));
    player.cashToday = player.cashToday + gain;
    player.cash = player.cash + gain;
    
    text += "\n\n" + format(getText("awaken.stipend"), ["" + gain]);
  }
  
  return {text: text, p: player};
}

export function getRandomText(path: string) {
  const obj = path
    .split('.')
    .reduce((p,c) => p && p[c] || null, strings);
  
  return obj[Math.floor(Math.random() * obj.length)];
}

export function regionBlurb(r: string) {
  return strings.regions[r]["enter"][Math.floor(Math.random() * strings.regions[r]["enter"].length)];
}

export function encounterBlurb() {
  const mainBlurb = strings.encounter["main"][Math.floor(Math.random() * strings.encounter["main"].length)];
  
  const attackBlurb = strings.encounter["attack"][Math.floor(Math.random() * strings.encounter["attack"].length)];
  
  const fleeBlurb = strings.encounter["flee"][Math.floor(Math.random() * strings.encounter["flee"].length)];
  
  return { mainBlurb, attackBlurb, fleeBlurb };
}

export function shopBlurb(shop: string) {
  return strings.shops[shop as keyof typeof strings.shops][Math.floor(Math.random() * strings.shops[shop as keyof typeof strings.shops].length)];
}

export function roll(v: number): number {
  if (v < 1) {
    return 0;
  }
  
  return Math.floor(Math.random() * v);
}

export function contest(a: number, b: number): boolean {
  return roll(a + b) < a;
}

export function twice(value: number) {
  return roll(value) + roll(value);
}

export function skew(value: number) {
  let sum = 0;
  while (percent(value)) {
    sum++;
  }
  return sum;
}

export function percent(value: number): boolean {
  return roll(100) < value;
}

export function chance(value: number): boolean {
  return roll(value) === 0;
}

export function spread(value: number): number {
  const min = (value * 5) / 7;
  return 1 + min + twice(value - min);
}

export function scale(value: number, base: number): number {
  let num = 0;
  for (let i = value; i > 0; i--) {
    num += Math.floor(base / 2);
  }
  return num;
}