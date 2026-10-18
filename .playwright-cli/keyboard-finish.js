async page => {
  const root='http://127.0.0.1:5178';
  await page.setViewportSize({width:1440,height:900});
  await page.goto(root);
  if(await page.locator('.site').getAttribute('data-theme')!=='dark') await page.locator('.header .slider').click();
  for(const demo of ['taskflow','pulse-api','media-lab']) {
    await page.goto(root+'/demos/'+demo);
    if(demo==='pulse-api') {
      await page.getByRole('button',{name:/Ejecutar consulta/}).click();
      await page.waitForTimeout(850);
    }
    await page.locator('.demo-workspace').screenshot({path:'public/projects/'+demo+'.png'});
  }
  await page.goto(root+'/proyectos');
  await page.locator('.header .slider').click();
  await page.getByText('Buscar y filtrar',{exact:true}).click();
  await page.getByRole('searchbox').focus();
  await page.waitForTimeout(850);
  await page.screenshot({path:'.taste-skill/keyboard-identity/filters-light-1440.png',fullPage:false});
  await page.locator('.catalog-card-link').first().focus();
  const focus=await page.locator('.catalog-card').first().evaluate(el=>getComputedStyle(el).outlineStyle);
  if(focus!=='solid') throw new Error('Project card focus outline is not visible');
  await page.goto(root);
  return {cardFocus:'passed',demoPreviews:'updated',previewTheme:'light'};
}
