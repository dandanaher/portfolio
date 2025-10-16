
import { useEffect, useMemo, useState } from "react";

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
    <div className="flex h-full flex-1 overflow-hidden bg-[#FAF8F4]">
      {/* Left Panel - Project Navigation */}
      <div className="flex w-[45%] flex-col border-r border-[#8A8984]/10">
        {/* Header */}
        <div className="border-b border-[#8A8984]/10 px-8 py-10">
          <h1 className="mb-1 font-serif text-5xl tracking-tight text-[#2a2b29]">
            Projects
          </h1>
          <p className="font-serif text-sm text-[#8A8984]">
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
                  <h2 className="mb-3 font-serif text-5xl leading-[1.1] tracking-tight text-[#2a2b29]">
                    {selectedProject.title}
                  </h2>
                  <p className="max-w-2xl text-lg leading-relaxed text-[#4F4F4C]">
                    {selectedProject.longDescription}
                  </p>
                </div>
              </div>

              {/* Meta Bar with CTA */}
              <div className="flex items-center justify-between gap-6 border-y border-[#8A8984]/10 py-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="mb-1 font-serif text-xs uppercase tracking-widest text-[#8A8984]">
                      Status
                    </p>
                    <p className="text-sm font-medium text-[#2a2b29]">
                      {selectedProject.meta}
                    </p>
                  </div>
                  {selectedProject.stack.length > 0 && (
                    <div>
                      <p className="mb-1 font-serif text-xs uppercase tracking-widest text-[#8A8984]">
                        Stack
                      </p>
                      <p className="text-sm font-medium text-[#2a2b29]">
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
                    className="group inline-flex items-center gap-2 rounded-full bg-[#2a2b29] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#85A78D]"
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
              <div className="group relative h-full overflow-hidden rounded-lg bg-[#e8e6e1] shadow-2xl shadow-black/10">
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
                  <div className="flex h-full w-full items-center justify-center font-serif text-sm text-[#8A8984]">
                    No preview available
                  </div>
                )}
                {showNavigation && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-[#2a2b29] opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white focus-visible:opacity-100 group-hover:opacity-100"
                      aria-label="View previous screenshot"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-[#2a2b29] opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white focus-visible:opacity-100 group-hover:opacity-100"
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
            <p className="font-serif text-sm text-[#8A8984]">
              Select a project to view
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
