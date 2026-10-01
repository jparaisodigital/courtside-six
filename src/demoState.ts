export type DemoPlayer = {
    id: number;
    name: string;
    type: "Solo" | "Locked Pair";
    waitTime: number;
    partnerName?: string;
  };
  
  export type DemoCourt = {
    id: number;
    status: "Available" | "In Progress" | "Calling Players";
    players: string[];
  };
  
  export type DemoState = {
    players: DemoPlayer[];
    courts: DemoCourt[];
  };
  
  export const DEMO_STATE_KEY = "courtside-six-demo-state";
  
  export const defaultDemoState: DemoState = {
    players: [
      {
        id: 1,
        name: "Juan Cruz",
        type: "Solo",
        waitTime: 8,
      },
      {
        id: 2,
        name: "Mark Santos",
        type: "Solo",
        waitTime: 6,
      },
      {
        id: 3,
        name: "Ana Reyes",
        type: "Solo",
        waitTime: 5,
      },
      {
        id: 4,
        name: "Carlo Garcia",
        type: "Solo",
        waitTime: 3,
      },
    ],
  
    courts: [
      {
        id: 1,
        status: "Available",
        players: [],
      },
      {
        id: 2,
        status: "In Progress",
        players: ["Alex", "Ben", "Chris", "Dan"],
      },
      {
        id: 3,
        status: "Available",
        players: [],
      },
      {
        id: 4,
        status: "Available",
        players: [],
      },
      {
        id: 5,
        status: "Available",
        players: [],
      },
      {
        id: 6,
        status: "Available",
        players: [],
      },
    ],
  };
  
  export const loadDemoState = (): DemoState => {
    const stored = localStorage.getItem(DEMO_STATE_KEY);
  
    if (!stored) {
      return defaultDemoState;
    }
  
    try {
      return JSON.parse(stored) as DemoState;
    } catch {
      return defaultDemoState;
    }
  };
  
  export const saveDemoState = (state: DemoState) => {
    localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(state));
  };