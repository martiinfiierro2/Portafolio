import { readFileSync, writeFileSync } from "node:fs";
import { probe } from "file:///C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/lib/probe.mjs";

const rules = readFileSync("C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/lib/rules.mjs", "utf8").replace(/^export /gm, "");
const code = `async page => {
${rules}
const probe = ${probe.toString()};
const report = [];
for (const [width, height] of [[1440,900],[768,1024],[390,844]]) {
  await page.setViewportSize({width, height});
  await page.goto('http://127.0.0.1:5178/');
  await page.waitForTimeout(2700);
  for (const id of ['proyectos','sobre-mi','contacto']) {
    await page.locator('#' + id).scrollIntoViewIfNeeded();
    await page.waitForTimeout(750);
  }
  await page.evaluate(() => scrollTo(0,0));
  await page.waitForTimeout(200);
  const metrics = await page.evaluate(probe);
  report.push({width, findings: judge(metrics, {width, allow: ['shadow','button-fx','hairline','outlined-box','font-count']}), overTwoLines: metrics.headings.filter(h => h.lines > 2).map(h => ({text:h.text,lines:h.lines})), brokenImages: metrics.page.brokenImages, overflow: metrics.page.horizontalOverflow});
}
return report;
}`;
writeFileSync(".playwright-cli/keyboard-taste-review.txt", code);
