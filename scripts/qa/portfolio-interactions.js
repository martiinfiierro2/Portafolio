async page => {
  const base = 'http://127.0.0.1:5174';
  const errors = [];
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.setItem('mf-theme', 'light'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Mis proyectos', exact: true }).click();
  await page.waitForURL('**/#proyectos');
  await page.locator('nav').getByRole('link', { name: 'Proyectos', exact: true }).click();
  await page.getByRole('link', { name: 'Ver proyecto: Calendar', exact: true }).click();
  await page.waitForURL('**/proyectos/calendar');
  await page.locator('.case-stage img').nth(1).click();
  await page.locator('dialog[open]').waitFor();
  check((await page.locator('dialog img').getAttribute('src')).endsWith('/dia.png'), 'Wrong enlarged image');
  await page.keyboard.press('ArrowLeft');
  check((await page.locator('dialog img').getAttribute('src')).endsWith('/semana.png'), 'Keyboard previous capture failed');
  await page.getByRole('button', { name: 'Siguiente captura', exact: true }).click();
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('dialog').open && document.body.style.overflow !== 'hidden');
  check(await page.locator('.case-stage').evaluate(el => el === document.activeElement), 'Gallery focus not restored');

  // A deliberately delayed answer must not clear the previous view or win a later selection.
  let release;
  const blocked = new Promise(resolve => { release = resolve; });
  const delayed = async route => { await blocked; await route.continue(); };
  await page.route('**/compra.png', delayed);
  try {
    await page.getByRole('button', { name: 'Compra', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.case-stage').getAttribute('aria-busy') === 'true');
    check((await page.locator('.case-stage img').first().getAttribute('src')).endsWith('/semana.png'), 'Pending request replaced the capture');
    check((await page.locator('.viewer [role="status"]').textContent()).includes('Cargando'), 'Missing loading feedback');
    await page.getByRole('button', { name: 'Nevera', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.case-stage img')?.src.endsWith('/nevera.png'));
    release();
    await page.waitForTimeout(300);
    check((await page.locator('.case-stage img').getAttribute('src')).endsWith('/nevera.png'), 'Stale request won the race');
  } finally { release(); await page.unroute('**/compra.png', delayed); }

  await page.reload({ waitUntil: 'networkidle' });
  let releaseModal;
  const blockedModal = new Promise(resolve => { releaseModal = resolve; });
  const delayedModal = async route => { await blockedModal; await route.continue(); };
  await page.route('**/compra.png', delayedModal);
  try {
    await page.getByRole('button', { name: 'Compra', exact: true }).click();
    await page.locator('.case-stage img').nth(1).click();
    await page.locator('dialog[open]').waitFor();
    releaseModal();
    await page.waitForTimeout(250);
    check((await page.locator('dialog img').getAttribute('src')).endsWith('/dia.png'), 'Pending view changed an open dialog');
    await page.keyboard.press('Escape');
  } finally { releaseModal(); await page.unroute('**/compra.png', delayedModal); }

  await page.locator('.next-link').click();
  await page.waitForURL('**/proyectos/monitorizacion-sistemas-distribuidos');
  let failMap = true;
  const mapRoute = route => failMap ? route.abort() : route.continue();
  await page.route('**/mapa.png', mapRoute);
  await page.getByRole('button', { name: 'Mapa', exact: true }).click();
  await page.getByRole('button', { name: 'Volver a intentar', exact: true }).waitFor();
  check((await page.locator('.case-stage img').getAttribute('src')).endsWith('/grafo.png'), 'Failed request cleared current capture');
  failMap = false;
  await page.getByRole('button', { name: 'Volver a intentar', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.case-stage img')?.src.endsWith('/mapa.png'));
  await page.unroute('**/mapa.png', mapRoute);
  check(await page.locator('video').count() === 0, 'Video was loaded before request');
  let failVideo = true;
  const videoRoute = route => failVideo ? route.abort() : route.continue();
  await page.route('**/*.webm', videoRoute);
  await page.locator('.film').getByRole('button', { name: 'Ver recorrido', exact: true }).click();
  await page.locator('.film-error').waitFor();
  failVideo = false;
  await page.locator('.film-error').getByRole('button', { name: 'Volver a intentar', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
  await page.unroute('**/*.webm', videoRoute);
  await page.locator('video').evaluate(video => video.pause());
  await page.getByRole('switch').click();
  await page.reload({ waitUntil: 'networkidle' });
  check(await page.getByRole('switch').getAttribute('aria-checked') === 'true', 'Theme persistence failed');

  // The first capture also has a recoverable error state.
  let failInitial = true;
  const originalHeight = await page.locator('.case-stage').evaluate(el => el.getBoundingClientRect().height);
  const initialRoute = route => failInitial ? route.abort() : route.continue();
  await page.route('**/grafo.png', initialRoute);
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('.gallery-unavailable').waitFor();
  check(Math.abs(await page.locator('.case-stage').evaluate(el => el.getBoundingClientRect().height) - originalHeight) < 1, 'Error placeholder changed gallery height');
  check(await page.locator('.case-stage').isDisabled(), 'Broken capture can still be opened');
  failInitial = false;
  await page.getByRole('button', { name: 'Volver a intentar', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.case-stage img')?.naturalWidth > 0);
  await page.unroute('**/grafo.png', initialRoute);

  const context = await page.context().browser().newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const phone = await context.newPage();
  phone.on('pageerror', error => errors.push(error.message));
  await phone.emulateMedia({ reducedMotion: 'reduce' });
  await phone.goto(base, { waitUntil: 'networkidle' });
  await phone.getByRole('link', { name: 'Mis proyectos', exact: true }).tap();
  await phone.waitForURL('**/#proyectos');
  check(await phone.locator('.peeling').count() === 0, 'Reduced motion ignored');
  await phone.getByRole('link', { name: 'Ver proyecto: Calendar', exact: true }).tap();
  await phone.waitForURL('**/proyectos/calendar');
  await phone.locator('.case-stage').tap();
  await phone.locator('dialog[open]').waitFor();
  await phone.getByRole('button', { name: 'Siguiente captura', exact: true }).tap();
  check((await phone.locator('dialog img').getAttribute('src')).endsWith('/dia.png'), 'Touch gallery navigation failed');
  await phone.getByRole('button', { name: 'Cerrar captura', exact: true }).tap();
  await phone.getByRole('button', { name: 'Compra', exact: true }).tap();
  await phone.waitForFunction(() => document.querySelector('.case-stage img')?.src.endsWith('/compra.png'));
  check(await phone.locator('.case-stage img').evaluate(el => el.getAnimations().length) === 0, 'Reduced motion gallery animated');
  await context.close();
  check(errors.length === 0, JSON.stringify(errors));
  return { result: 'passed', staleRequests: 'ignored', slowLoading: 'previous capture retained', galleryErrors: 'recoverable', initialError: 'recoverable', videoError: 'recoverable', modal: 'mouse, keyboard and touch', reducedMotion: 'respected', javascriptErrors: errors };
}
