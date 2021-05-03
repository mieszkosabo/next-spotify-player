import { Composition } from 'atomic-layout';
import React from 'react';
import { Album } from '../Album';
import { Artist } from '../Artist';
import { Flex } from '../layout/Flex';
import { ProgressLine } from '../ProgressLine';
import { Title } from '../Title';

const desktopTemplate = `
  album titles
`;

export const PlayerLayout = ({ title, artist, duration, progress, albumSrc, progressColorFront, progressColorBack }) => {

  return (
    <Composition
      height="100%"
      width="100%"
      templateCols="1fr 1fr"
      areas={desktopTemplate}
    >
      {(Areas) => (
        <>
        <Areas.Album>
        <Flex justifyContent="flex-end" alignItems="center" height="full">
          <Album src={albumSrc} />
        </Flex>
        </Areas.Album>
        <Areas.Titles>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" height="full" padding={8}>
          <Title title={title} mb={8}/>
          <ProgressLine
            percent={(progress / duration * 100)}
            strokeColor={progressColorFront}
            trailColor={progressColorBack}  
          />
          <Artist name={artist} mt={8} />
          </Flex>
        </Areas.Titles>
        </>
      )}

    </Composition>
  );
};