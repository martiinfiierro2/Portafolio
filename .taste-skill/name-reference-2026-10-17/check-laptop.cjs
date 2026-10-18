async page => {
  const results=[];
  await page.emulateMedia({reducedMotion:'no-preference'});
  for(const [width,height] of [[1440,900],[1280,800],[1366,768],[1024,700]]) {
    await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:5177/');
    await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(180);
    results.push(await page.evaluate(()=>{
      const box=s=>document.querySelector(s).getBoundingClientRect().toJSON();
      return {width:innerWidth,height:innerHeight,heading:box('.hero-heading'),inner:box('.hero-inner'),links:box('.hero-links'),tablet:box('.tablet-scene')};
    }));
    if(width===1280) await page.screenshot({path:'.taste-skill/name-reference-2026-10-17/laptop-1280.png'});
  }
  return results;
}
