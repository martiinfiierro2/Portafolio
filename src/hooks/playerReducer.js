export const initialPlayerState = {
  view: 'profile',
  contentDisk: null,
  disk: null,
  pendingDisk: null,
  destination: 'collection',
  phase: 'idle',
};

// The reader owns the animation; the player owns what its completion means.
export function playerReducer(state, action) {
  switch (action.type) {
    case 'navigate': {
      if (state.phase !== 'idle') return state;
      const { disk = null, destination = 'collection' } = action;
      if (disk && disk.id === state.disk?.id) return state;
      if (state.disk) {
        return { ...state, pendingDisk: disk, destination, phase: 'ejecting' };
      }
      if (disk) return { ...state, disk, pendingDisk: null, phase: 'inserting' };
      return { ...state, view: destination, contentDisk: null };
    }
    case 'animationCompleted': {
      // Ignore duplicate or late completions from an earlier disk or phase.
      if (action.diskId !== state.disk?.id || action.phase !== state.phase) return state;
      if (state.phase === 'ejecting') {
        if (state.pendingDisk) {
          return { ...state, disk: state.pendingDisk, pendingDisk: null, phase: 'inserting' };
        }
        return {
          ...state,
          disk: null,
          contentDisk: null,
          view: state.destination,
          phase: 'idle',
        };
      }
      if (state.phase === 'inserting') {
        return { ...state, contentDisk: state.disk, view: 'project', phase: 'idle' };
      }
      return state;
    }
    default:
      return state;
  }
}
