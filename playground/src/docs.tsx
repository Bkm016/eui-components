import * as React from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  Input,
  Panel,
  PixelIcon,
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

const REPO = "github:Bkm016/eui-components#claude/minecraft-ore-ui-raduxui-cyrpqd";

/* Building blocks -------------------------------------------------------- */

export function Code({ children }: { children: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };
  return (
    <div className="pg-code">
      <pre>
        <code>{children}</code>
      </pre>
      <button type="button" className="pg-code__copy" onClick={copy}>
        {copied ? "已复制" : "复制"}
      </button>
    </div>
  );
}

type PropRow = [name: string, type: string, def: string, desc: string];

function Props({ rows }: { rows: PropRow[] }) {
  return (
    <div className="pg-table-wrap">
      <table className="pg-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>类型</th>
            <th>默认值</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, type, def, desc]) => (
            <tr key={name}>
              <td>
                <code>{name}</code>
              </td>
              <td>
                <code>{type}</code>
              </td>
              <td>{def === "" ? "—" : <code>{def}</code>}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface DocEntry {
  id: string;
  name: string;
  radix?: string;
  desc: React.ReactNode;
  demo: React.ReactNode;
  code: string;
  props?: PropRow[];
  notes?: React.ReactNode;
}

function DocBlock({ entry }: { entry: DocEntry }) {
  return (
    <section className="pg-doc" id={entry.id}>
      <div className="pg-doc__head">
        <Text type="header5A">{entry.name}</Text>
        {entry.radix ? (
          <span className="pg-badge">Radix · {entry.radix}</span>
        ) : null}
      </div>
      <Text type="paragraphs" variant="dimmer" asChild>
        <p className="pg-doc__desc">{entry.desc}</p>
      </Text>
      <Panel variant="dark" className="pg-doc__demo">
        {entry.demo}
      </Panel>
      <Code>{entry.code}</Code>
      {entry.props ? <Props rows={entry.props} /> : null}
      {entry.notes ? <div className="pg-doc__notes">{entry.notes}</div> : null}
    </section>
  );
}

/* Getting started ---------------------------------------------------------- */

export function GettingStarted() {
  return (
    <div className="pg-prose">
      <Text type="header3">快速开始</Text>
      <p>
        这是一套 React 组件，外观复刻 Minecraft 基岩版的 <b>Ore UI</b>（设置、开始游戏等新版界面），
        交互和无障碍能力由 <b>Radix UI</b> 提供：键盘操作、焦点管理、屏幕阅读器支持都已经内置。
      </p>

      <Text type="header5A">1. 安装</Text>
      <p>这个包还没有发布到 npm，直接从 GitHub 安装（安装时会自动构建）：</p>
      <Code>{`npm install ${REPO} react react-dom`}</Code>
      <p>需要 React 18 或 19。pnpm / yarn 同理，把上面的地址换进对应的安装命令即可。</p>

      <Text type="header5A">2. 引入样式</Text>
      <p>在应用入口（例如 <code>main.tsx</code>）引入一次样式表：</p>
      <Code>{`import "@eui-components/ore-ui/styles.css";`}</Code>

      <Text type="header5A">3. 加上根类名</Text>
      <p>
        给页面的根元素加 <code>ore-theme</code> 类，它负责基础字体、文字颜色和 <code>box-sizing</code>。
        通常直接加在 <code>&lt;body&gt;</code> 上：
      </p>
      <Code>{`<body class="ore-theme">`}</Code>

      <Text type="header5A">4. 使用组件</Text>
      <Code>{`import { Button, Switch, Slider, Field } from "@eui-components/ore-ui";

export default function Settings() {
  const [volume, setVolume] = React.useState([70]);
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
      <Button variant="hero">Play</Button>
      <Switch label="Show Coordinates" defaultChecked />
      <Field label="Main Volume" value={\`\${volume[0]}%\`}>
        <Slider value={volume} onValueChange={setVolume} aria-label="Main volume" />
      </Field>
    </div>
  );
}`}</Code>
      <Panel variant="dark" className="pg-stack" style={{ maxWidth: 420 }}>
        <Button variant="hero">Play</Button>
        <Switch label="Show Coordinates" defaultChecked />
        <Field label="Main Volume" value="70%">
          <Slider defaultValue={[70]} aria-label="Main volume" />
        </Field>
      </Panel>

      <Text type="header5A">5. 字体（可选，但强烈建议）</Text>
      <p>
        原版像素字体（Minecraft Ten / Seven / Five）属于 Mojang，不能随包分发。没有这些字体时，组件会退回 Noto Sans
        或系统字体，布局和颜色不受影响，只是文字不是像素风。如果你有使用权，可以从游戏目录
        <code>data/gui/dist/hbui/fonts</code> 复制字体文件，然后声明：
      </p>
      <Code>{`@font-face { font-family: "Minecraft Ten v2";   src: url("/fonts/Minecraft-Ten.otf"); }
@font-face { font-family: "Minecraft Seven v2"; src: url("/fonts/Minecraft-Seven.otf"); }
@font-face { font-family: "Minecraft Five v2";  src: url("/fonts/Minecraft-Five.otf"); }`}</Code>

      <Text type="header5A">6. 主题与缩放</Text>
      <p>所有尺寸都由一个变量推算，相当于游戏里的“界面缩放”：</p>
      <Code>{`:root { --ore-rem: 12px; }   /* 默认 10px；12px ≈ 120% 缩放 */`}</Code>
      <p>切换 Realms 紫色主题，只需在外层再加一个类：</p>
      <Code>{`<div class="ore-theme ore-theme-realms">…</div>`}</Code>
      <p>也可以单独覆盖某个颜色变量，常用变量如下：</p>
      <Props
        rows={[
          ["--ore-rem", "length", "10px", "缩放基准，1 个像素格 = --ore-rem / 5"],
          ["--ore-primary-bg", "color", "#3c8527", "主色（绿色按钮、选中状态）"],
          ["--ore-primary-bg-hover", "color", "#2a641c", "主色悬停"],
          ["--ore-primary-bg-pressed", "color", "#1d4d13", "主色按下 / 厚度层"],
          ["--ore-secondary-bg", "color", "#d0d1d4", "浅灰按钮"],
          ["--ore-destructive-bg", "color", "#ca3636", "红色危险按钮"],
          ["--ore-surface-neutral", "color", "#48494a", "面板、标题栏底色"],
          ["--ore-surface-neutral-80", "color", "#313233", "深色内容区、输入框"],
          ["--ore-outline", "color", "#1e1e1f", "所有控件的深色描边"],
          ["--ore-caret", "color", "#6cc349", "输入框光标"],
          ["--ore-font-ui / -heading / -body", "font", "", "界面 / 标题 / 正文字体栈"],
        ]}
      />

      <Text type="header5A">在 Next.js 中使用</Text>
      <p>
        组件已带 <code>"use client"</code>，可以直接在 App Router 的服务端组件里引用。在
        <code>app/layout.tsx</code> 中引入样式并给 body 加类名：
      </p>
      <Code>{`import "@eui-components/ore-ui/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="ore-theme">{children}</body>
    </html>
  );
}`}</Code>
    </div>
  );
}

/* Component reference ------------------------------------------------------ */

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">删除世界…</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Delete World</DialogHeader>
        <DialogBody>
          <DialogDescription>确定要删除“Ore Kingdom”吗？这个世界会永久消失。</DialogDescription>
        </DialogBody>
        <DialogFooter>
          <Button variant="destructive">Delete</Button>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ENTRIES: DocEntry[] = [
  {
    id: "button",
    name: "Button 按钮",
    radix: "Slot",
    desc: "Ore UI 的立体按钮：深色描边、高光边和底部 4px 厚度层，按下时按钮面下沉。默认是浅灰色的 secondary。",
    demo: (
      <div className="pg-row">
        <Button variant="hero">Play</Button>
        <Button variant="primary">Create New</Button>
        <Button variant="secondary">Settings</Button>
        <Button variant="neutral">Marketplace</Button>
        <Button variant="destructive">Delete</Button>
        <Button disabled>Disabled</Button>
      </div>
    ),
    code: `<Button variant="hero">Play</Button>
<Button variant="primary" onClick={save}>Create New</Button>
<Button>Settings</Button>                         {/* 默认 secondary */}
<Button variant="destructive" disabled>Delete</Button>
<Button variant="neutral" elevated={false}>扁平</Button>
<Button asChild variant="primary"><a href="/worlds">链接按钮</a></Button>`,
    props: [
      ["variant", '"hero" | "primary" | "secondary" | "neutral" | "destructive"', '"secondary"', "颜色角色；hero 使用 Minecraft Ten 大字"],
      ["elevated", "boolean", "true", "是否有底部厚度层和按下动画"],
      ["pressed", "boolean", "false", "强制保持按下外观（做切换按钮用）"],
      ["size", '"default" | "icon"', '"default"', "icon 为正方形图标按钮"],
      ["fullWidth", "boolean", "false", "占满整行"],
      ["asChild", "boolean", "false", "把样式套到子元素上（如 <a>、路由 Link）"],
      ["...rest", "ButtonHTMLAttributes", "", "原生 button 属性（onClick、disabled 等）"],
    ],
    notes: (
      <p>
        <code>ButtonGroup</code> 用于把一组按钮按 Ore UI 的 0.4rem 间距排列，<code>orientation</code> 为
        <code>"vertical"</code>（默认）或 <code>"horizontal"</code>。
      </p>
    ),
  },
  {
    id: "switch",
    name: "Switch 开关",
    radix: "Switch",
    desc: "左侧绿色半边带 “I”、右侧灰色半边带 “O”，滑块凸起在轨道上，切换时播放游戏里的跳格动画。",
    demo: (
      <div className="pg-stack" style={{ maxWidth: 360 }}>
        <Switch label="Show Coordinates" defaultChecked />
        <Switch label="Day Light Cycle" description="时间会自然流逝" />
        <Switch label="Locked" disabled defaultChecked />
      </div>
    ),
    code: `const [on, setOn] = React.useState(true);

<Switch label="Show Coordinates" checked={on} onCheckedChange={setOn} />
<Switch label="Day Light Cycle" description="时间会自然流逝" />
<Switch aria-label="仅开关，不带文字" />`,
    props: [
      ["checked / defaultChecked", "boolean", "", "受控 / 非受控的选中状态"],
      ["onCheckedChange", "(checked: boolean) => void", "", "状态变化回调"],
      ["label", "ReactNode", "", "左侧标题，点击标题也能切换"],
      ["description", "ReactNode", "", "标题下方的说明文字"],
      ["disabled", "boolean", "false", "禁用"],
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox 复选框",
    radix: "Checkbox",
    desc: "24px 方框，未选中为灰色，选中为绿色并显示像素对勾。支持 indeterminate（半选）。",
    demo: (
      <div className="pg-stack">
        <Checkbox label="Remember my choice" defaultChecked />
        <Checkbox label="Allow cheats" description="允许在这个世界使用命令" />
        <Checkbox label="Unavailable" disabled />
      </div>
    ),
    code: `<Checkbox label="Remember my choice" defaultChecked />
<Checkbox
  label="Allow cheats"
  description="允许在这个世界使用命令"
  checked={cheats}
  onCheckedChange={(v) => setCheats(v === true)}
/>`,
    props: [
      ["checked / defaultChecked", 'boolean | "indeterminate"', "", "选中状态"],
      ["onCheckedChange", '(checked: boolean | "indeterminate") => void', "", "状态变化回调"],
      ["label / description", "ReactNode", "", "右侧的文字和说明"],
      ["disabled", "boolean", "false", "禁用"],
    ],
  },
  {
    id: "radio",
    name: "RadioGroup 单选",
    radix: "RadioGroup",
    desc: "Ore UI 的 RadioBox：旋转 45° 的菱形，选中后中间出现四格宝石。支持方向键切换。",
    demo: (
      <RadioGroup defaultValue="survival" aria-label="Game mode">
        <RadioGroupItem value="survival" label="Survival" />
        <RadioGroupItem value="creative" label="Creative" description="无限资源，可以飞行" />
        <RadioGroupItem value="adventure" label="Adventure" disabled />
      </RadioGroup>
    ),
    code: `<RadioGroup value={mode} onValueChange={setMode} aria-label="Game mode">
  <RadioGroupItem value="survival" label="Survival" />
  <RadioGroupItem value="creative" label="Creative" description="无限资源，可以飞行" />
  <RadioGroupItem value="adventure" label="Adventure" disabled />
</RadioGroup>`,
    props: [
      ["value / defaultValue", "string", "", "RadioGroup：当前选中项"],
      ["onValueChange", "(value: string) => void", "", "RadioGroup：选中变化回调"],
      ["orientation", '"vertical" | "horizontal"', '"vertical"', "RadioGroup：排列方向"],
      ["value", "string", "", "RadioGroupItem：该项的值（必填）"],
      ["label / description / disabled", "", "", "RadioGroupItem：文字、说明、禁用"],
    ],
  },
  {
    id: "slider",
    name: "Slider 滑块",
    radix: "Slider",
    desc: "灰色轨道配绿色填充，滑块带回弹动画。showSteps 会在每一档画出刻度。通常放在 Field 里显示标题和当前值。",
    demo: (
      <div className="pg-stack">
        <Field label="Main Volume" value="70%">
          <Slider defaultValue={[70]} aria-label="Main volume" />
        </Field>
        <Field label="Field of View" value="60">
          <Slider defaultValue={[60]} min={30} max={110} step={10} showSteps aria-label="FOV" />
        </Field>
      </div>
    ),
    code: `const [volume, setVolume] = React.useState([70]);

<Field label="Main Volume" value={\`\${volume[0]}%\`}>
  <Slider value={volume} onValueChange={setVolume} aria-label="Main volume" />
</Field>

<Slider defaultValue={[60]} min={30} max={110} step={10} showSteps aria-label="FOV" />`,
    props: [
      ["value / defaultValue", "number[]", "", "注意是数组；两个值即为区间滑块"],
      ["onValueChange", "(value: number[]) => void", "", "拖动时回调"],
      ["onValueCommit", "(value: number[]) => void", "", "松手后回调"],
      ["min / max / step", "number", "0 / 100 / 1", "范围和步长"],
      ["showSteps", "boolean", "false", "显示每一档的刻度线"],
      ["disabled", "boolean", "false", "禁用"],
    ],
  },
  {
    id: "input",
    name: "Input / Textarea 输入框",
    desc: "深色输入框，顶部有内阴影，光标是绿色的。就是原生 input / textarea，所有原生属性都可以用。",
    demo: (
      <div className="pg-stack">
        <Field label="World Name" htmlFor="doc-name">
          <Input id="doc-name" placeholder="My World" />
        </Field>
        <Textarea placeholder="Description" rows={3} />
      </div>
    ),
    code: `<Field label="World Name" htmlFor="world-name" description="最多 32 个字符">
  <Input id="world-name" placeholder="My World" value={name}
         onChange={(e) => setName(e.target.value)} maxLength={32} />
</Field>

<Textarea placeholder="Description" rows={3} />
<Input aria-invalid={true} />   {/* 校验失败时左右抖动一下 */}`,
    props: [
      ["...rest", "InputHTMLAttributes / TextareaHTMLAttributes", "", "原生属性"],
      ["aria-invalid", "boolean", "", "设为 true 时播放游戏里的抖动动画"],
    ],
  },
  {
    id: "field",
    name: "Field 表单项",
    desc: "设置页里的一行：左边标题、右边当前值，下面是说明和控件。Label 是单独的文字标签组件。",
    demo: (
      <Field label="Render Distance" value="16 chunks" description="数值越大越耗性能">
        <Slider defaultValue={[16]} min={4} max={32} aria-label="Render distance" />
      </Field>
    ),
    code: `<Field label="Render Distance" value="16 chunks" description="数值越大越耗性能">
  <Slider defaultValue={[16]} min={4} max={32} aria-label="Render distance" />
</Field>`,
    props: [
      ["label", "ReactNode", "", "标题"],
      ["value", "ReactNode", "", "右侧显示的当前值"],
      ["description", "ReactNode", "", "说明文字"],
      ["htmlFor", "string", "", "关联的控件 id，点击标题会聚焦控件"],
      ["disabled", "boolean", "false", "标题变暗"],
    ],
  },
  {
    id: "select",
    name: "Select 下拉选择",
    radix: "Select",
    desc: "浅灰色的下拉按钮；展开后列表像游戏里一样覆盖在按钮上方，选中项右边有对勾。",
    demo: (
      <Field label="Difficulty">
        <Select defaultValue="normal">
          <SelectTrigger aria-label="Difficulty" />
          <SelectContent>
            <SelectItem value="peaceful">Peaceful</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    ),
    code: `<Select value={difficulty} onValueChange={setDifficulty}>
  <SelectTrigger placeholder="Choose" aria-label="Difficulty" />
  <SelectContent>
    <SelectItem value="peaceful">Peaceful</SelectItem>
    <SelectItem value="easy">Easy</SelectItem>
    <SelectItem value="normal">Normal</SelectItem>
    <SelectItem value="hard">Hard</SelectItem>
  </SelectContent>
</Select>`,
    props: [
      ["value / defaultValue", "string", "", "Select：当前值"],
      ["onValueChange", "(value: string) => void", "", "Select：选择回调"],
      ["placeholder", "ReactNode", "", "SelectTrigger：未选择时的斜体提示"],
      ["elevated", "boolean", "true", "SelectTrigger：是否带厚度层"],
      ["value / disabled", "string / boolean", "", "SelectItem：选项值、禁用"],
    ],
    notes: <p>还可以用 SelectGroup、SelectLabel、SelectSeparator 给选项分组。</p>,
  },
  {
    id: "dropdown",
    name: "DropdownMenu 下拉菜单",
    radix: "DropdownMenu",
    desc: "操作菜单，菜单项样式和 Select 一致。触发器可以是任意按钮。",
    demo: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="neutral">World options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Copy World</DropdownMenuItem>
          <DropdownMenuCheckboxItem checked>Show in list</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Export</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="neutral">World options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={edit}>Edit</DropdownMenuItem>
    <DropdownMenuCheckboxItem checked={visible} onCheckedChange={setVisible}>
      Show in list
    </DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem disabled>Export</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    notes: (
      <p>
        还有 DropdownMenuLabel、DropdownMenuRadioGroup / RadioItem、DropdownMenuSub / SubTrigger / SubContent（二级菜单）。
        菜单项用 <code>onSelect</code> 处理点击。
      </p>
    ),
  },
  {
    id: "dialog",
    name: "Dialog 弹窗",
    radix: "Dialog",
    desc: "Ore UI 的 Modal：灰色标题栏带关闭按钮，深色内容区，底部按钮区按钮竖向堆叠。按 Esc 或点遮罩关闭，焦点会锁定在弹窗内。",
    demo: <DialogDemo />,
    code: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="destructive">删除世界…</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>Delete World</DialogHeader>
    <DialogBody>
      <DialogDescription>确定要删除吗？这个世界会永久消失。</DialogDescription>
    </DialogBody>
    <DialogFooter>
      <Button variant="destructive" onClick={remove}>Delete</Button>
      <DialogClose asChild>
        <Button>Cancel</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    props: [
      ["open / defaultOpen / onOpenChange", "", "", "Dialog：打开状态"],
      ["showClose", "boolean", "true", "DialogHeader：是否显示右上角 X"],
      ["onBack", "() => void", "", "DialogHeader：传入后左上角显示返回箭头"],
      ["orientation", '"vertical" | "horizontal"', '"vertical"', "DialogFooter：按钮排列方向"],
    ],
    notes: <p>DialogHeader 的内容就是标题，会自动作为弹窗的无障碍名称。</p>,
  },
  {
    id: "tabs",
    name: "Tabs 标签页",
    radix: "Tabs",
    desc: "Ore UI 的 TabBar：未选中的标签凸起，选中的标签按下去。支持左右方向键切换。",
    demo: (
      <Tabs defaultValue="general">
        <TabsList aria-label="Settings">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Panel>General settings</Panel>
        </TabsContent>
        <TabsContent value="video">
          <Panel>Video settings</Panel>
        </TabsContent>
        <TabsContent value="audio">
          <Panel>Audio settings</Panel>
        </TabsContent>
      </Tabs>
    ),
    code: `<Tabs defaultValue="general">
  <TabsList aria-label="Settings">
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="video">Video</TabsTrigger>
  </TabsList>
  <TabsContent value="general">…</TabsContent>
  <TabsContent value="video">…</TabsContent>
</Tabs>`,
    props: [
      ["value / defaultValue / onValueChange", "string", "", "Tabs：当前标签"],
      ["value", "string", "", "TabsTrigger / TabsContent：对应的标签值"],
    ],
  },
  {
    id: "progress",
    name: "Progress 进度条",
    radix: "Progress",
    desc: "4px 高的深色细条，默认是蓝色填充，size=\"tall\" 时为 8px。",
    demo: (
      <div className="pg-stack">
        <Progress value={42} aria-label="Download" />
        <Progress value={65} size="tall" aria-label="Tall" />
        <Progress value={80} color="#3c8527" aria-label="Green" />
      </div>
    ),
    code: `<Progress value={42} aria-label="Download" />
<Progress value={65} size="tall" />
<Progress value={3} max={10} color="#3c8527" />`,
    props: [
      ["value", "number | null", "", "当前进度"],
      ["max", "number", "100", "最大值"],
      ["size", '"default" | "tall"', '"default"', "高度 4px / 8px"],
      ["color", "string", "#2e6be5", "填充颜色"],
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip 提示",
    radix: "Tooltip",
    desc: "游戏菜单里没有提示框，这是按 Ore UI 风格补设计的：深色底、深色描边。整个应用外层需要包一个 TooltipProvider。",
    demo: (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>把鼠标移上来</Button>
          </TooltipTrigger>
          <TooltipContent>Ore 风格的提示</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    code: `<TooltipProvider delayDuration={200}>   {/* 放在应用根部一次即可 */}
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent side="top">Ore 风格的提示</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  {
    id: "panel",
    name: "Panel / Separator 面板与分隔线",
    radix: "Separator",
    desc: "带描边和斜面的容器，用来组织一块设置区域。Separator 是凹进去的分隔线。",
    demo: (
      <div className="pg-row">
        <Panel style={{ minWidth: 140 }}>neutral</Panel>
        <Panel variant="dark" style={{ minWidth: 140 }}>
          dark
        </Panel>
        <Panel variant="darkest" style={{ minWidth: 140 }}>
          darkest
        </Panel>
        <Panel variant="paper" style={{ minWidth: 140 }}>
          paper
        </Panel>
      </div>
    ),
    code: `<Panel>默认 #48494a</Panel>
<Panel variant="dark">#313233</Panel>
<Panel variant="darkest" padded={false}>#1e1e1f，无内边距</Panel>
<Panel variant="paper" bevel={false}>白底，无斜面</Panel>
<Separator />                       {/* 横向 */}
<Separator orientation="vertical" />`,
    props: [
      ["variant", '"neutral" | "dark" | "darkest" | "paper"', '"neutral"', "底色"],
      ["bevel", "boolean", "true", "斜面高光"],
      ["padded", "boolean", "true", "16px 内边距"],
    ],
  },
  {
    id: "titlebar",
    name: "TitleBar 标题栏",
    desc: "游戏界面顶部的灰色标题栏，左右两个位置通常放返回和关闭按钮（TitleBarAction）。",
    demo: (
      <TitleBar
        title="Settings"
        left={<TitleBarAction icon="back" />}
        right={<TitleBarAction icon="close" />}
      />
    ),
    code: `<TitleBar
  title="Settings"
  left={<TitleBarAction icon="back" onClick={goBack} />}
  right={<TitleBarAction icon="close" onClick={close} />}
/>`,
    props: [
      ["title", "ReactNode", "", "居中的标题（Minecraft Ten 字体）"],
      ["left / right", "ReactNode", "", "左右两侧的操作"],
      ["icon", '"back" | "close"', "", "TitleBarAction：图标"],
    ],
  },
  {
    id: "text",
    name: "Text 文字排版",
    desc: "游戏里的全部文字样式。header1–3、header4A/5A、sectionHeader 用 Minecraft Ten；header4B/5B、body、caption 用 Minecraft Seven；subtitle 用 Minecraft Five；paragraphs、captionLong 用 Noto Sans。",
    demo: (
      <div className="pg-stack">
        <Text type="header3" shadow>
          Minecraft
        </Text>
        <Text type="header5A">header5A</Text>
        <Text type="subtitle2">subtitle2</Text>
        <Text type="body">body</Text>
        <Text type="captionShort" variant="dimmer">
          captionShort · dimmer
        </Text>
      </div>
    ),
    code: `<Text type="header2" shadow>Minecraft</Text>   {/* 渲染为 <h2> */}
<Text type="body">正文</Text>
<Text type="captionShort" variant="dimmer">说明</Text>
<Text type="paragraphs" asChild><p>段落</p></Text>`,
    props: [
      ["type", "header1…5B | sectionHeader | subtitle1/2 | body | paragraphs | caption*", '"body"', "字体、字号、行高"],
      ["variant", '"regular" | "dimmer" | "dimmest"', '"regular"', "颜色深浅"],
      ["align", '"left" | "center" | "right"', "", "对齐"],
      ["shadow", "boolean", "false", "像素文字阴影"],
    ],
  },
  {
    id: "icon",
    name: "PixelIcon 像素图标",
    desc: "从游戏里复刻的小图标，颜色跟随文字颜色（currentColor）。",
    demo: (
      <div className="pg-row pg-icons">
        {(["check", "chevronDown", "arrowDown", "chevronLeft", "chevronRight", "close", "ring", "dot"] as const).map(
          (n) => (
            <span key={n} className="pg-icon-cell">
              <PixelIcon name={n} style={{ width: 20, height: 20 }} />
              <code>{n}</code>
            </span>
          ),
        )}
      </div>
    ),
    code: `<PixelIcon name="check" />
<PixelIcon name="close" label="关闭" style={{ width: 20, height: 20 }} />`,
    props: [
      ["name", "check | chevronDown | arrowDown | chevronLeft | chevronRight | close | ring | dot", "", "图标"],
      ["label", "string", "", "提供后作为无障碍名称，否则视为装饰"],
    ],
  },
];

export function ComponentDocs() {
  return (
    <div className="pg-docs">
      <nav className="pg-toc" aria-label="组件目录">
        {ENTRIES.map((e) => (
          <a key={e.id} href={`#${e.id}`}>
            {e.name}
          </a>
        ))}
      </nav>
      <div className="pg-docs__list">
        <Text type="paragraphs" variant="dimmer" asChild>
          <p>
            所有组件都会把多余的属性透传给底层元素或 Radix 原语，所以 Radix 文档里的属性（如 <code>onOpenChange</code>、
            <code>side</code>、<code>align</code>）都可以直接使用。每个组件都支持 <code>className</code> 和 <code>ref</code>。
          </p>
        </Text>
        {ENTRIES.map((e) => (
          <React.Fragment key={e.id}>
            <DocBlock entry={e} />
            <Separator />
          </React.Fragment>
        ))}
        <ButtonGroup orientation="horizontal" style={{ maxWidth: 360 }}>
          <Button asChild variant="neutral">
            <a href="#button">回到顶部</a>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
