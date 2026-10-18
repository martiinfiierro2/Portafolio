async page => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:5177/#proyectos');
  await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(350);
  const before=await page.evaluate(()=>{
    window.resizeLog=[];
    const read=source=>{
      const journey=document.querySelector('.portfolio-journey'),stage=document.querySelector('.journey-stage'),track=document.querySelector('.journey-track');
      window.resizeLog.push({source,t:performance.now(),y:scrollY,p:journey.dataset.progress,distance:track.offsetHeight-stage.offsetHeight,catalogTop:document.querySelector('.journey-catalog').getBoundingClientRect().top,width:innerWidth,height:innerHeight});
    };
    addEventListener('resize',()=>read('resize'));
    addEventListener('scroll',()=>read('scroll'));
    new MutationObserver(()=>read('mutation')).observe(document.querySelector('.portfolio-journey'),{attributes:true});
    read('before');return window.resizeLog[0];
  });
  await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(500);
  return {before,events:await page.evaluate(()=>window.resizeLog)};
}
