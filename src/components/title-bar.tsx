import * as React from "react";
import { PixelIcon } from "../icons";
import { cx } from "../utils";

export interface TitleBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  /** Slot on the left, typically <TitleBarAction icon="back" />. */
  left?: React.ReactNode;
  /** Slot on the right, typically <TitleBarAction icon="close" />. */
  right?: React.ReactNode;
}

/** The neutral header strip used by Ore UI screens and modals. */
export const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(
  ({ className, title, left, right, children, ...props }, ref) => (
    <div ref={ref} className={cx("ore-titlebar ore-spec", className)} {...props}>
      <div className="ore-titlebar__side">{left}</div>
      {title != null ? <div className="ore-titlebar__title">{title}</div> : children}
      <div className="ore-titlebar__side">{right}</div>
    </div>
  ),
);
TitleBar.displayName = "TitleBar";

export interface TitleBarActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: "close" | "back";
}

export const TitleBarAction = React.forwardRef<HTMLButtonElement, TitleBarActionProps>(
  ({ className, icon, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-label={props["aria-label"] ?? (icon === "close" ? "Close" : "Back")}
      className={cx("ore-icon-action", className)}
      {...props}
    >
      <PixelIcon name={icon === "close" ? "close" : "chevronLeft"} />
    </button>
  ),
);
TitleBarAction.displayName = "TitleBarAction";
