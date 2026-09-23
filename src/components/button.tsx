import * as React from "react";
import { Slot } from "radix-ui";
import { cx, flag } from "../utils";

export type ButtonVariant = "hero" | "primary" | "secondary" | "neutral" | "destructive";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Ore UI role. `hero` is the big green call-to-action (Minecraft Ten label),
   * `primary` green, `secondary` light grey, `neutral` dark grey and
   * `destructive` red. Defaults to `secondary`, like the game.
   */
  variant?: ButtonVariant;
  /** Adds the 2-texel slab under the face and the press-down animation. */
  elevated?: boolean;
  /** `icon` renders a square button sized to its 4rem face. */
  size?: "default" | "icon";
  fullWidth?: boolean;
  /** Keeps the button in its pressed (depressed) look, e.g. for toggles. */
  pressed?: boolean;
  /** Render the Ore styles onto the child element instead of a <button>. */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      elevated = true,
      size = "default",
      fullWidth,
      pressed,
      asChild,
      className,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? type : (type ?? "button")}
        className={cx("ore-button ore-spec", className)}
        data-variant={variant}
        data-size={size}
        data-elevated={flag(elevated)}
        data-full-width={flag(fullWidth)}
        data-pressed={flag(pressed)}
        data-disabled={flag(asChild && props.disabled)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

/** Stacks buttons with Ore UI's 0.4rem rhythm (vertical by default). */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ orientation = "vertical", className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cx("ore-button-group", className)}
      data-orientation={orientation}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";
