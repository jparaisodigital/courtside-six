import "./LandingPage.css";

function LandingPage() {
  return (
    <main className="landing-page">
      {/* NAVIGATION */}
      <header className="landing-nav">
        <a href="/" className="landing-brand">
          <span className="brand-ball">●</span>
          <span>COURTSIDE SIX</span>
        </a>

        <nav className="landing-links">
          <a href="/" className="active">
            Home
          </a>
          <a href="/open-queue">Open Queue</a>
          <a href="#courts">Courts</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="landing-nav-actions">
          <a href="/open-queue" className="nav-demo-link">
            Staff Demo
          </a>

          <a href="/open-queue" className="nav-cta">
            Explore
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="landing-hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="hero-eyebrow">PICKLEBALL MADE EASIER</p>

          <h1>
            PLAY MORE.
            <br />
            <span>WAIT SMARTER.</span>
          </h1>

          <p className="hero-description">
            Courtside Six brings open play, court availability, and live
            updates together — so players spend less time waiting and more
            time playing.
          </p>

          <div className="hero-actions">
  <a href="/play" className="hero-primary">
    JOIN OPEN QUEUE
  </a>

  <a href="/tv" className="hero-secondary">
    VIEW LIVE COURT BOARD
  </a>
</div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* INTRO / FEATURE STRIP */}
      <section className="experience-section" id="features">
        <div className="section-intro">
          <div className="section-kicker">
            <span />
            THE COURTSIDE SIX EXPERIENCE
          </div>

          <h2>
            Everything you need
            <br />
            <span>to keep play moving.</span>
          </h2>

          <p>
            From walk-ins to live court updates, Courtside Six is designed to
            make busy pickleball venues easier to manage.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card feature-live">
            <div className="feature-number">01</div>

            <div className="feature-icon">↗</div>

            <h3>Open Queue</h3>

            <p>
              Walk in, join the queue, and let the system help determine the
              next match.
            </p>

            <div className="feature-status live">
              <span />
              LIVE DEMO
            </div>

            <a href="/open-queue" className="feature-link">
            Explore queue
            </a>
          </article>

          <article className="feature-card feature-live">
            <div className="feature-number">02</div>

            <div className="feature-icon">▣</div>

            <h3>Live Court Board</h3>

            <p>
              Give players a clear view of who's being called and which courts
              are currently active.
            </p>

            <div className="feature-status live">
              <span />
              LIVE DEMO
            </div>

            <a href="/tv" className="feature-link">
            View TV board
            </a>
          </article>

          <article className="feature-card">
            <div className="feature-number">03</div>

            <div className="feature-icon">◎</div>

            <h3>Private Groups</h3>

            <p>
              Keep barkadas, companies, and larger groups together with
              dedicated court sessions.
            </p>

            <div className="feature-status">
              COMING SOON
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-number">04</div>

            <div className="feature-icon">□</div>

            <h3>Court Booking</h3>

            <p>
              Reserve courts for future sessions with a dedicated online
              booking experience.
            </p>

            <div className="feature-status">
              COMING SOON
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-number">05</div>

            <div className="feature-icon">○</div>

            <h3>Player Profiles</h3>

            <p>
              Track player sessions, playing history, and activity over time.
            </p>

            <div className="feature-status">
              COMING SOON
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-number">06</div>

            <div className="feature-icon">★</div>

            <h3>Rankings</h3>

            <p>
              A future home for player activity, rankings, and competitive
              play.
            </p>

            <div className="feature-status">
              COMING SOON
            </div>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="how-header">
          <div>
            <div className="section-kicker light">
              <span />
              HOW IT WORKS
            </div>

            <h2>
              Less waiting.
              <br />
              <span>More playing.</span>
            </h2>
          </div>

          <p>
            A simple flow designed around the reality of busy pickleball
            venues.
          </p>
        </div>

        <div className="process-grid">
          <div className="process-step">
            <div className="process-number">01</div>
            <h3>Join the Queue</h3>
            <p>
              Players walk in and are added to the open play queue.
            </p>
          </div>

          <div className="process-connector" />

          <div className="process-step">
            <div className="process-number">02</div>
            <h3>Smart Recommendation</h3>
            <p>
              The system recommends the next group based on queue order.
            </p>
          </div>

          <div className="process-connector" />

          <div className="process-step">
            <div className="process-number">03</div>
            <h3>Staff Review</h3>
            <p>
              Staff can review, adjust, or manually override the recommendation.
            </p>
          </div>

          <div className="process-connector" />

          <div className="process-step">
            <div className="process-number">04</div>
            <h3>Play</h3>
            <p>
              Players are assigned to a court and the live board updates.
            </p>
          </div>
        </div>
      </section>

      {/* COURTS */}
      <section className="courts-section" id="courts">
        <div className="courts-copy">
          <div className="section-kicker">
            <span />
            SIX COURTS. ONE SMART SYSTEM.
          </div>

          <h2>
            Built around
            <br />
            <span>the court.</span>
          </h2>

          <p>
            A clear operational view for staff, and a simple experience for
            players.
          </p>

          <a href="/tv" className="dark-button">
          View Live Court Board
          </a>
        </div>

        <div className="court-preview">
          <div className="court-grid">
            {[1, 2, 3, 4, 5, 6].map((court) => (
              <div className="mini-court" key={court}>
                <div className="court-top">
                  <span>COURT</span>
                  <strong>0{court}</strong>
                </div>

                <div className="court-lines">
                  <div className="court-net" />
                  <div className="court-center-line" />
                </div>

                <span className="court-available">
                  AVAILABLE
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING / FUTURE */}
      <section className="future-section">
        <div className="future-card">
          <div className="future-content">
            <div className="section-kicker">
              <span />
              WHAT'S NEXT
            </div>

            <h2>
              Your next game
              <br />
              <span>starts here.</span>
            </h2>

            <p>
              Online court booking is currently being prepared for the next
              phase of Courtside Six.
            </p>

            <div className="coming-badge">
              <span>●</span>
              BOOKING COMING SOON
            </div>
          </div>

          <div className="future-decoration">
            <div className="pickleball-large">●</div>
            <div className="decoration-line line-one" />
            <div className="decoration-line line-two" />
            <div className="decoration-line line-three" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer" id="contact">
        <div className="footer-brand">
          <span className="brand-ball">●</span>
          <strong>COURTSIDE SIX</strong>
          <p>Play more. Wait smarter.</p>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/open-queue">Open Queue</a>
          <a href="/tv">Court Board</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="footer-note">
          © 2026 Courtside Six
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;