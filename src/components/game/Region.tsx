import Town from "@/components/game/regions/Town";
import Fields from "@/components/game/regions/Fields";
import Forest from "@/components/game/regions/Forest";
import Mounds from "@/components/game/regions/Mounds";
import Mountains from "@/components/game/regions/Mountains";
import Sea from "@/components/game/regions/Sea";
import Market from "@/components/game/regions/Market";
import Castle from "@/components/game/regions/Castle";
import { useRegionContext } from '@/lib/context/region';

export default function Region() {
  const { region } = useRegionContext();

  const type = region;
  
  if(type === "Town") {
    return <Town />;
  } else if(type === "Fields") {
    return <Fields />
  } else if(type === "Forest") {
    return <Forest />
  } else if(type === "Mounds") {
    return <Mounds />;
  } else if(type === "Mountains") {
    return <Mountains />
  } else if(type === "Sea") {
    return <Sea />;
  } else if(type === "Market") {
    return <Market />;
  } else if(type === "cCastle") {
    return <Castle />;
  } else {
    return <Town />;
  }
}