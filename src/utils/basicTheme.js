import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#6BDB93',
      main: '#47D378',
      dark: '#319354',
      contrastText: '#000',
    },
    secondary: {
      light: '#814BF2',
      main: '#621EEF',
      dark: '#4415A7',
      contrastText: '#fff',
    },
    success: {
      light: '#35E1D0',
      main: '#03DAC5',
      dark: '#029889',
      contrastText: '#000',
    },
  },
});

export default theme;
