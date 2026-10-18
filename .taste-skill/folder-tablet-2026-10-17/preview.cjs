async page => {
  const base='http://127.0.0.1:5177';
  await page.setViewportSize({width:1440,height:900});
  await page.goto(base);
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({path:'.taste-skill/folder-tablet-2026-10-17/desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.goto(base);
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({path:'.taste-skill/folder-tablet-2026-10-17/mobile.png'});
  return await page.evaluate(()=>({
    overflow:document.documentElement.scrollWidth-innerWidth,
    titleHeight:document.querySelector('.hero-heading').getBoundingClientRect().height,
    tablet:document.querySelector('.project-tablet').getBoundingClientRect().toJSON(),
    name:document.querySelector('.hero-name-drawing').getBoundingClientRect().toJSON(),
    bodyError:[...document.querySelectorAll('[style]')].some(el=>/NaN|Infinity/.test(el.getAttribute('style'))),
  }));
}
