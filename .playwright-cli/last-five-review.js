async page => {
  const root = 'http://127.0.0.1:5178';
  const report=[];
  await page.goto(root);
  await page.evaluate(()=>localStorage.setItem('mf-theme','light'));
  for(const [width,height] of [[1440,900],[1366,768],[1024,768],[768,1024],[430,932],[390,844],[360,800],[320,568]]) {
    await page.setViewportSize({width,height});
    await page.goto(root);
    await page.waitForTimeout(3400);
    const metrics=await page.evaluate(()=>{
      const rect=el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};
      const textRect=el=>{const range=document.createRange();range.selectNodeContents(el);return rect(range);};
      const name=document.querySelector('.hero-name');
      const output=document.querySelector('.keyboard-output');
      const status=document.querySelector('.keyboard-status');
      const enter=document.querySelector('.keyboard-enter');
      const e=rect(enter),s=rect(status),o=rect(output);
      const target=document.elementFromPoint((e.left+e.right)/2,(e.top+e.bottom)/2);
      return {
        width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,
        name:rect(name),nameText:textRect(name.querySelector('span')),
        keyboard:rect(document.querySelector('.project-keyboard')),
        output:o,outputText:textRect(output),status:s,
        display:rect(document.querySelector('.keyboard-display')),
        displayCollision:!(o.right<=s.left || s.right<=o.left || o.bottom<=s.top || s.bottom<=o.top),
        enterVisible:e.left>=0&&e.right<=innerWidth,
        enterHit:enter.contains(target),
        cvPending:document.querySelector('.hero-cv').getAttribute('aria-disabled'),
      };
    });
    report.push(metrics);
    if([1440,768,390,320].includes(width)) await page.screenshot({path:'.taste-skill/keyboard-refinements/home-light-'+width+'.png',fullPage:true});
  }
  await page.setViewportSize({width:1440,height:900});
  await page.goto(root);
  await page.locator('.header .slider').click();
  await page.waitForTimeout(3400);
  await page.screenshot({path:'.taste-skill/keyboard-refinements/home-dark-1440.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'.taste-skill/keyboard-refinements/home-dark-390.png',fullPage:true});
  await page.locator('.header .slider').click();
  return report;
}
