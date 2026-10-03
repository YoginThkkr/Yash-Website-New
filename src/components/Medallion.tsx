import { motion, type MotionValue } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";
import type { Sticker as StickerData } from "../types/portfolio";
import Sticker from "./Sticker";

/* Where stickers land on the medallion (percent of its box) and their tilt.
   Short labels go around the sides; long labels (e.g. "SPRING MAN") go to the
   top and bottom of the ring, where there is room, so the monogram stays clear. */
type Spot = { x: number; y: number; tilt: number };

const SIDE_SPOTS: Spot[] = [
  { x: 25, y: 17, tilt: -14 },
  { x: 76, y: 17, tilt: 10 },
  { x: 10, y: 48, tilt: 8 },
  { x: 89, y: 50, tilt: -9 },
  { x: 23, y: 81, tilt: 12 },
  { x: 77, y: 81, tilt: -12 },
];

const WIDE_SPOTS: Spot[] = [
  { x: 50, y: 98, tilt: -4 },
  { x: 50, y: -1, tilt: 4 },
];

function assignSpots(stickers: StickerData[]): Spot[] {
  let side = 0;
  let wide = 0;
  return stickers.map((s) => {
    const isWide = s.label.length > 6 && wide < WIDE_SPOTS.length;
    if (isWide) return WIDE_SPOTS[wide++];
    const spot = SIDE_SPOTS[side % SIDE_SPOTS.length];
    side += 1;
    return spot;
  });
}

interface Props {
  stickers?: StickerData[];
  /** How many stickers are currently stuck on (the rest are hidden) */
  shown?: number;
  /** Optional scroll-linked turn, in degrees */
  turn?: MotionValue<number>;
  zoom?: MotionValue<number>;
  still?: boolean;
  className?: string;
}

export default function Medallion({
  stickers = [],
  shown = stickers.length,
  turn,
  zoom,
  still = false,
  className = "",
}: Props) {
  const { profile } = usePortfolio();
  const spots = assignSpots(stickers);

  return (
    <div className={`medallion-stage ${className}`}>
      <motion.div className="medallion" style={{ rotateY: turn, scale: zoom }}>
        <div
          className="medallion-face"
          role="img"
          aria-label={`${profile.name} monogram`}
          dangerouslySetInnerHTML={{ __html: profile.avatarSvg }}
        />
        {stickers.map((sticker, i) => {
          const spot = spots[i];
          return (
            <span
              key={`${sticker.label}-${i}`}
              className="medallion-spot"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <Sticker
                sticker={sticker}
                tilt={spot.tilt}
                visible={i < shown}
                still={still}
              />
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
