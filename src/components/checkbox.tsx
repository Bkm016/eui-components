import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { PixelIcon } from "../icons";
import { cx, flag } from "../utils";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Optional label rendered to the right of the box. */
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, id, ...props }, ref) => {
  const autoId = React.useId();
  const box = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={id ?? (label ? autoId : undefined)}
      className={cx("ore-checkbox ore-spec", className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="ore-checkbox__indicator">
        {props.checked === "indeterminate" ? (
          <PixelIcon name="dot" style={{ width: "0.8em", height: "0.8em" }} />
        ) : (
          <PixelIcon name="check" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
  if (!label) return box;
  return (
    <label className="ore-choice" htmlFor={id ?? autoId} data-disabled={flag(props.disabled)}>
      {box}
      <span className="ore-choice__text">
        <span>{label}</span>
        {description ? <span className="ore-choice__description">{description}</span> : null}
      </span>
    </label>
  );
});
Checkbox.displayName = "Checkbox";
