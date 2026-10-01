import { useEffect, useState } from "react";
import "./TVBoard.css";
import {
  DEMO_STATE_KEY,
  loadDemoState,
  type DemoCourt,
} from "./demoState";

function TVBoard() {
  const [courts, setCourts] = useState<DemoCourt[]>(loadDemoState().courts);

  useEffect(() => {
    // Listen for changes from the Staff tab
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== DEMO_STATE_KEY || !event.newValue) {
        return;
      }

      try {
        const state = JSON.parse(event.newValue);

        if (state.courts) {
          setCourts(state.courts);
        }
      } catch {
        // Ignore malformed data
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also poll a bit in case storage event is missed (same-origin edge cases)
    const interval = setInterval(() => {
      const latest = loadDemoState();
      setCourts(latest.courts);
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Find the court that is currently "Calling Players"
  const callingCourt = courts.find(
    (court) => court.status === "Calling Players"
  );

  return (
    <main className="tv-board">
      <header className="tv-header">
        <div>
          <p className="tv-eyebrow">COURTSIDE SIX</p>
          <h1>LIVE COURT BOARD</h1>
        </div>

        <div className="tv-live-indicator">
          <span className="tv-live-dot" />
          LIVE
        </div>
      </header>

      {callingCourt && (
        <section className="tv-calling-banner">
          <p>NOW CALLING</p>

          <h2>COURT {callingCourt.id}</h2>

          <div className="tv-calling-players">
            {callingCourt.players.map((playerName) => (
              <span key={playerName}>{playerName}</span>
            ))}
          </div>

          <strong>PLEASE PROCEED TO COURT {callingCourt.id}</strong>
        </section>
      )}

      <section className="tv-courts-grid">
        {courts.map((court) => (
          <article
            key={court.id}
            className={`tv-court-card tv-status-${court.status
              .toLowerCase()
              .replaceAll(" ", "-")}`}
          >
            <div className="tv-court-header">
              <span>COURT {court.id}</span>
              <strong>{court.status}</strong>
            </div>

            {court.players.length > 0 ? (
              <div className="tv-player-list">
                {court.players.map((playerName) => (
                  <span key={playerName}>{playerName}</span>
                ))}
              </div>
            ) : (
              <p className="tv-empty-court">Ready for next match</p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

export default TVBoard;