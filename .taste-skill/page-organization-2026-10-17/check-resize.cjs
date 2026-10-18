async page => {
  const results=[];
  const check=(condition,message)=>{if(!condition)throw new Error(message);};
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:5177/#proyectos');
  await page.waitForFunction(()=>document.querySelector('.portfolio-journey')?.dataset.progress==='1.0000');
  const fullCatalog=()=>page.evaluate(()=>({
    progress:Number(document.querySelector('.portfolio-journey').dataset.progress),
    top:document.querySelector('.journey-catalog').getBoundingClientRect().top,
    height:document.querySelector('#proyectos').getBoundingClientRect().height,
    topCovered:!!document.elementFromPoint(4,4)?.closest('.journey-catalog'),
    bottomCovered:!!document.elementFromPoint(4,innerHeight-4)?.closest('.journey-catalog'),
    inert:document.querySelector('.journey-catalog').inert,
    viewportHeight:innerHeight,
  }));
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(250);
  const initial=await fullCatalog();
  check(Math.abs(initial.top)<1,`Initial catalog is offset: ${JSON.stringify(initial)}`);
  for(const [width,height] of [[1440,900],[768,1024],[375,667],[900,700]]) {
    await page.setViewportSize({width,height});await page.waitForTimeout(250);
    const state=await fullCatalog();
    check(state.progress===1&&Math.abs(state.top)<=2&&state.topCovered&&state.bottomCovered&&!state.inert,`Resize closed the catalog: ${JSON.stringify({width,height,state})}`);
    results.push({width,height,...state});
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(220);
  let state=await fullCatalog();check(Math.abs(state.top)<=2&&state.topCovered,'Reduced motion exposed Home background');
  results.push({reducedMotion:true,...state});
  await page.getByRole('link',{name:'Inicio',exact:true}).click();
  await page.waitForTimeout(200);
  await page.getByRole('link',{name:'Explorar proyectos',exact:true}).click();
  await page.waitForTimeout(200);
  state=await fullCatalog();check(Math.abs(state.top)<=2&&state.topCovered,'Reduced-motion click did not fill the viewport');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(250);
  state=await fullCatalog();check(state.progress===1&&Math.abs(state.top)<=2&&state.topCovered&&state.bottomCovered,`Restoring animation closed the catalog: ${JSON.stringify(state)}`);
  await page.setViewportSize({width:844,height:390});await page.waitForTimeout(250);
  state=await fullCatalog();check(Math.abs(state.top)<=2&&state.topCovered,'Landscape fallback exposed Home background');
  results.push({landscape:true,...state});
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(250);
  state=await fullCatalog();check(state.progress===1&&Math.abs(state.top)<=2&&state.topCovered&&state.bottomCovered,`Rotation back to portrait closed the catalog: ${JSON.stringify(state)}`);
  return {passed:true,results};
}

