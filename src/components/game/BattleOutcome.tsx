import { useEncounterContext } from "@/lib/context/encounter";
import {GAME_WIDTH, GAME_HEIGHT} from "@/lib/constants";

export default function BattleOutcome() {
  const { outcome, setInOutcome } = useEncounterContext();
  
  return (
    <div className={`w-[${GAME_WIDTH}px] h-[${GAME_HEIGHT}px] m-auto flex flex-col`}>
      <div className={`w-[${GAME_WIDTH}px] h-[${GAME_HEIGHT}px] m-auto flex flex-col`}>
        {outcome}
      </div>
      <button className="btn btn-primary" onClick={() => setInOutcome(false)}>
        Continue
      </button>
    </div>
  );
}