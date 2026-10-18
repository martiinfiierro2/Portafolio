async page => {
  const report = [];
  const check = (value, message) => {if (!value) throw new Error(message);};
  const root = 'http://127.0.0.1:5178';
  await page.goto(root);
  await page.evaluate(() => localStorage.setItem('mf-theme','light'));
  for (const [width,height] of [[1440,900],[1366,768],[1024,768],[768,1024],[390,844],[320,568]]) {
    await page.setViewportSize({width,height});
    await page.goto(root);
    await page.waitForTimeout(2600);
    const metrics = await page.evaluate(() => {
      const rect = selector => {const r=document.querySelector(selector).getBoundingClientRect();return {left:Math.round(r.left),right:Math.round(r.right),top:Math.round(r.top),bottom:Math.round(r.bottom)};};
      return {width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,pageHeight:document.documentElement.scrollHeight,name:rect('.hero-name'),keyboard:rect('.project-keyboard'),enter:rect('.keyboard-enter'),footer:rect('.footer'),keys:document.querySelectorAll('[data-keyboard-key]').length};
    });
    check(!metrics.overflow, 'Overflow on Home at ' + width);
    check(metrics.keyboard.left>=0 && metrics.keyboard.right<=width, 'Keyboard bounds at '+width+': '+JSON.stringify(metrics.keyboard));
    check(metrics.enter.right<=width && metrics.enter.left>=0,'Enter visible at '+width);
    check(metrics.name.right<=width,'Name fits at '+width);
    await page.screenshot({path:'.taste-skill/independent-keyboard/home-'+width+'.png',fullPage:true});
    if (width===1440) await page.locator('.hero').screenshot({path:'public/projects/portfolio-keyboard-desktop.png'});
    if (width===390) {
      await page.locator('.hero').screenshot({path:'public/projects/portfolio-keyboard-mobile.png'});
      await page.getByRole('button',{name:'Abrir menú'}).click();
      await page.getByRole('link',{name:'Contacto',exact:true}).click();
      check(new URL(page.url()).pathname==='/contacto','Mobile menu route');
      check(await page.getByRole('button',{name:'Abrir menú'}).getAttribute('aria-expanded')==='false','Mobile menu closes');
    }
    report.push(metrics);
  }
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:width===1440?900:844});
    for (const path of ['/proyectos','/sobre-mi','/contacto']) {
      await page.goto(root+path);
      await page.waitForTimeout(750);
      const overflow=await page.evaluate(() => document.documentElement.scrollWidth>innerWidth);
      check(!overflow,'Overflow at '+path+' '+width);
      for (const item of await page.locator('.catalog-list > div').all()) {
        await item.scrollIntoViewIfNeeded();
        await page.waitForTimeout(750);
      }
      await page.evaluate(() => scrollTo(0,0));
      await page.screenshot({path:'.taste-skill/independent-keyboard/'+path.slice(1)+'-'+width+'.png',fullPage:true});
      if (path==='/proyectos') check(await page.locator('.catalog-preview img').evaluateAll(images => images.every(img=>img.complete && img.naturalWidth>0)), 'Project thumbnails load');
    }
  }
  await page.goto(root);
  await page.locator('.header .slider').click();
  check(await page.locator('.site').getAttribute('data-theme')==='dark','Dark theme');
  await page.setViewportSize({width:1440,height:900});
  await page.waitForTimeout(2600);
  await page.screenshot({path:'.taste-skill/independent-keyboard/home-dark-1440.png'});
  await page.getByRole('link',{name:'Proyectos',exact:true}).click();
  check(await page.locator('.site').getAttribute('data-theme')==='dark','Dark theme across routes');
  await page.locator('.header .slider').click();
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(root);
  await page.waitForTimeout(250);
  check(await page.locator('.keyboard-output').textContent()==='Proyectos','Reduced motion complete text');
  await page.locator('.keyboard-enter').click();
  check(new URL(page.url()).pathname==='/proyectos','Reduced motion Enter');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto(root);
  report.push({test:'Page screenshots, mobile navigation, both themes, reduced motion',result:'passed'});
  return report;
}
