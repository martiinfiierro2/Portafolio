async page => {
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const results=[];
  for(const theme of ['light','dark']) {
    for(const [width,height] of [[1440,900],[1280,800],[768,1024],[390,844],[375,667],[320,700]]) {
      await page.setViewportSize({width,height});
      await page.goto('http://127.0.0.1:5177/');
      await page.evaluate(value=>{
        localStorage.setItem('mf-theme',value);
      },theme);
      await page.reload();
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(250);
      const state=await page.evaluate(()=>{
        const rect=element=>element.getBoundingClientRect().toJSON();
        const words=[...document.querySelectorAll('.hero-name-drawing')].map(svg=>{
          const screen=svg.getScreenCTM();
          const points=[];
          for(const element of svg.querySelectorAll('text,path')) {
            const b=element.getBBox();
            const outline=element.tagName==='text'?parseFloat(getComputedStyle(element).strokeWidth)/2:0;
            for(const [x,y] of [[b.x-outline,b.y-outline],[b.x+b.width+outline,b.y+b.height+outline]]) {
              const p=new DOMPoint(x,y).matrixTransform(screen);points.push(p);
            }
          }
          // SVG getBBox includes font line-box leading; use canvas ink bounds
          // to verify the actual rendered letters, including their outline.
          const context=document.createElement('canvas').getContext('2d');
          const ink=[];
          for(const text of svg.querySelectorAll('text')) {
            const css=getComputedStyle(text);context.font=`${css.fontWeight} ${css.fontSize} ${css.fontFamily}`;
            const m=context.measureText(text.textContent),o=parseFloat(css.strokeWidth)/2,x=Number(text.getAttribute('x'));
            const p1=new DOMPoint(x-m.actualBoundingBoxLeft-o,-m.actualBoundingBoxAscent-o).matrixTransform(screen);
            const p2=new DOMPoint(x+m.actualBoundingBoxRight+o,m.actualBoundingBoxDescent+o).matrixTransform(screen);
            ink.push({left:p1.x,top:p1.y,right:p2.x,bottom:p2.y});
          }
          const view=rect(svg);
          return {view,ink,gaps:ink.slice(1).map((b,i)=>b.left-ink[i].right),font:getComputedStyle(svg.querySelector('text')).fontFamily};
        });
        return {
          overflow:document.documentElement.scrollWidth-innerWidth,
          title:document.querySelector('h1').getAttribute('aria-label'),
          words,folder:!!document.querySelector('.tablet-folder'),open:document.querySelector('.tablet-explore').textContent.trim(),
          invalid:[...document.querySelectorAll('[style]')].some(el=>/NaN|Infinity/.test(el.getAttribute('style'))),
          nameBottom:rect(document.querySelector('.hero-heading')).bottom,
          linksBottom:rect(document.querySelector('.hero-links')).bottom,
        };
      });
      if(state.overflow || state.invalid || state.title!=='Martín Fierro') throw new Error(JSON.stringify({width,height,theme,state}));
      if(state.nameBottom>height||state.linksBottom>height) throw new Error(`First screen clipped at ${width}x${height}`);
      for(const {view,ink,gaps,font} of state.words) {
        if(!font.includes('Anton')) throw new Error('Unexpected display font');
        if(Math.min(...gaps)<=0) throw new Error(`Letters overlap at ${width}px`);
        if(ink.some(b=>b.left<view.left-.5||b.right>view.right+.5||b.top<view.top-.5||b.bottom>view.bottom+.5)) throw new Error(`Ink clips at ${width}px`);
        if((Math.max(...ink.map(b=>b.bottom))-Math.min(...ink.map(b=>b.top)))/view.height<.8) throw new Error(`Unused name height at ${width}px`);
      }
      if(!state.folder||state.open!=='Abrir') throw new Error('Folder cover changed');
      results.push({width,height,theme,overflow:state.overflow,nameHeight:state.words.map(w=>w.view.height),smallestGap:Math.min(...state.words.flatMap(w=>w.gaps))});
      if([1440,390].includes(width)) await page.screenshot({path:`.taste-skill/name-reference-2026-10-17/${theme}-${width}.png`});
    }
  }
  if(errors.length) throw new Error(errors.join(';'));
  return {passed:true,results,errors};
}
