import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styled from 'styled-components';
import { useMachine } from '@xstate/react';
import { albumMachine } from '../machines/AlbumMachine';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

const A = styled(motion.div)<{col: string}>`
  width: 100%;
  height: 100%;
  background-color: ${({ col }) => col ?? 'palevioletred'};
  position: absolute;
  top: 0;
  left: 0;
`;

const ContainerOut = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerIn = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  margin-bottom: 25px;
`;



// color will be replaced with src ofc
const ToyTransition = ({ color }) => {
  const [state, send] = useMachine(albumMachine);
  const { context } = state;
  useEffect(() => {
    send({ type: 'NEW_ALBUM', albumSrc: color });
  }, [color]);

  return (
    <ContainerOut>
      
      <ContainerIn>
        <AnimatePresence>
          <A col={context.backAlbum} />
          {state.value === 'front' && <A
            key="elo1"
            initial={{opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            col={context.frontAlbum}
          />}
        </AnimatePresence>
      </ContainerIn>
    </ContainerOut>
  );
};

export default function Playground() {
  const [currCol, setCurrCol] = useState('palevioletred');
  useEffect(() => {
    const array = ['red', 'blue', 'papayawhip', 'hotpink', 'yellow'];
    from(array)
    .pipe(
      concatMap(val => of(val).pipe(delay(1000))),
    ).subscribe(setCurrCol);


  }, []);

  return (
    <>
      <ToyTransition color={currCol} />
    </>
  );
  
}