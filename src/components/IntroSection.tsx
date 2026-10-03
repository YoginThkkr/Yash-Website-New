import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import { useMediaQuery, useReducedMotion } from "../hooks/useMediaQuery";
import { CURSOR_POSES, useCursorPose } from "../hooks/useCursorPose";
import Medallion from "./Medallion";

export default function IntroSection() {
  const { profile } = usePortfolio();
  const avatarRef = useRef<HTMLDivElement>(null);

  // Only on devices with a real mouse or trackpad, and only if motion is welcome.
  const hasMouse = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const follow = hasMouse && !reduced && Boolean(profile.avatar);
  const { pose, leanX, leanY, leanRotate } = useCursorPose(avatarRef, follow);

  return (
    <section id="top" className="intro">
      <div className="intro-grid">
        <motion.div
          ref={avatarRef}
          className="intro-avatar"
          style={{ x: leanX, y: leanY, rotate: leanRotate }}
        >
          <Medallion
            className="intro-medallion"
            view={pose}
            preload={follow ? CURSOR_POSES : []}
            eager
          />
        </motion.div>
        <h1 className="intro-title font-display">About {profile.shortName}</h1>
        <p className="intro-bio prose-copy">{profile.bio}</p>
      </div>

      <a href="#resume" className="scroll-cue">
        <span>Scroll</span>
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
