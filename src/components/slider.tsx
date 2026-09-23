import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cx } from "../utils";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Draws the notch between every step, like Ore UI's `showSteps`. */
  showSteps?: boolean;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showSteps, min = 0, max = 100, step = 1, ...props }, ref) => {
  const values = props.value ?? props.defaultValue ?? [min];
  const stepCount = Math.round((max - min) / step);
  return (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      step={step}
      className={cx("ore-slider", className)}
      {...props}
    >
      <SliderPrimitive.Track className="ore-slider__track ore-spec">
        <SliderPrimitive.Range className="ore-slider__range ore-spec" />
        {showSteps && stepCount > 1 && stepCount <= 100 ? (
          <span className="ore-slider__steps" aria-hidden>
            {Array.from({ length: stepCount }, (_, i) => (
              <span key={i} className="ore-slider__step" />
            ))}
          </span>
        ) : null}
      </SliderPrimitive.Track>
      {values.map((_, i) => (
        <SliderPrimitive.Thumb key={i} className="ore-slider__thumb ore-spec" />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = "Slider";
