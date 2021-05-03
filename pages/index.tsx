import querystring from 'query-string';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
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
import { enableNoSleep } from '../utils/nosleep';

export default function Home(): JSX.Element {
  const router = useRouter();
  const fullscreen = useFullScreenHandle();
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
  if (state.value === 'loading' || state.value === 'noAuth') {
    return (
    <Main>
      <p>loading...</p>
    </Main>
    );
  }
  return (
    <FullScreen handle={fullscreen}>
    <Main backgroundColor={palette.darkMuted} backgroundImg={artistImg} displayMode={context.displayMode}>
      {!fullscreen.active && <Topbar>
        <IconButton onClick={() => send({ type: 'SWITCH_DISPLAY'})}>hello</IconButton>
        <IconButton onClick={() => { fullscreen.enter(); enableNoSleep(); }}>fullscreen!</IconButton>
      </Topbar>
      }
        <PlayerLayout
          playerData={data}
          progressColorFront={palette.vibrant}
          progressColorBack={palette.darkVibrant}
          displayMode={context.displayMode}
        />
    </Main>
    </FullScreen>
  );
}
