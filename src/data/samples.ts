import mdrScreenshot1 from "@/assets/images/MDR_Screenshot1.png";
import mdrScreenshot2 from "@/assets/images/MDR_Screenshot2.png";
import mdrScreenshot3 from "@/assets/images/MDR_Screenshot3.png";
import mdrScreenshot4 from "@/assets/images/MDR_Screenshot4.png";

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
  longDescription: string;
  previewImages: string[];
};

export const projectEntries: ProjectEntry[] = [
  {
    title: "Macrodata Refinement",
    description: "If you liked Severance, you'll enjoy this little MDR simulator I built for fun. Best enjoyed in fullscreen, on desktop.",
    stack: ["HTML", "CSS", "GitHub Pages"],
    link: "https://lumon-volunteering.github.io/macrodatarefinement/",
    meta: "Live Project",
    longDescription:
      "An interactive recreation of Lumon's Macrodata Refinement terminal, focused on mood, atmosphere, and minimalistic gameplay loops inspired by the show. Built as a web experiment to explore nostalgia-rich interfaces and motion design. All hand-crafted animations using SVGs (and a few hand-drawn images in Procreate). Saves locally to the browser so you can make progress like a real refiner!",
    previewImages: [
      mdrScreenshot1,
      mdrScreenshot2,
      mdrScreenshot3,
      mdrScreenshot4,
    ],
  },
];

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
