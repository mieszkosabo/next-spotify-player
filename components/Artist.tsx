import { SpaceProps } from "styled-system";
import { Text } from "./layout/Text";

interface Props extends SpaceProps {
  name: string;
  fontSize?: string | number;
  textAlign?: "center" | "left";
  color?: string;
}
export const Artist = ({ name, ...props}: Props) => (
    <Text 
      fontSize="artist" 
      color="text.artist" 
      letterSpacing="artist" 
      {...props}
    >
      {name}
    </Text>
);