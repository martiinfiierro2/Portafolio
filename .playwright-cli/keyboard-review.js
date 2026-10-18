async page => {
  const results = [];
  await page.evaluate(() => localStorage.setItem('mf-theme', 'light'));
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844]]) {
    await page.setViewportSize({ width, height });
    await page.goto('http://127.0.0.1:5178/');
    await page.waitForTimeout(2700);
    results.push(await page.evaluate(() => {
      const hero = document.querySelector('.hero').getBoundingClientRect();
      const name = document.querySelector('.hero-name').getBoundingClientRect();
      const keyboard = document.querySelector('.project-keyboard').getBoundingClientRect();
      const enter = document.querySelector('.keyboard-enter').getBoundingClientRect();
      return {
        width: innerWidth, height: innerHeight,
        overflow: document.documentElement.scrollWidth > innerWidth,
        heroBottom: Math.round(hero.bottom),
        nameLeft: Math.round(name.left), nameRight: Math.round(name.right),
        keyboardLeft: Math.round(keyboard.left), keyboardRight: Math.round(keyboard.right),
        enterHeight: Math.round(enter.height),
        text: document.querySelector('.keyboard-output').textContent,
        backgroundImage: getComputedStyle(document.querySelector('.hero')).backgroundImage,
        folders: document.querySelectorAll('.tablet-scene, .tablet-folder, .about .project-folder').length,
      };
    }));
    await page.screenshot({ path: '.taste-skill/keyboard-implementation/light-' + width + '-hero.png' });
    for (const id of ['proyectos', 'sobre-mi', 'contacto']) {
      await page.locator('#' + id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(750);
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.screenshot({ path: '.taste-skill/keyboard-implementation/light-' + width + '-full.png', fullPage: true });
    await page.locator('.keyboard-enter').click();
    await page.waitForTimeout(1200);
    results.push(await page.evaluate(() => ({
      width: innerWidth, action: 'Enter click', hash: location.hash,
      projectTop: Math.round(document.querySelector('#proyectos').getBoundingClientRect().top),
      activeHeading: document.activeElement.id,
    })));
  }
  return results;
}
