async page => {
  const base='http://127.0.0.1:5174';
  const results=[], failures=[], errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const routes=[['inicio','/'],['calendar','/proyectos/calendar'],['monitorizacion','/proyectos/monitorizacion-sistemas-distribuidos']];
  for (const width of [320,360,390,480,600,760,768,820,1024,1280,1440,1920]) {
    const height=width<=480?844:900;
    await page.setViewportSize({width,height});
    for (const [name,route] of routes) {
      await page.goto(base+route,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      for (const theme of ['light','dark']) {
        if(await page.getByRole('switch').getAttribute('aria-checked')!==(theme==='dark'?'true':'false'))await page.getByRole('switch').click();
        await page.mouse.move(0,0);
        const metrics=await page.evaluate(()=>{
          const h=document.querySelector('h1');const hs=getComputedStyle(h);
          const header=document.querySelector('header').getBoundingClientRect();
          const content=document.querySelector('.hero,.case-heading').getBoundingClientRect();
          return {overflow:document.documentElement.scrollWidth>window.innerWidth,headerWidth:header.width,contentWidth:content.width,lines:Math.round(h.getBoundingClientRect().height/parseFloat(hs.lineHeight)),missing:[...document.images].filter(i=>i.loading!=='lazy'&&(!i.complete||i.naturalWidth===0)).map(i=>i.src),menu:getComputedStyle(document.querySelector('.menu-toggle')).display!=='none'};
        });
        if(metrics.overflow||metrics.headerWidth!==metrics.contentWidth||metrics.lines>2||metrics.missing.length||metrics.menu!==(width<=760))failures.push({width,name,theme,...metrics});
        results.push({width,name,theme,...metrics});
        if([390,820,1440].includes(width)) {
          // Exercise actual lazy loading before capturing the whole document.
          for(const image of await page.locator('img[loading="lazy"]').all()) {
            await image.scrollIntoViewIfNeeded();
            await image.evaluate(el=>el.decode());
          }
          await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
          await page.screenshot({path:`output/qa/${name}-${width}-${theme}.png`,fullPage:true,animations:'disabled'});
        }
      }
    }
  }
  // Real touch contexts are different from merely narrowing a desktop window.
  for(const viewport of [{width:320,height:740},{width:390,height:844},{width:844,height:390},{width:820,height:1180}]) {
    const context=await page.context().browser().newContext({viewport,isMobile:true,hasTouch:true});
    const phone=await context.newPage();
    await phone.goto(base,{waitUntil:'networkidle'});
    const overflow=await phone.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    if(overflow)failures.push({touch:true,...viewport,overflow});
    await context.close();
  }
  if(failures.length||errors.length)throw new Error(JSON.stringify({failures,errors}));
  return {checks:results.length,touchContexts:4,failures,errors};
}
