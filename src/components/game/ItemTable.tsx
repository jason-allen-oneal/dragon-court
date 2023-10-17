import { ReactNode, PropsWithChildren } from "react";
import {useBuildingContext} from "@/lib/context/building";

type LayoutProps = {
  children: ReactNode;
  showCost: boolean;
} 


export default function ItemTable({showCost, children}: LayoutProps) {
  
  return (
    <div className="table-wrp block max-h-56 overflow-y-scroll">
      <table className="w-5/6">
        <thead className="w-full">
          <tr>
            <th>Name</th>
            <th className="col-span-2">Stats</th>
            {showCost && (
            <th className="text-right">Cost</th>
            )}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}