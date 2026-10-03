import { motion } from "framer-motion";

// TODO: move these rows into portfolio.json (e.g. a `services[]` array) once
// the service list is finalised, following the same pattern as experience[].
const SERVICES = [
  {
    title: "Collection Design",
    description:
      "End-to-end design of seasonal ranges, from trend boards and sketches through to fittings and final garment.",
  },
  {
    title: "Trend Forecasting & Research",
    description:
      "Translating runway, street style and forecasting services (WGSN, Edited) into commercially viable, fashion-forward ranges.",
  },
  {
    title: "Technical Design & Sourcing",
    description:
      "Tech packs, CADs, and fabric and trim sourcing, working directly with suppliers and mills through to bulk production.",
  },
  {
    title: "Team Leadership & Mentorship",
    description:
      "Managing design teams, mentoring junior designers and interns, and collaborating across Buying, Merchandising and Production.",
  },
];

export default function ServicesSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="mb-12 text-sm uppercase tracking-[0.2em] text-black">
        What I Do
      </h2>

      <div className="border-t border-line">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid gap-4 border-b border-line py-8 md:grid-cols-[64px_1fr] md:gap-8"
          >
            <span className="font-mono text-sm text-black">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-medium text-black">
                {service.title}
              </h3>
              <p className="prose-copy mt-2 max-w-2xl text-sm text-black sm:text-base">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
