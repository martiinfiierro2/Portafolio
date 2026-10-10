import { useReducer } from 'react';
import { initialPlayerState, playerReducer } from './playerReducer';

export default function useFloppyPlayer() {
  const [state, dispatch] = useReducer(playerReducer, initialPlayerState);

  return {
    ...state,
    busy: state.phase !== 'idle',
    openProfile: () => dispatch({ type: 'navigate', destination: 'profile' }),
    openProjects: () => dispatch({ type: 'navigate', destination: 'collection' }),
    selectProject: (disk) => dispatch({ type: 'navigate', disk }),
    eject: () => dispatch({ type: 'navigate', destination: 'collection' }),
    completeAnimation: (diskId, phase) => dispatch({ type: 'animationCompleted', diskId, phase }),
  };
}
