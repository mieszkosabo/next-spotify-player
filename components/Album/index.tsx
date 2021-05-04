import { useMachine } from '@xstate/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { albumMachine } from '../../machines/AlbumMachine';
import { Box } from '../layout/Box';

interface Props {
  src: string;
  width?: string | number;
  height?: string | number;
  pt?: string | number;
}

const A = styled(motion.img)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Album = ({ src, ...props }: Props) => {
  const [state, send] = useMachine(albumMachine);
  const { context } = state;
  useEffect(() => {
    send({ type: 'NEW_ALBUM', albumSrc: src });
  }, [src]);
  return (
  <Box
    boxShadow="canvas"
    position="relative"
    {...props}
  >
    <AnimatePresence>
          <A src={context.backAlbum} />
          {state.value === 'front' && 
          <A
            key="elo1"
            initial={{opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            src={context.frontAlbum}
          />}
        </AnimatePresence>
  </Box>
  );
};