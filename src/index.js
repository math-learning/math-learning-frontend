import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import './index.css';
import * as serviceWorker from './serviceWorker';
import history from './store/history';
import configureStore from './store/configureStore';
import theme from './themes/defaultTheme';
import App from './App';

const store = configureStore({});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
