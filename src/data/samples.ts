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
  {
    title: "On Building Things",
    text: `There's something deeply satisfying about building things from scratch. Not just the final product, but the entire journey—the late nights debugging, the moment when everything finally clicks, the small victories along the way.

I've been thinking a lot lately about what it means to create something meaningful. In aerospace engineering, we're constantly balancing theory with practice, equations with real-world constraints. Every design decision is a trade-off: weight versus strength, complexity versus reliability, innovation versus proven methods.

But here's what I've learned: the best projects aren't the ones that look perfect on paper. They're the ones that solve real problems, the ones that you're so passionate about that you can't stop thinking about them at 2 AM. They're the ones where you learn something new every single day.

When I started building this portfolio, I wanted it to be more than just a showcase of work. I wanted it to reflect how I think, how I approach problems, and what I value in design. Clean interfaces, thoughtful interactions, and details that might go unnoticed but make all the difference.

The process has been humbling. Every time I think I've figured something out, I discover three new things I don't know. And that's exactly what makes it exciting. Growth doesn't happen in comfort zones—it happens when you're pushing against your limits, trying to build something just beyond your current abilities.

I think about the spacecraft and aircraft I study in my coursework. Every single component, every line of code, every structural element has been thought through by engineers who cared deeply about their work. They didn't just calculate forces and stresses; they imagined what could go wrong, what could be better, how to push the boundaries of what's possible.

That's the spirit I try to bring to everything I build, whether it's a complex engineering system or a simple web interface. Care about the details. Think about the user. Never stop learning. And remember that failure isn't the opposite of success—it's part of the process.

So here's to building things: the messy, challenging, rewarding process of turning ideas into reality. To the projects that don't work out and teach us valuable lessons. To the ones that exceed our expectations and remind us why we started in the first place.

Keep building. Keep learning. Keep pushing forward.`,
    meta: "15/10/2025",
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
