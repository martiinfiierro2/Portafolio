async page => {
  const report = [];
  const check = (value, message) => { if (!value) throw new Error(message); };
  await page.addInitScript(() => {
    const NativeAudioContext = window.AudioContext;
    window.__keyboardAudio = { contexts: [], starts: 0 };
    if (NativeAudioContext) {
      window.AudioContext = new Proxy(NativeAudioContext, {
        construct(Target, args) {
          const context = Reflect.construct(Target, args);
          window.__keyboardAudio.contexts.push(context);
          return context;
        },
      });
      const start = AudioScheduledSourceNode.prototype.start;
      AudioScheduledSourceNode.prototype.start = function (...args) {
        window.__keyboardAudio.starts += 1;
        return start.apply(this, args);
      };
    }
  });
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://127.0.0.1:5178/');
  await page.evaluate(() => {localStorage.setItem('mf-theme','light');localStorage.setItem('portfolio-keyboard-sound','on');});
  await page.reload();
  await page.waitForTimeout(3500);
  check(await page.locator('main section').count() === 1, 'Home must contain only its own page');
  check(await page.locator('.catalog-card-link').count() === 0, 'Projects must not appear on home');
  check((await page.locator('.keyboard-output').textContent()).endsWith('Proyectos'), 'Intro should finish typing');
  check(await page.evaluate(() => window.__keyboardAudio.contexts.length) === 0, 'Initial typing must not start audio');
  check(await page.locator('.key-orange, .key-green, .key-blue, .key-pink').count() === 0, 'No permanently colored keycaps');

  await page.evaluate(() => {
    const key = document.querySelector('[data-letter="P"]');
    window.__keyIlluminated = false;
    new MutationObserver(() => { if (key.classList.contains('is-typing')) window.__keyIlluminated = true; }).observe(key, {attributes:true,attributeFilter:['class']});
  });
  await page.locator('[data-letter="P"]').click();
  check(await page.evaluate(() => window.__keyIlluminated), 'P should illuminate on press');
  const audio = await page.evaluate(() => ({starts:window.__keyboardAudio.starts,states:window.__keyboardAudio.contexts.map(context => context.state)}));
  check(audio.starts >= 1 && audio.states.includes('running'), 'Real Web Audio should play after a gesture: ' + JSON.stringify(audio));
  await page.waitForTimeout(220);
  check(!await page.locator('[data-letter="P"]').getAttribute('class').then(value => value.includes('is-typing')), 'Light should release');
  await page.getByRole('button', {name:'Sonido del teclado',exact:true}).click();
  const beforeMute = await page.evaluate(() => window.__keyboardAudio.starts);
  await page.locator('[data-letter="R"]').click();
  check(await page.evaluate(() => window.__keyboardAudio.starts) === beforeMute, 'Mute should prevent audio');
  await page.getByRole('button', {name:'Sonido del teclado',exact:true}).click();
  await page.getByRole('button', {name:'Repetir la escritura de Proyectos'}).click();
  await page.waitForTimeout(350);
  const partial = await page.locator('.keyboard-output').textContent();
  check(partial.length > 0 && partial.length < 9, 'Replay should type progressively');
  await page.waitForTimeout(2000);
  await page.locator('[data-letter="P"]').focus();
  await page.keyboard.press('ArrowRight');
  check(await page.locator('[data-letter="A"]').evaluate(el => el === document.activeElement), 'Roving focus should move from P to A');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(750);
  check(new URL(page.url()).pathname === '/proyectos', 'Physical Enter on keyboard should open independent projects');
  report.push({test:'Neutral keycaps, press/release illumination, native audio, mute, replay, roving focus and Enter', result:'passed', audio});

  const routeChecks = [['/proyectos','projects-title'],['/sobre-mi','about-title'],['/contacto','contact-title'],['/','hero-title']];
  for (const [path, id] of routeChecks) {
    await page.goto('http://127.0.0.1:5178' + path);
    await page.waitForTimeout(800);
    check(await page.locator('main h1').count() === 1, 'One page h1 at ' + path);
    check(await page.locator('main section').count() === 1, 'One principal page section at ' + path);
    check(await page.locator('main h1').getAttribute('id') === id, 'Correct heading at ' + path);
    check(await page.locator('.header a[aria-current="page"]').getAttribute('href') === path, 'Active header route at ' + path);
    check(await page.evaluate(() => scrollY) === 0, 'Start of independent page at ' + path);
    await page.reload();
    await page.waitForTimeout(400);
    check(await page.locator('#' + id).count() === 1, 'Reload works at ' + path);
  }
  for (const [hash, target] of [['#inicio','/'],['#proyectos','/proyectos'],['#sobre-mi','/sobre-mi'],['#contacto','/contacto'],['#/proyectos/taskflow','/proyectos/taskflow']]) {
    await page.goto('http://127.0.0.1:5178/' + hash);
    await page.waitForTimeout(500);
    check(new URL(page.url()).pathname === target && !new URL(page.url()).hash, 'Legacy URL migration ' + hash);
  }
  report.push({test:'Independent routes, heading, reload, active navigation, legacy URLs',result:'passed'});

  await page.goto('http://127.0.0.1:5178/proyectos');
  await page.getByText('Buscar y filtrar',{exact:true}).click();
  await page.getByRole('button',{name:'Backend',exact:true}).click();
  check(await page.locator('.catalog-card-link').count() === 1, 'Category filter');
  await page.getByRole('searchbox').fill('no-existent-project');
  check(await page.locator('.catalog-card-link').count() === 0, 'Empty search');
  await page.getByRole('button',{name:'Mostrar todos los proyectos'}).click();
  await page.locator('.catalog-card-link[href="/proyectos/taskflow"]').click();
  await page.getByRole('link',{name:'Abrir demo',exact:true}).click();
  check(new URL(page.url()).pathname === '/demos/taskflow','Demo route');
  await page.getByRole('link',{name:'Proyectos',exact:true}).click();
  check(new URL(page.url()).pathname === '/proyectos','Header from demo');
  await page.goto('http://127.0.0.1:5178/proyectos/no-existe');
  check(await page.getByRole('heading',{name:'Esta ruta no existe.'}).count() === 1,'Unknown route');
  report.push({test:'Filtering, empty/reset, detail, demo and 404',result:'passed'});
  return report;
}

