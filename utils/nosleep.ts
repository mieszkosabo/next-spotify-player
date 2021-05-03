import NoSleep from 'nosleep.js';

export const enableNoSleep = (): void => {
  const noSleep = new NoSleep();
  noSleep.enable();
};