import test from 'node:test';
import assert from 'node:assert/strict';
import { parseView, screenTransform, viewHash } from '../src/utils/navigation.ts';
import { projects } from '../src/data/projects.ts';
import { existsSync } from 'node:fs';

const slugs = projects.map((project) => project.slug);
test('los enlaces directos y las vueltas al escritorio conservan la vista correcta', () => {
  for (const view of [
    { kind: 'desk' },
    { kind: 'projects' },
    { kind: 'project', slug: slugs[0] },
  ]) {
    assert.deepEqual(parseView(viewHash(view), slugs), view);
  }
  assert.deepEqual(parseView('', slugs), { kind: 'desk' });
  assert.deepEqual(parseView('#proyecto/desconocido', slugs), { kind: 'projects' });
  assert.deepEqual(parseView('#proyecto/%XX', slugs), { kind: 'projects' });
});

test('la cámara parte de la pantalla física y conserva sus límites en distintos formatos', () => {
  const screen = { x: 123, y: 210, width: 780, height: 460 };
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    const transform = screenTransform(screen, viewport);
    assert.equal(transform.x, screen.x);
    assert.equal(transform.y, screen.y);
    assert.ok(Math.abs(transform.scaleX * viewport.width - screen.width) < 0.001);
    assert.ok(Math.abs(transform.scaleY * viewport.height - screen.height) < 0.001);
  }
});

test('las fichas tienen identificadores únicos y todos los medios locales existen', () => {
  assert.equal(new Set(slugs).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9-]+$/);
    assert.ok(project.title && project.description && project.coverAlt);
    assert.ok(existsSync(new URL(`../public${project.cover}`, import.meta.url)));
    for (const media of project.media)
      assert.ok(existsSync(new URL(`../public${media.src}`, import.meta.url)));
    if (project.isSample) assert.equal(project.demoUrl, null);
  }
});
