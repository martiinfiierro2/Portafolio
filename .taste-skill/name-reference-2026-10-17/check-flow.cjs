async (page) => {
  const base = 'http://127.0.0.1:5177';
  const output = '.taste-skill/name-reference-2026-10-17';
  const verified = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const progress = () => page.locator('.portfolio-journey').getAttribute('data-progress').then(Number);
  const open = async () => {
    await page.getByRole('link', {name:'Explorar proyectos',exact:true}).click();
    await page.waitForFunction(() => Number(document.querySelector('.portfolio-journey')?.dataset.progress) > 0.1);
    const intermediate = await progress();
    check(intermediate < 0.95, 'Click skipped the animated transition');
    await page.waitForFunction(() => document.querySelector('.portfolio-journey')?.dataset.progress === '1.0000');
    await page.waitForTimeout(80);
    check(new URL(page.url()).pathname === '/' && new URL(page.url()).hash === '#proyectos', 'Projects should remain on the homepage');
    check(await page.locator('#projects-title').evaluate(el => document.activeElement === el), 'Click must transfer keyboard focus to catalog');
  };

  for (const [width,height] of [[1440,900],[390,844]]) {
    await page.setViewportSize({width,height});
    await page.goto(base);
    await page.evaluate(() => localStorage.setItem('mf-theme','light'));
    await page.reload();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({path:`${output}/${width}-light-start.png`});
    await open();
    await page.waitForTimeout(650);
    await page.screenshot({path:`${output}/${width}-light-open.png`});
    check(await page.locator('.catalog-row').count() === 4, 'Catalog projects missing');
    if (width === 1440) check(await page.locator('.nav-proyectos').getAttribute('aria-current') === 'location', 'Header did not follow the transition');
    await page.getByText('Buscar y filtrar',{exact:true}).click();
    await page.getByRole('searchbox',{name:'Buscar proyectos'}).fill('no-existe-xyz');
    await page.getByRole('heading',{name:'No hay proyectos con esta búsqueda.'}).waitFor();
    await page.getByRole('button',{name:'Mostrar todos los proyectos'}).click();
    check(await page.locator('.catalog-row').count() === 4, 'Filter reset failed');
    await page.locator('.catalog-row').nth(1).click();
    await page.waitForURL(`${base}/proyectos/taskflow`);
    await page.getByRole('link',{name:'Volver a proyectos',exact:true}).click();
    await page.waitForURL(`${base}/#proyectos`);
    await page.waitForFunction(() => document.querySelector('.portfolio-journey')?.dataset.progress === '1.0000');
    check(await page.locator('.journey-catalog').evaluate(el=>!el.inert), 'Return link did not restore catalog');
    verified.push(`${width}px: animated click, same-page catalog, search/reset and return from project`);
  }

  await page.goto(base);
  await page.getByRole('link',{name:'Explorar proyectos',exact:true}).focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('.portfolio-journey')?.dataset.progress === '1.0000');
  await page.waitForTimeout(80);
  check(await page.locator('#projects-title').evaluate(el=>document.activeElement===el), 'Keyboard activation failed');
  verified.push('keyboard activation and focus');

  await page.goto(base);
  await page.getByRole('link',{name:'Explorar proyectos',exact:true}).click();
  await page.waitForFunction(() => Number(document.querySelector('.portfolio-journey')?.dataset.progress) > 0.12);
  await page.mouse.wheel(0,-50);
  await page.waitForTimeout(500);
  check(await progress() < 0.95, 'Manual scrolling must interrupt the click animation');
  verified.push('manual scroll interrupts click animation');

  await page.goto(base);
  await page.evaluate(() => {
    const track=document.querySelector('.journey-track');
    const stage=document.querySelector('.journey-stage');
    window.scrollTo({top:(track.offsetHeight-stage.offsetHeight)*0.56,behavior:'instant'});
  });
  await page.waitForTimeout(150);
  const beforeTheme = await progress();
  await page.locator('.switch').click();
  check(Math.abs(await progress()-beforeTheme)<0.005,'Theme change reset animation progress');
  await page.setViewportSize({width:768,height:1024});
  await page.waitForTimeout(180);
  check(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'Resize introduced overflow');
  verified.push('theme switch mid-transition and resize');

  await page.goto(`${base}/#proyectos`);
  await page.waitForFunction(()=>document.querySelector('.portfolio-journey')?.dataset.progress==='1.0000');
  await page.locator('.catalog-row').nth(1).click();
  await page.waitForURL(`${base}/proyectos/taskflow`);
  await page.goBack();
  await page.waitForFunction(()=>document.querySelector('.portfolio-journey')?.dataset.progress==='1.0000');
  check(await page.locator('.journey-catalog').evaluate(el=>!el.inert),'Browser Back did not restore catalog');
  await page.goto(`${base}/proyectos`);
  await page.waitForURL(`${base}/#proyectos`);
  verified.push('deep link, legacy catalog URL and browser Back');

  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(base);
  await page.waitForFunction(()=>document.querySelector('.portfolio-journey')?.dataset.animated==='false');
  check(await page.locator('.journey-catalog').evaluate(el=>!el.inert),'Reduced-motion catalog inaccessible');
  check(await page.locator('.journey-track').evaluate(el=>el.offsetHeight<innerHeight*1.3),'Reduced motion left an empty scroll track');
  await page.getByRole('link',{name:'Explorar proyectos',exact:true}).click();
  await page.waitForURL(`${base}/#proyectos`);
  await page.waitForTimeout(80);
  check(await page.locator('#projects-title').evaluate(el=>el.getBoundingClientRect().top>=70),'Header covers reduced-motion catalog');
  verified.push('reduced motion without pinned animation or empty space');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:844,height:390});
  await page.goto(base);
  await page.waitForFunction(()=>document.querySelector('.portfolio-journey')?.dataset.animated==='false');
  check(await page.locator('.journey-catalog').evaluate(el=>!el.inert),'Landscape fallback hides catalog');
  verified.push('short landscape fallback');

  await page.setViewportSize({width:1440,height:900});
  await page.goto(base);
  check(errors.length===0,`Browser errors: ${errors.join('; ')}`);
  return {passed:true,verified,errors};
}

