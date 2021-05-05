export interface Fonts {
    primary: string;
}

export const fonts: Fonts = ({
    primary: 'Montserrat, sans-serif',
});

export interface FontWeights {
    regular: number;
    bold: number;
}

export const fontWeights: FontWeights = {
    regular: 400,
    bold: 700,
};

export interface LetterSpacings {
    title: string;
    artist: string;
}

export const letterSpacings: LetterSpacings = {
    title: '0.4rem',
    artist: '0.3rem'
};

export interface FontSizes {
    title: string;
    artist: string;
    body: string
}
export const fontSizes: FontSizes = {
    title: '7vh',
    artist: '5.5vh',
    body: '1rem'
};

