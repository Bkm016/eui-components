import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";
import { cx, flag } from "../utils";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** neutral (#48494a), dark (#313233), darkest (#1e1e1f) or paper (white). */
  variant?: "neutral" | "dark" | "darkest" | "paper";
  /** Draws the 1-texel bevel (light top/left, dark bottom/right). */
  bevel?: boolean;
  padded?: boolean;
}

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ variant = "neutral", bevel = true, padded = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx("ore-panel", bevel && "ore-spec", className)}
      data-variant={variant}
      data-padded={flag(padded)}
      {...props}
    />
  ),
);
Panel.displayName = "Panel";

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cx("ore-separator", className)}
    {...props}
  />
));
Separator.displayName = "Separator";
