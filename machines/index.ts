import { assign, Machine } from 'xstate';

interface Schema {
  states: {
    fatalError: Record<string, unknown>;
    noAuth: Record<string, unknown>;
    loading: Record<string, unknown>;
    playing: Record<string, unknown>;
    notPlaying: Record<string, unknown>;
  };
}

type Events =
  | { type: 'TOKEN_UPDATE', accessToken: string }
  | { type: 'DATA_RECEIVED' }
  | { type: 'NO_DATA' }
  | { type: 'TOKEN_EXPIRED' }
  | { type: 'SWITCH_DISPLAY'}
  | { type: 'SWITCH_PALETTE'}
  | { type: 'AUTH_ERROR'};

export type DISPLAY_MODE = 
  | 'STANDARD'
  | 'BACKGROUND'

export type PALETTE_MODE =
  | 'STANDARD'
  | 'VIBRANT'
interface Context {
  accessToken: string;
  displayMode: DISPLAY_MODE;
  paletteMode: PALETTE_MODE;
}

export const machine = Machine<Context, Schema, Events>({
  initial: 'noAuth',
  context: {
    accessToken: null,
    displayMode: 'STANDARD',
    paletteMode: 'STANDARD'
  },
  states: {
    'noAuth': {
      on: {
        'TOKEN_UPDATE': {
          target: 'loading',
          actions: assign((context, event) => ({
            accessToken: event.accessToken
          }))
        }
      }
    },
    loading: {
      on: {
        'DATA_RECEIVED': 'playing',
        'NO_DATA': 'notPlaying'
      }
    },
    playing: {
      on: {
        'NO_DATA': 'notPlaying',
        'TOKEN_EXPIRED': {
          actions: () => {
            window.location.assign('/');
          }
        },
        'SWITCH_DISPLAY': {
          actions: assign({
            displayMode: (context) => context.displayMode === 'STANDARD' ? 'BACKGROUND' : 'STANDARD'
          })
        },
        'SWITCH_PALETTE': {
          actions: assign({
            paletteMode: (context) => context.paletteMode === 'STANDARD' ? 'VIBRANT' : 'STANDARD'
          })
        }
      }
    },
    notPlaying: {
      on: {
        'DATA_RECEIVED': 'playing',
        'TOKEN_EXPIRED': {
          actions: () => {
            window.location.assign('/');
          }
        }
      }
    },
    fatalError: {}
  }
});