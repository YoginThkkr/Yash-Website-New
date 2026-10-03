import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";

export default function AboutSection() {
  const { profile, skills } = usePortfolio();

  return (
    <>
      <section id="about" className="mx-auto max-w-5xl px-6 py-28">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-10 md:grid-cols-[180px_1fr]"
        >
          <h2 className="text-sm uppercase tracking-[0.2em] text-black">
            About
          </h2>

          <p className="prose-copy max-w-2xl text-xl leading-relaxed text-black sm:text-2xl">
            {profile.bio}
          </p>
        </motion.div>
      </section>

      <section id="skills" className="mx-auto max-w-5xl px-6 pb-28">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-10 md:grid-cols-[180px_1fr]"
        >
          <h2 className="text-sm uppercase tracking-[0.2em] text-black">
            Skills
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {skills.categories.map((category) => (
              <div key={category.name}>
                <h3 className="mb-3 text-sm font-medium text-black">
                  {category.name}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-card px-3 py-1.5 text-xs text-black"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
