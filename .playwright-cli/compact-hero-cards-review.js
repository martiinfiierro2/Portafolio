async page => {
  const results = [];
  const check = (value, message) => { if (!value) throw new Error(message); };
  const root = 'http://127.0.0.1:5178';
  await page.goto(root);
  await page.evaluate(() => localStorage.setItem('mf-theme','light'));
  for (const [width,height] of [[1920,1080],[1440,900],[1366,768],[768,1024],[390,844],[320,568]]) {
    await page.setViewportSize({width,height});
    await page.goto(root);
    await page.waitForTimeout(3300);
    const home = await page.evaluate(() => {
      const rect = selector => {const r=document.querySelector(selector).getBoundingClientRect();return {left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)};};
      return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,header:rect('.header'),hero:rect('.hero-inner'),keyboard:rect('.project-keyboard'),enterText:getComputedStyle(document.querySelector('.keyboard-enter .keyboard-keycap')).color};
    });
    check(!home.overflow,'Home overflow at '+width);
    check(Math.abs((home.header.left+home.header.right)/2-width/2)<=1,'Header centered at '+width);
    check(Math.abs((home.hero.left+home.hero.right)/2-width/2)<=1,'Hero centered at '+width);
    check(home.header.width<=1121 && home.hero.width<=1081,'Compact maximum widths');
    check(home.keyboard.left>=0 && home.keyboard.right<=width,'Keyboard bounds at '+width);
    check(home.enterText==='rgb(255, 255, 255)','Preserve white Enter label');
    if ([1440,390].includes(width)) {
      await page.screenshot({path:'.taste-skill/compact-cards/home-'+width+'.png',fullPage:true});
      await page.locator('.hero').screenshot({path:'public/projects/portfolio-keyboard-'+(width===1440?'desktop':'mobile')+'.png'});
    }
    await page.goto(root+'/proyectos');
    await page.waitForTimeout(750);
    for (const card of await page.locator('.catalog-list > div').all()) {
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
    }
    const cards = await page.evaluate(() => ({
      width:innerWidth,
      columns:getComputedStyle(document.querySelector('.catalog-list')).gridTemplateColumns.split(' ').length,
      count:document.querySelectorAll('.catalog-card-link').length,
      overflow:document.documentElement.scrollWidth>innerWidth,
      images:[...document.querySelectorAll('.catalog-preview img')].map(img=>({loaded:img.complete&&img.naturalWidth>0,fit:getComputedStyle(img).objectFit})),
    }));
    check(!cards.overflow,'Cards overflow at '+width);
    check(cards.count===4,'All four cards');
    check(cards.columns===(width>760?2:1),'Responsive card grid at '+width);
    check(cards.images.every(img=>img.loaded&&img.fit==='contain'),'Complete project images at '+width);
    await page.evaluate(()=>scrollTo(0,0));
    if ([1440,390].includes(width)) await page.screenshot({path:'.taste-skill/compact-cards/projects-'+width+'.png',fullPage:true});
    results.push({home,cards});
  }
  await page.setViewportSize({width:1440,height:900});
  await page.goto(root+'/proyectos');
  await page.getByText('Buscar y filtrar',{exact:true}).click();
  await page.getByRole('button',{name:'Backend',exact:true}).click();
  check(await page.locator('.catalog-card-link').count()===1,'Card category filter');
  await page.getByRole('searchbox').fill('no-existent-project');
  check(await page.locator('.catalog-card-link').count()===0,'Card empty search');
  await page.getByRole('button',{name:'Mostrar todos los proyectos'}).click();
  check(await page.locator('.catalog-card-link').count()===4,'Card reset');
  await page.locator('.catalog-card-link[href="/proyectos/taskflow"]').click();
  check(new URL(page.url()).pathname==='/proyectos/taskflow','Card navigates to details');
  await page.getByRole('link',{name:'Proyectos',exact:true}).click();
  await page.locator('.header .slider').click();
  check(await page.locator('.site').getAttribute('data-theme')==='dark','Dark theme cards');
  for (const card of await page.locator('.catalog-list > div').all()) {
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
  }
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'.taste-skill/compact-cards/projects-dark.png',fullPage:true});
  await page.locator('.header .slider').click();
  await page.setViewportSize({width:390,height:844});
  await page.goto(root);
  await page.getByRole('button',{name:'Abrir menú'}).click();
  await page.getByRole('link',{name:'Proyectos',exact:true}).click();
  check(new URL(page.url()).pathname==='/proyectos','Narrow header mobile menu');
  results.push({test:'Filters, empty/reset, card navigation, both themes and mobile menu',result:'passed'});
  await page.setViewportSize({width:1440,height:900});
  await page.goto(root);
  return results;
}

