import React from 'react';
import styled from 'styled-components';
import { style, 
         ResponsiveValue,
         space,
         layout,
         position,
         SpaceProps,
         LayoutProps,
         PositionProps,
         border,
         BorderProps,
         compose,
         shadow,
         ShadowProps,
         background,
         BackgroundProps } from 'styled-system';

const textColor = style({
  prop: 'textColor',
  cssProperty: 'color',
  key: 'colors'
});

const backgroundColor = style({
  prop: 'bg',
  cssProperty: 'background-color',
  key: 'colors'
});
export interface BoxProps extends LayoutProps, PositionProps, SpaceProps, BorderProps, ShadowProps, BackgroundProps {
  children?: React.ReactNode;
  textColor?: ResponsiveValue<string>; 
  bg?: ResponsiveValue<string>;
}

export const Box = styled.div<BoxProps>`
    box-sizing: border-box;
    min-width: 0;
    ${compose(
  space,
  textColor,
  backgroundColor,
  layout,
  position,
  border,
  shadow,
  background
)}
`;