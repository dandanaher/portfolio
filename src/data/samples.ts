export type BlogEntry = {
  title: string;
  text: string;
  meta: string;
};

export const blogEntries: BlogEntry[] = [
  {
    title: "Design systems, simplified",
    text: "Capturing a flexible pattern language for rapid portfolio experiments.",
    meta: "Updated this week",
  },
  {
    title: "Measuring community impact",
    text: "Packaging volunteer analytics into easy-to-share snapshots.",
    meta: "Updated this month",
  },
  {
    title: "Creative tooling in Bun + Vite",
    text: "Lean build pipelines for playground prototypes and design audits.",
    meta: "Updated this summer",
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
    title: "Lumon Macrodata Refinement",
    description: "A volunteer management and analytics platform showcasing community impact metrics and engagement tracking.",
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
  details: [
    "Direct email, social handles, and quick-call links land in this column.",
    "Availability windows refresh weekly to stay accurate.",
  ],
  followUp: [
    "Drop a short brief or use the embedded form soon.",
    "Calendly slots and backlog updates will rotate in here.",
  ],
};
