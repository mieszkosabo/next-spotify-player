import styled from "styled-components";
import { typography, space, TypographyProps, SpaceProps, color, ColorProps } from "styled-system";

export interface TextProps extends TypographyProps, SpaceProps, ColorProps {
  children?: React.ReactNode;
  as?: string;
}

export const Text = styled.p<TextProps>`
  margin: 0;
  ${typography}
  ${space}
  ${color}
`;

