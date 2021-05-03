import { SpaceProps } from "styled-system";
import { Text } from "./layout/Text";

interface Props extends SpaceProps {
  name: string;
}
export const Artist = ({ name, ...props}: Props) => (
    <Text 
      fontSize="artist" 
      color="text.artist" 
      letterSpacing="artist" 
      textAlign="center"
      {...props}
    >
      {name}
    </Text>
);