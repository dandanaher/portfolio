import berserkDeluxeVolume2Cover from "@/assets/images/Berserk-Deluxe-Volume-2-Hardback.webp";

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
  coverScale?: number;
  rating?: number; // 0.5-5 stars (supports half stars)
  review?: string; // Personal review/thoughts
};

export const libraryBooks: LibraryBook[] = [
  {
    id: "foundation",
    title: "Foundation",
    author: "Isaac Asimov",
    year: 1951,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780008117498-L.jpg",
    coverColor: "#0A1E3F",
    spineColor: "#102A52",
    accentColor: "#F1C40F",
    status: "current",
    description:
      "Classic sci-fi saga kicking off the Foundation series while tracking Hari Seldon's psychohistory in motion.",
  },
  {
    id: "red-mars",
    title: "Red Mars",
    author: "Kim Stanley Robinson",
    year: 1992,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553560732-L.jpg",
    coverColor: "#7F1D1D",
    spineColor: "#64121D",
    accentColor: "#F87171",
    status: "completed",
    description:
      "First settlers battle politics, science, and a harsh planet as the Martian terraforming era begins.",
  },
  {
    id: "green-mars",
    title: "Green Mars",
    author: "Kim Stanley Robinson",
    year: 1993,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553572391-L.jpg",
    coverColor: "#14532D",
    spineColor: "#0F3F21",
    accentColor: "#6EE7B7",
    status: "completed",
    description:
      "Decades of transformation ignite radical movements and competing visions for Martian independence.",
  },
  {
    id: "blue-mars",
    title: "Blue Mars",
    author: "Kim Stanley Robinson",
    year: 1996,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553573350-L.jpg",
    coverColor: "#1D4ED8",
    spineColor: "#1E3A8A",
    accentColor: "#93C5FD",
    status: "completed",
    description:
      "The first Martian generation confronts longevity, colonization, and autonomy for a reshaped world.",
  },
  {
    id: "limitless",
    title: "Limitless",
    author: "Tim Peake",
    year: 2020,
    coverImage: "https://images2.penguinrandomhouse.com/cover/9781529125573",
    coverColor: "#0B192F",
    spineColor: "#132540",
    accentColor: "#38BDF8",
    status: "completed",
    description:
      "Tim Peake charts childhood dreams, astronaut training, and life aboard the International Space Station.",
    rating: 4,
    review:
      "Inspiring and humbling. A rarity to get such first-hand insight into spaceflight on a human scale. This book is linked to special memories for me. Not only is it a good read, of course, but my copy is signed by Tim himself! I watched his talk with my Dad while he was promoting the book, and by fluke we ran into him in the chip shop before the event. He's an awesome, down-to-earth guy (pun intended), and he made time for my enthusiasm even though he was likely eager to get into the venue. Recommended if you're a space nerd like myself.",
  },
  {
    id: "the-three-body-problem",
    title: "The Three-Body Problem",
    author: "Cixin Liu",
    year: 2006,
    coverImage: "https://books.google.com/books/content?id=QxbFBAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    coverColor: "#1E2746",
    spineColor: "#141B2C",
    accentColor: "#8B5CF6",
    status: "completed",
    description:
      "A clandestine first-contact conspiracy born in the Cultural Revolution reshapes humanity's future.",
  },
  {
    id: "the-dark-forest",
    title: "The Dark Forest",
    author: "Cixin Liu",
    year: 2008,
    coverImage: "https://covers.openlibrary.org/b/id/10526598-L.jpg",
    coverColor: "#0F172A",
    spineColor: "#111827",
    accentColor: "#22D3EE",
    status: "completed",
    description:
      "Earth scrambles to devise deterrence strategies as the Trisolaran invasion draws ever closer.",
  },
  {
    id: "ultima",
    title: "Ultima",
    author: "Stephen Baxter",
    year: 2014,
    coverImage: "https://covers.openlibrary.org/b/id/8079769-L.jpg",
    coverColor: "#2D1B46",
    spineColor: "#1F1233",
    accentColor: "#F97316",
    status: "completed",
    description:
      "Time-twisted explorers leverage cosmic artifacts to confront universe-spanning intelligences.",
  },
  {
    id: "proxima",
    title: "Proxima",
    author: "Stephen Baxter",
    year: 2013,
    coverImage: "https://covers.openlibrary.org/b/id/8175193-L.jpg",
    coverColor: "#10243C",
    spineColor: "#0B1B2C",
    accentColor: "#4CC9F0",
    status: "completed",
    description:
      "Reluctant colonists endure an alien world and uncover a network of ancient star gates.",
  },
  {
    id: "calibans-war",
    title: "Caliban's War",
    author: "James S. A. Corey",
    year: 2012,
    coverImage: "https://covers.openlibrary.org/b/id/7314238-L.jpg",
    coverColor: "#0F2A49",
    spineColor: "#103452",
    accentColor: "#F59E0B",
    status: "completed",
    description:
      "A kidnapped child pulls the Rocinante crew into Martian politics and protomolecule warfare.",
  },
  {
    id: "leviathan-wakes",
    title: "Leviathan Wakes",
    author: "James S. A. Corey",
    year: 2011,
    coverImage: "https://covers.openlibrary.org/b/id/7314237-L.jpg",
    coverColor: "#111B2B",
    spineColor: "#1E293B",
    accentColor: "#38BDF8",
    status: "completed",
    description:
      "A noir investigation collides with a system-wide conspiracy surrounding an alien contagion.",
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
    coverColor: "#A16207",
    spineColor: "#78350F",
    accentColor: "#FACC15",
    status: "completed",
    description:
      "Paul Atreides inherits the desert world Arrakis and a destiny bound to spice and prophecy.",
  },
  {
    id: "dune-messiah",
    title: "Dune Messiah",
    author: "Frank Herbert",
    year: 1969,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780593098233-L.jpg",
    coverColor: "#7C2D12",
    spineColor: "#5F1B0B",
    accentColor: "#FDBA74",
    status: "completed",
    description:
      "Paul's empire faces political manipulation and religious extremism in the wake of his jihad.",
  },
  {
    id: "children-of-dune",
    title: "Children of Dune",
    author: "Frank Herbert",
    year: 1976,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780593098240-L.jpg",
    coverColor: "#92400E",
    spineColor: "#7C2D12",
    accentColor: "#FCD34D",
    status: "completed",
    description:
      "The next Atreides generation wrestles with prescience, revolution, and the future of Arrakis.",
  },
  {
    id: "the-iliad",
    title: "The Iliad",
    author: "Homer",
    year: -750,
    coverImage:
      "https://books.google.com/books/content?id=-CL-6T5rqHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    coverColor: "#3F3D56",
    spineColor: "#2E2C44",
    accentColor: "#F2CC8F",
    status: "completed",
    description:
      "An epic poem of the Trojan War exploring rage, honor, and the whims of the gods.",
  },
  {
    id: "the-odyssey",
    title: "The Odyssey",
    author: "Homer",
    year: -720,
    coverImage:
      "https://books.google.com/books/content?id=ufbtAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    coverColor: "#264653",
    spineColor: "#1B3A4B",
    accentColor: "#2A9D8F",
    status: "completed",
    description:
      "Odysseus battles monsters and temptation during a perilous voyage home from Troy.",
  },
  {
    id: "liftoff",
    title: "Liftoff",
    author: "Eric Berger",
    year: 2021,
    coverImage:
      "https://books.google.com/books/content?id=TDyDzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    coverColor: "#0B1F3A",
    spineColor: "#112C4F",
    accentColor: "#F97316",
    status: "completed",
    description:
      "Eric Berger chronicles SpaceX's scrappy beginnings, near-failures, and eventual launch successes.",
  },
  {
    id: "the-hitchhikers-guide-to-the-galaxy",
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    year: 1979,
    coverImage: "https://covers.openlibrary.org/b/isbn/9781529034523-L.jpg",
    coverColor: "#065F46",
    spineColor: "#064E3B",
    accentColor: "#34D399",
    status: "completed",
    description:
      "Absurdist tour of the galaxy with Arthur Dent, Ford Prefect, and a manic towel.",
  },
  {
    id: "the-restaurant-at-the-end-of-the-universe",
    title: "The Restaurant at the End of the Universe",
    author: "Douglas Adams",
    year: 1980,
    coverImage: "https://covers.openlibrary.org/b/isbn/9781529034530-L.jpg",
    coverColor: "#433878",
    spineColor: "#2E236C",
    accentColor: "#FACC15",
    status: "completed",
    description:
      "Arthur and friends witness the universe's finale while chasing questions about fate.",
  },
  {
    id: "life-the-universe-and-everything",
    title: "Life, the Universe and Everything",
    author: "Douglas Adams",
    year: 1982,
    coverImage:
      "https://cdn.waterstones.com/bookjackets/large/9781/5290/9781529034547.jpg",
    coverColor: "#0F172A",
    spineColor: "#1E293B",
    accentColor: "#F472B6",
    status: "completed",
    description:
      "A cricket-obsessed conspiracy threatens reality as the Hitchhiker crew muddles through.",
  },
  {
    id: "brave-new-world",
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780099518471-L.jpg",
    coverColor: "#1E293B",
    spineColor: "#111827",
    accentColor: "#60A5FA",
    status: "completed",
    description:
      "Biotech caste systems and engineered happiness reveal a chilling vision of social control.",
  },
  {
    id: "nineteen-eighty-four",
    title: "1984",
    author: "George Orwell",
    year: 1949,
    coverImage: "https://covers.openlibrary.org/b/isbn/9781328869333-L.jpg",
    coverColor: "#1F2937",
    spineColor: "#0F172A",
    accentColor: "#F87171",
    status: "completed",
    description:
      "Totalitarian surveillance erodes truth and identity in Orwell's dystopian classic.",
  },
  {
    id: "the-book-of-strange-new-things",
    title: "The Book of Strange New Things",
    author: "Michel Faber",
    year: 2014,
    coverImage:
      "https://books.google.com/books/publisher/content?id=oG9_AwAAQBAJ&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
    coverColor: "#2B193D",
    spineColor: "#1B1027",
    accentColor: "#F2A7C6",
    status: "completed",
    description:
      "A missionary wrestles with faith and distance while preaching to an alien congregation.",
  },
  {
    id: "dead-astronauts",
    title: "Dead Astronauts",
    author: "Jeff VanderMeer",
    year: 2019,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780374276805-L.jpg",
    coverColor: "#12212F",
    spineColor: "#0C151F",
    accentColor: "#7DD3FC",
    status: "completed",
    description:
      "Fragmented eco-fiction follows three rebels across timelines against a biotech leviathan.",
  },
  {
    id: "rendezvous-with-rama",
    title: "Rendezvous with Rama",
    author: "Arthur C. Clarke",
    year: 1973,
    coverImage:
      "https://books.google.com/books/content?id=zGZ-3fHu8N0C&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
    coverColor: "#1C1F2E",
    spineColor: "#141720",
    accentColor: "#A3E635",
    status: "completed",
    description:
      "Explorers investigate a silent cylindrical starship passing through the solar system.",
  },
  {
    id: "the-city-and-the-stars",
    title: "The City and the Stars",
    author: "Arthur C. Clarke",
    year: 1956,
    coverImage:
      "https://books.google.com/books/content?id=R7QSDnqjWRkC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
    coverColor: "#0F172A",
    spineColor: "#172554",
    accentColor: "#818CF8",
    status: "completed",
    description:
      "A lone dreamer leaves humanity's last city to rediscover forgotten stars.",
  },
  {
    id: "the-decline-and-fall-of-the-roman-empire",
    title: "The Decline and Fall of the Roman Empire",
    author: "Edward Gibbon",
    year: 1776,
    coverImage: "https://covers.openlibrary.org/b/isbn/9780140437645-L.jpg",
    coverColor: "#3E2723",
    spineColor: "#2C1815",
    accentColor: "#D4A373",
    status: "completed",
    description:
      "Edward Gibbon traces Rome's centuries-long transformation and collapse with sweeping detail.",
  },
  {
    id: "berserk-deluxe-vol-1",
    title: "Berserk: Deluxe Edition Vol. 1",
    author: "Kentaro Miura",
    year: 2019,
    coverImage: "https://covers.openlibrary.org/b/id/8746964-L.jpg",
    coverColor: "#1C1C1C",
    spineColor: "#0F0F0F",
    accentColor: "#EF4444",
    status: "completed",
    description:
      "Guts' mercenary past unfolds in brutal dark fantasy with Miura's iconic art.",
  },
  {
    id: "berserk-deluxe-vol-2",
    title: "Berserk: Deluxe Edition Vol. 2",
    author: "Kentaro Miura",
    year: 2020,
    coverImage: berserkDeluxeVolume2Cover,
    coverScale: 1,
    coverColor: "#1E1E1E",
    spineColor: "#121212",
    accentColor: "#F97316",
    status: "completed",
    description:
      "The Band of the Hawk charges toward glory as betrayals sharpen in Midland.",
  },
];
