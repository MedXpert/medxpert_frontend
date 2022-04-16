import Colors from './colors';
const lightTheme = {
  dark: false,
  colors: {
    primary: Colors.primary,
    background: Colors.secondary,
    card: Colors.white,
    text: Colors.black,
    border: Colors.lightGray,
    notification: Colors.whiteSmoke,
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: Colors.primary,
    background: Colors.dark,
    card: Colors.gray,
    text: Colors.secondary,
    border: Colors.lightGray,
    notification: Colors.whiteSmoke,
  },
};

export {lightTheme, darkTheme};
