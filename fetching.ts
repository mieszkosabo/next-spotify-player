import axios from 'axios';

export const SPOTIFY_API_URL = 'https://api.spotify.com/v1/me/player';

export const fetchWithToken = async (url: string, accessToken: string) => axios.get(
  url,
  {
    headers: {
    Authorization: "Bearer " + accessToken
  }}
);