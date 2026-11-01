async page => {
  const base='http://127.0.0.1:5174';
  const check=(condition,message)=>{if(!condition)throw new Error(message);};
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base,{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Mi CV',exact:true}).click();
  await page.locator('.cv-dialog[open]').waitFor();
  await page.getByText('El CV todavía no está disponible.',{exact:true}).waitFor();
  check(await page.locator('.cv-document').count()===0,'An unconfigured CV requested a document');
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>document.activeElement?.textContent==='Mi CV'&&document.body.style.overflow!=='hidden');

  // The fixture exists only inside this isolated browser. It is never published as the user's CV.
  const context=await page.context().browser().newContext({viewport:{width:1440,height:900},acceptDownloads:true});
  const test=await context.newPage();
  test.on('pageerror',error=>errors.push(error.message));
  let requests=0;
  const stream='BT /F1 16 Tf 50 770 Td (Test document) Tj ET\n';
  const objects=[
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}endstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];
  let pdf='%PDF-1.4\n';
  const offsets=[0];
  objects.forEach((object,index)=>{offsets.push(pdf.length);pdf+=`${index+1} 0 obj\n${object}\nendobj\n`;});
  const xref=pdf.length;
  pdf+=`xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(offset=>String(offset).padStart(10,'0')+' 00000 n \n').join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  await test.route('**/src/data/contact.js*',route=>route.fulfill({contentType:'application/javascript',body:'export const contact={github:"https://github.com/martiinfiierro2",cv:"/__qa/cv.pdf"};'}));
  await test.route('**/__qa/cv.pdf',route=>{requests++;return route.fulfill({contentType:'application/pdf',body:pdf});});
  await test.goto(base,{waitUntil:'networkidle'});
  check(requests===0,'CV loaded before opening its modal');
  for(const viewport of [{width:1440,height:900},{width:820,height:1180},{width:390,height:844},{width:320,height:568},{width:844,height:390}]) {
    await test.setViewportSize(viewport);
    await test.getByRole('button',{name:'Mi CV',exact:true}).click();
    await test.locator('.cv-document').waitFor();
    check(await test.locator('.cv-document').getAttribute('data')==='/__qa/cv.pdf','Viewer points to another PDF');
    check(await test.locator('.cv-actions').evaluate(el=>{
      const dialog=el.closest('dialog').getBoundingClientRect(),actions=el.getBoundingClientRect();
      return actions.bottom<=dialog.bottom&&actions.left>=dialog.left&&actions.right<=dialog.right&&dialog.top>=0&&dialog.bottom<=innerHeight;
    }),'CV actions clipped at '+viewport.width+'×'+viewport.height);
    check(await test.locator('.cv-document').evaluate(el=>el.getBoundingClientRect().height>=100),'PDF area collapsed');
    const downloadEvent=test.waitForEvent('download');
    await test.getByRole('link',{name:'Descargar CV',exact:true}).click();
    const download=await downloadEvent;
    check(download.suggestedFilename()==='CV-Martin-Fierro.pdf','Incorrect download name');
    check(await download.failure()===null,'PDF download failed');
    await test.getByRole('button',{name:'Cerrar CV',exact:true}).click();
    await test.waitForFunction(()=>!document.querySelector('.cv-dialog').open&&document.body.style.overflow!=='hidden');
  }
  await context.close();
  check(errors.length===0,JSON.stringify(errors));
  return {result:'passed',missingDocument:'honest state',preview:'configured PDF',download:'verified in five viewports',focus:'restored',errors};
}
