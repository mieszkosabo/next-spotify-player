export interface Colors {
   primary: string;
   background: string;
   progressFront: string;
   progressBack: string;
   text: {
       title: string;
       artist: string;
   }
}

export const colors: Colors = ({
   primary: '#AAAAAA',
   background: 'rgb(30, 30, 30)',
   progressFront: '#528E4D',
   progressBack: '#707070',
   text: {
       title: 'white',
       artist: '#AAAAAA',
   }
});
