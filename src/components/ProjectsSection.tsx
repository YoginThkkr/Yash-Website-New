import { usePortfolio } from "../hooks/usePortfolio";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const { projects } = usePortfolio();

  const sorted = [...projects].sort((a, b) => {
    if (a.highlight === b.highlight) return 0;
    return a.highlight ? -1 : 1;
  });

  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-28">
      <h2 className="mb-16 text-sm uppercase tracking-[0.2em] text-black">
        Projects
      </h2>

      <div className="space-y-6">
        {sorted.map((project, index) => (
          <div
            key={project.id}
            className="sticky"
            style={{ top: `${96 + index * 16}px` }}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
