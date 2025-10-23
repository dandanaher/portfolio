
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProjectCard from "@/components/cards/ProjectCard";
import type { ProjectEntry } from "@/data/samples";
import { projectEntries } from "@/data/samples";
import { THEME_COMBINATIONS } from "@/constants/theme";

const Projects = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<ProjectEntry | null>(
    projectEntries[0] ?? null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProject?.title]);

  const imageCount = selectedProject?.previewImages.length ?? 0;

  const currentImage = useMemo(() => {
    if (!selectedProject || imageCount === 0) {
      return "";
    }
    return selectedProject.previewImages[
      Math.min(activeImageIndex, imageCount - 1)
    ];
  }, [activeImageIndex, imageCount, selectedProject]);

  const showNavigation = imageCount > 1;

  const handleNext = () => {
    if (!showNavigation) return;
    setActiveImageIndex((prev) => (prev + 1) % imageCount);
  };

  const handlePrevious = () => {
    if (!showNavigation) return;
    setActiveImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  return (
    <div className={`flex h-full flex-1 overflow-hidden ${THEME_COMBINATIONS.background}`}>
      {/* Desktop: Two-panel layout */}
      <div className="hidden md:flex h-full flex-1 overflow-hidden">
        {/* Left Panel - Project Navigation */}
        <div className="flex w-[45%] flex-col border-r border-light-border/10 dark:border-dark-border/50">
          {/* Header */}
          <div className={`border-b border-light-border/10 px-8 py-10 dark:border-dark-border/50`}>
            <h1 className={`mb-1 font-serif text-5xl tracking-tight ${THEME_COMBINATIONS.textDark}`}>
              Projects
            </h1>
            <p className={`font-serif text-sm ${THEME_COMBINATIONS.textSubtle}`}>
              {projectEntries.length} {projectEntries.length === 1 ? 'piece' : 'pieces'} of work
            </p>
          </div>

          {/* Project Cards */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="space-y-0">
              {projectEntries.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  stack={project.stack}
                  meta={project.meta}
                  onSelect={() => setSelectedProject(project)}
                  isActive={project.title === selectedProject?.title}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Project Showcase */}
        <div className="flex flex-1 flex-col overflow-hidden">
        {selectedProject ? (
          <div className="flex h-full flex-col p-10">
            {/* Project Header with CTA */}
            <div className="mb-6 flex-none">
              <div className="mb-6 flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h2 className={`mb-3 font-serif text-5xl leading-[1.1] tracking-tight ${THEME_COMBINATIONS.textDark}`}>
                    {selectedProject.title}
                  </h2>
                  <p className={`max-w-2xl text-lg leading-relaxed ${THEME_COMBINATIONS.textMuted}`}>
                    {selectedProject.longDescription}
                  </p>
                </div>
              </div>

              {/* Meta Bar with CTA */}
              <div className="flex items-center justify-between gap-6 border-y border-light-border/10 py-4 dark:border-dark-border/50">
                <div className="flex items-center gap-6">
                  <div>
                    <p className={`mb-1 font-serif text-xs uppercase tracking-widest ${THEME_COMBINATIONS.textSubtle}`}>
                      Status
                    </p>
                    <p className={`text-sm font-medium ${THEME_COMBINATIONS.textDark}`}>
                      {selectedProject.meta}
                    </p>
                  </div>
                  {selectedProject.stack.length > 0 && (
                    <div>
                      <p className={`mb-1 font-serif text-xs uppercase tracking-widest ${THEME_COMBINATIONS.textSubtle}`}>
                        Stack
                      </p>
                      <p className={`text-sm font-medium ${THEME_COMBINATIONS.textDark}`}>
                        {selectedProject.stack.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-light-text-dark px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-green dark:bg-dark-text dark:text-dark-bg dark:hover:bg-accent-green dark:hover:text-white"
                  >
                    <span>View Live</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Image Carousel */}
            <div className="relative flex-1">
              <div className="group relative h-full overflow-hidden rounded-lg bg-light-border shadow-2xl shadow-black/10 dark:bg-dark-bg-elevated">
                {currentImage ? (
                  <div
                    className="flex h-full w-full transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                  >
                    {selectedProject.previewImages.map((imageSrc, index) => (
                      <img
                        key={`${selectedProject.title}-image-${index}`}
                        src={imageSrc}
                        alt={`${selectedProject.title} preview ${index + 1}`}
                        className="h-full w-full flex-shrink-0 object-contain"
                      />
                    ))}
                  </div>
                ) : (
                  <div className={`flex h-full w-full items-center justify-center font-serif text-sm ${THEME_COMBINATIONS.textSubtle}`}>
                    No preview available
                  </div>
                )}
                {showNavigation && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-light-text-dark opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 dark:bg-dark-text/95 dark:text-dark-bg dark:hover:bg-dark-text"
                      aria-label="View previous screenshot"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-light-text-dark opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 dark:bg-dark-text/95 dark:text-dark-bg dark:hover:bg-dark-text"
                      aria-label="View next screenshot"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2.5 rounded-full bg-black/20 px-4 py-2 backdrop-blur-sm">
                      {selectedProject.previewImages.map((_, index) => (
                        <button
                          key={`${selectedProject.title}-dot-${index}`}
                          onClick={() => setActiveImageIndex(index)}
                          className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            index === activeImageIndex
                              ? "w-8 bg-white"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className={`font-serif text-sm ${THEME_COMBINATIONS.textSubtle}`}>
              Select a project to view
            </p>
          </div>
        )}
        </div>
      </div>

      {/* Mobile: Single column layout with expandable cards */}
      <div className="md:hidden flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <div className={`border-b border-light-border/10 px-6 py-10 dark:border-dark-border/50`}>
          <button
            onClick={() => navigate('/me')}
            className="flex items-center gap-2 text-sm text-light-text-muted hover:text-light-text dark:text-dark-text-muted dark:hover:text-dark-text transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </button>
          <h1 className={`mb-1 font-serif text-4xl tracking-tight ${THEME_COMBINATIONS.textDark}`}>
            Projects
          </h1>
          <p className={`font-serif text-sm ${THEME_COMBINATIONS.textSubtle}`}>
            {projectEntries.length} {projectEntries.length === 1 ? 'piece' : 'pieces'} of work
          </p>
        </div>

        {/* Projects list with inline details */}
        <div className="flex-1 px-6 py-6">
          <div className="space-y-6">
            {projectEntries.map((project, index) => (
              <div key={project.title} className="flex flex-col gap-4">
                {/* Project Card */}
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  stack={project.stack}
                  meta={project.meta}
                  onSelect={() => setSelectedProject(selectedProject?.title === project.title ? null : project)}
                  isActive={project.title === selectedProject?.title}
                  index={index}
                />

                {/* Expanded Project Details (shown when active) */}
                {selectedProject?.title === project.title && (
                  <div className="flex flex-col gap-4 pb-4 border-b border-light-border/10 dark:border-dark-border/50">
                    {/* Long description */}
                    <p className={`text-sm leading-relaxed ${THEME_COMBINATIONS.textMuted}`}>
                      {project.longDescription}
                    </p>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 text-xs">
                      <div>
                        <p className={`mb-1 font-serif uppercase tracking-widest ${THEME_COMBINATIONS.textSubtle}`}>
                          Status
                        </p>
                        <p className={`text-sm font-medium ${THEME_COMBINATIONS.textDark}`}>
                          {project.meta}
                        </p>
                      </div>
                      {project.stack.length > 0 && (
                        <div>
                          <p className={`mb-1 font-serif uppercase tracking-widest ${THEME_COMBINATIONS.textSubtle}`}>
                            Stack
                          </p>
                          <p className={`text-sm font-medium ${THEME_COMBINATIONS.textDark}`}>
                            {project.stack.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Images */}
                    {project.previewImages.length > 0 && (
                      <div className="relative">
                        <div className="rounded-lg overflow-hidden bg-light-border dark:bg-dark-bg-elevated">
                          <img
                            src={project.previewImages[activeImageIndex]}
                            alt={`${project.title} preview ${activeImageIndex + 1}`}
                            className="w-full h-auto object-contain"
                          />
                        </div>

                        {/* Image navigation */}
                        {project.previewImages.length > 1 && (
                          <div className="flex items-center justify-center gap-2 mt-3">
                            <button
                              type="button"
                              onClick={handlePrevious}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-light-bg/90 text-lg text-light-text-dark dark:bg-dark-text/90 dark:text-dark-bg"
                            >
                              ‹
                            </button>
                            <div className="flex gap-2">
                              {project.previewImages.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setActiveImageIndex(index)}
                                  className={`h-2 w-2 rounded-full transition-all ${
                                    index === activeImageIndex
                                      ? "w-6 bg-light-text-dark dark:bg-dark-text"
                                      : "bg-light-text-muted/50 dark:bg-dark-text-muted/50"
                                  }`}
                                  aria-label={`View image ${index + 1}`}
                                />
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={handleNext}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-light-bg/90 text-lg text-light-text-dark dark:bg-dark-text/90 dark:text-dark-bg"
                            >
                              ›
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CTA button */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-light-text-dark px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-green dark:bg-dark-text dark:text-dark-bg dark:hover:bg-accent-green dark:hover:text-white"
                      >
                        <span>View Live</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
