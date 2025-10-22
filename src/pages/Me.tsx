import Rocket from "@/components/shared/Rocket";
import PhysicsProfileIcon from "@/components/shared/PhysicsProfileIcon";
import { Github, Mail } from "lucide-react";

const Me = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 pb-24 md:p-12 md:pb-32 md:pl-60">
      <Rocket />
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Left side - Intro */}
        <div className="bio-section flex flex-col items-start justify-start gap-6">
          <div className="flex items-start gap-4">
            {/* Physics-enabled profile picture */}
            <PhysicsProfileIcon />
            <div className="flex flex-col justify-between gap-4 py-1">
              <h1 className="text-5xl font-serif text-light-text dark:text-dark-text">
                dan danaher
              </h1>
              <p className="text-lg text-light-text-muted dark:text-dark-text-muted">
                aerospace engineering student. 21, based in London.
              </p>
            </div>
          </div>
          <div className="social-links flex flex-wrap gap-3 pl-36">
            <a
              href="https://github.com/dandanaher"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-light-text/20 bg-light-bg/50 text-light-text transition hover:border-light-text hover:bg-light-bg dark:border-dark-text/20 dark:bg-dark-bg/50 dark:text-dark-text dark:hover:border-dark-text dark:hover:bg-dark-bg"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/devDanaher"
              aria-label="X"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-light-text/20 bg-light-bg/50 text-light-text transition hover:border-light-text hover:bg-light-bg dark:border-dark-text/20 dark:bg-dark-bg/50 dark:text-dark-text dark:hover:border-dark-text dark:hover:bg-dark-bg"
            >
              <span className="text-[20px] font-black leading-none" aria-hidden>𝕏</span>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=dandanaher.dev%40gmail.com"
              aria-label="Email"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-light-text/20 bg-light-bg/50 text-light-text transition hover:border-light-text hover:bg-light-bg dark:border-dark-text/20 dark:bg-dark-bg/50 dark:text-dark-text dark:hover:border-dark-text dark:hover:bg-dark-bg"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;
