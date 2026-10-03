import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import SocialLinks from "./SocialLinks";

/*
 * Hero layout (per the guide's iteration prompts 01 + 02):
 * a CSS grid, not absolute positioning. Row 1 holds the giant headline,
 * row 2 the avatar, which is pulled up so it overlaps the bottom of the
 * headline and sits above it (z-index): the "bursting through" effect.
 */
export default function HeroSection() {
  const { profile } = usePortfolio();

  return (
    <section id="home" className="hero relative px-4 pt-28 pb-20 sm:px-6">
      <div className="hero-grid mx-auto max-w-[1600px]">
        <h1 className="hero-heading hero-title">
          Hi, I&rsquo;m {profile.shortName}
        </h1>

        <motion.div
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-avatar"
          dangerouslySetInnerHTML={{ __html: profile.avatarSvg }}
        />

        <div className="hero-copy flex flex-col items-center text-center">
          <p className="prose-copy max-w-xl text-base text-black sm:text-lg">
            {profile.tagline}
          </p>
          <p className="mt-2 text-sm text-black">
            {profile.role} in {profile.location}, {profile.yearsOfExperience}+ years in fashion design
          </p>

          <div className="mt-8">
            <SocialLinks social={profile.social} variant="pill" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="accent-gradient rounded-full px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-black px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black/5"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-black transition-opacity hover:opacity-70 md:block"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
