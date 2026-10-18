async page => {
  await page.setViewportSize({width:1500,height:900});
  await page.goto('http://127.0.0.1:5177/');
  await page.evaluate(()=>document.fonts.ready);
  const metrics = await page.evaluate(async () => {
    const anton = new FontFace('Anton comparison', 'url(/src/assets/fonts/Anton-Regular.ttf)');
    document.fonts.add(await anton.load());
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const current = [...document.querySelectorAll('.hero-name-drawing text')].map(text=>({
      letter:text.textContent,font:getComputedStyle(text).font,tracking:getComputedStyle(text).letterSpacing,
      length:text.getComputedTextLength(),bbox:text.getBBox().toJSON?.()||String(text.getBBox()),
    }));
    document.body.innerHTML = '';
    document.body.style.cssText = 'margin:0;display:flex;gap:24px;padding:24px;background:#f5f3ee;color:#792a35';
    const results = [];
    for(const family of ['Six Caps','Anton comparison','Oswald']) {
      const panel = document.createElement('div');
      panel.style.cssText = 'width:468px';
      const title = document.createElement('div');
      title.textContent=family;
      title.style.cssText='font:20px sans-serif;margin-bottom:24px;color:#262626';
      panel.append(title);
      for(const word of ['MARTÍN','FIERRO']) {
        context.font=`400 100px "${family}"`;
        const m=context.measureText(word);
        const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('viewBox',`${-m.actualBoundingBoxLeft} ${-m.actualBoundingBoxAscent} ${m.actualBoundingBoxLeft+m.actualBoundingBoxRight} ${m.actualBoundingBoxAscent+m.actualBoundingBoxDescent}`);
        svg.setAttribute('preserveAspectRatio','none');
        svg.style.cssText='display:block;width:100%;height:350px;margin-bottom:14px;fill:currentColor;overflow:visible';
        const text=document.createElementNS(svg.namespaceURI,'text');
        text.setAttribute('x','0');text.setAttribute('y','0');
        text.style.cssText=`font:400 100px "${family}";letter-spacing:0`;
        text.textContent=word;svg.append(text);panel.append(svg);
        results.push({family,word,width:m.width,ascent:m.actualBoundingBoxAscent,descent:m.actualBoundingBoxDescent});
      }
      document.body.append(panel);
    }
    return {current,results};
  });
  await page.screenshot({path:'.taste-skill/name-reference-2026-10-17/compare.png'});
  return metrics;
}
