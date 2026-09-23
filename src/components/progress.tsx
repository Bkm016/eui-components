import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
import { cx } from "../utils";

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** `tall` doubles the bar height (0.8rem). */
  size?: "default" | "tall";
  /** Fill colour, defaults to the informative blue #2e6be5. */
  color?: string;
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, max = 100, size = "default", color, ...props }, ref) => {
  const pct = value == null ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      max={max}
      className={cx("ore-progress", className)}
      data-size={size}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="ore-progress__indicator"
        style={{ width: `${pct}%`, ...(color ? ({ "--_fill": color } as React.CSSProperties) : null) }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = "Progress";
