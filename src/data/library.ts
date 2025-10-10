export type LibraryBook = {
  id: string;
  title: string;
  author: string;
  year: number;
  coverImage?: string;
  coverColor: string;
  spineColor: string;
  accentColor: string;
  status: "current" | "completed";
  description: string;
};

export const libraryBooks: LibraryBook[] = [
  {
    id: "foundation",
    title: "Foundation",
    author: "Isaac Asimov",
    year: 1951,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg",
    coverColor: "#0f172a",
    spineColor: "#1e293b",
    accentColor: "#38bdf8",
    status: "current",
    description:
      "Classic sci-fi saga kicking off the Foundation series. Following Hari Seldon's psychohistory plan in real time.",
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
    coverColor: "#78350f",
    spineColor: "#451a03",
    accentColor: "#fde68a",
    status: "completed",
    description:
      "Epic space opera set on Arrakis. Sandworms, spice, and political intrigue in the desert.",
  },
  {
    id: "hyperion",
    title: "Hyperion",
    author: "Dan Simmons",
    year: 1989,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553283686-L.jpg",
    coverColor: "#4c1d95",
    spineColor: "#312e81",
    accentColor: "#a855f7",
    status: "completed",
    description:
      "Pilgrims journey toward the Shrike. Canterbury Tales meets far-future gothic sci-fi.",
  },
  {
    id: "neuromancer",
    title: "Neuromancer",
    author: "William Gibson",
    year: 1984,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780441569595-L.jpg",
    coverColor: "#022c22",
    spineColor: "#064e3b",
    accentColor: "#34d399",
    status: "completed",
    description:
      "Cyberpunk classic. Console cowboys, Sprawl vibes, and neon-lit cyberspace heists.",
  },
  {
    id: "snow-crash",
    title: "Snow Crash",
    author: "Neal Stephenson",
    year: 1992,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553380958-L.jpg",
    coverColor: "#0b1120",
    spineColor: "#1e293b",
    accentColor: "#38bdf8",
    status: "completed",
    description:
      "Satirical cyberpunk adventure through virtual reality, Sumerian myth, and corporate micro-nations.",
  },
  {
    id: "ancillary-justice",
    title: "Ancillary Justice",
    author: "Ann Leckie",
    year: 2013,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316246620-L.jpg",
    coverColor: "#1f2937",
    spineColor: "#111827",
    accentColor: "#60a5fa",
    status: "completed",
    description:
      "Starship AI in a single human body seeks justice within an imperial civilization of layered identities.",
  },
  {
    id: "left-hand-of-darkness",
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    year: 1969,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780441478125-L.jpg",
    coverColor: "#0f172a",
    spineColor: "#1d3557",
    accentColor: "#a5f3fc",
    status: "completed",
    description:
      "Diplomatic mission to a winter world challenges assumptions about gender, politics, and trust.",
  },
  {
    id: "player-of-games",
    title: "The Player of Games",
    author: "Iain M. Banks",
    year: 1988,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316005401-L.jpg",
    coverColor: "#1e3a8a",
    spineColor: "#1d4ed8",
    accentColor: "#93c5fd",
    status: "completed",
    description:
      "Culture operative enters a galactic empire where an intricate board game decides political destiny.",
  },
  {
    id: "perdido-station",
    title: "Perdido Street Station",
    author: "China Miéville",
    year: 2000,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780345459404-L.jpg",
    coverColor: "#3f2a20",
    spineColor: "#2d1b0f",
    accentColor: "#facc15",
    status: "completed",
    description:
      "Weird steampunk cityscape of New Crobuzon, rebellious science, and reality-bending creatures.",
  },
  {
    id: "red-mars",
    title: "Red Mars",
    author: "Kim Stanley Robinson",
    year: 1992,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553560732-L.jpg",
    coverColor: "#7f1d1d",
    spineColor: "#991b1b",
    accentColor: "#f87171",
    status: "completed",
    description:
      "First hundred settlers terraform Mars, negotiating science, politics, and competing visions for a new world.",
  },
  {
    id: "contact",
    title: "Contact",
    author: "Carl Sagan",
    year: 1985,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780671433684-L.jpg",
    coverColor: "#0b132b",
    spineColor: "#1c2541",
    accentColor: "#5bc0be",
    status: "completed",
    description:
      "SETI scientist deciphers a message from Vega, uncovering an international collaboration to meet the cosmos.",
  },
  {
    id: "foundation-and-empire",
    title: "Foundation and Empire",
    author: "Isaac Asimov",
    year: 1952,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553293371-L.jpg",
    coverColor: "#1f2937",
    spineColor: "#111827",
    accentColor: "#f59e0b",
    status: "completed",
    description:
      "The Foundation faces Seldon's predicted crises—and the unpredictable rise of the Mule.",
  },
  {
    id: "the-dispossessed",
    title: "The Dispossessed",
    author: "Ursula K. Le Guin",
    year: 1974,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780060512750-L.jpg",
    coverColor: "#0f172a",
    spineColor: "#1e40af",
    accentColor: "#93c5fd",
    status: "completed",
    description:
      "Physicist leaves an anarchist moon for a capitalist twin world, exploring utopia, revolution, and belonging.",
  },
  {
    id: "the-expanse",
    title: "Leviathan Wakes",
    author: "James S. A. Corey",
    year: 2011,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316129084-L.jpg",
    coverColor: "#111827",
    spineColor: "#1f2937",
    accentColor: "#38bdf8",
    status: "completed",
    description:
      "Noir detective story meets space opera as a missing person case ignites interplanetary tensions.",
  },
  {
    id: "blindsight",
    title: "Blindsight",
    author: "Peter Watts",
    year: 2006,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780765315721-L.jpg",
    coverColor: "#1a202c",
    spineColor: "#2d3748",
    accentColor: "#9f7aea",
    status: "completed",
    description:
      "First-contact mission with a truly alien intelligence interrogates the nature of consciousness and survival.",
  },
];
