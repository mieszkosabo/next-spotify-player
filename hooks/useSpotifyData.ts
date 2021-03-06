import useSWR from "swr";
import { fetchWithToken, SPOTIFY_API_URL } from "../fetching";

interface Options {
  refreshInterval?: number;
}
export interface PlayerData {
  title: string;
  artist: string;
  duration: number;
  progress: number;
  albumSrc: string;
  paused: boolean;
}

const parseData = (data: any): PlayerData => ({
  title: data?.data?.item?.name,
  artist: data?.data?.item?.artists[0]?.name,
  duration: data?.data?.item?.duration_ms,
  progress: data?.data?.progress_ms,
  paused: data?.data?.is_playing ? false : true,
  albumSrc: data?.data?.item?.album?.images[0]?.url,
});

export const useSpotifyData = (
  accessToken: string | null,
  options: Options = { refreshInterval: 5_000 }
) => {
  const { data, error } = useSWR(
    accessToken ? [SPOTIFY_API_URL, accessToken] : null,
    fetchWithToken,
    options
  );
  const isLoading = data === undefined;
  return {
    isError: error,
    isNotPlaying: !isLoading && (data.data == null || data.data === ""),
    data: parseData(data),
    artistImg: null,
  };
};
