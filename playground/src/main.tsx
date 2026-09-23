import * as React from "react";
import { createRoot } from "react-dom/client";
import "@eui-components/ore-ui/styles.css";
import "./playground.css";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  Input,
  Panel,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Separator,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  TitleBar,
  TitleBarAction,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@eui-components/ore-ui";

const params = new URLSearchParams(location.search);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pg-section">
      <Text type="sectionHeader" className="pg-section__title">
        {title}
      </Text>
      {children}
    </section>
  );
}

function Buttons() {
  return (
    <Section title="Buttons">
      <div className="pg-row">
        <Button variant="hero">Play</Button>
        <Button variant="primary">Create New</Button>
        <Button variant="secondary">Settings</Button>
        <Button variant="neutral">Marketplace</Button>
        <Button variant="destructive">Delete World</Button>
      </div>
      <div className="pg-row">
        <Button variant="primary" pressed>
          Pressed
        </Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
        <Button variant="neutral" elevated={false}>
          Flat
        </Button>
        <Button variant="neutral" size="icon" aria-label="Close">
          ✕
        </Button>
        <Button variant="primary" asChild>
          <a href="#links">Link (asChild)</a>
        </Button>
      </div>
    </Section>
  );
}

function Controls() {
  const [volume, setVolume] = React.useState([70]);
  const [fov, setFov] = React.useState([60]);
  return (
    <Section title="Controls">
      <div className="pg-grid">
        <Panel variant="neutral" className="pg-stack">
          <Switch label="Show Coordinates" defaultChecked />
          <Switch label="Day Light Cycle" description="Time of day advances" />
          <Switch label="Locked" disabled defaultChecked />
          <Separator />
          <Checkbox label="Remember my choice" defaultChecked />
          <Checkbox label="Allow cheats" description="Enables commands for this world" />
          <Checkbox label="Unavailable" disabled />
        </Panel>
        <Panel variant="neutral" className="pg-stack">
          <Field label="Main Volume" value={`${volume[0]}%`}>
            <Slider value={volume} onValueChange={setVolume} max={100} step={1} aria-label="Main volume" />
          </Field>
          <Field label="Field of View" value={fov[0]}>
            <Slider value={fov} onValueChange={setFov} min={30} max={110} step={10} showSteps aria-label="Field of view" />
          </Field>
          <Field label="Disabled" value="50%" disabled>
            <Slider defaultValue={[50]} disabled aria-label="Disabled" />
          </Field>
          <Separator />
          <RadioGroup defaultValue="survival" aria-label="Game mode">
            <RadioGroupItem value="survival" label="Survival" />
            <RadioGroupItem value="creative" label="Creative" />
            <RadioGroupItem value="adventure" label="Adventure" disabled />
          </RadioGroup>
        </Panel>
      </div>
    </Section>
  );
}

function Inputs() {
  return (
    <Section title="Text fields & dropdowns">
      <div className="pg-grid">
        <Panel variant="neutral" className="pg-stack">
          <Field label="World Name" htmlFor="world-name">
            <Input id="world-name" placeholder="My World" defaultValue="Ore Kingdom" />
          </Field>
          <Field label="Seed" htmlFor="seed" description="Leave blank for a random seed">
            <Input id="seed" placeholder="Enter a seed" />
          </Field>
          <Field label="Disabled" htmlFor="dis">
            <Input id="dis" placeholder="Not editable" disabled />
          </Field>
          <Textarea placeholder="Description" rows={3} />
        </Panel>
        <Panel variant="neutral" className="pg-stack">
          <Field label="Difficulty">
            <Select defaultValue="normal" defaultOpen={params.has("open-select")}>
              <SelectTrigger aria-label="Difficulty" />
              <SelectContent>
                <SelectItem value="peaceful">Peaceful</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Render Distance">
            <Select>
              <SelectTrigger placeholder="Choose" aria-label="Render distance" />
              <SelectContent>
                {[8, 12, 16, 24, 32].map((c) => (
                  <SelectItem key={c} value={String(c)}>
                    {c} chunks
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="neutral">World options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>World</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Copy World</DropdownMenuItem>
              <DropdownMenuCheckboxItem checked>Show in list</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Export</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>Ore-styled tooltip</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Panel>
      </div>
    </Section>
  );
}

function Surfaces() {
  const [progress, setProgress] = React.useState(42);
  React.useEffect(() => {
    if (params.has("static")) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 7)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <Section title="Tabs, progress & modal">
      <div className="pg-grid">
        <Tabs defaultValue="general">
          <TabsList aria-label="Settings">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Panel variant="dark" className="pg-stack">
              <Text type="header5A">General</Text>
              <Text type="body" variant="dimmer">
                The selected tab sits depressed; idle tabs keep their slab.
              </Text>
            </Panel>
          </TabsContent>
          <TabsContent value="video">
            <Panel variant="dark">
              <Text type="body">Video settings</Text>
            </Panel>
          </TabsContent>
          <TabsContent value="audio">
            <Panel variant="dark">
              <Text type="body">Audio settings</Text>
            </Panel>
          </TabsContent>
        </Tabs>
        <Panel variant="neutral" className="pg-stack">
          <Text type="body">Downloading resource packs… {progress}%</Text>
          <Progress value={progress} aria-label="Download" />
          <Progress value={progress} size="tall" aria-label="Download tall" />
          <Progress value={80} color="#3c8527" aria-label="Green" />
          <Dialog defaultOpen={params.has("open-dialog")}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete World…</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Delete World</DialogHeader>
              <DialogBody>
                <DialogDescription>
                  Are you sure you want to delete “Ore Kingdom”? This world will be gone forever. (A long time!)
                </DialogDescription>
                <Checkbox label="Don't show this again" />
              </DialogBody>
              <DialogFooter>
                <Button variant="destructive">Delete</Button>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Panel>
      </div>
    </Section>
  );
}

function Typography() {
  return (
    <Section title="Typography">
      <Panel variant="dark" className="pg-stack">
        <Text type="header2" shadow>
          Minecraft
        </Text>
        <Text type="header5A">Header 5A — Minecraft Ten</Text>
        <Text type="header5B">Header 5B — Minecraft Seven</Text>
        <Text type="subtitle2">Subtitle — Minecraft Five</Text>
        <Text type="body">Body — Minecraft Seven 16px</Text>
        <Text type="paragraphs">Paragraphs — Noto Sans 16px</Text>
        <Text type="captionShort" variant="dimmer">
          Caption short — dimmer
        </Text>
        <Text type="captionLong" variant="dimmest">
          Caption long — dimmest
        </Text>
      </Panel>
    </Section>
  );
}

function App() {
  const [realms, setRealms] = React.useState(false);
  return (
    <div className={realms ? "pg ore-theme-realms" : "pg"}>
      <TitleBar
        title="Ore UI × Radix"
        left={<TitleBarAction icon="back" />}
        right={<TitleBarAction icon="close" />}
      />
      <main className="pg-main">
        <div className="pg-row" style={{ justifyContent: "flex-end" }}>
          <Switch label="Realms theme" checked={realms} onCheckedChange={setRealms} />
        </div>
        <Buttons />
        <Controls />
        <Inputs />
        <Surfaces />
        <Typography />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
