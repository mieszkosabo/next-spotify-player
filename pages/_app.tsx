import { ThemeProvider } from "styled-components";
import Head from 'next/head';
import { GlobalStyle } from "../globalStyles";
import { theme } from "../theme";

function MyApp({ Component, pageProps }) {
  return (
  <>
  <Head>
    <title>Clean Spotify Player</title>
    <meta name="description" content="Spotify player with delightful visuals" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>"></link>
  </Head>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Component {...pageProps} />
   </ThemeProvider>
  </>
  );
}

export default MyApp;
