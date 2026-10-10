import test from 'node:test';
import assert from 'node:assert/strict';
import { relativePosition, resolveProject, swipeDirection, wrapIndex } from './deck.js';
import { projects } from '../data/projects.js';

for (const count of [1, 3, 5, 7, 20]) {
  test(`la baraja de ${count} proyectos conserva una activa y hasta cuatro vecinas`, () => {
    for (let active = 0; active < count; active++) {
      const positions = Array.from({ length: count }, (_, index) =>
        relativePosition(index, active, count),
      );
      assert.equal(positions.filter((position) => position === 0).length, 1);
      assert.equal(
        positions.filter((position) => Math.abs(position) <= 2).length,
        Math.min(count, 5),
      );
      assert.equal(wrapIndex(active + count, count), active);
      assert.equal(wrapIndex(active - count, count), active);
    }
  });
}

test('navegación circular y colección vacía', () => {
  assert.equal(wrapIndex(-1, 5), 4);
  assert.equal(wrapIndex(5, 5), 0);
  assert.equal(wrapIndex(10, 0), 0);
  assert.equal(resolveProject('missing', []), null);
});

test('restaurar una selección inválida usa el primer proyecto', () => {
  assert.equal(resolveProject('missing', projects), projects[0]);
  assert.equal(resolveProject(null, projects), projects[0]);
  assert.equal(resolveProject(projects[2].slug, projects), projects[2]);
});

test('swipe horizontal cambia la selección sin confundir scroll vertical o pequeños toques', () => {
  assert.equal(swipeDirection(-80, 5), 1);
  assert.equal(swipeDirection(80, 5), -1);
  assert.equal(swipeDirection(15, 5), 0);
  assert.equal(swipeDirection(80, 100), 0);
});

test('cada proyecto tiene una ruta única y datos sustituibles completos', () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.ok(/^[a-z0-9-]+$/.test(project.slug));
    assert.ok(project.title && project.cover && project.coverAlt);
    assert.ok(project.features.length >= 3 && project.features.length <= 5);
    assert.ok(project.media.length && project.architecture.length);
    if (project.isPlaceholder) {
      assert.ok(project.technologyNote.includes('ejemplo'));
      assert.equal(project.type, 'Ficha de muestra');
    }
  }
});
