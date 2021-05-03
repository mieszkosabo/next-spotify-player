import useSWR from "swr";
import { fetchWithToken, SPOTIFY_API_URL } from "../fetching";

interface Options {
  refreshInterval?: number;
}

const parseData = (data: any) => ({
  artist: data?.data?.item?.artists[0]?.name,
  duration: data?.data?.item?.duration_ms,
  progress: data?.data?.progress_ms,
  paused: data?.data?.is_playing ? false : true,
  albumCover: data?.data?.item?.album?.images[0]?.url
});

export const useSpotifyData = (accessToken: string | null, options: Options = { refreshInterval: 10_000 }) => {
  const { data, error } = useSWR(
    accessToken ? [SPOTIFY_API_URL, accessToken] : null,
    fetchWithToken,
    options
  );
  const artistId = data?.data?.item?.artists[0]?.id;
  const { data: artistImg } = useSWR(() => artistId ? `/api/background/${artistId}` : null);
  const isLoading = data === undefined;
  return {
    isError: error,
    isNotPlaying: !isLoading && (data.data == null || data.data === ""),
    data: parseData(data),
    artistImg
  };
};