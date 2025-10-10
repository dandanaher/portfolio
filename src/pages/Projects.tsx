
import { useEffect, useMemo, useState } from "react";

import ScrollColumn from "@/components/shared/ScrollColumn";
import ProjectCard from "@/components/cards/ProjectCard";
import type { ProjectEntry } from "@/data/samples";
import { projectEntries } from "@/data/samples";

const Projects = () => {
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
    <div className="flex min-w-[60%] flex-1 flex-col gap-6 overflow-hidden p-4 md:flex-row md:p-6">
      <ScrollColumn className="w-full flex-none md:w-1/2">
        <div className="space-y-4">
          {projectEntries.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              stack={project.stack}
              meta={project.meta}
              onSelect={() => setSelectedProject(project)}
              isActive={project.title === selectedProject?.title}
            />
          ))}
        </div>
      </ScrollColumn>
      <div className="flex w-full flex-1 items-stretch md:w-1/2">
        <div className="flex h-full w-full flex-col gap-6 rounded-3xl border border-white/30 bg-white/80 p-6 text-[#2a2b29] shadow-xl shadow-slate-900/10 backdrop-blur">
          {selectedProject ? (
            <>
              <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-[#e8e6e1]">
                {currentImage ? (
                  <div
                    className="flex h-full w-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                  >
                    {selectedProject.previewImages.map((imageSrc, index) => (
                      <img
                        key={`${selectedProject.title}-image-${index}`}
                        src={imageSrc}
                        alt={`${selectedProject.title} preview ${index + 1}`}
                        className="h-full w-full flex-shrink-0 object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-[#626360]">
                    No preview available.
                  </div>
                )}
                {showNavigation && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2a2b29] opacity-0 shadow transition hover:bg-white focus-visible:opacity-100 group-hover:opacity-100"
                      aria-label="View previous screenshot"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2a2b29] opacity-0 shadow transition hover:bg-white focus-visible:opacity-100 group-hover:opacity-100"
                      aria-label="View next screenshot"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                      {selectedProject.previewImages.map((_, index) => (
                        <span
                          key={`${selectedProject.title}-dot-${index}`}
                          className={`h-2 w-2 rounded-full ${
                            index === activeImageIndex
                              ? "bg-[#2a2b29]"
                              : "bg-[#2a2b29]/30"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-semibold">
                  {selectedProject.title}
                </h2>
                <span className="rounded-full bg-[#2a2b29]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#2a2b29]">
                  {selectedProject.meta}
                </span>
              </div>
              <p className="text-[#3c3d3b]">
                {selectedProject.longDescription}
              </p>
              {selectedProject.stack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={`${selectedProject.title}-detail-${tech}`}
                      className="rounded-full bg-[#e8e6e1] px-3 py-1 text-xs text-[#3c3d3b]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#2a2b29] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1f201e]"
                >
                  View live project
                  <span aria-hidden>→</span>
                </a>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#626360]">
              Select a project to see more details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
