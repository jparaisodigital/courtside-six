export function Header() {
    return (
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#101511]">
        <div className="page-shell flex h-[82px] items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-3"
            aria-label="Go to homepage"
          >
            <span className="grid size-9 place-items-center border border-white/30 text-[11px] font-bold tracking-[0.08em] text-white">
              C6
            </span>
  
            <span className="display-font text-[15px] font-extrabold tracking-[0.13em] text-white">
              COURTSIDE SIX
            </span>
          </button>
  
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Main navigation"
          >
            <button
              type="button"
              className="text-xs font-semibold text-white/60 transition-colors hover:text-white"
            >
              Open Queue
            </button>
  
            <button
              type="button"
              className="text-xs font-semibold text-white/60 transition-colors hover:text-white"
            >
              Courts
            </button>
  
            <button
              type="button"
              className="text-xs font-semibold text-white/60 transition-colors hover:text-white"
            >
              Experience
            </button>
  
            <button
              type="button"
              className="text-xs font-semibold text-white/60 transition-colors hover:text-white"
            >
              Contact
            </button>
          </nav>
  
          <button
            type="button"
            className="hidden border border-white/25 px-5 py-3 text-xs font-bold text-white transition-colors hover:border-[#c8f25d] hover:text-[#c8f25d] lg:block"
          >
            Request a demo
          </button>
  
          <button
            type="button"
            className="grid size-11 place-items-center border border-white/25 text-white lg:hidden"
            aria-label="Open navigation"
          >
            <span className="text-xl leading-none">≡</span>
          </button>
        </div>
      </header>
    );
  }
  