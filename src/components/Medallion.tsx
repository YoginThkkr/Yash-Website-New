import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";
import type { Sticker as StickerData } from "../types/portfolio";
import Sticker from "./Sticker";

/* Where stickers land (percent of the avatar's box) and their tilt.
   Short labels go to "side" spots, long labels (e.g. "SPRING MAN") to "wide"
   spots where there is room for them. */
type Spot = { x: number; y: number; tilt: number };
type SpotSet = { side: Spot[]; wide: Spot[] };

/* Around the rim of the YT monogram */
const MONOGRAM_SPOTS: SpotSet = {
  side: [
    { x: 25, y: 17, tilt: -14 },
    { x: 76, y: 17, tilt: 10 },
    { x: 10, y: 48, tilt: 8 },
    { x: 89, y: 50, tilt: -9 },
    { x: 23, y: 81, tilt: 12 },
    { x: 77, y: 81, tilt: -12 },
  ],
  wide: [
    { x: 50, y: 98, tilt: -4 },
    { x: 50, y: -1, tilt: 4 },
  ],
};

/* On the character's face: cheeks, hair and beard, keeping the eyes clear */
const FACE_SPOTS: SpotSet = {
  side: [
    { x: 27, y: 67, tilt: -12 }, // left cheek
    { x: 73, y: 67, tilt: 10 }, // right cheek
    { x: 36, y: 15, tilt: -8 }, // hair, left
    { x: 64, y: 17, tilt: 12 }, // hair, right
    { x: 31, y: 85, tilt: 9 }, // beard, left
    { x: 69, y: 85, tilt: -10 }, // beard, right
  ],
  wide: [
    { x: 50, y: 34, tilt: -3 }, // forehead
    { x: 50, y: 78, tilt: 4 }, // under the moustache
  ],
};

function assignSpots(stickers: StickerData[], set: SpotSet): Spot[] {
  let side = 0;
  let wide = 0;
  return stickers.map((s) => {
    if (s.label.length > 6 && wide < set.wide.length) return set.wide[wide++];
    const spot = set.side[side % set.side.length];
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
  const base = import.meta.env.BASE_URL;
  const hasImage = Boolean(profile.avatarImage);
  const spots = assignSpots(stickers, hasImage ? FACE_SPOTS : MONOGRAM_SPOTS);

  // A flat picture can't really turn in 3D, so the character tilts its head
  // gently instead; the monogram keeps its coin-like turn.
  const idle = useMotionValue(0);
  const headTilt = useTransform(turn ?? idle, (v) => v * 0.2);

  return (
    <div
      className={`medallion-stage ${hasImage ? "medallion-stage--image" : ""} ${className}`}
    >
      <motion.div
        className="medallion"
        style={hasImage ? { rotate: headTilt, scale: zoom } : { rotateY: turn, scale: zoom }}
      >
        {hasImage ? (
          <picture className="medallion-face">
            <source srcSet={`${base}${profile.avatarImage}`} type="image/webp" />
            <img
              src={`${base}${profile.avatarImageFallback ?? profile.avatarImage}`}
              alt={`${profile.name}, illustrated`}
              width={900}
              height={900}
              decoding="async"
            />
          </picture>
        ) : (
          <div
            className="medallion-face"
            role="img"
            aria-label={`${profile.name} monogram`}
            dangerouslySetInnerHTML={{ __html: profile.avatarSvg }}
          />
        )}

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
