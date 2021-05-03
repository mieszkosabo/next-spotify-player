import Head from 'next/head';
import querystring from 'query-string';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { machine } from '../machines';
import { useSpotifyData } from '../hooks/useSpotifyData';
import { PlayerLayout } from '../components/PlayerLayout';
import { Main } from '../components/layout/Main';
import { usePalette } from '../hooks/usePalette/usePalette';
import { IconButton } from '../components/IconButton';
import { Topbar } from '../components/layout/Topbar';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [state, send] = useMachine(machine);
  const { context } = state;
  const { data, 
          isError,
          isNotPlaying,
          artistImg
          } = useSpotifyData(context.accessToken);
  
  const { data: palette } = usePalette(data.albumSrc);
  useEffect(() => {
    const { query } = querystring.parseUrl(window.location.href);
    const { accessToken, refreshToken } = query;
    if (accessToken == null || refreshToken == null) {
      router.push('/api/login');
    }
    else {
      send({
        type: 'TOKEN_UPDATE', 
        accessToken: accessToken as string,
        refreshToken: refreshToken as string
      });
    }
  }, [state.value]);

  if (isError) {
    send({ type: 'AUTH_ERROR'});
  }
  
  if (isNotPlaying) {
    send({ type: 'NO_DATA'});

  }
  else {
    send({ type: 'DATA_RECEIVED'});
  }
  return (
    <div>
      <Head>
        <title>Clean Spotify Player</title>
        <meta name="description" content="Spotify player with delightful visuals" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>"></link>
      </Head>
    <Main backgroundColor={palette.darkMuted} backgroundImg={artistImg} displayMode={context.displayMode}>
      <Topbar>
        <IconButton onClick={() => send({ type: 'SWITCH_DISPLAY'})}>hello</IconButton>
      </Topbar>
        <PlayerLayout
          playerData={data}
          progressColorFront={palette.vibrant}
          progressColorBack={palette.darkVibrant}
          displayMode={context.displayMode}
        />
    </Main>
    </div>
  );
}
