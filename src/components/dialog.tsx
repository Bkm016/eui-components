import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { TitleBar, TitleBarAction } from "./title-bar";
import { cx } from "../utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cx("ore-dialog__overlay", className)} {...props} />
));
DialogOverlay.displayName = "DialogOverlay";

/** Ore UI modal frame: max 47.6rem wide, 1-texel outline, dark body. */
export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} className={cx("ore-dialog__content ore-theme", className)} {...props}>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Shows the "X" close action on the right. Defaults to true. */
  showClose?: boolean;
  /** Renders a back arrow on the left and calls this when pressed. */
  onBack?: () => void;
}

/** Title bar with the dialog title; wrap the title text in children. */
export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, showClose = true, onBack, ...props }, ref) => (
    <TitleBar
      ref={ref}
      className={className}
      left={onBack ? <TitleBarAction icon="back" onClick={onBack} /> : null}
      right={
        showClose ? (
          <DialogPrimitive.Close asChild>
            <TitleBarAction icon="close" />
          </DialogPrimitive.Close>
        ) : null
      }
      {...props}
    >
      <DialogPrimitive.Title className="ore-titlebar__title">{children}</DialogPrimitive.Title>
    </TitleBar>
  ),
);
DialogHeader.displayName = "DialogHeader";

export const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx("ore-dialog__body ore-scroll", className)} {...props} />
  ),
);
DialogBody.displayName = "DialogBody";

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={className} style={{ margin: 0 }} {...props} />
));
DialogDescription.displayName = "DialogDescription";

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

/** Button area: neutral surface with a bevel, buttons stacked vertically. */
export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      className={cx("ore-dialog__footer ore-spec", className)}
      data-orientation={orientation}
      {...props}
    />
  ),
);
DialogFooter.displayName = "DialogFooter";
