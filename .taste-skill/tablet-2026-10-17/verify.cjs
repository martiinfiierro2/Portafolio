async (page) => {
  const base = 'http://127.0.0.1:5176';
  const screenshots = '.taste-skill/tablet-2026-10-17';
  const errors = [];
  const layouts = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const captureFullPage = async (path) => {
    for (const target of await page.locator('.hero-links, #about-title, #contact-title, .catalog-list article').all()) {
      await target.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
    }
    await page.waitForTimeout(750);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path, fullPage: true });
  };

  for (const theme of ['dark', 'light']) {
    await page.goto(base);
    await page.evaluate((value) => localStorage.setItem('mf-theme', value), theme);
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width === 768 ? 1024 : width >= 1000 ? 900 : 844 });
      await page.reload();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(950);
      const measured = await page.evaluate(() => {
        const title = document.querySelector('.hero h1');
        const line = title.firstElementChild;
        const range = document.createRange();
        range.selectNodeContents(line);
        const letters = range.getBoundingClientRect();
        return {
          width: innerWidth,
          theme: document.querySelector('.site').dataset.theme,
          overflow: document.documentElement.scrollWidth - innerWidth,
          titleRight: letters.right,
          tabletLinks: document.querySelectorAll('.tablet-key').length,
          brokenImages: [...document.images].filter((img) => !img.complete || !img.naturalWidth).length,
          smallestKey: Math.min(...[...document.querySelectorAll('.tablet-key')].map((key) => key.getBoundingClientRect().height)),
        };
      });
      check(measured.overflow === 0, `Horizontal overflow at ${width}px, ${theme}: ${measured.overflow}`);
      check(measured.titleRight <= width, `Name overflows at ${width}px`);
      check(measured.tabletLinks === 4 && measured.smallestKey >= 44, 'Tablet keys missing or too small');
      check(measured.brokenImages === 0, 'Broken project image');
      check(measured.theme === theme, 'Theme was not persisted');
      layouts.push(measured);
      if ([1440, 768, 390].includes(width)) {
        await page.screenshot({ path: `${screenshots}/${width}-${theme}.png` });
        if (width === 390) await captureFullPage(`${screenshots}/mobile-${theme}-full.png`);
      }
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  const themeControl = page.getByRole('checkbox');
  await themeControl.focus();
  await themeControl.press('Space');
  await page.waitForFunction(() => document.querySelector('.site').dataset.theme === 'dark');
  check(await page.evaluate(() => localStorage.getItem('mf-theme')) === 'dark', 'Keyboard theme toggle did not persist');
  await page.reload();
  check(await page.getByRole('checkbox').isChecked(), 'Theme was lost after reload');

  await page.getByRole('button', { name: 'Abrir menú', exact: true }).click();
  check(await page.getByRole('button', { name: 'Cerrar menú' }).getAttribute('aria-expanded') === 'true', 'Mobile menu did not open');
  await page.keyboard.press('Escape');
  check(await page.getByRole('button', { name: 'Abrir menú' }).getAttribute('aria-expanded') === 'false', 'Escape did not close the menu');
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).click();
  await page.locator('#primary-navigation').getByRole('link', { name: 'Proyectos', exact: true }).click();
  await page.waitForURL(`${base}/proyectos`);
  await page.getByRole('heading', { name: 'Proyectos', level: 1 }).waitFor();
  check(await page.locator('.catalog-row').count() === 4, 'Catalog must include all four projects');
  check(await page.getByRole('button', { name: 'Abrir menú' }).getAttribute('aria-expanded') === 'false', 'Menu remained open after navigation');
  const catalogImageWidth = await page.locator('.catalog-preview').first().evaluate((el) => el.getBoundingClientRect().width);
  check(catalogImageWidth >= 340, `Mobile catalog image is too small: ${catalogImageWidth}`);
  await page.getByText('Buscar y filtrar', { exact: true }).click();
  await page.getByRole('searchbox', { name: 'Buscar proyectos' }).fill('sin-resultados-xyz');
  await page.getByRole('heading', { name: 'No hay proyectos con esta búsqueda.' }).waitFor();
  await page.getByRole('button', { name: 'Mostrar todos los proyectos' }).click();
  check(await page.locator('.catalog-row').count() === 4, 'Catalog reset failed');
  await captureFullPage(`${screenshots}/catalog-mobile.png`);

  for (const slug of ['portfolio', 'taskflow', 'pulse-api', 'media-lab']) {
    await page.goto(base);
    await page.locator(`.tablet-key[href='/proyectos/${slug}']`).click();
    await page.waitForURL(`${base}/proyectos/${slug}`);
    await page.locator('#project-title').waitFor();
    await page.getByRole('link', { name: 'Volver a proyectos', exact: true }).click();
    await page.waitForURL(`${base}/proyectos`);
  }

  await page.goto(`${base}/#proyectos`);
  await page.waitForURL(`${base}/proyectos`);
  await page.goto(base);
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).click();
  await page.locator('#primary-navigation').getByRole('link', { name: 'Sobre mí', exact: true }).click();
  await page.waitForURL(`${base}/#sobre-mi`);
  await page.waitForTimeout(850);
  const anchorTop = await page.locator('#about-title').evaluate((el) => el.getBoundingClientRect().top);
  check(anchorTop >= 70, 'Floating header covers the about heading');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  const reducedTransform = await page.locator('.project-tablet').evaluate((el) => getComputedStyle(el).transform);
  check(reducedTransform === 'none', 'Reduced motion should remove tablet rotation');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base);
  await page.waitForTimeout(900);
  check(errors.length === 0, `Runtime errors: ${errors.join('; ')}`);
  return { layouts, catalogImageWidth, anchorTop, errors, verified: ['all four tablet links', 'catalog route and return links', 'catalog search and reset', 'mobile menu and Escape', 'keyboard theme toggle and persistence', 'legacy catalog hash', 'about anchor', 'reduced motion'] };
}
