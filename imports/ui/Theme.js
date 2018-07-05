import { createMuiTheme } from '@material-ui/core/styles';

const COLORS = {
  primary: {
    extraLight: '#F1FFFF',
    light: '#88d4ff',
    medium: '#58a1ff',
    main: '#256ed8',
    dark: '#256ed8',
    extraDark: '#00228c',
    contrastText: '#fff',
  },
  primary3: {
    extraDark: '#002E8C',
    dark: '#256ED8',
    medium: '#85BFF2',
    light: '#EBF6FF',
  },
  grey: {
    extraDark: '#3B3B3B',
    dark: '#616161',
    medium: '#AEAEAE',
    light: '#F2F2F2',
  },
  secondary: {
    light: '#61ffe0',
    main: '#68CFBF',
    dark: '#009d7f',
    contrastText: '#fff',
  },
  background: {
    light: '#f8f8f8',
    medium: '#aeaeae',
    dark: '#616161',
    extraDark: '#3b3b3b',
    white: '#ffffff',
    contrastText: '#fff',
  },
  status: {
    info: '#88d4ff',
    success: '#65a603',
    warning: '#ffce26',
    danger: '#eb0000',
  },
};

const theme = createMuiTheme({
  palette: COLORS,
  typography: {
    htmlFontSize: 10,
    fontWeight: 300,
    body1: {
      fontWeight: 300,
    },
  },
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        fontSize: 10,
        color: 'white', // Some CSS
      },
      raisedPrimary: {
        fontSize: '1.4rem',
      },
      raisedSecondary: {
        fontSize: '1.4rem',
      },
      flatPrimary: {
        color: COLORS.primary.main,
      },
      flatSecondary: {
        color: COLORS.secondary.main,
      },
    },
    MuiListItem: {
      gutter: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
});

export default theme;
