async (page) => {
  const base = 'http://127.0.0.1:5177';
  const output = '.taste-skill/name-reference-2026-10-17';
  const results = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const position = async (progress) => {
    await page.evaluate(value => {
      const track = document.querySelector('.journey-track');
      const stage = document.querySelector('.journey-stage');
      const top = parseFloat(getComputedStyle(stage).top);
      const start = track.getBoundingClientRect().top + scrollY - top;
      window.scrollTo({ top: start + value * (track.offsetHeight - stage.offsetHeight), behavior: 'instant' });
    }, progress);
    await page.waitForTimeout(120);
  };

  for (const [width, height] of [[1440,900],[1280,800],[768,1024],[390,844],[375,667],[320,700]]) {
    await page.setViewportSize({width,height});
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(180);
    for (const progress of [0,0.25,0.56,0.78,1,0]) {
      await position(progress);
      const state = await page.evaluate(() => {
        const rect = selector => {
          const b = document.querySelector(selector).getBoundingClientRect();
          return {x:b.x,y:b.y,width:b.width,height:b.height,bottom:b.bottom};
        };
        const stage = rect('.journey-stage');
        const tablet = rect('.project-tablet');
        return {
          progress: Number(document.querySelector('.portfolio-journey').dataset.progress),
          overflow: document.documentElement.scrollWidth - innerWidth,
          centerErrorX: Math.abs(tablet.x + tablet.width / 2 - innerWidth / 2),
          centerErrorY: Math.abs(tablet.y + tablet.height / 2 - (stage.y + stage.height / 2)),
          catalogCount: document.querySelectorAll('#proyectos').length,
          catalogInert: document.querySelector('.journey-catalog').inert,
          catalogTop: rect('.journey-catalog').y,
          catalogOpacity: Number(getComputedStyle(document.querySelector('.journey-catalog')).opacity),
          explore: rect('.tablet-explore'),
          links: rect('.hero-links'),
          tablet,
          stage,
        };
      });
      check(state.overflow === 0, `Overflow ${state.overflow} at ${width}px, progress ${progress}`);
      check(state.catalogCount === 1, 'Catalog duplicated');
      check(Math.abs(state.progress - progress) < 0.003, `Scroll progress mismatch: ${JSON.stringify(state)}`);
      if (progress === 0) {
        check(state.catalogInert, 'Hidden catalog must be inert');
        check(state.explore.bottom <= height + 1, `Explore button below first viewport at ${width}x${height}: ${JSON.stringify(state)}`);
        check(state.explore.bottom <= state.links.y + 2, `Tablet overlaps social links at ${width}x${height}: ${JSON.stringify(state)}`);
      }
      if (progress === 0.56) check(state.centerErrorX < 2 && state.centerErrorY < 2, `Tablet not centered at ${width}px: ${JSON.stringify(state)}`);
      if (progress === 1) check(!state.catalogInert && state.catalogOpacity === 1 && Math.abs(state.catalogTop - state.stage.y) < 2, `Catalog handoff jumps at ${width}px: ${JSON.stringify(state)}`);
      results.push({width,height,at:progress,...state});
      if ([1440,390].includes(width) && [0,0.25,0.56,0.78,1].includes(progress)) {
        await page.waitForTimeout(progress === 1 ? 650 : 20);
        await page.screenshot({path:`${output}/${width}-stage-${progress}.png`});
      }
    }
  }
  check(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  return {passed:true,layouts:results.map(({width,height,at,progress,overflow,centerErrorX,centerErrorY,catalogInert})=>({width,height,at,progress,overflow,centerErrorX,centerErrorY,catalogInert})),errors};
}

