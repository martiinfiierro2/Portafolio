import { readFileSync, writeFileSync } from "node:fs";
import { probe } from "file:///C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/lib/probe.mjs";

const rules = readFileSync("C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/lib/rules.mjs", "utf8").replace(/^export /gm, "");
writeFileSync(".playwright-cli/keyboard-design-review.js", `async page => {
${rules}
const probe = ${probe.toString()};
const report = [];
await page.goto('http://127.0.0.1:5178/');
await page.evaluate(() => localStorage.setItem('mf-theme', 'light'));
for (const [width,height] of [[1440,900],[768,1024],[390,844]]) {
  await page.setViewportSize({width,height});
  for (const path of ['/','/proyectos','/sobre-mi','/contacto']) {
    await page.goto('http://127.0.0.1:5178'+path);
    await page.waitForTimeout(path==='/'?3300:850);
    for (const card of await page.locator('.catalog-item').all()) {
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(550);
    }
    await page.evaluate(()=>scrollTo(0,0));
    const metrics = await page.evaluate(probe);
    report.push({path,width,findings:judge(metrics, {width,allow:['gradient','shadow','button-fx','hairline','outlined-box']}),overflow:metrics.page.horizontalOverflow,brokenImages:metrics.page.brokenImages});
    if (path==='/proyectos' && width!==768) await page.screenshot({path:'.taste-skill/keyboard-identity/projects-light-'+width+'.png',fullPage:true});
  }
}
await page.setViewportSize({width:1440,height:900});
await page.goto('http://127.0.0.1:5178/');
return report;
}`);
