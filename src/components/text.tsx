import * as React from "react";
import { Slot } from "radix-ui";
import { cx, flag } from "../utils";

export type TextType =
  | "header1"
  | "header2"
  | "header3"
  | "header4A"
  | "header4B"
  | "header5A"
  | "header5B"
  | "sectionHeader"
  | "subtitle1"
  | "subtitle2"
  | "body"
  | "paragraphs"
  | "captionTiny"
  | "captionShort"
  | "captionLong";

const DEFAULT_TAG: Partial<Record<TextType, keyof React.JSX.IntrinsicElements>> = {
  header1: "h1",
  header2: "h2",
  header3: "h3",
  header4A: "h4",
  header4B: "h4",
  header5A: "h5",
  header5B: "h5",
  sectionHeader: "h6",
  paragraphs: "p",
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Ore UI typography style. */
  type?: TextType;
  variant?: "regular" | "dimmer" | "dimmest";
  align?: "left" | "center" | "right";
  /** The 1-texel drop shadow used on hero labels and titles. */
  shadow?: boolean;
  asChild?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ type = "body", variant = "regular", align, shadow, asChild, className, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot.Root : (DEFAULT_TAG[type] ?? "span");
    return (
      <Comp
        ref={ref}
        className={cx("ore-text", className)}
        data-type={type}
        data-variant={variant === "regular" ? undefined : variant}
        data-align={align}
        data-shadow={flag(shadow)}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";
