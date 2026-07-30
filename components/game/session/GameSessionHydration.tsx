"use client";

import { GAME_SESSION_STORAGE_KEY, useGameSessionStore } from "@/lib/stores/game-session-store";
import { ReactNode, useEffect } from "react";

export default function GameSessionHydration({
  children,
}: {
  children: ReactNode;
}) {
  const hydrate = useGameSessionStore((state) => state.hydrate);
  const syncFromStorage = useGameSessionStore((state) => state.syncFromStorage);

  useEffect(() => {
    hydrate();
    function handleStorage(event: StorageEvent) {
      if (event.key === GAME_SESSION_STORAGE_KEY) {
        syncFromStorage(event.newValue)
      }
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage)
    }
  }, [hydrate, syncFromStorage])

  return children;
}
