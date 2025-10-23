import type { ReactNode } from "react";

import faviconUrl from "@/assets/branding/favicon.png";
import profileFaceUrl from "@/assets/images/face.jpg";
import { profileDetails } from "@/data/samples";
import { Github, Mail } from "lucide-react";

const InfoCard = () => {
  const { summary } = profileDetails;

  return (
    <div className="flex w-full justify-center px-6 py-16">
      <div className="flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-16">
        <div className="group relative h-72 w-72 flex-shrink-0 [perspective:1600px]">
          <div className="relative h-full w-full rounded-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-100 shadow-xl [backface-visibility:hidden]">
              <img
                src={faviconUrl}
                alt="Dan Danaher profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-200 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <img
                src={profileFaceUrl}
                alt="Dan Danaher alternate portrait"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-2xl flex-col items-center gap-6 text-center md:items-start md:text-left">
          <p className="text-4xl font-serif text-light-text dark:text-dark-text">Dan Danaher</p>
          <p className="text-base font-serif text-light-text dark:text-dark-text">{summary}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <IconLink
              href="https://mail.google.com/mail/?view=cm&fs=1&to=dandanaher.dev%40gmail.com"
              label="Email Dan"
            >
              <Mail className="h-5 w-5" />
            </IconLink>
            <IconLink href="https://x.com/devDanaher" label="Dan on X">
              <XGlyph className="text-[20px]" />
            </IconLink>
            <IconLink href="https://github.com/dandanaher" label="Dan on GitHub">
              <Github className="h-5 w-5" />
            </IconLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const IconLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noreferrer" : undefined}
    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/20 text-light-text shadow-lg shadow-slate-900/10 backdrop-blur transition hover:-translate-y-0.5 hover:border-light-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-text dark:border-gray-800/25 dark:bg-gray-800/20 dark:text-dark-text dark:hover:border-dark-text dark:focus-visible:outline-dark-text"
  >
    {children}
  </a>
);

const XGlyph = ({ className }: { className?: string }) => (
  <span
    className={["font-black leading-none", className].filter(Boolean).join(" ")}
    aria-hidden
  >
    𝕏
  </span>
);

export default InfoCard;
