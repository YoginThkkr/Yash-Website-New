import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types/portfolio";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  return (
    <div className="rounded-3xl border border-line bg-card p-6 shadow-lg shadow-black/5 sm:p-10">
      <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-sm text-black">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-xs text-black">{project.year}</span>
          </div>

          <h3 className="text-2xl font-medium text-black sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-black">{project.subtitle}</p>

          <p className="prose-copy mt-5 max-w-md text-sm text-black sm:text-base">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1 text-xs text-black"
              >
                {tech}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs uppercase tracking-wider text-black">
            Role &middot; {project.role}
          </p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="accent-gradient mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Live project
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center border border-line bg-white">
              <span className="chrome-text px-6 text-center text-2xl font-semibold leading-tight sm:text-3xl">
                {project.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
