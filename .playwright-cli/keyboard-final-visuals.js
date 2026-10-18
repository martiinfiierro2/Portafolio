async page => {
  const root = 'http://127.0.0.1:5178';
  const report = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(root);
  await page.evaluate(() => localStorage.setItem('mf-theme','light'));
  for (const theme of ['light','dark']) {
    for (const width of [1440,390,320]) {
      await page.setViewportSize({width,height:width===1440?900:844});
      for (const [name,path] of [['home','/'],['about','/sobre-mi'],['contact','/contacto'],['detail','/proyectos/portfolio'],['taskflow','/demos/taskflow'],['pulse-api','/demos/pulse-api'],['media-lab','/demos/media-lab']]) {
        await page.goto(root+path);
        await page.waitForTimeout(name==='home'?3500:800);
        const metrics = await page.evaluate(() => ({
          overflow:document.documentElement.scrollWidth>innerWidth,
          font:document.fonts.check('400 16px Manrope'),
          heading:document.querySelector('main h1')?.textContent,
          theme:document.querySelector('.site').dataset.theme,
          images:[...document.querySelectorAll('main img')].filter(img => !img.closest('dialog')).every(img=>img.complete&&img.naturalWidth>0),
        }));
        if (metrics.overflow || !metrics.font) throw new Error(JSON.stringify({name,theme,width,...metrics}));
        if (metrics.theme!==theme) throw new Error('Wrong theme: '+JSON.stringify(metrics));
        if (width!==320 && (theme==='light' || ['home','about','contact'].includes(name))) {
          for (const block of await page.locator('.detail-section').all()) {
            await block.scrollIntoViewIfNeeded();
            await page.waitForTimeout(550);
          }
          await page.evaluate(()=>scrollTo(0,0));
          await page.screenshot({path:'.taste-skill/keyboard-identity/'+name+'-'+theme+'-'+width+'.png',fullPage:true});
        }
        if (name==='home'&&theme==='light'&&width!==320) await page.locator('.hero').screenshot({path:'public/projects/portfolio-keyboard-'+(width===1440?'desktop':'mobile')+'.png'});
        if (theme==='dark'&&width===1440&&['taskflow','pulse-api','media-lab'].includes(name)) {
          if (name==='pulse-api') {
            await page.getByRole('button',{name:/Ejecutar consulta/}).click();
            await page.waitForTimeout(850);
          }
          const filename=name;
          await page.locator('.demo-workspace').screenshot({path:'public/projects/'+filename+'.png'});
        }
        report.push({name,theme,width,...metrics});
      }
    }
    if (theme==='light') {
      await page.locator('.header .slider').click();
      await page.waitForTimeout(500);
    }
  }
  if (errors.length) throw new Error('Browser errors: '+errors.join(', '));
  await page.setViewportSize({width:1440,height:900});
  await page.goto(root);
  return {pages:report,errors};
}
