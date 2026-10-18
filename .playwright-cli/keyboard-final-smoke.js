async page => {
  const check = (value,message) => {if(!value) throw new Error(message);};
  const root = 'http://127.0.0.1:5178';
  const report = [];
  await page.goto(root);
  await page.evaluate(()=>localStorage.setItem('mf-theme','light'));
  for (const [width,height] of [[1440,900],[1366,768],[390,844],[320,568]]) {
    await page.setViewportSize({width,height});
    await page.goto(root);
    await page.waitForTimeout(3300);
    const metrics = await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,screenReaderOnly:getComputedStyle(document.querySelector('.sr-only')).position,enterWhite:getComputedStyle(document.querySelector('.keyboard-enter .keyboard-keycap')).color,keyboardBottom:document.querySelector('.project-keyboard').getBoundingClientRect().bottom}));
    check(!metrics.overflow,'Home overflow '+width);
    check(metrics.screenReaderOnly==='absolute','Screen reader utility is present');
    check(metrics.enterWhite==='rgb(255, 255, 255)','Enter white label');
    if(width===1366) check(metrics.keyboardBottom<=height,'Keyboard fits a small laptop');
    if([1440,390].includes(width)) {
      await page.screenshot({path:'.taste-skill/keyboard-identity/home-light-'+width+'.png',fullPage:true});
      await page.locator('.hero').screenshot({path:'public/projects/portfolio-keyboard-'+(width===1440?'desktop':'mobile')+'.png'});
    }
    report.push({width,...metrics});
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Abrir menú'}).click();
  await page.getByRole('link',{name:'Proyectos',exact:true}).click();
  await page.waitForTimeout(750);
  check(await page.locator('.catalog-card h2').count()===4,'Accessible project heading hierarchy');
  check(await page.getByRole('button',{name:'Abrir menú'}).getAttribute('aria-expanded')==='false','Menu closes after navigation');
  for (const card of await page.locator('.catalog-item').all()) { await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(550); }
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'.taste-skill/keyboard-identity/projects-light-390.png',fullPage:true});
  await page.goto(root+'/proyectos/portfolio');
  const thumbnail = page.getByRole('button',{name:'Ampliar captura: Interfaz en escritorio',exact:true});
  await thumbnail.click();
  await page.getByRole('dialog').waitFor({state:'visible'});
  await page.keyboard.press('Escape');
  check(await thumbnail.evaluate(el=>el===document.activeElement),'Gallery returns focus');
  check(await page.locator('.gallery-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length)===1,'Gallery single column on mobile');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(root);
  check((await page.locator('.keyboard-output').textContent()).endsWith('Proyectos'),'Reduced motion shows complete command');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:1440,height:900});
  await page.locator('.header .slider').click();
  await page.waitForTimeout(3300);
  check(await page.locator('.site').getAttribute('data-theme')==='dark','Original theme toggle works');
  await page.screenshot({path:'.taste-skill/keyboard-identity/home-dark-1440.png',fullPage:true});
  await page.locator('.header .slider').click();
  return {metrics:report,menu:'passed',gallery:'passed',reducedMotion:'passed',theme:'passed'};
}
