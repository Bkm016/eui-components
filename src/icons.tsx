import * as React from "react";
import { cx } from "./utils";

/*
 * Pixel glyphs used by Ore UI, redrawn as crisp SVG. Each string row is one
 * texel row; "#" is a filled texel. They inherit `currentColor`.
 */
const GLYPHS = {
  check: [
    ".......#",
    "......#.",
    ".....#..",
    "#...#...",
    ".#.#....",
    "..#.....",
  ],
  chevronDown: [
    "#......#",
    ".#....#.",
    "..#..#..",
    "...##...",
  ],
  arrowDown: [
    "#.....#.",
    ".#...#..",
    "..#.#...",
    "...#....",
  ],
  chevronLeft: [
    "...#.",
    "..#..",
    ".#...",
    "..#..",
    "...#.",
  ],
  chevronRight: [
    ".#...",
    "..#..",
    "...#.",
    "..#..",
    ".#...",
  ],
  close: [
    "#...#",
    ".#.#.",
    "..#..",
    ".#.#.",
    "#...#",
  ],
  ring: [
    ".####.",
    "#....#",
    "#....#",
    "#....#",
    "#....#",
    ".####.",
  ],
  dot: ["##", "##"],
} as const;

export type PixelIconName = keyof typeof GLYPHS;

export interface PixelIconProps extends React.SVGProps<SVGSVGElement> {
  name: PixelIconName;
  /** Accessible label; icons are decorative (aria-hidden) when omitted. */
  label?: string;
}

const pathCache = new Map<PixelIconName, string>();

function glyphPath(name: PixelIconName): string {
  const cached = pathCache.get(name);
  if (cached) return cached;
  let d = "";
  GLYPHS[name].forEach((row, y) => {
    // Merge horizontal runs so edges stay crisp at any scale.
    let x = 0;
    while (x < row.length) {
      if (row[x] !== "#") {
        x++;
        continue;
      }
      const start = x;
      while (x < row.length && row[x] === "#") x++;
      d += `M${start} ${y}h${x - start}v1h${start - x}z`;
    }
  });
  pathCache.set(name, d);
  return d;
}

export const PixelIcon = React.forwardRef<SVGSVGElement, PixelIconProps>(
  ({ name, label, className, ...props }, ref) => {
    const rows = GLYPHS[name];
    const width = rows[0].length;
    const height = rows.length;
    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        width={width * 2}
        height={height * 2}
        fill="currentColor"
        className={cx("ore-icon", className)}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        focusable="false"
        {...props}
      >
        <path d={glyphPath(name)} />
      </svg>
    );
  },
);
PixelIcon.displayName = "PixelIcon";
