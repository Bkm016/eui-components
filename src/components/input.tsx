import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cx, flag } from "../utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input ref={ref} type={type} className={cx("ore-input", className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, rows = 3, ...props }, ref) => (
  <textarea ref={ref} rows={rows} className={cx("ore-input", className)} {...props} />
));
Textarea.displayName = "Textarea";

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cx("ore-label", className)} {...props} />
));
Label.displayName = "Label";

export interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Setting title shown on the left of the header row. */
  label?: React.ReactNode;
  /** Current value shown on the right of the header row (e.g. slider value). */
  value?: React.ReactNode;
  description?: React.ReactNode;
  /** id of the control, links the label to it. */
  htmlFor?: string;
  disabled?: boolean;
}

/** Settings-style wrapper: title/value row, description, then the control. */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, value, description, htmlFor, disabled, children, ...props }, ref) => (
    <div ref={ref} className={cx("ore-field", className)} data-disabled={flag(disabled)} {...props}>
      {label != null || value != null ? (
        <div className="ore-field__header">
          {label != null ? <LabelPrimitive.Root htmlFor={htmlFor}>{label}</LabelPrimitive.Root> : <span />}
          {value != null ? <span>{value}</span> : null}
        </div>
      ) : null}
      {description ? <div className="ore-field__description">{description}</div> : null}
      {children}
    </div>
  ),
);
Field.displayName = "Field";
