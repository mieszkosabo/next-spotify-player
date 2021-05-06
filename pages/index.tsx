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
import { FullscreenIcon } from '../components/Icons/FullscreenIcon';
import { SwitchDisplay } from '../components/Icons/SwitchIcon';
import { Palette } from '../components/Icons/PaletteIcon';
import { Flex } from '../components/layout/Flex';
import { Text } from '../components/layout/Text';

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
    if (state.value === 'fatalError') {
      return; // don't retry obtaining a token at this point
    }
    const { access_token: accessToken, error } = querystring.parse(window.location.hash);
    if (error) {
      send({ type: 'AUTH_ERROR' });
    }
    if (accessToken == null) {
      router.push('/api/login');
    }
    else {
      send({
        type: 'TOKEN_UPDATE', 
        accessToken: accessToken as string
      });
    }
  }, [state.value]);

  if (isError) {
    send({ type: 'TOKEN_EXPIRED'});
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
      <Flex justifyContent="center" alignItems="center" width="full" height="full">
        <Text fontSize="3rem" fontWeight="bold" color="white">Loading...</Text>
      </Flex>
    </Main>
    );
  }
  if (state.value === 'notPlaying') {
    return (
      <Main>
        <Flex justifyContent="center" alignItems="center" width="full" height="full">
          <Text fontSize="3rem" fontWeight="bold" color="white">Play something!</Text>
        </Flex>
      </Main>
      ); 
  }
  return (
    <FullScreen handle={fullscreen}>
    <Main 
      backgroundColor={context.paletteMode === 'VIBRANT' ? palette.darkVibrant : palette.darkMuted}
      backgroundImg={artistImg}
      displayMode={context.displayMode}
    >
      {!fullscreen.active && <Topbar>
        <IconButton onClick={() => send({ type: 'SWITCH_DISPLAY'})} icon={SwitchDisplay} />
        <IconButton onClick={() => send({ type: 'SWITCH_PALETTE'})} icon={Palette} />
        <IconButton onClick={() => { fullscreen.enter(); enableNoSleep(); }} icon={FullscreenIcon} />
      </Topbar>
      }
        <PlayerLayout
          playerData={data}
          progressColorFront={palette.vibrant}
          progressColorBack={context.paletteMode === 'VIBRANT' ? palette.darkMuted : palette.darkVibrant}
          displayMode={context.displayMode}
        />
    </Main>
    </FullScreen>
  );
}
