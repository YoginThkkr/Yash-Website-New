import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";
import { useReducedMotion } from "../hooks/useMediaQuery";
import { buildTimeline, type TimelineEntry } from "../lib/timeline";
import Medallion from "./Medallion";
import Sticker from "./Sticker";

function EntryCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="entry">
      <p className="entry-years">{entry.years}</p>
      <div className="entry-head">
        <Sticker sticker={entry.sticker} tilt={-6} still className="entry-badge" />
        <h3 className="entry-title">{entry.title}</h3>
      </div>
      <p className="entry-subtitle">
        {entry.subtitle}
        {entry.location ? `, ${entry.location}` : ""}
      </p>
      {entry.points.length > 0 && (
        <ul className="entry-points">
          {entry.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* Shown when the visitor prefers reduced motion: same content, no pinning. */
function StaticResume({ entries }: { entries: TimelineEntry[] }) {
  return (
    <section id="resume" className="section-pad">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="section-title font-display">Résumé</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <Medallion
            stickers={entries.map((e) => e.sticker)}
            still
            className="static-medallion"
          />
          <ol className="static-list">
            {entries.map((entry) => (
              <li key={entry.key}>
                <EntryCard entry={entry} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function ResumeSection() {
  const data = usePortfolio();
  const entries = useMemo(() => buildTimeline(data), [data]);
  const reduced = useReducedMotion();

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(entries.length - 1, Math.max(0, Math.floor(v * entries.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  // The medallion slowly turns and leans in as the story goes on.
  const turn = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const zoom = useTransform(scrollYProgress, [0, 1], [0.94, 1.06]);

  if (entries.length === 0) return null;
  if (reduced) return <StaticResume entries={entries} />;

  const current = entries[active];

  return (
    <section
      id="resume"
      ref={ref}
      className="resume"
      style={{ height: `calc(${entries.length} * 70vh + 100vh)` }}
    >
      {/* Full list for screen readers; the animated view below is visual only. */}
      <ol className="sr-only">
        {entries.map((e) => (
          <li key={e.key}>
            {e.years}: {e.subtitle}, {e.title}
            {e.location ? `, ${e.location}` : ""}. {e.points.join(". ")}
          </li>
        ))}
      </ol>

      <div className="resume-sticky" aria-hidden="true">
        <h2 className="resume-heading font-display">Résumé</h2>

        <Medallion
          stickers={entries.map((e) => e.sticker)}
          shown={active + 1}
          turn={turn}
          zoom={zoom}
          className="resume-medallion"
        />

        <div className="resume-rail">
          <span className="rail-dot" />
          <p className="rail-count">
            {String(active + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <EntryCard entry={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
