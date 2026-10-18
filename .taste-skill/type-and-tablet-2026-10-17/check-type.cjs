async page => {
  const base = 'http://127.0.0.1:5177';
  const output = '.taste-skill/type-and-tablet-2026-10-17';
  const results = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const theme of ['light','dark']) {
    await page.goto(base);
    await page.evaluate(value=>localStorage.setItem('mf-theme',value),theme);
    for (const width of [1440,768,390,320]) {
      await page.setViewportSize({width,height:width===768?1024:width>1000?900:844});
      await page.goto(base);
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(180);
      const state = await page.evaluate(()=>({
        width:innerWidth,
        theme:document.querySelector('.site').dataset.theme,
        fontLoaded:document.fonts.check('400 18px Oswald'),
        textFonts:[...document.querySelectorAll('.hero-copy h2,.hero-description,.nav-link,.catalog-row-copy h3,.catalog-row-copy p,#projects-title,.about-lead')].map(el=>getComputedStyle(el).fontFamily),
        backgrounds:[...document.querySelectorAll('.site,.projects,.about,.connect,.footer')].map(el=>({element:el.className,image:getComputedStyle(el).backgroundImage})),
        overflow:document.documentElement.scrollWidth-innerWidth,
        switchWidth:document.querySelector('.switch').getBoundingClientRect().width,
        switchHeight:document.querySelector('.switch').getBoundingClientRect().height,
      }));
      if(!state.fontLoaded||state.textFonts.some(font=>!font.includes('Oswald'))) throw new Error('Condensed font not applied: '+JSON.stringify(state));
      if(state.backgrounds.some(background=>background.image!=='none')) throw new Error('Page grid remains: '+JSON.stringify(state));
      if(state.overflow!==0) throw new Error('Horizontal overflow: '+JSON.stringify(state));
      if(state.switchWidth!==56||state.switchHeight!==32) throw new Error('Theme switch changed size');
      results.push(state);
      if([1440,390].includes(width)) {
        await page.screenshot({path:`${output}/${width}-${theme}-home.png`});
        await page.getByRole('link',{name:'Explorar proyectos',exact:true}).click();
        await page.waitForFunction(()=>document.querySelector('.portfolio-journey')?.dataset.progress==='1.0000');
        await page.waitForTimeout(700);
        await page.screenshot({path:`${output}/${width}-${theme}-projects.png`});
      }
    }
  }
  await page.setViewportSize({width:1440,height:900});
  await page.goto(base);
  if(errors.length) throw new Error(errors.join('; '));
  return {passed:true,results,errors};
}
