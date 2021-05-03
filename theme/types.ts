import { Fonts, FontSizes, FontWeights, LetterSpacings } from "./typography";

export type RecursiveProperty<Nested = string | number> =
  | RecursiveObject<Nested>
  | Nested

export interface RecursiveObject<Nested = string | number> {
  [property: string]: RecursiveProperty<Nested>
}

export interface Typography {
  fonts: Fonts;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  breakpoints: string[],
  letterSpacings: LetterSpacings
} // TODO: add letter spacings and line Heights