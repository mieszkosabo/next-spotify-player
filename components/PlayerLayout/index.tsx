import { Composition } from 'atomic-layout';
import React from 'react';
import { Album } from '../Album';
import { Artist } from '../Artist';
import { Flex } from '../layout/Flex';
import { ProgressLine } from '../ProgressLine';
import { Title } from '../Title';
import { PlayerData } from '../../hooks/useSpotifyData';
import { DISPLAY_MODE } from '../../machines';

const desktopTemplate = `
  album titles
`;
const cols = "1fr 1fr";

const backgroundImgageTemplate = `
  smallAlbum smallTitles
  progress progress
`;

const cols2 = "auto 1fr";
const rows2 = "1fr auto";

interface Props {
  playerData: PlayerData;
  progressColorFront: string;
  progressColorBack: string;
  displayMode: DISPLAY_MODE;
}

export const PlayerLayout = ({ playerData, progressColorFront, progressColorBack, displayMode }: Props) => {
  const { albumSrc, title, artist, progress, duration, paused } = playerData;
  return (
    <Composition
      height="100%"
      width="100%"
      templateCols={displayMode === 'BACKGROUND' ? cols2 : cols}
      templateRows={displayMode === 'BACKGROUND' ? rows2 : null}
      areas={displayMode === 'BACKGROUND' ? backgroundImgageTemplate : desktopTemplate}
    >
      {(Areas) => (
        <>
        <Areas.Album>
        <Flex justifyContent="flex-end" alignItems="center" height="full">
          <Album width="90%" pt="90%" src={albumSrc} />
        </Flex>
        </Areas.Album>
        <Areas.Titles>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" height="full" padding={8}>
          <Title title={title} mb={8}/>
          <ProgressLine
            strokeWidth={1}
            progress={progress}
            duration={duration}
            paused={paused}
            colorFront={progressColorFront}
            colorBack={progressColorBack}  
            width="70%"
          />
          <Artist name={artist} mt={8} />
          </Flex>
        </Areas.Titles>

        <Areas.SmallAlbum>
          <Flex flexDirection="column" justifyContent="flex-end" height="full" pl={8}>
            <Album width={80} height={80} src={albumSrc} />
          </Flex>
        </Areas.SmallAlbum>
        <Areas.SmallTitles>
        <Flex height="full" justifyContent="flex-end" flexDirection="column" pl={8}>
          <Title title={title} m={0} fontSize="3rem" textAlign="left"/>
          <Artist name={artist} m={0} fontSize="2rem" textAlign="left" color="white"/> 
        </Flex>
        </Areas.SmallTitles>
        <Areas.Progress>
        <ProgressLine
            strokeWidth={0.5}
            progress={progress}
            duration={duration}
            paused={paused}
            colorFront={progressColorFront}
            colorBack={progressColorBack}
            px={8}
            mt={4}
            mb={8}
          /> 
        </Areas.Progress>
        </>
      )}

    </Composition>
  );
};