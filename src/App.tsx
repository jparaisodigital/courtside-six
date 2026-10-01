import { useEffect, useState } from "react";
import "./App.css";
import TVBoard from "./TVBoard";
import JoinQueue from "./JoinQueue";
import LandingPage from "./LandingPage";
import {
  DEMO_STATE_KEY,
  loadDemoState,
  saveDemoState,
  type DemoCourt,
  type DemoPlayer,
  type DemoState,
} from "./demoState";

function App() {
  // ========== 1. ALL HOOKS FIRST (never after early returns) ==========
  const [players, setPlayers] = useState<DemoPlayer[]>(
    () => loadDemoState().players
  );

  const [courts, setCourts] = useState<DemoCourt[]>(
    () => loadDemoState().courts
  );

  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerPartnerName, setNewPlayerPartnerName] = useState("");
  const [newPlayerType, setNewPlayerType] = useState<"Solo" | "Locked Pair">(
    "Solo"
  );
  const [selectedPlayers, setSelectedPlayers] = useState<DemoPlayer[]>([]);

  // Auto-save whenever players or courts change
  useEffect(() => {
    saveDemoState({
      players,
      courts,
    });
  }, [players, courts]);

  // Listen for changes from other tabs (TV / JoinQueue)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== DEMO_STATE_KEY || !event.newValue) {
        return;
      }

      try {
        const nextState = JSON.parse(event.newValue) as DemoState;

        if (nextState.players) {
          setPlayers(nextState.players);
        }
        if (nextState.courts) {
          setCourts(nextState.courts);
        }
      } catch {
        // Ignore malformed data
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ========== 2. FUNCTIONS ==========
  const getNextMatchPlayers = (queue: DemoPlayer[]) => {
    const selected: DemoPlayer[] = [];
    let playerCount = 0;

    for (const queueEntry of queue) {
      const entrySize = queueEntry.type === "Locked Pair" ? 2 : 1;

      if (playerCount + entrySize > 4) {
        break;
      }

      selected.push(queueEntry);
      playerCount += entrySize;

      if (playerCount === 4) {
        break;
      }
    }

    return selected;
  };

  const recommendMatch = () => {
    const recommended = getNextMatchPlayers(players);

    const totalPlayers = recommended.reduce(
      (total, player) =>
        total + (player.type === "Locked Pair" ? 2 : 1),
      0
    );

    if (totalPlayers !== 4) {
      return;
    }

    setSelectedPlayers(recommended);
    setShowRecommendation(true);
  };

  const addPlayer = () => {
    const name = newPlayerName.trim();

    if (!name) {
      return;
    }

    const newPlayer: DemoPlayer = {
      id: Date.now(),
      name,
      type: newPlayerType,
      waitTime: 0,
      ...(newPlayerType === "Locked Pair" && newPlayerPartnerName.trim()
        ? {
            partnerName: newPlayerPartnerName.trim(),
          }
        : {}),
    };

    setPlayers((current) => [...current, newPlayer]);

    setNewPlayerName("");
    setNewPlayerPartnerName("");
    setNewPlayerType("Solo");
    setShowAddPlayer(false);
  };

  const assignMatch = () => {
    // Expand Locked Pairs into individual names
    const assignedNames = selectedPlayers.flatMap((player) =>
      player.type === "Locked Pair" && player.partnerName
        ? [player.name, player.partnerName]
        : [player.name]
    );

    // Remove the exact selected queue units
    const selectedIds = new Set(selectedPlayers.map((p) => p.id));
    setPlayers((current) => current.filter((p) => !selectedIds.has(p.id)));

    setCourts((current) =>
      current.map((court) =>
        court.id === 3
          ? {
              ...court,
              status: "Calling Players",
              players: assignedNames,
            }
          : court
      )
    );

    setShowRecommendation(false);
    setSelectedPlayers([]);
  };

  // ========== 3. ROUTES (after all hooks) ==========
  if (window.location.pathname === "/") {
    return <LandingPage />;
  }

  if (window.location.pathname === "/tv") {
    return <TVBoard />;
  }

  if (window.location.pathname === "/play") {
    return <JoinQueue />;
  }

  // ========== 4. STAFF DASHBOARD ==========
  return (
    <main className="app">
      <header className="topbar">
        <div>
          <div className="brand">COURTSIDE SIX</div>
          <div className="subtitle">Open Queue Management</div>
        </div>
        <div className="live-status">
          <span className="live-dot"></span>
          LIVE DEMO
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">STAFF DASHBOARD</p>
          <h1>Open Queue</h1>
          <p className="hero-copy">
            Manage walk-in players, recommend the next match, and assign
            players to an available court.
          </p>
        </div>
        <div className="queue-summary">
          <div>
            <strong>{players.length}</strong>
            <span>Waiting</span>
          </div>
          <div>
            <strong>6</strong>
            <span>Courts</span>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel queue-panel">
          <div className="panel-header">
            <div>
              <p className="panel-eyebrow">WAITING QUEUE</p>
              <h2>Players</h2>
            </div>
            <div className="queue-header-actions">
              <span className="count-badge">{players.length}</span>
              <button
                className="add-player-button"
                onClick={() => setShowAddPlayer(true)}
              >
                + Add Walk-in
              </button>
            </div>
          </div>

          <div className="player-list">
            {players.length === 0 ? (
              <div className="empty-state">
                All waiting players have been assigned.
              </div>
            ) : (
              players.map((player, index) => (
                <div className="player-row" key={player.id}>
                  <div className="player-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="player-info">
                    <strong>
                      {player.name}
                      {player.type === "Locked Pair" &&
                        player.partnerName && (
                          <> + {player.partnerName}</>
                        )}
                    </strong>
                    <span>
                      {player.type} · Waiting {player.waitTime} min
                    </span>
                  </div>
                  <div className="queue-position">#{index + 1}</div>
                </div>
              ))
            )}
          </div>

          <button
            className="primary-button"
            onClick={recommendMatch}
            disabled={players.length < 4}
          >
            Recommend Next Match
          </button>
        </div>

        <div className="panel courts-panel">
          <div className="panel-header">
            <div>
              <p className="panel-eyebrow">VENUE STATUS</p>
              <h2>Courts</h2>
            </div>
          </div>
          <div className="court-grid">
            {courts.map((court) => (
              <div className="court-card" key={court.id}>
                <div className="court-top">
                  <span className="court-number">COURT {court.id}</span>
                  <span
                    className={`court-status ${court.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {court.status}
                  </span>
                </div>
                {court.players.length > 0 ? (
                  <div className="court-players">
                    {court.players.map((player) => (
                      <span key={player}>{player}</span>
                    ))}
                  </div>
                ) : (
                  <div className="court-empty">Ready for next match</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showRecommendation && (
        <div className="modal-backdrop">
          <div className="recommendation-modal">
            <p className="panel-eyebrow">MATCH RECOMMENDATION</p>
            <h2>Next Match</h2>
            <p className="recommendation-copy">
              The system recommends the following players based on queue
              order and court availability.
            </p>

            <div className="recommended-players">
              {selectedPlayers.map((player) => (
                <div key={player.id} className="recommended-player">
                  <span>
                    {player.name}
                    {player.type === "Locked Pair" &&
                      player.partnerName && (
                        <> + {player.partnerName}</>
                      )}
                  </span>
                  <small>
                    {player.type === "Locked Pair"
                      ? "Locked Pair · 2 players"
                      : "Solo · 1 player"}
                  </small>
                </div>
              ))}
            </div>

            <div className="recommendation-count">
              {selectedPlayers.reduce(
                (total, player) =>
                  total + (player.type === "Locked Pair" ? 2 : 1),
                0
              )}{" "}
              PLAYERS
            </div>

            <div className="recommendation-court">
              <span>ASSIGN TO</span>
              <strong>COURT 3</strong>
            </div>

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setShowRecommendation(false)}
              >
                Review Later
              </button>
              <button className="primary-button" onClick={assignMatch}>
                Assign to Court 3
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddPlayer && (
        <div className="modal-backdrop">
          <div className="recommendation-modal">
            <p className="panel-eyebrow">WALK-IN REGISTRATION</p>
            <h2>Add Player</h2>
            <p className="recommendation-copy">
              Register a walk-in player and add them to the waiting queue.
            </p>

            <div className="form-group">
              <label>PLAYER NAME</label>
              <input
                type="text"
                value={newPlayerName}
                onChange={(event) => setNewPlayerName(event.target.value)}
                placeholder="Enter player name"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>ENTRY TYPE</label>
              <div className="entry-type-grid">
                <button
                  className={`entry-type-button ${
                    newPlayerType === "Solo" ? "selected" : ""
                  }`}
                  onClick={() => setNewPlayerType("Solo")}
                >
                  <strong>Solo</strong>
                  <span>Individual player</span>
                </button>
                <button
                  className={`entry-type-button ${
                    newPlayerType === "Locked Pair" ? "selected" : ""
                  }`}
                  onClick={() => setNewPlayerType("Locked Pair")}
                >
                  <strong>Locked Pair</strong>
                  <span>Players stay together</span>
                </button>
              </div>
            </div>

            {newPlayerType === "Locked Pair" && (
              <div className="form-group">
                <label>PARTNER NAME</label>
                <input
                  type="text"
                  value={newPlayerPartnerName}
                  onChange={(event) =>
                    setNewPlayerPartnerName(event.target.value)
                  }
                  placeholder="Enter partner name"
                />
              </div>
            )}

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => {
                  setShowAddPlayer(false);
                  setNewPlayerName("");
                  setNewPlayerPartnerName("");
                  setNewPlayerType("Solo");
                }}
              >
                Cancel
              </button>
              <button
                className="primary-button"
                onClick={addPlayer}
                disabled={
                  !newPlayerName.trim() ||
                  (newPlayerType === "Locked Pair" &&
                    !newPlayerPartnerName.trim())
                }
              >
                Add to Queue
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;