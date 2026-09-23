import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { PixelIcon } from "../icons";
import { cx, flag } from "../utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

/**
 * Ore UI toggle: an "I | O" track with an elevated knob. The knob only plays
 * the stepped slide animation after user interaction, never on mount.
 */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, description, id, onCheckedChange, ...props }, ref) => {
  const autoId = React.useId();
  const [animate, setAnimate] = React.useState(false);
  const handleCheckedChange = React.useCallback(
    (checked: boolean) => {
      setAnimate(true);
      onCheckedChange?.(checked);
    },
    [onCheckedChange],
  );

  const control = (
    <SwitchPrimitive.Root
      ref={ref}
      id={id ?? (label ? autoId : undefined)}
      className={cx("ore-switch", className)}
      data-animate={flag(animate)}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <span className="ore-switch__half ore-spec" data-side="on" aria-hidden>
        <span className="ore-switch__glyph" data-side="on" />
      </span>
      <span className="ore-switch__half ore-spec" data-side="off" aria-hidden>
        <PixelIcon name="ring" className="ore-switch__glyph" data-side="off" />
      </span>
      <SwitchPrimitive.Thumb className="ore-switch__thumb ore-spec" />
    </SwitchPrimitive.Root>
  );
  if (!label) return control;
  return (
    <label className="ore-choice" htmlFor={id ?? autoId} data-disabled={flag(props.disabled)}>
      <span className="ore-choice__text" style={{ flex: 1 }}>
        <span>{label}</span>
        {description ? <span className="ore-choice__description">{description}</span> : null}
      </span>
      {control}
    </label>
  );
});
Switch.displayName = "Switch";
