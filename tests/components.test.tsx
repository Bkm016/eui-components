import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  PixelIcon,
  Progress,
  Slider,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Text,
} from "../src";

describe("Button", () => {
  it("defaults to an elevated secondary button", () => {
    render(<Button>Play</Button>);
    const btn = screen.getByRole("button", { name: "Play" });
    expect(btn).toHaveProperty("type", "button");
    expect(btn.className).toContain("ore-button");
    expect(btn.getAttribute("data-variant")).toBe("secondary");
    expect(btn.hasAttribute("data-elevated")).toBe(true);
  });

  it("drops the slab when not elevated and exposes the pressed state", () => {
    render(
      <Button variant="hero" elevated={false} pressed>
        Go
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Go" });
    expect(btn.hasAttribute("data-elevated")).toBe(false);
    expect(btn.hasAttribute("data-pressed")).toBe(true);
    expect(btn.getAttribute("data-variant")).toBe("hero");
  });

  it("renders onto its child with asChild", () => {
    render(
      <Button asChild variant="primary">
        <a href="/worlds">Worlds</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Worlds" });
    expect(link.className).toContain("ore-button");
    expect(link.hasAttribute("type")).toBe(false);
  });
});

describe("Switch", () => {
  it("toggles and only enables the slide animation after interaction", () => {
    const onChange = vi.fn();
    render(<Switch label="Show Coordinates" onCheckedChange={onChange} />);
    const sw = screen.getByRole("switch", { name: "Show Coordinates" });
    expect(sw.hasAttribute("data-animate")).toBe(false);
    fireEvent.click(sw);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(sw.getAttribute("data-state")).toBe("checked");
    expect(sw.hasAttribute("data-animate")).toBe(true);
  });
});

describe("Checkbox", () => {
  it("is labelled and toggles from its label", () => {
    render(<Checkbox label="Allow cheats" />);
    const cb = screen.getByRole("checkbox", { name: "Allow cheats" });
    fireEvent.click(screen.getByText("Allow cheats"));
    expect(cb.getAttribute("data-state")).toBe("checked");
  });
});

describe("Slider", () => {
  it("renders one thumb per value and step notches on demand", () => {
    const { container } = render(
      <Slider defaultValue={[20, 80]} min={0} max={100} step={25} showSteps aria-label="Range" />,
    );
    expect(screen.getAllByRole("slider")).toHaveLength(2);
    expect(container.querySelectorAll(".ore-slider__step")).toHaveLength(4);
  });
});

describe("Progress", () => {
  it("sizes the indicator from value/max", () => {
    const { container } = render(<Progress value={30} max={60} size="tall" aria-label="Loading" />);
    const indicator = container.querySelector<HTMLElement>(".ore-progress__indicator")!;
    expect(indicator.style.width).toBe("50%");
    expect(container.querySelector(".ore-progress")!.getAttribute("data-size")).toBe("tall");
  });
});

describe("Tabs", () => {
  it("marks the selected tab active", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">General</TabsTrigger>
          <TabsTrigger value="b">Video</TabsTrigger>
        </TabsList>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "General" }).getAttribute("data-state")).toBe("active");
    expect(screen.getByRole("tab", { name: "Video" }).getAttribute("data-state")).toBe("inactive");
  });
});

describe("Dialog", () => {
  it("renders the title bar with a close action", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>Delete World</DialogHeader>
          <DialogBody>Gone forever.</DialogBody>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole("dialog", { name: "Delete World" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("Text", () => {
  it("maps header types to heading tags", () => {
    render(<Text type="header2">Minecraft</Text>);
    expect(screen.getByRole("heading", { level: 2, name: "Minecraft" })).toBeTruthy();
  });
});

describe("PixelIcon", () => {
  it("is decorative unless labelled", () => {
    const { container, rerender } = render(<PixelIcon name="check" />);
    expect(container.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
    rerender(<PixelIcon name="check" label="Done" />);
    expect(screen.getByRole("img", { name: "Done" })).toBeTruthy();
  });
});
