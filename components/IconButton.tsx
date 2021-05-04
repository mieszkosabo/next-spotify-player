import { Box } from "./layout/Box";
import styled from 'styled-components';

const IconButtonWrapper = styled(Box)`
    background: transparent;
    border: none;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.2);
    }
`;

export const IconButton = ({ onClick, icon}) => {
  const Icon = icon;
  return (
  <IconButtonWrapper as="button" onClick={onClick} width={10} height={10}>
    <Icon />
  </IconButtonWrapper>
  );
};