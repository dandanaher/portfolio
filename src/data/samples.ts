export type BlogEntry = {
  title: string;
  text: string;
  meta: string;
};

export const profileDetails = {
  summary: "aerospace engineering student. 21 years old, based in London. ",
};

export const blogEntries: BlogEntry[] = [
  {
    title: "Hello World",
    text: "First post on this site. Not sure what to write yet but more to come :)",
    meta: "10/10/2025",
  },

];

export type PhotoEntry = {
  caption: string;
};

export const photoEntries: PhotoEntry[] = [
  { caption: "Chequamegon sunrise" },
  { caption: "Studio lighting notes" },
  { caption: "Analog moodboard" },
  { caption: "Trail reflections" },
];

export type ProjectEntry = {
  title: string;
  description: string;
  stack: string[];
  link: string;
  meta: string;
};

export const projectEntries: ProjectEntry[] = [
  {
    title: "Macrodata Refinement",
    description: "If you liked Severance, you'll enjoy this little MDR simulator I built for fun. Best enjoyed in fullscreen, on desktop.",
    stack: ["React", "TypeScript", "GitHub Pages"],
    link: "https://lumon-volunteering.github.io/macrodatarefinement/",
    meta: "Live Project",
  },
];

export const projectNotes = {
  descriptions: [
    "Project roadmaps and briefs will collect here shortly.",
    "Each card will outline intent, stack, and live links.",
  ],
  visuals: [
    "Snapshot galleries and prototypes will land on this side.",
    "Drop newest experiments here with quick captions.",
  ],
};

export const academicNotes = {
  highlights: [
    "Coursework summaries and publications will be organized chronologically.",
    "Lecture slides and talks will have download links and context.",
  ],
  extras: [
    "Studio critiques, juries, and peer collaborations will surface here.",
    "Expect flexible filters for institutions and focus areas.",
  ],
};

export const contactNotes = {
  details: [],
  followUp: [],
};
