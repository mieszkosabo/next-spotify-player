import { SpaceProps } from "styled-system";
import { Text } from "./layout/Text";

interface Props extends SpaceProps {
  title: string;
  fontSize?: string | number;
  textAlign?: "center" | "left";
}
export const Title = ({ title, ...props }: Props) => (
  <Text 
    fontSize="title" 
    color="text.title"
    letterSpacing="title"
    textAlign="center"
    fontWeight="bold"
    {...props}
   >
      {title}
   </Text>
);