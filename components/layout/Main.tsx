import React from 'react';
import styled from 'styled-components';
import { DISPLAY_MODE } from '../../machines';
import { Box } from './Box';

interface Props {
  displayMode?: DISPLAY_MODE;
  backgroundColor?: string;
  backgroundImg?: string;
  children: React.ReactNode;
}

const WithColorTransitions = styled(Box)`
    transition: all 2s;
`;

export const Main = ({ backgroundColor, backgroundImg, children, displayMode }: Props) => (
  <WithColorTransitions 
    width="100vw" 
    height="100vh"
    bg={backgroundColor ?? 'background'}
    backgroundImage={displayMode == 'BACKGROUND' ? `url(${backgroundImg})` : 'unset'}
    backgroundSize="cover"
    boxShadow={displayMode === 'BACKGROUND' ? "inset 0 -12rem 10rem black" : 'unset'}
  >
    { children }
  </WithColorTransitions>
);