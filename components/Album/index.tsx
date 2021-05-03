import React from 'react';
import { Box } from '../layout/Box';

interface Props {
  src: string;
  width: string | number;
}

export const Album = ({ src, ...props }: Props) => (
  <Box
    as="img"
    src={src}
    alt="album cover"
    boxShadow="canvas"
    {...props}
  />
);