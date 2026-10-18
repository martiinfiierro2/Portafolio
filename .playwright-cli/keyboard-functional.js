async page => {
  const results = [];
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => localStorage.setItem('mf-theme', 'light'));
  await page.goto('http://127.0.0.1:5178/');
  await page.waitForTimeout(500);
  const partial = await page.locator('.keyboard-output').textContent();
  check(partial.length > 0 && partial.length < 9, 'Typing must progress letter by letter');
  await page.waitForTimeout(2400);
  check((await page.locator('.keyboard-output').textContent()).trim() === 'Proyectos', 'Typing must finish');
  const fit = await page.locator('.hero').boundingBox();
  check(fit.height <= 901, 'Desktop hero must fit first screen: ' + fit.height);
  await page.locator('.hero').screenshot({ path: 'public/projects/portfolio-keyboard-desktop.png' });
  await page.screenshot({ path: '.taste-skill/keyboard-implementation/final-desktop.png' });
  await page.locator('.keyboard-enter').focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1100);
  check(page.url().endsWith('#proyectos'), 'Enter must open projects');
  check(await page.locator('#projects-title').evaluate(el => el === document.activeElement), 'Projects heading receives focus');
  results.push('Animated typing, native Enter, focus and desktop hero fit: passed');

  await page.getByText('Buscar y filtrar', { exact: true }).click();
  await page.getByRole('button', { name: 'Backend', exact: true }).click();
  check(await page.locator('.catalog-row').count() === 1, 'Backend filter should show one project');
  check(await page.locator('.catalog-row h3').textContent() === 'Pulse API', 'Backend filter should show Pulse API');
  await page.getByRole('searchbox').fill('does-not-exist');
  check(await page.locator('.catalog-row').count() === 0, 'Unknown query must be empty');
  await page.getByRole('button', { name: 'Mostrar todos los proyectos' }).click();
  check(await page.locator('.catalog-row').count() === 4, 'Reset should restore four projects');
  await page.locator('.catalog-row[href="/proyectos/taskflow"]').click();
  await page.waitForTimeout(400);
  check(page.url().endsWith('/proyectos/taskflow'), 'Project details navigation');
  await page.getByRole('link', { name: 'Abrir demo', exact: true }).click();
  await page.waitForTimeout(400);
  check(page.url().endsWith('/demos/taskflow'), 'Demo navigation');
  await page.getByRole('link', { name: 'Proyectos', exact: true }).click();
  await page.waitForTimeout(1100);
  check(page.url().endsWith('/#proyectos'), 'Header returns from demo to project section');
  results.push('Filters, empty state, reset, project details, demo and return: passed');

  await page.locator('.header .slider').click();
  check(await page.locator('.site').getAttribute('data-theme') === 'dark', 'Dark toggle');
  await page.getByRole('link', { name: 'Inicio', exact: true }).click();
  await page.waitForTimeout(1100);
  await page.screenshot({ path: '.taste-skill/keyboard-implementation/final-dark-desktop.png' });
  await page.reload();
  check(await page.locator('.site').getAttribute('data-theme') === 'dark', 'Theme should persist');
  await page.locator('.header .slider').click();
  results.push('Theme switch and persisted dark preference: passed');

  for (const [width, height] of [[1366,768],[768,1024],[390,844],[320,568]]) {
    await page.setViewportSize({width, height});
    await page.goto('http://127.0.0.1:5178/');
    await page.waitForTimeout(2700);
    const metrics = await page.evaluate(() => ({
      width: innerWidth, height: innerHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      heroHeight: Math.round(document.querySelector('.hero').getBoundingClientRect().height),
      keyboard: (() => { const r = document.querySelector('.project-keyboard').getBoundingClientRect(); return {left:Math.round(r.left),right:Math.round(r.right)}; })(),
      images: [...document.querySelectorAll('.catalog-preview img')].map(img => ({width:img.naturalWidth,height:img.naturalHeight})),
      background: [...document.querySelectorAll('section')].map(el => getComputedStyle(el).backgroundImage),
    }));
    check(!metrics.overflow, 'No horizontal overflow at ' + width);
    check(metrics.background.every(bg => bg === 'none'), 'No grid backgrounds');
    check(metrics.keyboard.left >= 0 && metrics.keyboard.right <= width, 'Keyboard must fit at ' + width);
    if (width === 1366) check(metrics.heroHeight <= height + 1, 'Laptop hero fit');
    if (width === 390) {
      await page.locator('.hero').screenshot({path:'public/projects/portfolio-keyboard-mobile.png'});
      await page.screenshot({path:'.taste-skill/keyboard-implementation/final-mobile.png'});
      await page.getByRole('button', {name:'Abrir menú'}).click();
      await page.getByRole('link', {name:'Sobre mí', exact:true}).click();
      await page.waitForTimeout(900);
      check(page.url().endsWith('#sobre-mi'), 'Mobile menu anchor');
      check(await page.getByRole('button', {name:'Abrir menú'}).getAttribute('aria-expanded') === 'false', 'Mobile menu closes');
    }
    results.push(metrics);
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:5178/');
  await page.waitForTimeout(250);
  check((await page.locator('.keyboard-output').textContent()).trim() === 'Proyectos', 'Reduced motion shows complete word immediately');
  await page.locator('.keyboard-enter').click();
  check(page.url().endsWith('#proyectos'), 'Reduced motion Enter works');
  results.push('Reduced motion and mobile menu: passed');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://127.0.0.1:5178/');
  for (const id of ['proyectos','sobre-mi','contacto']) {
    await page.locator('#' + id).scrollIntoViewIfNeeded();
    await page.waitForTimeout(750);
  }
  await page.evaluate(() => scrollTo(0,0));
  await page.screenshot({path:'.taste-skill/keyboard-implementation/final-full.png',fullPage:true});
  return results;
}
