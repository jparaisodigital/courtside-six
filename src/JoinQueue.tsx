import { useState } from "react";
import {
  DEMO_STATE_KEY,
  loadDemoState,
  saveDemoState,
  type DemoPlayer,
} from "./demoState";
import "./JoinQueue.css";

type EntryType = "Solo" | "Locked Pair";

function JoinQueue() {
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [entryType, setEntryType] = useState<EntryType>("Solo");
  const [joined, setJoined] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanPartner = partnerName.trim();

    if (!cleanName) return;

    if (entryType === "Locked Pair" && !cleanPartner) {
      return;
    }

    const currentState = loadDemoState();

    const newPlayer: DemoPlayer = {
      id: Date.now(),
      name: cleanName,
      type: entryType,
      waitTime: 0,
      ...(entryType === "Locked Pair"
        ? { partnerName: cleanPartner }
        : {}),
    };

    const updatedPlayers = [...currentState.players, newPlayer];

    saveDemoState({
      ...currentState,
      players: updatedPlayers,
    });

    setQueuePosition(updatedPlayers.length);
    setJoined(true);
  };

  if (joined) {
    return (
      <main className="join-page">
        <div className="join-shell">
          <header className="join-header">
            <a href="/" className="join-brand">
              COURTSIDE SIX
            </a>

            <span className="join-header-label">OPEN QUEUE</span>
          </header>

          <section className="queue-success">
            <div className="success-kicker">YOU'RE IN THE QUEUE</div>

            <h1>You're on the list.</h1>

            <p className="success-copy">
              We've added you to the Open Queue. Staff will call the next
              eligible players when a court becomes available.
            </p>

            <div className="queue-position-card">
              <span>Your queue position</span>
              <strong>#{queuePosition}</strong>
            </div>

            <div className="success-actions">
              <a href="/tv" className="join-primary-button">
                VIEW LIVE BOARD
              </a>

              <a href="/" className="join-secondary-button">
                BACK TO COURTSIDE SIX
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="join-page">
      <div className="join-shell">
        <header className="join-header">
          <a href="/" className="join-brand">
            COURTSIDE SIX
          </a>

          <span className="join-header-label">OPEN QUEUE</span>
        </header>

        <section className="join-hero">
          <div className="join-copy">
            <p className="join-eyebrow">PLAY WITHOUT THE WAIT</p>

            <h1>
              Join the
              <br />
              Open Queue.
            </h1>

            <p>
              Walk in, join the queue, and let the court flow take care of the
              next match.
            </p>

            <div className="join-note">
              <span className="join-note-dot" />
              Staff manages final court assignments.
            </div>
          </div>

          <form className="join-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <label htmlFor="player-name">Your name</label>

              <input
                id="player-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-section">
              <span className="form-label">Playing as</span>

              <div className="entry-options">
                <button
                  type="button"
                  className={`entry-option ${
                    entryType === "Solo" ? "active" : ""
                  }`}
                  onClick={() => setEntryType("Solo")}
                >
                  <strong>Solo</strong>
                  <span>Match me with other players.</span>
                </button>

                <button
                  type="button"
                  className={`entry-option ${
                    entryType === "Locked Pair" ? "active" : ""
                  }`}
                  onClick={() => setEntryType("Locked Pair")}
                >
                  <strong>Locked Pair</strong>
                  <span>Keep me together with my partner.</span>
                </button>
              </div>
            </div>

            {entryType === "Locked Pair" && (
              <div className="form-section">
                <label htmlFor="partner-name">Partner name</label>

                <input
                  id="partner-name"
                  type="text"
                  placeholder="Enter your partner's name"
                  value={partnerName}
                  onChange={(event) => setPartnerName(event.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            )}

            <button type="submit" className="join-submit">
              JOIN OPEN QUEUE
            </button>

            <p className="join-form-note">
              By joining, you'll enter the venue's active Open Queue. Final
              match and court assignment is managed by staff.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

export default JoinQueue;