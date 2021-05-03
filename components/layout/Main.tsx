import React from 'react';
import { Box } from './Box';

export const Main = ({ backgroundColor, children }) => (
  <Box width="100vw" height="100vh" bg={backgroundColor ?? 'background'}>
    { children }
  </Box>
);