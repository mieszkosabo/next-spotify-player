import { createGlobalStyle } from 'styled-components';
import sanitizeGlobalStyles from 'sanitize-global-styles';
import { createResponsiveProp } from 'responsive-prop';
import { breakpoints } from './theme/breakpoints';

const rp = createResponsiveProp(breakpoints);

export const GlobalStyle = createGlobalStyle`
    ${sanitizeGlobalStyles()}
    html {
      box-sizing: border-box;
      ${rp('font-size', [12, 14, 16, 17, 18, 26])} 
      background-color: ${({ theme }) => theme.colors.background};
    }};
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: ${({ theme }) => theme.fonts.primary};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
`;
