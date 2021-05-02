export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI ?? 'http://localhost:4000/api/callback/';
export const SCOPES = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
];