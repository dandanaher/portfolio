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
];
