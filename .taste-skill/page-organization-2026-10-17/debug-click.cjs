async page=>{
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:5177/');await page.reload();
  await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(200);
  await page.evaluate(()=>{
    window.scrollLog=[];
    const read=(kind,extra)=>{window.scrollLog.push({kind,t:performance.now(),y:scrollY,p:document.querySelector('.portfolio-journey')?.dataset.progress,...extra});};
    const scroll=window.scrollTo.bind(window);
    window.scrollTo=(...args)=>{read('scrollTo',{args,stack:new Error().stack?.split('\n').slice(1,4)});return scroll(...args);};
    addEventListener('scroll',()=>read('scroll'));
    const stage=document.querySelector('.journey-stage'),track=document.querySelector('.journey-track');
    scroll({top:(track.offsetHeight-stage.offsetHeight)*.56,behavior:'instant'});
  });
  await page.waitForTimeout(150);await page.locator('.switch').click();
  await page.setViewportSize({width:768,height:1024});await page.waitForTimeout(180);
  await page.goto('http://127.0.0.1:5177/#proyectos');
  await page.waitForFunction(()=>document.querySelector('.portfolio-journey')?.dataset.progress==='1.0000');
  const read=()=>page.evaluate(()=>({y:scrollY,p:document.querySelector('.portfolio-journey').dataset.progress,row:document.querySelectorAll('.catalog-row')[1].getBoundingClientRect().toJSON(),inert:document.querySelector('.journey-destination').inert,transform:document.querySelector('.journey-catalog').style.transform}));
  const immediate=await read();await page.waitForTimeout(700);const settled=await read();
  let error;
  try{await page.locator('.catalog-row').nth(1).click({timeout:1500});}catch(e){error=e.message;}
  return {immediate,settled,after:await page.evaluate(()=>({url:location.href,y:scrollY,p:document.querySelector('.portfolio-journey')?.dataset.progress})),error,log:await page.evaluate(()=>window.scrollLog?.slice(-40))};
}
