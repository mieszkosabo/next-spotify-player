export const CLIENT_ID = process.env.CLIENT_ID;
export const REDIRECT_URI = process.env.REDIRECT_URI ?? 'http://localhost:4000';
export const SCOPES = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
];