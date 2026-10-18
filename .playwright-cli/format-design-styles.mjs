import postcss from "postcss";
import { readFileSync, writeFileSync } from "node:fs";

for (const file of ["src/pages/Home.css", "src/pages/About.css", "src/pages/Contact.css", "src/styles/base.css", "src/components/SocialMedia.css"]) {
  const root = postcss.parse(readFileSync(file, "utf8"));
  root.walk(node => {
    let depth = 0;
    for (let parent = node.parent; parent?.type !== "root"; parent = parent.parent) depth++;
    const indent = "  ".repeat(depth);
    node.raws.before = (depth === 0 ? "\n\n" : "\n") + indent;
    node.raws.between = node.type === "decl" ? ": " : " ";
    if (node.nodes) {
      node.raws.after = "\n" + indent;
      node.raws.semicolon = true;
    }
  });
  root.raws.after = "\n";
  writeFileSync(file, root.toString().trimStart());
}
