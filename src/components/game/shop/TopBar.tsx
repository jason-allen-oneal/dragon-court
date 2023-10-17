import Image from "next/image";
import { ReactNode } from "react";
import {useBuildingContext} from "@/lib/context/building";
import Exit from "../../../../public/images/game/exit.png";

type Props = {
  title: string;
  children: ReactNode;
};

export default function ShopTopBar({title, children}: Props) {
  const { exitBuilding } = useBuildingContext();
            
  return (
    <>
    <div className="flex flex-row mb-2 justify-between">
      <span className="font-extrabold">{title}</span>
      <Image
        alt="Leave"
        src={Exit}
        onClick={() => exitBuilding()}
      />
    </div>
    <div className="flex flex-row mb-2">
      {/* optional */}
      {children}
    </div>
    </>
  );
}