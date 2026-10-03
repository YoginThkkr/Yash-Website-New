import { ArrowDown } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import Medallion from "./Medallion";

export default function IntroSection() {
  const { profile } = usePortfolio();

  return (
    <section id="top" className="intro">
      <div className="intro-grid">
        <Medallion className="intro-medallion" view="front" eager />
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
