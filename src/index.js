import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#47D378', // This is an orange looking color
    },
    secondary: {
      main: '#621BEE', // Another orange-ish color
    },
  },
  // eslint-disable-next-line max-len
  fontFamily: 'Roboto Mono', // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
