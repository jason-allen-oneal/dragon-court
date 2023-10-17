import { PropsWithChildren } from "react";

export default function ShopMainPanel({children}: PropsWithChildren) {
  return (
    <div className="col-span-9">
      {children}
    </div>
  );
}