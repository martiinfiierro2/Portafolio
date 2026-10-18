async page => {
  const root='http://127.0.0.1:5178';
  const check=(value,message)=>{if(!value) throw new Error(message);};
  const report=[];
  await page.setViewportSize({width:1440,height:900});
  await page.goto(root);
  await page.waitForTimeout(120);
  const heroMotion=await page.locator('.hero-name > span,.hero-intro,.hero-object').evaluateAll(elements=>elements.flatMap(el=>el.getAnimations().map(animation=>({name:animation.animationName,duration:animation.effect.getTiming().duration}))));
  check(heroMotion.some(animation=>animation.name==='hero-name-in'),'Name entrance runs');
  check(heroMotion.some(animation=>animation.name==='hero-object-in'),'Keyboard entrance runs');
  check(await page.getByRole('button',{name:/Descargar CV/}).getAttribute('aria-disabled')==='true','Missing CV has an honest unavailable state');
  report.push({heroMotion,cvPending:'passed'});

  await page.route('**/src/data/contact.js*',async route=>{
    const response=await route.fetch();
    const body=(await response.text()).replace('cv: null','cv: "/__test-cv.pdf"');
    await route.fulfill({response,body});
  });
  await page.route('**/__test-cv.pdf',route=>route.fulfill({contentType:'application/pdf',body:'%PDF-1.4\n%%EOF'}));
  await page.reload();
  const cv=page.getByRole('link',{name:'Descargar CV',exact:true});
  await cv.waitFor();
  const downloaded=page.waitForEvent('download');
  await cv.click();
  const download=await downloaded;
  check(download.suggestedFilename()==='CV-Martin-Fierro.pdf','Native CV download filename');
  check(await download.failure()===null,'Native CV download succeeds');
  await page.unroute('**/src/data/contact.js*');
  await page.unroute('**/__test-cv.pdf');
  report.push({cvWithFixture:'passed',filename:download.suggestedFilename()});

  for(const width of [430,390,360,320]) {
    await page.setViewportSize({width,height:width===320?568:844});
    await page.goto(root);
    await page.waitForTimeout(3300);
    await page.locator('.keyboard-enter').scrollIntoViewIfNeeded();
    const metrics=await page.evaluate(()=>{
      const enter=document.querySelector('.keyboard-enter');
      const r=enter.getBoundingClientRect();
      const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);
      const keyboard=document.querySelector('.project-keyboard');
      const name=document.querySelector('.hero-name > span');
      const nameRange=document.createRange();nameRange.selectNodeContents(name);
      const output=document.querySelector('.keyboard-output');
      const outputRange=document.createRange();outputRange.selectNodeContents(output);
      return {
        width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,
        enterHit:enter.contains(hit),keySize:parseFloat(getComputedStyle(document.querySelector('.keyboard-key')).fontSize),
        chassisDepth:getComputedStyle(keyboard,'::before').transform,
        decorationIgnoresPointer:getComputedStyle(keyboard,'::after').pointerEvents==='none',
        nameFits:nameRange.getBoundingClientRect().right<=document.querySelector('.hero-name').getBoundingClientRect().right+1,
        commandFits:outputRange.getBoundingClientRect().right<=document.querySelector('.keyboard-display').getBoundingClientRect().right-3,
      };
    });
    check(!metrics.overflow && metrics.nameFits && metrics.commandFits,'Mobile text and bounds '+JSON.stringify(metrics));
    check(metrics.enterHit&&metrics.decorationIgnoresPointer,'Case must not cover Enter '+width);
    check(metrics.keySize>=11,'Legible mobile letters '+width);
    await page.getByRole('link',{name:'Abrir proyectos',exact:true}).click();
    check(new URL(page.url()).pathname==='/proyectos','Mobile Enter navigates '+width);
    report.push(metrics);
  }

  await page.goto(root);
  await page.getByRole('button',{name:'Abrir menú'}).click();
  const menuMotion=await page.locator('.header-links').evaluate(el=>el.getAnimations().map(animation=>animation.animationName));
  check(menuMotion.includes('menu-in'),'Subtle menu entrance');
  await page.keyboard.press('Escape');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(root);
  const reduced=await page.evaluate(()=>({
    name:getComputedStyle(document.querySelector('.hero-name > span')).animationName,
    object:getComputedStyle(document.querySelector('.hero-object')).animationName,
    output:document.querySelector('.keyboard-output').textContent.trim(),
  }));
  check(reduced.name==='none'&&reduced.object==='none'&&reduced.output==='cd Proyectos','Reduced motion has no intro animation');
  await page.getByRole('button',{name:'Abrir menú'}).click();
  check(await page.locator('.header-links').evaluate(el=>getComputedStyle(el).animationName)==='none','Reduced motion menu');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:1440,height:900});
  await page.goto(root);
  report.push({menuMotion,reducedMotion:reduced,result:'passed'});
  return report;
}
