import 'styled-components';
import { Colors } from './colors';
import { RecursiveObject, Typography } from './types';
declare module 'styled-components' {
  export interface DefaultTheme extends Typography {
    colors: Colors;
    space: RecursiveObject;
    sizes: RecursiveObject;
    shadows: RecursiveObject;
  }
}
