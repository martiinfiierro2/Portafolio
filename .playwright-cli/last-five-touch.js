async page => {
  const context=await page.context().browser().newContext({viewport:{width:360,height:800},isMobile:true,hasTouch:true,deviceScaleFactor:3});
  try {
    const mobile=await context.newPage();
    const errors=[];
    mobile.on('pageerror',error=>errors.push(error.message));
    await mobile.goto('http://127.0.0.1:5178/');
    await mobile.waitForTimeout(3300);
    const viewport=await mobile.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,hover:matchMedia('(hover:hover)').matches}));
    if(viewport.width!==360||viewport.overflow||viewport.hover) throw new Error(JSON.stringify(viewport));
    await mobile.evaluate(()=>{
      window.__touchKeyLit=false;
      window.__touchEvents=[];
      const key=document.querySelector('[data-letter="P"]');
      new MutationObserver(()=>{if(key.classList.contains('is-typing'))window.__touchKeyLit=true;}).observe(key,{attributes:true,attributeFilter:['class']});
      document.addEventListener('click',event=>window.__touchEvents.push(event.target.closest('[data-letter]')?.dataset.letter||event.target.tagName));
    });
    await mobile.locator('[data-letter="P"]').tap();
    if(!await mobile.evaluate(()=>window.__touchKeyLit)) throw new Error('Touch key feedback missing: '+JSON.stringify(await mobile.evaluate(()=>window.__touchEvents)));
    await mobile.waitForTimeout(250);
    if(await mobile.locator('[data-letter="P"]').getAttribute('class').then(value=>value.includes('is-typing'))) throw new Error('Touch key stays pressed');
    await mobile.getByRole('link',{name:'Abrir proyectos',exact:true}).tap();
    await mobile.waitForURL('**/proyectos');
    if(errors.length) throw new Error(errors.join(', '));
    return {touch:'passed',viewport,illumination:'passed',release:'passed',enter:'passed',errors};
  } finally {
    await context.close();
  }
}
