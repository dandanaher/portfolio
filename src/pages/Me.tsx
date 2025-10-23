import { NavLink } from "react-router-dom";
import Rocket from "@/components/shared/Rocket";
import PhysicsProfileIcon from "@/components/shared/PhysicsProfileIcon";
import { Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

import meIcon from "@/assets/branding/me_icon.png";
import libraryIcon from "@/assets/branding/library_icon.png";
import projectsIcon from "@/assets/branding/projects_icon.png";
import thoughtsIcon from "@/assets/branding/thoughts_icon.png";

type NavItem = {
  path: string;
  name: string;
  icon: string;
};

const navItems: NavItem[] = [
  { path: "/me", name: "me", icon: meIcon },
  { path: "/library", name: "library", icon: libraryIcon },
  { path: "/projects", name: "projects", icon: projectsIcon },
  { path: "/thoughts", name: "thoughts", icon: thoughtsIcon },
];

const Me = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 pt-20 pb-24 md:p-12 md:pb-32 md:pl-60">
      <Rocket />
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Left side - Intro */}
        <div className="bio-section flex flex-col items-center md:items-start justify-start gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            {/* Physics-enabled profile picture */}
            <PhysicsProfileIcon />
            <div className="flex flex-col justify-between gap-4 py-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif text-light-text dark:text-dark-text">
                dan danaher
              </h1>
              <p className="text-base md:text-lg text-light-text-muted dark:text-dark-text-muted">
                aerospace engineering student. 21, based in London.
              </p>
            </div>
          </div>
          <div className="social-links flex flex-wrap gap-3 justify-center md:justify-start md:pl-36">
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

          {/* Mobile navigation - vertical stack below bio */}
          <nav className="mt-8 w-full md:hidden">
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/40 bg-white/75 p-6 shadow-lg shadow-slate-900/10 backdrop-blur transition-all duration-300",
                        "dark:border-dark-bg-elevated/40 dark:bg-dark-bg-elevated/90",
                        isActive ? "shadow-xl" : "hover:shadow-xl"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Green gradient overlay on hover/active */}
                        <div
                          className={cn(
                            "pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-green/30 via-transparent to-white/80 opacity-0 transition-opacity duration-300",
                            "dark:to-dark-bg-elevated/80",
                            isActive ? "opacity-100" : "group-hover:opacity-100"
                          )}
                          aria-hidden
                        />

                        {/* Content */}
                        <div className="relative flex items-center gap-4 flex-1">
                          <span className="flex h-8 w-8 items-center justify-center flex-shrink-0">
                            <img src={item.icon} alt={item.name} className="h-9 w-9 flex-shrink-0" />
                          </span>
                          <span className="text-xl font-serif lowercase text-light-text-dark dark:text-dark-text">
                            {item.name}
                          </span>
                        </div>

                        {/* Active indicator dot */}
                        {isActive && (
                          <div className="relative">
                            <span className="flex h-2 w-2 items-center justify-center">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75"></span>
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green"></span>
                            </span>
                          </div>
                        )}

                        {/* Hover arrow */}
                        {!isActive && (
                          <div className="relative text-lg text-light-text-subtle opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-dark-text-subtle">
                            →
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Me;
