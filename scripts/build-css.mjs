// Concatenates the stylesheet partials into dist/styles.css in import order.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const entry = resolve(root, "src/styles/index.css");
const out = resolve(root, "dist/styles.css");

const inline = (file) =>
  readFileSync(file, "utf8").replace(/@import\s+"(.+?)";/g, (_, rel) =>
    inline(resolve(dirname(file), rel)),
  );

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, inline(entry));
console.log(`wrote ${out}`);
