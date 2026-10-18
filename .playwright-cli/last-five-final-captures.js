async page => {
  const root='http://127.0.0.1:5178';
  const report=[];
  await page.goto(root);
  await page.evaluate(()=>localStorage.setItem('mf-theme','light'));
  for(const [width,height] of [[1440,900],[1366,768],[1024,768],[768,768],[390,844],[320,568]]) {
    await page.setViewportSize({width,height});
    await page.goto(root);
    await page.waitForTimeout(3300);
    const metrics=await page.evaluate(()=>{
      const getRect=selector=>document.querySelector(selector).getBoundingClientRect();
      const name=document.querySelector('.hero-name > span');
      const range=document.createRange();range.selectNodeContents(name);
      const keyboard=getRect('.project-keyboard');
      return {width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,nameFits:range.getBoundingClientRect().right<=getRect('.hero-name').right+1,keyboardBottom:keyboard.bottom,keyboardRight:keyboard.right,pageHeight:document.documentElement.scrollHeight};
    });
    if(metrics.overflow||!metrics.nameFits||metrics.keyboardRight>width) throw new Error(JSON.stringify(metrics));
    if(width>760&&metrics.keyboardBottom>height) throw new Error('Keyboard cropped on desktop '+JSON.stringify(metrics));
    if(width>760&&metrics.pageHeight>height+1) throw new Error('Desktop page exceeds its viewport '+JSON.stringify(metrics));
    if([1440,1366,390,320].includes(width)) await page.screenshot({path:'.taste-skill/keyboard-refinements/home-light-'+width+'.png',fullPage:true});
    if([1440,390].includes(width)) await page.locator('.hero').screenshot({path:'public/projects/portfolio-keyboard-'+(width===1440?'desktop':'mobile')+'.png'});
    report.push(metrics);
  }
  for(const width of [1440,390]) {
    await page.setViewportSize({width,height:width===1440?900:844});
    await page.goto(root);
    await page.locator('.header .slider').click();
    await page.waitForTimeout(3400);
    await page.screenshot({path:'.taste-skill/keyboard-refinements/home-dark-'+width+'.png',fullPage:true});
    await page.locator('.header .slider').click();
  }
  await page.setViewportSize({width:1440,height:900});
  await page.goto(root);
  return report;
}
