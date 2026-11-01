async page => {
  const base = 'http://127.0.0.1:5174';
  const errors = [], failed = [], media = [];
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) failed.push(response.url()); });
  page.on('request', request => { if (request.url().includes('.webm')) media.push(request.url()); });
  await page.setViewportSize({width:1440,height:900});
  await page.goto(base, {waitUntil:'networkidle'});
  await page.evaluate(() => localStorage.setItem('mf-theme','light'));
  await page.reload({waitUntil:'networkidle'});
  await page.emulateMedia({reducedMotion:'reduce'});
  check(await page.locator('header').getByRole('link').count() === 5, 'Wrong navigation');
  check(await page.locator('header').getByText('Martín Fierro').count() === 0, 'Name still in header');
  check(await page.locator('.hero-actions > .sticker svg').count() === 0, 'Hero arrow still present');
  check(await page.locator('.hero-actions > .sticker').count() === 2, 'Missing sticker');
  for (const name of ['Mis proyectos','Mi CV']) {
    const sticker=page.locator('.hero-actions').getByRole(name==='Mi CV'?'button':'link',{name,exact:true});
    await sticker.hover();
    check(await sticker.locator('.sticker-label').evaluate(el=>getComputedStyle(el).textDecorationLine.includes('underline')), 'Missing hover underline: '+name);
  }
  const width=await page.locator('header').evaluate(el=>el.getBoundingClientRect().width);
  check(width===await page.locator('.work').evaluate(el=>el.getBoundingClientRect().width), 'Header/content widths differ');
  await page.getByRole('link',{name:'Mis proyectos',exact:true}).click();
  await page.waitForURL('**/#proyectos');
  for(const [id,label] of [['sobre-mi','Sobre mí'],['contacto','Contacto'],['inicio','Inicio'],['proyectos','Proyectos']]) {
    await page.locator('header nav').getByRole('link',{name:label,exact:true}).click();
    await page.waitForURL('**/#'+id);
    await page.waitForFunction(id=>document.activeElement===document.querySelector('#'+id+' h1, #'+id+' h2'),id);
    check(await page.locator('#'+id).evaluate(el=>el.getBoundingClientRect().top>=90),'Anchor hidden behind header: '+id);
  }
  check(media.length===0,'Video requested on home');
  await page.getByRole('link',{name:'Ver proyecto: Calendar',exact:true}).click();
  await page.waitForURL('**/proyectos/calendar');
  await page.locator('.case-stage img').nth(1).click();
  await page.locator('dialog[open]').waitFor();
  await page.keyboard.press('ArrowLeft');
  check((await page.locator('dialog img').getAttribute('src')).endsWith('/semana.png'),'Modal navigation failed');
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>document.activeElement===document.querySelector('.case-stage'));
  await page.getByRole('link',{name:'Todos los proyectos',exact:true}).click();
  await page.waitForURL('**/#proyectos');
  await page.getByRole('link',{name:'Ver proyecto: Monitorización distribuida',exact:true}).click();
  await page.waitForURL('**/proyectos/monitorizacion-sistemas-distribuidos');
  check(await page.locator('video').count()===0 && media.length===0,'Video loaded before request');
  for(const label of ['Mapa','Catálogo','Detalle','Grafo']) {
    await page.getByRole('button',{name:label,exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('.case-stage').getAttribute('aria-busy')==='false');
  }
  await page.getByRole('button',{name:'Ver recorrido',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('video')?.readyState>=2);
  await page.locator('video').evaluate(el=>el.pause());
  await page.getByRole('switch').click();
  await page.reload({waitUntil:'networkidle'});
  check(await page.getByRole('switch').getAttribute('aria-checked')==='true','Theme persistence failed');
  for(const [path,hash] of [['/proyectos','#proyectos'],['/sobre-mi','#sobre-mi'],['/contacto','#contacto'],['/#trabajo','#proyectos'],['/#/proyectos','#proyectos']]) {
    await page.goto(base+path,{waitUntil:'networkidle'});
    await page.waitForURL(url=>url.pathname==='/'&&url.hash===hash);
    check(new URL(page.url()).hash===hash,'Broken legacy URL: '+path);
  }
  await page.goto(base+'/no-existe',{waitUntil:'networkidle'});
  await page.getByRole('heading',{name:'Esta ruta no existe.'}).waitFor();
  const context=await page.context().browser().newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  const phone=await context.newPage();
  phone.on('pageerror',error=>errors.push(error.message));
  await phone.goto(base,{waitUntil:'networkidle'});
  const menu=phone.locator('.menu-toggle');
  check(await phone.locator('header nav').isHidden(),'Mobile navigation visible before opening');
  await menu.tap();
  check(await menu.getAttribute('aria-expanded')==='true','Menu did not open');
  await phone.keyboard.press('Escape');
  check(await menu.getAttribute('aria-expanded')==='false','Escape did not close menu');
  check(await menu.evaluate(el=>el===document.activeElement),'Escape lost focus');
  await menu.tap();
  await phone.locator('.desk').tap();
  check(await menu.getAttribute('aria-expanded')==='false','Outside tap did not close menu');
  for(const [id,label] of [['proyectos','Proyectos'],['sobre-mi','Sobre mí'],['contacto','Contacto'],['inicio','Inicio']]) {
    await menu.tap();
    await phone.locator('header nav').getByRole('link',{name:label,exact:true}).tap();
    await phone.waitForURL('**/#'+id);
    await phone.waitForFunction(id=>document.querySelector('#'+id).getBoundingClientRect().top>=90,id);
    check(await phone.locator('header nav').isHidden(),'Menu stayed open after navigation');
  }
  await menu.tap();
  await phone.getByRole('switch').tap();
  check(await menu.getAttribute('aria-expanded')==='true','Theme toggle closed menu unexpectedly');
  await phone.setViewportSize({width:1024,height:768});
  await phone.waitForFunction(()=>document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false');
  await phone.setViewportSize({width:390,height:844});
  check(await menu.getAttribute('aria-expanded')==='false','Desktop resize retained mobile open state');
  await context.close();
  check(errors.length===0,JSON.stringify(errors));
  check(failed.length===0,JSON.stringify(failed));
  return {result:'passed',singlePageSections:4,legacyUrls:5,mobileMenu:'touch, Escape, outside tap, resize',gallery:'mouse and keyboard',theme:'persisted',video:'on demand',errors,failed};
}
