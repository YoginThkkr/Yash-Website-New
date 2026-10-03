import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";

export default function ExperienceSection() {
  const { experience, education } = usePortfolio();

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="mb-12 text-sm uppercase tracking-[0.2em] text-black">
        Experience
      </h2>

      <div className="border-t border-line">
        {experience.map((job, index) => (
          <motion.div
            key={`${job.company}-${job.period}`}
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid gap-4 border-b border-line py-10 md:grid-cols-[64px_1fr_auto] md:gap-8"
          >
            <span className="font-mono text-sm text-black">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="text-lg font-medium text-black sm:text-xl">
                {job.role} &middot; {job.company}
              </h3>
              <p className="mt-1 text-sm text-black">{job.location}</p>
              <p className="prose-copy mt-4 max-w-2xl text-sm text-black sm:text-base">
                {job.summary}
              </p>

              <ul className="mt-5 space-y-2">
                {job.highlights.slice(0, 3).map((point) => (
                  <li
                    key={point}
                    className="prose-copy flex gap-3 text-sm text-black sm:text-base"
                  >
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-black" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <span className="h-fit rounded-full border border-line px-3 py-1 font-mono text-xs text-black md:justify-self-end">
              {job.period}
            </span>
          </motion.div>
        ))}
      </div>

      {education.length > 0 && (
        <div className="mt-20">
          <h3 className="mb-6 text-sm uppercase tracking-[0.2em] text-black">
            Education
          </h3>
          <ul className="space-y-5">
            {education.map((item) => (
              <li
                key={`${item.institution}-${item.credential}`}
                className="flex flex-col gap-1 border-b border-line pb-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <p className="text-base text-black">{item.credential}</p>
                  <p className="text-sm text-black">{item.institution}</p>
                </div>
                <span className="font-mono text-xs text-black">
                  {item.period}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
