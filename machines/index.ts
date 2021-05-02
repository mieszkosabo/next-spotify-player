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
  | { type: 'AUTH_ERROR' };

interface Context {
  accessToken: string;
  refreshToken: string;
}

export const machine = Machine<Context, Schema, Events>({
  initial: 'noAuth',
  context: {
    accessToken: null,
    refreshToken: null
  },
  states: {
    'noAuth': {
      on: {
        'TOKEN_UPDATE': {
          target: 'loading',
          actions: assign((context, event) => ({
            accessToken: event.accessToken,
            refreshToken: event.refreshToken
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
        'AUTH_ERROR': 'noAuth'
      }
    },
    notPlaying: {
      on: {
        'DATA_RECEIVED': 'playing',
        'AUTH_ERROR': 'noAuth'
      }
    }
  }
});