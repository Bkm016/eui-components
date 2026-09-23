import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { PixelIcon } from "../icons";
import { cx, flag } from "../utils";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  placeholder?: React.ReactNode;
  elevated?: boolean;
}

/**
 * The Ore UI dropdown button: an elevated secondary pressable that doesn't
 * depress, with the value on the left and the pixel arrow on the right.
 */
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, placeholder, elevated = true, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cx("ore-button ore-spec ore-select__trigger", className)}
    data-variant="secondary"
    data-elevated={flag(elevated)}
    data-no-depress=""
    {...props}
  >
    <span className="ore-select__value">
      {children ?? <SelectPrimitive.Value placeholder={placeholder} />}
    </span>
    <SelectPrimitive.Icon asChild>
      <PixelIcon name="arrowDown" className="ore-select__arrow" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = SelectPrimitive.Value;

/** The option list; like the game it opens on top of its trigger. */
export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", sideOffset = 0, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={sideOffset}
      className={cx("ore-menu ore-scroll", className)}
      data-select={position === "popper" ? "" : undefined}
      {...props}
    >
      <SelectPrimitive.Viewport className="ore-menu__viewport">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cx("ore-menu__item ore-spec", className)} {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="ore-menu__item-indicator">
      <PixelIcon name="check" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cx("ore-menu__label", className)} {...props} />
));
SelectLabel.displayName = "SelectLabel";

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cx("ore-menu__separator", className)} {...props} />
));
SelectSeparator.displayName = "SelectSeparator";
