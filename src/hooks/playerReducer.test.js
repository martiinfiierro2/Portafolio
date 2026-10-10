import test from 'node:test';
import assert from 'node:assert/strict';
import { initialPlayerState, playerReducer } from './playerReducer.js';

const first = { id: 'first', title: 'Primer proyecto' };
const second = { id: 'second', title: 'Segundo proyecto' };
const navigate = (state, disk = null, destination = 'collection') =>
  playerReducer(state, { type: 'navigate', disk, destination });
const complete = (state, diskId = state.disk?.id, phase = state.phase) =>
  playerReducer(state, { type: 'animationCompleted', diskId, phase });
const loaded = () => complete(navigate(initialPlayerState, first));

test('el perfil inicial no necesita un disquete y la colección se abre con la unidad vacía', () => {
  assert.equal(initialPlayerState.view, 'profile');
  assert.equal(initialPlayerState.disk, null);
  const collection = navigate(initialPlayerState);
  assert.equal(collection.view, 'collection');
  assert.equal(collection.phase, 'idle');
  assert.equal(navigate(collection, null, 'profile').view, 'profile');
});

test('el contenido del proyecto cambia después de terminar la inserción', () => {
  const inserting = navigate(initialPlayerState, first);
  assert.equal(inserting.phase, 'inserting');
  assert.equal(inserting.contentDisk, null);
  assert.equal(inserting.view, 'profile');
  const project = complete(inserting);
  assert.equal(project.view, 'project');
  assert.equal(project.contentDisk, first);
  assert.equal(project.disk, first);
  assert.equal(project.phase, 'idle');
});

test('volver al perfil expulsa el proyecto y deja la unidad vacía', () => {
  const ejecting = navigate(loaded(), null, 'profile');
  assert.equal(ejecting.view, 'project');
  assert.equal(ejecting.disk, first);
  const profile = complete(ejecting);
  assert.equal(profile.view, 'profile');
  assert.equal(profile.disk, null);
  assert.equal(profile.contentDisk, null);
  assert.equal(profile.phase, 'idle');
});

test('expulsar sin seleccionar otro destino vuelve a la colección', () => {
  const collection = complete(navigate(loaded()));
  assert.equal(collection.view, 'collection');
  assert.equal(collection.disk, null);
});

test('cambiar de proyecto expulsa el anterior antes de insertar el siguiente', () => {
  const ejecting = navigate(loaded(), second);
  assert.equal(ejecting.disk, first);
  assert.equal(ejecting.pendingDisk, second);
  const inserting = complete(ejecting);
  assert.equal(inserting.disk, second);
  assert.equal(inserting.contentDisk, first);
  assert.equal(inserting.phase, 'inserting');
  assert.equal(inserting.pendingDisk, null);
  assert.equal(complete(inserting).contentDisk, second);
});

test('los clics durante una animación no interrumpen ni cambian su destino', () => {
  const inserting = navigate(initialPlayerState, first);
  assert.equal(navigate(inserting, second), inserting);
  const ejecting = navigate(loaded(), null, 'profile');
  assert.equal(navigate(ejecting, second), ejecting);
  assert.equal(complete(ejecting).view, 'profile');
  const project = loaded();
  assert.equal(navigate(project, first), project);
});

test('una notificación tardía o duplicada no completa la animación de otro disco', () => {
  const ejecting = navigate(loaded(), second);
  const inserting = complete(ejecting);
  assert.equal(complete(inserting, first.id, 'ejecting'), inserting);
  assert.equal(complete(inserting, second.id, 'ejecting'), inserting);
  const project = complete(inserting);
  assert.equal(complete(project, second.id, 'inserting'), project);
});
