import { DefaultTheme } from 'styled-components';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { sizes } from './sizes';
import { space } from './space';
import { shadows } from './shadows';
import { fonts, fontWeights, fontSizes, letterSpacings} from './typography';

export const theme: DefaultTheme = {
    colors,
    space,
    sizes,
    fonts,
    fontWeights,
    breakpoints,
    fontSizes,
    letterSpacings,
    shadows
};
