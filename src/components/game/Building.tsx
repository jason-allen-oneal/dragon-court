import Armor from "@/components/game/buildings/Armor";
import Clan from "@/components/game/buildings/Clan";
import Court from "@/components/game/buildings/Court";
//import Den from "@/components/game/buildings/Den";
//import Diner from "@/components/game/buildings/Diner";
import Gem from "@/components/game/buildings/Gem";
//import Guard from "@/components/game/buildings/Guard";
import Guild from "@/components/game/buildings/Guild";
import Healer from "@/components/game/buildings/Healer";
import Inn from "@/components/game/buildings/Inn";
import Magic from "@/components/game/buildings/Magic";
import PostOffice from "@/components/game/buildings/PostOffice";
import Smithy from "@/components/game/buildings/Smithy";
//import Storage from "@/components/game/buildings/Storage";
import Tavern from "@/components/game/buildings/Tavern";
import Trade from "@/components/game/buildings/Trade";
import Weapons from "@/components/game/buildings/Weapons";
import {useBuildingContext} from "@/lib/context/building";

export default function Building() {
  const { building } = useBuildingContext();
  
  if(building === "armor"){
    return <Armor />;
  }else if(building === "clan"){
    return <Clan />;
  }else if(building === "court"){
    return <Court />;
  }else if(building === "den"){
    return <></>;
  }else if(building === "diner"){
    return <></>;
  }else if(building === "gem"){
    return <Gem />;
  }else if(building === "guard"){
    return <></>;
  }else if(building === "guild"){
    return <Guild />;
  }else if(building === "healer"){
    return <Healer />;
  }else if(building === "inn"){
    return <Inn />;
  }else if(building === "magic"){
    return <Magic />;
  }else if(building === "post-office"){
    return <PostOffice />;
  }else if(building === "smithy"){
    return <Smithy />;
  }else if(building === "storage"){
    return <></>;
  }else if(building === "tavern"){
    return <Tavern />;
  }else if(building === "trade"){
    return <Trade />;
  }else if(building === "weapons"){
    return <Weapons />;
  }else{
    
  }
}