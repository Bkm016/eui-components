import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cx, flag } from "../utils";

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    orientation={orientation}
    className={cx("ore-radio-group", className)}
    {...props}
  />
));
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

/** Ore UI "RadioBox": a diamond with a four-tile gem when selected. */
export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, description, id, ...props }, ref) => {
  const autoId = React.useId();
  const item = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={id ?? (label ? autoId : undefined)}
      className={cx("ore-radio ore-spec", className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="ore-radio__indicator" />
    </RadioGroupPrimitive.Item>
  );
  if (!label) return item;
  return (
    <label className="ore-choice" htmlFor={id ?? autoId} data-disabled={flag(props.disabled)}>
      {item}
      <span className="ore-choice__text">
        <span>{label}</span>
        {description ? <span className="ore-choice__description">{description}</span> : null}
      </span>
    </label>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";
