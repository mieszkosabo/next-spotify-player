import { Machine, assign } from "xstate";


interface Schema {
  states: {
    front: Record<string, unknown>;
    back: Record<string, unknown>;
  };
}

type Events = 
  | { type: 'NEW_ALBUM', albumSrc: string };

interface Context {
  frontAlbum: string;
  backAlbum: string;
}

export const albumMachine = Machine<Context, Schema, Events>({
  initial: 'front',
  context: {
    frontAlbum: null,
    backAlbum: null
  },
  states: {
    'front': {
      on: {
        'NEW_ALBUM': {
          target: 'back',
          actions: assign({
            backAlbum: (_, event) => event.albumSrc
          })
        }
      }      
    },
    'back': {
      on: {
        'NEW_ALBUM': {
          target: 'front',
          actions: assign({
            frontAlbum: (_, event) => event.albumSrc
          })
        }
      }
    }
  }
});