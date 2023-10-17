import { PropsWithChildren } from "react";
import {useBuildingContext} from "@/lib/context/building";
import { shopBlurb } from "@/lib/game";

export default function ShopLeftPanel({children} : PropsWithChildren) {
  const { building } = useBuildingContext();
  
  const blurb = shopBlurb(building);
  
  return (
    <div className="col-span-3">
      <div className="">
        <img src={`/images/game/npc/${building}.png`} alt="npc image" />
        <div>{blurb}</div>
        {children}
      </div>
    </div>
  );
}