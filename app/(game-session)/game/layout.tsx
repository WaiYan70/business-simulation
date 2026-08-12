import { ReactNode } from "react";
import GameSessionHydration from "@/components/game/session/GameSessionHydration";

export default function GameLayout({ children }: { children: ReactNode }) {
  return <GameSessionHydration>{children}</GameSessionHydration>;
}
