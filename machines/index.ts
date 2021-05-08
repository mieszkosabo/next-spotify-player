import { assign, Machine } from 'xstate';

interface Schema {
  states: {
    noAuth: Record<string, unknown>;
    loading: Record<string, unknown>;
    playing: Record<string, unknown>;
    notPlaying: Record<string, unknown>;
  };
}

type Events =
  | { type: 'TOKEN_UPDATE', accessToken: string, refreshToken: string }
  | { type: 'DATA_RECEIVED' }
  | { type: 'NO_DATA' }
  | { type: 'AUTH_ERROR' }
  | { type: 'SWITCH_DISPLAY'}
  | { type: 'SWITCH_PALETTE'};

export type DISPLAY_MODE = 
  | 'STANDARD'
  | 'BACKGROUND'

export type PALETTE_MODE =
  | 'STANDARD'
  | 'VIBRANT'
interface Context {
  accessToken: string;
  refreshToken: string;
  displayMode: DISPLAY_MODE;
  paletteMode: PALETTE_MODE;
}

export const machine = Machine<Context, Schema, Events>({
  initial: 'noAuth',
  context: {
    accessToken: null,
    refreshToken: null,
    displayMode: 'STANDARD',
    paletteMode: 'STANDARD'
  },
  states: {
    'noAuth': {
      on: {
        'TOKEN_UPDATE': {
          target: 'loading',
          actions: assign((context, event) => ({
            accessToken: event.accessToken ?? context.accessToken,
            refreshToken: event.refreshToken ?? context.refreshToken
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
        'AUTH_ERROR': {
          actions: () => {
            window.location.assign('/');
          }
        },
        'TOKEN_UPDATE': {
          actions: assign((context, event) => ({
            accessToken: event.accessToken ?? context.accessToken,
            refreshToken: event.refreshToken ?? context.refreshToken
          }))
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
        'AUTH_ERROR': {
          actions: () => {
            window.location.assign('/');
          }
        },
        'TOKEN_UPDATE': {
          actions: assign((context, event) => ({
            accessToken: event.accessToken ?? context.accessToken,
            refreshToken: event.refreshToken ?? context.refreshToken
          }))
        }
      }
    }
  }
});