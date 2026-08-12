import { ReactNode } from "react";
import GameSessionHydration from "@/features/game-session/provider/GameSessionHydration";

export default function GameLayout({ children }: { children: ReactNode }) {
  return <GameSessionHydration>{children}</GameSessionHydration>;
}
