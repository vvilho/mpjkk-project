import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#47D378', // This is a green color
    },
    secondary: {
      main: '#621BEE', // This is a purple color
    },
    success: {
      main: '#03DAC5', // This is a greenish-blue color
    },
  },
  fontFamily: 'Roboto Mono',
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
    ,

    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
