async page => {
  const results=[];
  const errors=[];
  const check=(condition,message)=>{if(!condition) throw new Error(message);};
  page.on('pageerror',error=>errors.push(error.message));
  await page.emulateMedia({reducedMotion:'no-preference'});
  const position=async progress=>{
    await page.evaluate(value=>{
      const track=document.querySelector('.journey-track'),stage=document.querySelector('.journey-stage');
      const start=track.getBoundingClientRect().top+scrollY-parseFloat(getComputedStyle(stage).top);
      scrollTo({top:start+value*(track.offsetHeight-stage.offsetHeight),behavior:'instant'});
    },progress);
    await page.waitForTimeout(100);
  };
  const state=()=>page.evaluate(()=>{
    const box=selector=>document.querySelector(selector).getBoundingClientRect().toJSON();
    const heading=document.querySelector('.hero-heading'),nameStyle=getComputedStyle(heading);
    const covers=(x,y)=>!!document.elementFromPoint(x,y)?.closest('.journey-catalog');
    return {
      animated:document.querySelector('.portfolio-journey').dataset.animated==='true',
      progress:Number(document.querySelector('.portfolio-journey').dataset.progress),
      hero:box('.hero'),name:box('.hero-heading'),links:box('.hero-links'),tablet:box('.project-tablet'),
      stage:box('.journey-stage'),catalog:box('.journey-catalog'),projects:box('#proyectos'),
      opacity:Number(nameStyle.opacity),filter:nameStyle.filter,nameTransform:nameStyle.transform,
      glyphTransforms:[...heading.querySelectorAll('g')].map(g=>getComputedStyle(g).transform),
      overflow:document.documentElement.scrollWidth-innerWidth,
      catalogInert:document.querySelector('.journey-catalog').inert,
      coverTop:covers(4,4),coverBottom:covers(4,innerHeight-4),
    };
  });
  for(const [width,height] of [[1440,900],[1366,768],[1280,800],[1024,700],[900,700],[768,1024],[768,700],[700,660],[699,700],[390,844],[375,667],[360,640],[320,568],[320,700]]) {
    await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:5177/');
    await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(220);
    const initial=await state();
    check(initial.overflow===0,`Overflow at ${width}x${height}`);
    if(initial.animated) {
      check(Math.abs(initial.stage.y)<1&&Math.abs(initial.stage.height-height)<1,`Scene is not full-screen at ${width}x${height}`);
      check(initial.name.bottom<=height+.5&&initial.links.bottom<=height+.5&&initial.tablet.bottom<=initial.links.top+10,`Home is clipped at ${width}x${height}: ${JSON.stringify(initial)}`);
      await position(.18);const fading=await state();
      check(fading.opacity>0&&fading.opacity<1,'Name did not fade');
      check(fading.nameTransform==='none'&&fading.glyphTransforms.every(t=>t==='none'),'Name still moves sideways');
      check(Math.abs(fading.name.x-initial.name.x)<.2&&Math.abs(fading.name.y-initial.name.y)<.2,'Name moved while fading');
      await position(.56);const centered=await state();
      check(Math.abs(centered.tablet.x+centered.tablet.width/2-width/2)<2&&Math.abs(centered.tablet.y+centered.tablet.height/2-height/2)<2,'Tablet is not centered in the viewport');
      await position(1);const opened=await state();
      check(Math.abs(opened.catalog.y)<1&&opened.projects.height>=height&&opened.coverTop&&opened.coverBottom,`Previous background visible at ${width}x${height}: ${JSON.stringify(opened)}`);
      check(!opened.catalogInert,'Catalog is inaccessible');
      if([1440,390].includes(width)) {
        await page.waitForTimeout(750);
        await page.screenshot({path:`.taste-skill/page-organization-2026-10-17/${width}-projects.png`});
      }
      await position(0);const restored=await state();check(restored.opacity===1,'Name did not return');
    }
    if([1440,1366,768,390,360,320].includes(width)) await page.screenshot({path:`.taste-skill/page-organization-2026-10-17/${width}x${height}-home.png`});
    results.push({width,height,animated:initial.animated,overflow:initial.overflow,nameBottom:initial.name.bottom,linksBottom:initial.links.bottom});
  }
  check(!errors.length,errors.join(';'));
  return {passed:true,results,errors};
}
