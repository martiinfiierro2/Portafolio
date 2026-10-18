import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, resolve, relative } from "node:path";

const root = resolve("src");
const visited = new Set();
const missing = [];
function visit(file) {
  if (visited.has(file)) return;
  visited.add(file);
  const source = readFileSync(file, "utf8");
  const pattern = extname(file) === ".css" ? /@import\s+["'](\.[^"']+)["']/g : /import\s+(?:[^;]*?\sfrom\s*)?["'](\.[^"']+)["']/g;
  for (const [, specifier] of source.matchAll(pattern)) {
    const target = resolve(dirname(file), specifier);
    const match = [target, `${target}.jsx`, `${target}.js`, `${target}.css`].find(existsSync);
    if (!match) missing.push(`${relative(root, file)} → ${specifier}`);
    else if (/\.(jsx?|css)$/.test(match)) visit(match);
  }
}
function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? files(path) : /\.(jsx?|css)$/.test(path) ? [path] : [];
  });
}
visit(resolve(root, "main.jsx"));
const unused = files(root).filter(file => !visited.has(file)).map(file => relative(root, file));
console.log(JSON.stringify({ reachable: visited.size, unused, missing }, null, 2));
if (missing.length || unused.length) process.exitCode = 1;
